import ScoreBadge from "@/components/sphere/ScoreBadge";
import { formatPercent } from "@/lib/nodeDisplay";
import type { HubSphereNode } from "@/types/hub";

export default function NodePopup({ node, onClose }: { node: HubSphereNode; onClose: () => void }) {
  return (
    <aside className="absolute right-4 top-4 z-10 w-96 rounded-2xl border border-white/10 bg-black/80 p-4 text-white shadow-2xl backdrop-blur">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">Selected Node</p>
          <h2 className="mt-1 text-xl font-semibold">{node.name}</h2>
          <p className="text-sm text-slate-400">{node.type} · {node.countryCode ?? "global"}</p>
        </div>
        <button className="rounded-lg bg-white/10 px-3 py-1 text-sm hover:bg-white/20" onClick={onClose}>
          Close
        </button>
      </div>

      <div className="mt-4">
        <ScoreBadge score={node.score} />
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <Detail label="Members" value={(node.members ?? 0).toLocaleString()} />
        <Detail label="Status" value={node.status} />
        <Detail label="Trust" value={formatPercent(node.metrics.trust)} />
        <Detail label="Education" value={formatPercent(node.metrics.education)} />
        <Detail label="Science" value={formatPercent(node.metrics.science)} />
        <Detail label="Activity" value={formatPercent(node.metrics.activity)} />
        <Detail label="Contribution" value={formatPercent(node.metrics.contribution)} />
        <Detail label="Audit" value={formatPercent(node.metrics.auditIntegrity)} />
      </dl>

      {(node.alerts?.length ?? 0) > 0 && (
        <div className="mt-4 rounded-xl border border-orange-300/20 bg-orange-400/10 p-3">
          <p className="mb-2 text-sm font-semibold text-orange-200">Alerts</p>
          {node.alerts?.map((alert) => (
            <p key={alert.id} className="text-sm text-orange-100">{alert.message}</p>
          ))}
        </div>
      )}

      {(node.achievements?.length ?? 0) > 0 && (
        <div className="mt-4 rounded-xl border border-yellow-300/20 bg-yellow-400/10 p-3">
          <p className="mb-2 text-sm font-semibold text-yellow-200">Achievements</p>
          {node.achievements?.map((achievement) => (
            <p key={achievement.id} className="text-sm text-yellow-100">{achievement.title}</p>
          ))}
        </div>
      )}
    </aside>
  );
}

function Detail({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
      <dt className="text-xs text-slate-400">{label}</dt>
      <dd className="font-semibold text-white">{value}</dd>
    </div>
  );
}
