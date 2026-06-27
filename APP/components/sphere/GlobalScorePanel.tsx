import ScoreBadge from "@/components/sphere/ScoreBadge";
import { countAchievements, countMembers, countOnlineNodes } from "@/lib/sphereMetrics";
import type { HubSphereResponse } from "@/types/hub";

export default function GlobalScorePanel({ data }: { data: HubSphereResponse }) {
  return (
    <section className="absolute left-4 top-4 z-10 w-80 rounded-2xl border border-white/10 bg-black/75 p-4 text-white shadow-2xl backdrop-blur">
      <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Global Hub Sphere</p>
      <h1 className="mt-1 text-xl font-semibold">Civilisation.One</h1>
      <div className="mt-3">
        <ScoreBadge score={data.global.score} />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <Metric label="Nodes" value={data.global.nodeCount} />
        <Metric label="Online" value={countOnlineNodes(data.nodes)} />
        <Metric label="Flows" value={data.global.flowCount} />
        <Metric label="Alerts" value={data.global.alertCount} />
        <Metric label="Members" value={countMembers(data.nodes).toLocaleString()} />
        <Metric label="Achievements" value={countAchievements(data.nodes)} />
      </div>
      <p className="mt-3 text-xs text-slate-400">Updated: {new Date(data.global.updatedAt).toLocaleString()}</p>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
      <p className="text-xs text-slate-400">{label}</p>
      <p className="text-lg font-semibold text-white">{value}</p>
    </div>
  );
}
