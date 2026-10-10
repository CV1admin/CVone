"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import AlertsPanel from "@/components/sphere/AlertsPanel";
import GlobalScorePanel from "@/components/sphere/GlobalScorePanel";
import NodePopup from "@/components/sphere/NodePopup";
import SphereControls from "@/components/sphere/SphereControls";
import SphereLegend from "@/components/sphere/SphereLegend";
import { arcColor, filterNodesByMode, nodeAltitude, nodeColor, nodeRadius } from "@/lib/nodeDisplay";
import type { HubSphereFlow, HubSphereNode, HubSphereResponse, SphereMode } from "@/types/hub";

const Globe = dynamic(() => import("react-globe.gl"), {
  ssr: false,
  loading: () => <div className="flex h-screen items-center justify-center bg-slate-950 text-white">Loading globe...</div>,
});

export default function HubSphere() {
  const [data, setData] = useState<HubSphereResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<HubSphereNode | null>(null);
  const [mode, setMode] = useState<SphereMode>("civilization_health");

  useEffect(() => {
    let mounted = true;

    async function loadSphereData() {
      try {
        const response = await fetch("/api/hub/sphere", { cache: "no-store" });
        if (!response.ok) throw new Error(`Hub API failed with status ${response.status}`);
        const payload = (await response.json()) as HubSphereResponse;
        if (mounted) setData(payload);
      } catch (err) {
        if (mounted) setError(err instanceof Error ? err.message : "Unknown Hub API error");
      }
    }

    void loadSphereData();

    return () => {
      mounted = false;
    };
  }, []);

  const visibleNodes = useMemo(() => (data ? filterNodesByMode(data.nodes, mode) : []), [data, mode]);

  const visibleNodeIds = useMemo(() => new Set(visibleNodes.map((node) => node.id)), [visibleNodes]);

  const visibleFlows = useMemo(() => {
    if (!data) return [];
    return data.flows.filter((flow) => visibleNodeIds.has(flow.fromNodeId) || visibleNodeIds.has(flow.toNodeId));
  }, [data, visibleNodeIds]);

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 p-8 text-white">
        <div className="max-w-xl rounded-2xl border border-red-400/20 bg-red-500/10 p-6">
          <h1 className="text-xl font-semibold">Hub Sphere failed to load</h1>
          <p className="mt-2 text-slate-200">{error}</p>
        </div>
      </main>
    );
  }

  if (!data) {
    return <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">Loading Civilisation.One Hub...</main>;
  }

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <Globe
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        pointsData={visibleNodes}
        pointLat="lat"
        pointLng="lng"
        pointAltitude={(d: object) => nodeAltitude(d as HubSphereNode)}
        pointRadius={(d: object) => nodeRadius(d as HubSphereNode)}
        pointColor={(d: object) => nodeColor(d as HubSphereNode)}
        pointLabel={(d: object) => {
          const node = d as HubSphereNode;
          return `
            <div style="font-size:13px; min-width:180px">
              <b>${node.name}</b><br/>
              Type: ${node.type}<br/>
              CIV1 Score: ${node.score.publicScore}/100<br/>
              CVone Level: ${node.score.cvoneLevel}<br/>
              Grade: ${node.score.grade}<br/>
              Members: ${node.members ?? 0}<br/>
              Trust: ${node.metrics.trust}<br/>
              Activity: ${node.metrics.activity}<br/>
              Status: ${node.status}
            </div>
          `;
        }}
        onPointClick={(d: object) => setSelectedNode(d as HubSphereNode)}
        arcsData={visibleFlows}
        arcStartLat="startLat"
        arcStartLng="startLng"
        arcEndLat="endLat"
        arcEndLng="endLng"
        arcAltitude={(d: object) => {
          const flow = d as HubSphereFlow;
          return 0.15 + Math.min(flow.volume / 1000, 0.4);
        }}
        arcStroke={(d: object) => {
          const flow = d as HubSphereFlow;
          return 0.4 + Math.min(flow.volume / 500, 2);
        }}
        arcColor={(d: object) => arcColor(d as HubSphereFlow)}
        arcDashLength={0.4}
        arcDashGap={2}
        arcDashAnimateTime={2500}
        ringsData={visibleNodes.filter((node) => node.status === "alert" || node.type === "center_node" || (node.alerts?.length ?? 0) > 0)}
        ringLat="lat"
        ringLng="lng"
        ringMaxRadius={4}
        ringPropagationSpeed={2}
        ringRepeatPeriod={1200}
      />

      <GlobalScorePanel data={data} />
      {selectedNode && <NodePopup node={selectedNode} onClose={() => setSelectedNode(null)} />}
      <SphereControls mode={mode} onModeChange={setMode} />
      <SphereLegend />
      {!selectedNode && <AlertsPanel alerts={data.alerts} />}
    </section>
  );
}
