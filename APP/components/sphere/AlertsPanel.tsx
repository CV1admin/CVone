import type { HubSphereAlert } from "@/types/hub";

export default function AlertsPanel({ alerts }: { alerts: HubSphereAlert[] }) {
  if (alerts.length === 0) return null;

  return (
    <section className="absolute right-4 top-[28rem] z-10 w-96 rounded-2xl border border-orange-300/20 bg-black/75 p-4 text-white shadow-2xl backdrop-blur">
      <p className="mb-3 text-xs uppercase tracking-[0.25em] text-orange-200">Live Alerts</p>
      <div className="space-y-3">
        {alerts.map((alert) => (
          <div key={alert.id} className="rounded-xl border border-orange-300/20 bg-orange-400/10 p-3">
            <p className="text-sm font-semibold capitalize text-orange-100">{alert.severity} · {alert.category.replaceAll("_", " ")}</p>
            <p className="mt-1 text-sm text-slate-200">{alert.message}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
