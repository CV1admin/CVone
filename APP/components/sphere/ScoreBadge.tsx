import type { CIV1Score } from "@/types/hub";

export default function ScoreBadge({ score }: { score: CIV1Score }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm text-white">
      <span className="font-semibold">CIV1 {score.publicScore}</span>
      <span className="text-slate-300">CV {score.cvoneLevel}</span>
      <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs uppercase tracking-wide text-cyan-200">{score.grade}</span>
    </div>
  );
}
