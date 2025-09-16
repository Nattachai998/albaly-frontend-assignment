"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  TrophyIcon,
  UsersIcon,
  GlobeAsiaAustraliaIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";

import { InsightsPayload } from "@/lib/InsigthsType";
import Chip from "@/components/chart/Chip";
import Bar from "@/components/chart/Bar";

export default function InsightsPage() {
  const [data, setData] = useState<InsightsPayload>();

  useEffect(() => {
    fetch("/api/insights")
      .then((res) => res.json())
      .then((data: InsightsPayload) => setData(data));
  }, []);

  if (!data)
    return <div className="text-sm text-rose-600">No insights available.</div>;

  // max product
  const topMax = Math.max(
    ...data.topSellingProducts.products.map((p) => p.value)
  );
  // max region
  const regionMax = Math.max(
    ...data.regionalPerformance.map((r) => r.value));
  // max funnel
  const funnelMax = Math.max(
    ...data.conversionFunnel.map((s) => s.value));

  return (
    <section className="mx-auto max-w-7xl">
      <h1 className="text-2xl font-semibold tracking-tight">Insights</h1>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Top products, drop-off trends, regions, and conversion funnel.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Top‑Selling Products */}
        <div className="rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 p-5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <TrophyIcon className="h-5 w-5 text-gray-400" />
              <h2 className="text-lg font-semibold">Top-Selling Products</h2>
            </div>
            <Chip
              value={"+" + data.topSellingProducts.percentDiff + "%"}
              positive={data.topSellingProducts.percentDiff >= 0}
            />
          </div>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {data.topSellingProducts.winner} leads this period
          </p>

          <div className="mt-4 grid grid-cols-1 gap-3">
            {data.topSellingProducts.products.map((p, idx) => (
              <div
                key={p.name + idx}
                className="rounded-md border border-black/10 dark:border-white/10 p-3"
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">
                    {p.name}
                  </span>
                  <span className="font-medium">
                    {p.value} {data.meta?.currency}
                  </span>
                </div>
                <div className="mt-2">
                  <Bar value={p.value} max={topMax} />
                </div>
                {typeof p.growthPct === "number" && (
                  <div className="mt-2 inline-flex items-center gap-1 text-xs">
                    {p.growthPct >= 0 ? (
                      <ArrowTrendingUpIcon className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <ArrowTrendingDownIcon className="h-4 w-4 text-rose-500" />
                    )}
                    <span
                      className={
                        p.growthPct >= 0 ? "text-emerald-600" : "text-rose-600"
                      }
                    >
                      {"+" + p.growthPct + "%" + " " + "MoM"}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      {"last:" + " " + p.lastMonth} {data.meta?.currency}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Customer Drop‑Off */}
        <div className="rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 p-5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <UsersIcon className="h-5 w-5 text-gray-400" />
              <h2 className="text-lg font-semibold">Customer Drop-Off</h2>
            </div>
            {typeof data.changeNotes?.churnMoM === "number" && (
              <Chip
                value={"+" + data.changeNotes.churnMoM + "%"}
                positive={data.changeNotes.churnMoM < 0 === false}
              />
            )}
          </div>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            4-week churn overview by cohort.
          </p>

          <ul className="mt-4 space-y-3 text-sm">
            {data.customerDropOff.map((w) => (
              <li key={w.week} className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="inline-block h-2.5 w-2.5 rounded-full bg-indigo-500" />
                    <span>Week {w.week}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">
                      {w.churnRate + " "} churn
                    </span>
                    <span className="text-xs text-gray-500">
                      {w.cohortSize} visitors
                    </span>
                  </div>
                </div>
                {w.drivers?.length ? (
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Drivers: {w.drivers}
                  </div>
                ) : w.notes ? (
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {w.notes}
                  </div>
                ) : (
                  ""
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Regional Performance */}
        <div className="rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 p-5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <GlobeAsiaAustraliaIcon className="h-5 w-5 text-gray-400" />
              <h2 className="text-lg font-semibold">Regional Performance</h2>
            </div>
            {typeof data.changeNotes?.regionsMoM === "number" && (
              <Chip
                value={"+" + data.changeNotes.regionsMoM + "%"}
                positive={data.changeNotes.regionsMoM >= 0}
              />
            )}
          </div>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            APAC tends to lead growth this period.
          </p>

          <div className="mt-4 space-y-4">
            {data.regionalPerformance.map((r) => (
              <div key={r.region} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">
                    {r.region}
                  </span>
                  <span className="font-medium">
                    {r.value} {data.meta?.currency}
                  </span>
                </div>
                <Bar value={r.value} max={regionMax} />
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {typeof r.changePct === "number" && (
                    <>
                      MoM:
                      <span
                        className={
                          r.changePct >= 0
                            ? "text-emerald-600"
                            : "text-rose-600"
                        }
                      >
                        {" " + "+" + r.changePct + "%"}
                      </span>
                    </>
                  )}
                  {typeof r.yoyPct === "number" && r.yoyPct >= 0 && (
                    <>
                      <span className="mx-1">•</span> YoY: {r.yoyPct}
                    </>
                  )}
                  {r.target && r.attainmentPct && (
                    <>
                      <span className="mx-1">•</span> Target hit:{" "}
                      {r.attainmentPct}%
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conversion Funnel */}
        <div className="rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 p-5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <FunnelIcon className="h-5 w-5 text-gray-400" />
              <h2 className="text-lg font-semibold">Conversion Funnel</h2>
            </div>
            <Chip value="-5%" positive={false} />
          </div>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            From visitors to purchases with step rates.
          </p>

          <div className="mt-4 space-y-4">
            {data.conversionFunnel.map((s) => (
              <div key={s.label} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-medium uppercase tracking-wide text-gray-600 dark:text-gray-300">
                  <span className="rounded px-2 py-0.5 bg-black/5 dark:bg-white/10">
                    {s.label}
                  </span>
                  <span className="text-sm">{s.value}</span>
                </div>
                <Bar value={s.value} max={funnelMax} />
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  <span>Step rate: {s.rateFromPrev + "%"}</span>
                  {typeof s.overallCR === "number" && s.overallCR > 0 && (
                    <>
                      <span className="mx-1">•</span> Overall CR: {" " + s.overallCR + "%"}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
