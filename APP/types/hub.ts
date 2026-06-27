export type HubNodeType =
  | "center_node"
  | "country_node"
  | "mirrorme_cluster"
  | "body_node"
  | "research_node"
  | "education_node"
  | "charity_node"
  | "infrastructure_node"
  | "depin_node"
  | "validator_node";

export type NodeStatus = "prime" | "online" | "degraded" | "offline" | "alert" | "unverified";

export type SphereMode =
  | "civilization_health"
  | "mirrorme_network"
  | "education_layer"
  | "research_layer"
  | "blockchain_depin";

export interface CIV1Score {
  normalized: number;
  publicScore: number;
  cvoneLevel: number;
  grade: "inactive" | "weak" | "developing" | "healthy" | "strong" | "prime";
}

export interface HubMetrics {
  trust: number;
  education: number;
  science: number;
  activity: number;
  contribution: number;
  auditIntegrity: number;
  fundingHealth: number;
  nodeUptime: number;
}

export interface HubSphereAlert {
  id: string;
  nodeId?: string;
  countryCode?: string;
  severity: "low" | "medium" | "high" | "critical";
  category:
    | "education_gap"
    | "trust_drop"
    | "security"
    | "infrastructure"
    | "funding"
    | "governance"
    | "achievement"
    | "system";
  message: string;
  timestamp: string;
}

export interface HubAchievement {
  id: string;
  title: string;
  category: "education" | "science" | "infrastructure" | "governance" | "community" | "research" | "funding";
  verified: boolean;
  timestamp: string;
}

export interface HubSphereNode {
  id: string;
  name: string;
  type: HubNodeType;
  lat: number;
  lng: number;
  countryCode?: string;
  members?: number;
  metrics: HubMetrics;
  score: CIV1Score;
  status: NodeStatus;
  alerts?: HubSphereAlert[];
  achievements?: HubAchievement[];
}

export interface HubSphereFlow {
  id: string;
  fromNodeId: string;
  toNodeId: string;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  type: "knowledge" | "funding" | "education" | "research" | "governance" | "mirrorme_sync" | "blockchain";
  volume: number;
  trust: number;
  timestamp: string;
}

export interface HubSphereResponse {
  global: {
    name: "Civilisation.One";
    score: CIV1Score;
    nodeCount: number;
    flowCount: number;
    alertCount: number;
    updatedAt: string;
  };
  nodes: HubSphereNode[];
  flows: HubSphereFlow[];
  alerts: HubSphereAlert[];
}
