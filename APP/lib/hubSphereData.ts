import type { HubSphereAlert, HubSphereFlow, HubSphereNode } from "@/types/hub";
import { calculateCIV1Score } from "@/lib/civScore";

type RawNode = Omit<HubSphereNode, "score">;

const now = () => new Date().toISOString();

export const rawNodes: RawNode[] = [
  {
    id: "center-001",
    name: "Civilisation.One Center Node",
    type: "center_node",
    lat: 51.5072,
    lng: -0.1276,
    countryCode: "GBR",
    members: 1,
    metrics: {
      trust: 0.99,
      education: 0.95,
      science: 0.96,
      activity: 1,
      contribution: 0.98,
      auditIntegrity: 0.97,
      fundingHealth: 0.75,
      nodeUptime: 0.99,
    },
    status: "prime",
    alerts: [],
    achievements: [
      {
        id: "ach-center-active",
        title: "Center Node active",
        category: "infrastructure",
        verified: true,
        timestamp: now(),
      },
    ],
  },
  {
    id: "country-gbr",
    name: "United Kingdom Node",
    type: "country_node",
    lat: 55.3781,
    lng: -3.436,
    countryCode: "GBR",
    members: 12842,
    metrics: {
      trust: 0.91,
      education: 0.78,
      science: 0.66,
      activity: 0.84,
      contribution: 0.72,
      auditIntegrity: 0.88,
      fundingHealth: 0.63,
      nodeUptime: 0.96,
    },
    status: "online",
    alerts: [],
    achievements: [],
  },
  {
    id: "country-pol",
    name: "Poland Node",
    type: "country_node",
    lat: 51.9194,
    lng: 19.1451,
    countryCode: "POL",
    members: 9421,
    metrics: {
      trust: 0.88,
      education: 0.74,
      science: 0.71,
      activity: 0.79,
      contribution: 0.69,
      auditIntegrity: 0.84,
      fundingHealth: 0.58,
      nodeUptime: 0.94,
    },
    status: "online",
    alerts: [
      {
        id: "alert-pol-education-gap",
        nodeId: "country-pol",
        countryCode: "POL",
        severity: "medium",
        category: "education_gap",
        message: "STEM participation below target in test dataset.",
        timestamp: now(),
      },
    ],
    achievements: [],
  },
  {
    id: "mirrorme-eu-cluster",
    name: "MirrorME Europe Cluster",
    type: "mirrorme_cluster",
    lat: 50.8503,
    lng: 4.3517,
    members: 24500,
    metrics: {
      trust: 0.86,
      education: 0.8,
      science: 0.74,
      activity: 0.82,
      contribution: 0.77,
      auditIntegrity: 0.85,
      fundingHealth: 0.52,
      nodeUptime: 0.92,
    },
    status: "online",
    alerts: [],
    achievements: [
      {
        id: "ach-eu-cluster",
        title: "Privacy-safe cluster online",
        category: "community",
        verified: true,
        timestamp: now(),
      },
    ],
  },
  {
    id: "research-london-ai",
    name: "London AI Research Node",
    type: "research_node",
    lat: 51.5072,
    lng: -0.1276,
    countryCode: "GBR",
    members: 42,
    metrics: {
      trust: 0.9,
      education: 0.83,
      science: 0.91,
      activity: 0.76,
      contribution: 0.81,
      auditIntegrity: 0.86,
      fundingHealth: 0.6,
      nodeUptime: 0.95,
    },
    status: "online",
    alerts: [],
    achievements: [],
  },
  {
    id: "validator-warsaw-001",
    name: "Warsaw DePIN Validator",
    type: "validator_node",
    lat: 52.2297,
    lng: 21.0122,
    countryCode: "POL",
    members: 3,
    metrics: {
      trust: 0.83,
      education: 0.62,
      science: 0.72,
      activity: 0.88,
      contribution: 0.84,
      auditIntegrity: 0.89,
      fundingHealth: 0.55,
      nodeUptime: 0.97,
    },
    status: "online",
    alerts: [],
    achievements: [],
  },
];

export const flows: HubSphereFlow[] = [
  {
    id: "flow-london-warsaw-knowledge",
    fromNodeId: "center-001",
    toNodeId: "country-pol",
    startLat: 51.5072,
    startLng: -0.1276,
    endLat: 51.9194,
    endLng: 19.1451,
    type: "knowledge",
    volume: 320,
    trust: 0.94,
    timestamp: now(),
  },
  {
    id: "flow-eu-mirrorme-sync",
    fromNodeId: "mirrorme-eu-cluster",
    toNodeId: "center-001",
    startLat: 50.8503,
    startLng: 4.3517,
    endLat: 51.5072,
    endLng: -0.1276,
    type: "mirrorme_sync",
    volume: 780,
    trust: 0.88,
    timestamp: now(),
  },
  {
    id: "flow-warsaw-validator",
    fromNodeId: "validator-warsaw-001",
    toNodeId: "center-001",
    startLat: 52.2297,
    startLng: 21.0122,
    endLat: 51.5072,
    endLng: -0.1276,
    type: "blockchain",
    volume: 110,
    trust: 0.91,
    timestamp: now(),
  },
];

export const scoredNodes: HubSphereNode[] = rawNodes.map((node) => ({
  ...node,
  score: calculateCIV1Score(node.metrics),
}));

export function getScoredNodes(): HubSphereNode[] {
  return scoredNodes;
}

export function getAlerts(nodes: HubSphereNode[]): HubSphereAlert[] {
  return nodes.flatMap((node) => node.alerts ?? []);
}
