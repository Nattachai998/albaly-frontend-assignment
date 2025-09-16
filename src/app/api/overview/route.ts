import { NextResponse } from "next/server";

export async function GET() {
  const data = {
    kpis: [
      {
        id: "totalSales",
        label: "Total Sales",
        value: 1284500,
        unit: "THB",
        changePct: 12.8,
        trend: "up",
        icon: "banknotes"
      },
      {
        id: "activeCustomers",
        label: "Active Customers",
        value: 12430,
        changePct: 4.1,
        trend: "up",
        icon: "users"
      },
      {
        id: "inventoryStatus",
        label: "Inventory Status",
        value: 92,         
        unit: "%",
        changePct: -1.2,  
        trend: "down",
        icon: "archive"
      }
    ],
    recentActivity: [
      {
        id: "act-3",
        status: "success",
        description: "Restocked 24 low-stock SKUs",
        timestamp: "2025-09-10T11:45:00+07:00"
      },
      {
        id: "act-2",
        status: "warning",
        description: "Processed 12 refunds",
        timestamp: "2025-09-10T09:10:00+07:00"
      },
      {
        id: "act-1",
        status: "success",
        description: "Shipped 1,247 orders",
        timestamp: "2025-09-09T18:20:00+07:00"
      }
    ],
    monthlyPerformance: {
      month: "2025-08",
      revenue: 1284500,
      changePct: 12.8,
      series: [
        { month: "2025-01", revenue: 820000 },
        { month: "2025-02", revenue: 845000 },
        { month: "2025-03", revenue: 910000 },
        { month: "2025-04", revenue: 980000 },
        { month: "2025-05", revenue: 1050000 },
        { month: "2025-06", revenue: 1015000 },
        { month: "2025-07", revenue: 1139000 },
        { month: "2025-08", revenue: 1284500 }
      ]
    },
    lastUpdated: "2025-09-10T12:00:00+07:00"
  };

  return NextResponse.json(data);
}
