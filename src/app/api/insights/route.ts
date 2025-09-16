// Rich mock API for Insights page (compatible with the simple UI)
import { NextResponse } from "next/server";

export async function GET() {
  const data = {
    meta: {
      currency: "USD",
      timeRange: { start: "2025-08-11", end: "2025-09-07" },
      lastUpdated: "2025-09-10T09:00:00Z",
    },

    // 1) Top-selling products (ยังคงมี products[] + percentDiff สำหรับหน้าเดิม)
    topSellingProducts: {
      products: [
        {
          name: "Product A",
          value: 45230,   
          lastMonth: 36800,
          growthPct: 22.9,    
          sku: "A-100",
          category: "Electronics",
          units: 1510,
          priceAvg: 29.95,
          channelSplit: { web: 0.62, mobile: 0.28, retail: 0.10 },
        },
        {
          name: "Product B",
          value: 32180,
          lastMonth: 33500,
          growthPct: -3.9,   
          sku: "B-200",
          category: "Electronics",
          units: 980,
          priceAvg: 32.85,
          channelSplit: { web: 0.51, mobile: 0.34, retail: 0.15 },
        },
      ],
      percentDiff: 23,   
      winner: "Product A",
    },

    // 2) Customer Drop-Off — เจาะ 4 สัปดาห์ พร้อมขนาด cohort และสาเหตุถ้ามี
    customerDropOff: [
      {
        week: 1,
        churnRate: 3,
        cohortSize: 300_000,
        funnel: { visitors: 300_000, productViews: 120_000, addToCart: 24_000, purchase: 14_200 },
        notes: "Normal range.",
      },
      {
        week: 2,
        churnRate: 5,
        cohortSize: 315_000,
        funnel: { visitors: 315_000, productViews: 126_000, addToCart: 25_200, purchase: 15_120 },
        notes: "Refund policy tweak increased hesitation.",
      },
      {
        week: 3,
        churnRate: 17, // spike
        cohortSize: 330_000,
        funnel: { visitors: 330_000, productViews: 132_000, addToCart: 26_400, purchase: 15_840 },
        drivers: ["Payment gateway outage (2h)", "Price A/B test +5%"],
        notes: "Spike due to external incident.",
      },
      {
        week: 4,
        churnRate: 8,
        cohortSize: 342_000,
        funnel: { visitors: 342_000, productViews: 136_800, addToCart: 27_360, purchase: 16_416 },
        notes: "Recovery after outage.",
      },
    ],

    // 3) Regional performance — ใส่ทั้ง value, การเปลี่ยนแปลง, เป้า และ YoY
    regionalPerformance: [
      { region: "North America", value: 482_000, changePct: 6.2, yoyPct: 12.1, target: 500_000, attainmentPct: 96.4 },
      { region: "Europe",        value: 391_000, changePct: 3.4, yoyPct: 5.5, target: 400_000, attainmentPct: 97.8 },
      { region: "APAC",          value: 612_000, changePct: 8.9, yoyPct: 18.2, target: 580_000, attainmentPct: 105.5 },
    ],

    // 4) Conversion funnel — เพิ่มอัตราเทียบ step ก่อนหน้า และ CR รวม
    conversionFunnel: [
      { label: "VISITORS",      value: 1_200_000, rateFromPrev: 40, overallCR: 0 },
      { label: "PRODUCT VIEWS", value: 480_000, rateFromPrev: 25, overallCR: 0 },
      { label: "ADD TO CART",   value: 96_000, rateFromPrev: 60, overallCR: 0 },
      { label: "PURCHASE",      value: 57_600, rateFromPrev: 4, overallCR: 48 },
    ],

    // Benchmarks/notes ช่วยตีความผลลัพธ์
    benchmarks: {
      typicalViewRate: 0.35,   
      typicalAddToCart: 0.18, 
      typicalCheckoutRate: 0.55, 
    },

    // summary สำหรับ badge ใน UI
    changeNotes: {
      regionsMoM: 8,
      churnMoM: 17, 
    },

    alerts: [
      { severity: "warning", message: "Churn spike detected on Week 3; investigate payment outage." },
      { severity: "info",    message: "APAC exceeded target by 5.5%." },
    ],
  };

  return NextResponse.json(data);
}
