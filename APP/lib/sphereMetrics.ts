import type { HubSphereNode } from "@/types/hub";

export function countOnlineNodes(nodes: HubSphereNode[]): number {
  return nodes.filter((node) => ["prime", "online"].includes(node.status)).length;
}

export function countAchievements(nodes: HubSphereNode[]): number {
  return nodes.reduce((total, node) => total + (node.achievements?.length ?? 0), 0);
}

export function countMembers(nodes: HubSphereNode[]): number {
  return nodes.reduce((total, node) => total + (node.members ?? 0), 0);
}
