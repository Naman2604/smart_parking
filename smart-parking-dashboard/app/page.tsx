"use client"

import { DashboardHeader } from "@/components/dashboard/header";
import { AnalyticsCards } from "@/components/dashboard/analytics-cards";
import { CCTVPanel } from "@/components/dashboard/cctv-panel";
import { ParkingGrid } from "@/components/dashboard/parking-grid";
import { AIInsights } from "@/components/dashboard/ai-insights";
import { ChartsSection } from "@/components/dashboard/charts-section";
import { FooterControls } from "@/components/dashboard/footer-controls";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <DashboardHeader />

      <main className="flex flex-1 flex-col gap-6 p-4 lg:p-6">
        <section aria-label="Parking statistics">
          <AnalyticsCards />
        </section>

        <section
          aria-label="Live monitoring"
          className="grid grid-cols-1 gap-4 xl:grid-cols-2"
        >
          <CCTVPanel />
          <ParkingGrid />
        </section>

        <section aria-label="AI insights and predictions">
          <AIInsights />
        </section>

        <section aria-label="Analytics charts">
          <ChartsSection />
        </section>
      </main>

      <FooterControls />
    </div>
  );
}
