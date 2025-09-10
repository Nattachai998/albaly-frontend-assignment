export default function OverviewPage() {
  return (
    <section className="mx-auto max-w-7xl">
      <h1 className="text-2xl font-semibold tracking-tight">Overview</h1>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        KPI, recent activity, and monthly performance will appear here.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-2 xl:grid-cols-3">
        <div className="min-h-32 rounded-lg border border-black/10 dark:border-white/10 p-6">
          KPI Cards
        </div>
        <div className="min-h-32 rounded-lg border border-black/10 dark:border-white/10 p-6">
          Recent Activity
        </div>
        <div className="min-h-32 rounded-lg border border-black/10 dark:border-white/10 p-6">
          Monthly Performance
        </div>
      </div>
    </section>
  );
}
