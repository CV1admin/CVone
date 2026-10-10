import type { SphereMode } from "@/types/hub";

const modes: { id: SphereMode; label: string }[] = [
  { id: "civilization_health", label: "Civilization Health" },
  { id: "mirrorme_network", label: "MirrorME" },
  { id: "education_layer", label: "Education" },
  { id: "research_layer", label: "Research" },
  { id: "blockchain_depin", label: "Blockchain / DePIN" },
];

export default function SphereControls({ mode, onModeChange }: { mode: SphereMode; onModeChange: (mode: SphereMode) => void }) {
  return (
    <section className="absolute bottom-4 left-4 z-10 max-w-3xl rounded-2xl border border-white/10 bg-black/75 p-3 text-white shadow-2xl backdrop-blur">
      <p className="mb-2 text-xs uppercase tracking-[0.25em] text-slate-400">Sphere Mode</p>
      <div className="flex flex-wrap gap-2">
        {modes.map((item) => (
          <button
            key={item.id}
            className={
              item.id === mode
                ? "rounded-xl bg-cyan-300 px-3 py-2 text-sm font-semibold text-slate-950"
                : "rounded-xl bg-white/10 px-3 py-2 text-sm text-white hover:bg-white/20"
            }
            onClick={() => onModeChange(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </section>
  );
}
