# Albaly Frontend Developer Coding Challenge

A responsive **Business Insights Dashboard** built with **Next.js, TypeScript, and Tailwind CSS**.  
This project was developed as part of the Albaly Frontend Developer coding assessment.

---

## Project Description
The application is a two-page dashboard consisting of **Overview** and **Insights** with a reusable layout.  
Data is mocked via local API endpoints under `/api/`.

### Pages
- **Layout**
  - Sidebar navigation (Overview, Insights) + Logout button (static)
  - Top navigation bar with app title and user avatar
  - Fully responsive (mobile, tablet, desktop)

- **Overview**
  - KPI summary cards: Total Sales, Active Customers, Inventory Status
  - Recent activity feed (3 items: status, description, timestamp)
  - Monthly performance section (revenue + % change)

- **Insights**
  - Top-selling products comparison with bar indicators
  - Customer drop-off insights (4-week breakdown)
  - Regional performance (North America, Europe, APAC)
  - Conversion funnel: Visitors → Product Views → Add to Cart → Purchase

---

## Assumptions
- Data is mocked using static JSON via `/api/` routes.  
- No external backend integration.  
- KPI and insights values are simulated, not real business data.  
- Recharts (or similar) is used for simple charting and visual indicators.  

---

## Setup Instructions
- npm install
- npm run dev

---

### Clone Repository & Demo
- git clone https://github.com/Nattachai998/albaly-frontend-assignment.git
- Demo : https://albaly-frontend-assignment.vercel.app/overview
