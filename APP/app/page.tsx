import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-950 p-8 text-center text-white">
      <div className="max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl">
        <p className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-300">Civilisation.One</p>
        <h1 className="mb-4 text-4xl font-semibold">Test Platform</h1>
        <p className="mb-8 text-slate-300">
          Global Hub Sphere, CIV1 Score engine, privacy-safe node clusters, alerts, achievements, and verified flows.
        </p>
        <Link
          href="/hub"
          className="rounded-xl bg-cyan-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-200"
        >
          Open Hub Sphere
        </Link>
      </div>
    </main>
  );
}
