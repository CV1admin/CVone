import type { HubSphereFlow, HubSphereNode, SphereMode } from "@/types/hub";

export function nodeRadius(node: HubSphereNode): number {
  const memberWeight = Math.log10((node.members ?? 1) + 10) * 0.12;
  const scoreWeight = node.score.normalized * 0.22;

  if (node.type === "center_node") return 0.55;

  return Math.max(0.12, memberWeight + scoreWeight);
}

export function nodeAltitude(node: HubSphereNode): number {
  if (node.type === "center_node") return 0.18;
  return 0.03 + node.score.normalized * 0.14;
}

export function nodeColor(node: HubSphereNode): string {
  if (node.status === "alert") return "#ff3333";
  if (node.status === "degraded") return "#ff9900";
  if (node.status === "offline") return "#666666";
  if (node.score.grade === "prime") return "#ffd166";
  if (node.score.grade === "strong") return "#7CFFB2";
  if (node.score.grade === "healthy") return "#4cc9f0";
  if (node.score.grade === "developing") return "#f4a261";
  return "#ff5c5c";
}

export function arcColor(flow: HubSphereFlow): string[] {
  if (flow.type === "blockchain") return ["#ffd166", "#7CFFB2"];
  if (flow.type === "mirrorme_sync") return ["#c084fc", "#4cc9f0"];
  if (flow.trust >= 0.9) return ["#7CFFB2", "#4cc9f0"];
  if (flow.trust >= 0.7) return ["#FFD166", "#f4a261"];
  return ["#FF5C5C", "#ff9900"];
}

export function filterNodesByMode(nodes: HubSphereNode[], mode: SphereMode): HubSphereNode[] {
  if (mode === "civilization_health") return nodes;
  if (mode === "mirrorme_network") return nodes.filter((node) => node.type === "center_node" || node.type === "mirrorme_cluster");
  if (mode === "education_layer") return nodes.filter((node) => node.type === "center_node" || node.type === "country_node" || node.type === "education_node");
  if (mode === "research_layer") return nodes.filter((node) => node.type === "center_node" || node.type === "research_node" || node.type === "country_node");
  if (mode === "blockchain_depin") return nodes.filter((node) => node.type === "center_node" || node.type === "depin_node" || node.type === "validator_node");
  return nodes;
}

export function formatPercent(value: number): string {
  return `${Math.round(value * 100)}%`;
}
