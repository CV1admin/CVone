import { NextResponse } from "next/server";
import { averageMetrics, calculateCIV1Score } from "@/lib/civScore";
import { flows, getAlerts, getScoredNodes } from "@/lib/hubSphereData";

export const dynamic = "force-dynamic";

export async function GET() {
  const nodes = getScoredNodes();
  const alerts = getAlerts(nodes);
  const globalMetrics = averageMetrics(nodes.map((node) => node.metrics));

  return NextResponse.json({
    global: {
      name: "Civilisation.One",
      score: calculateCIV1Score(globalMetrics),
      nodeCount: nodes.length,
      flowCount: flows.length,
      alertCount: alerts.length,
      updatedAt: new Date().toISOString(),
    },
    nodes,
    flows,
    alerts,
  });
}
