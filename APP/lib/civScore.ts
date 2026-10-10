import type { CIV1Score, HubMetrics } from "@/types/hub";

const clamp01 = (value: number) => Math.max(0, Math.min(1, Number.isFinite(value) ? value : 0));

export function calculateCIV1Score(metrics: HubMetrics): CIV1Score {
  const normalized =
    clamp01(metrics.trust) * 0.22 +
    clamp01(metrics.education) * 0.18 +
    clamp01(metrics.science) * 0.14 +
    clamp01(metrics.activity) * 0.14 +
    clamp01(metrics.contribution) * 0.12 +
    clamp01(metrics.auditIntegrity) * 0.1 +
    clamp01(metrics.fundingHealth) * 0.05 +
    clamp01(metrics.nodeUptime) * 0.05;

  const publicScore = Math.round(normalized * 100);
  const cvoneLevel = Math.max(0.01, Number((normalized * 5).toFixed(2)));

  let grade: CIV1Score["grade"] = "inactive";

  if (publicScore >= 96) grade = "prime";
  else if (publicScore >= 81) grade = "strong";
  else if (publicScore >= 61) grade = "healthy";
  else if (publicScore >= 41) grade = "developing";
  else if (publicScore >= 21) grade = "weak";

  return {
    normalized: Number(normalized.toFixed(4)),
    publicScore,
    cvoneLevel,
    grade,
  };
}

export function averageMetrics(metricsList: HubMetrics[]): HubMetrics {
  const empty: HubMetrics = {
    trust: 0,
    education: 0,
    science: 0,
    activity: 0,
    contribution: 0,
    auditIntegrity: 0,
    fundingHealth: 0,
    nodeUptime: 0,
  };

  if (metricsList.length === 0) return empty;

  const totals = metricsList.reduce<HubMetrics>(
    (acc, metrics) => ({
      trust: acc.trust + metrics.trust,
      education: acc.education + metrics.education,
      science: acc.science + metrics.science,
      activity: acc.activity + metrics.activity,
      contribution: acc.contribution + metrics.contribution,
      auditIntegrity: acc.auditIntegrity + metrics.auditIntegrity,
      fundingHealth: acc.fundingHealth + metrics.fundingHealth,
      nodeUptime: acc.nodeUptime + metrics.nodeUptime,
    }),
    empty,
  );

  const divisor = metricsList.length;

  return {
    trust: totals.trust / divisor,
    education: totals.education / divisor,
    science: totals.science / divisor,
    activity: totals.activity / divisor,
    contribution: totals.contribution / divisor,
    auditIntegrity: totals.auditIntegrity / divisor,
    fundingHealth: totals.fundingHealth / divisor,
    nodeUptime: totals.nodeUptime / divisor,
  };
}
