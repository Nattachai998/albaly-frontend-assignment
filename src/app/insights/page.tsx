export default function InsightsPage() {
  return (
    <section className="mx-auto max-w-7xl">
      <h1 className="text-2xl font-semibold tracking-tight">Insights</h1>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Top-selling products, drop-off trends, regions, and conversion funnel will appear here.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
        <div className="min-h-40 rounded-lg border border-black/10 dark:border-white/10 p-6">
          Top-selling (A vs B)
        </div>
        <div className="min-h-40 rounded-lg border border-black/10 dark:border-white/10 p-6">
          Customer Drop-off (4 weeks)
        </div>
        <div className="min-h-40 rounded-lg border border-black/10 dark:border-white/10 p-6">
          Regional Performance
        </div>
        <div className="min-h-40 rounded-lg border border-black/10 dark:border-white/10 p-6">
          Conversion Funnel
        </div>
      </div>
    </section>
  );
}
