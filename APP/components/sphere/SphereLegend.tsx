export default function SphereLegend() {
  return (
    <section className="absolute bottom-4 right-4 z-10 w-72 rounded-2xl border border-white/10 bg-black/75 p-4 text-sm text-white shadow-2xl backdrop-blur">
      <p className="mb-3 text-xs uppercase tracking-[0.25em] text-slate-400">Legend</p>
      <LegendItem color="#ffd166" label="Prime / Center / Achievement" />
      <LegendItem color="#7CFFB2" label="Strong health" />
      <LegendItem color="#4cc9f0" label="Healthy node" />
      <LegendItem color="#f4a261" label="Developing node" />
      <LegendItem color="#ff3333" label="Alert" />
      <p className="mt-3 text-xs text-slate-400">Point size = members + CIV1 Score. Altitude = score health. Arcs = verified flows.</p>
    </section>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="mb-2 flex items-center gap-2">
      <span className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
      <span>{label}</span>
    </div>
  );
}
