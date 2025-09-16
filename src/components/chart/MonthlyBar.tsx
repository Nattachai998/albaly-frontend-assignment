"use client";

import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
} from "recharts";

type Point = { month: string; revenue: number };

export default function MonthlyBar({ data }: { data: Point[] }) {
  return (
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" tickFormatter={(m) => m.slice(5)} />
          <YAxis tickFormatter={(v) => Number(v).toLocaleString()} />
          <Tooltip
            formatter={(v) => [`฿${Number(v).toLocaleString()}`, "Revenue"]}
            labelFormatter={(m) => m}
          />
          <Bar dataKey="revenue" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
