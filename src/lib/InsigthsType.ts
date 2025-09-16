export interface Product {
  name: string;
  value: number;
  lastMonth?: number;
  growthPct?: number;
  sku: string,
  category: string,
  units: number,
  priceAvg: number,
  channelSplit: { web: string, mobile: string, retail: string },
}

export interface Drop {
  week: number;
  churnRate: number;
  cohortSize?: number;
  notes?: string;
  drivers?: string[];
}

export interface Region {
  region: string;
  value: number;
  changePct?: number;
  yoyPct?: number;
  target?: number;
  attainmentPct?: number;
}

export interface Step {
  label: string;
  value: number;
  rateFromPrev?: number;
  overallCR?: number;
}

export interface InsightsPayload {
  topSellingProducts: {
    products: Product[];
    percentDiff: number;
    winner?: string;
    notes?: string;
  };
  customerDropOff: Drop[];
  regionalPerformance: Region[];
  conversionFunnel: Step[];
  changeNotes?: {
    regionsMoM?: number;
    churnMoM?: number;
  };
  benchmarks?: {
    typicalViewRate?: number;
    typicalAddToCart?: number;
    typicalCheckoutRate?: number;
  };
  meta?: {
    currency?: string;
    timeRange?: {
      start: string;
      end: string;
    };
    lastUpdated: "2025-09-10T09:00:00Z",
  };
}