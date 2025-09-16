export type Trend = "up" | "down";
export type Status = "success" | "warning" | "error";
export interface Kpi {
  id: string;
  label: string;
  value: number;
  unit?: "THB" | "%";
  changePct: number;
  icon: "banknotes" | "users" | "archive";
}

export interface Activity {
  id: string;
  status: Status;
  description: string;
  timestamp: string;
}

export interface MonthlyPoint { month: string; revenue: number; }

export interface MonthlyPerformance {
  month: string;
  revenue: number;
  changePct: number;
  series: MonthlyPoint[];
}

export interface OverviewPayload {
  kpis: Kpi[];
  recentActivity: Activity[];
  monthlyPerformance: MonthlyPerformance;
}