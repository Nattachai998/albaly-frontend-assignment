"use client";

import { useEffect, useState } from "react";
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  BanknotesIcon,
  UsersIcon,
  ArchiveBoxIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { OverviewPayload, Activity } from "@/lib/OverviewTypes";

export default function OverviewPage() {
  const [data, setData] = useState<OverviewPayload>();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    fetch("/api/overview")
      .then((res) => res.json())
      .then((data: OverviewPayload) => setData(data))
  }, []);

  if (!data) {  
    return <div className="text-sm text-rose-600">Failed to load overview.</div>;
  }
  
  // KPI Data
  const total = data.kpis[0];
  const active = data.kpis[1];
  const stock  = data.kpis[2];

  // Recent Activity
  const activities = data.recentActivity

  return (
    <section className="mx-auto max-w-7xl">
      <h1 className="text-2xl font-semibold tracking-tight">Overview</h1>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        KPI, recent activity, and monthly performance.
      </p>

      {/* KPI Summary */}
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">

        {/* Total Sales */}
        <div className="rounded-lg border border-black/10 dark:border-white/10 p-5 bg-white dark:bg-neutral-900">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500 dark:text-gray-400">{total.label}</div>
            <BanknotesIcon className="h-5 w-5 text-gray-400" />
          </div>
          <div className="mt-2 text-2xl font-semibold">
            {"฿"+ total.value} {total.unit}
          </div>
          <div className="mt-2 inline-flex items-center gap-1 text-sm">
            {total.changePct >= 0 ? (
              <ArrowTrendingUpIcon className="h-4 w-4 text-emerald-500" />
            ) : (
              <ArrowTrendingDownIcon className="h-4 w-4 text-rose-500" />
            )}
            <span className={total.changePct >= 0 ? "text-emerald-600" : "text-rose-600"}>
              {total.changePct >= 0 ? "+" : ""}{total.changePct}%
            </span>
            <span className="text-gray-500 dark:text-gray-400">vs last month</span>
          </div>
        </div>

        {/* Active Customers */}
        <div className="rounded-lg border border-black/10 dark:border-white/10 p-5 bg-white dark:bg-neutral-900">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500 dark:text-gray-400">{active.label}</div>
            <UsersIcon className="h-5 w-5 text-gray-400" />
          </div>
          <div className="mt-2 text-2xl font-semibold">{active.value}</div>
          <div className="mt-2 inline-flex items-center gap-1 text-sm">
            {active.changePct >= 0 ? (
              <ArrowTrendingUpIcon className="h-4 w-4 text-emerald-500" />
            ) : (
              <ArrowTrendingDownIcon className="h-4 w-4 text-rose-500" />
            )}
            <span className={active.changePct >= 0 ? "text-emerald-600" : "text-rose-600"}>
              {active.changePct >= 0 ? "+" : ""}{active.changePct}%
            </span>
            <span className="text-gray-500 dark:text-gray-400">vs last month</span>
          </div>
        </div>

        {/* Inventory Status */}
        <div className="rounded-lg border border-black/10 dark:border-white/10 p-5 bg-white dark:bg-neutral-900">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500 dark:text-gray-400">{stock.label}</div>
            <ArchiveBoxIcon className="h-5 w-5 text-gray-400" />
          </div>
          <div className="mt-2 text-2xl font-semibold">
            {stock.value}{stock.unit}
          </div>
          <div className="mt-2 inline-flex items-center gap-1 text-sm">
            {stock.changePct >= 0 ? (
              <ArrowTrendingUpIcon className="h-4 w-4 text-emerald-500" />
            ) : (
              <ArrowTrendingDownIcon className="h-4 w-4 text-rose-500" />
            )}
            <span className={stock.changePct >= 0 ? "text-emerald-600" : "text-rose-600"}>
              {stock.changePct >= 0 ? "+" : ""} {stock.changePct}%
            </span>
            <span className="text-gray-500 dark:text-gray-400">vs last month</span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold">Recent Activity</h2>
        <div className="mt-3 divide-y divide-black/10 dark:divide-white/10 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900">
          {activities.map((a: Activity) => {

            const Icon = a.status === "success" ? CheckCircleIcon : ExclamationTriangleIcon;
            const color = 
                  a.status === "success" ? "text-emerald-500" 
                : a.status === "warning" ? "text-amber-500" 
                : a.status === "error"  ? "text-rose-500" : "text-rose-500"
                
            return (
              <div key={a.id} className="flex items-start gap-3 p-4">
                <Icon className={`h-5 w-5 ${color}`} />
                <div className="flex-1">
                  <div className="text-sm">{a.description}</div>
                  <div className="mt-1 flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <ClockIcon className="h-4 w-4" />
                    <span>{new Date(a.timestamp).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Monthly Performance */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold">Monthly Performance</h2>
        <div className="mt-3 rounded-lg border border-black/10 dark:border-white/10 p-5 bg-white dark:bg-neutral-900">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Latest month</div>
              <div className="text-xl font-semibold">
                ฿{data.monthlyPerformance.revenue.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="mt-4 h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data.monthlyPerformance.series}
                margin={{ top: 8, right: 8, left: 8, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="barFill" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor={isDark ? "#8B5CF6" : "#6366F1"}
                      stopOpacity={0.95}
                    />
                    <stop
                      offset="100%"
                      stopColor={isDark ? "#6366F1" : "#818CF8"}
                      stopOpacity={0.85}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={"rgba(0,0,0,0.10)"} />
                <XAxis
                  dataKey="month"
                  tickFormatter={(m: string) => m.slice(5)}
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                  axisLine={{ stroke: "rgba(0,0,0,0.10)" }}
                  tickLine={{ stroke: "rgba(0,0,0,0.10)" }}
                />
                <YAxis
                  tickFormatter={(v: number) => v.toLocaleString()}
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                  axisLine={{ stroke: "rgba(0,0,0,0.10)" }}
                  tickLine={{ stroke: "rgba(0,0,0,0.10)" }}
                />
                <Tooltip
                  cursor={{ fill: "rgba(0,0,0,0.05" }}
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    border: `1px solid ${"rgba(0,0,0,0.12)"}`,
                    borderRadius: 8,
                    color: "#111827",
                    boxShadow: "0 10px 20px rgba(0,0,0,.15)",
                  }}
                  itemStyle={{ color: "#111827" }}
                  labelStyle={{ color: "#111827", fontWeight: 600 }}
                  formatter={(v: number) => [`฿${v.toLocaleString()}`, "Revenue"]}
                  labelFormatter={(m: string) => m}
                />
                <Bar
                  dataKey="revenue"
                  fill="url(#barFill)"
                  radius={[8, 8, 0, 0]}
                  barSize={28}
                  animationDuration={600}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
