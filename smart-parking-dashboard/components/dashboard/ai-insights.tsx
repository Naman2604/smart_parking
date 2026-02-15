"use client";

import {
  AlertTriangle,
  Brain,
  Clock,
  Info,
  TrendingUp,
  Gauge,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { aiInsights } from "@/lib/mock-data";

export function AIInsights() {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Brain className="h-4 w-4 text-accent" />
          <CardTitle className="text-sm font-semibold text-foreground">
            AI Insights & Predictions
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 p-4 pt-0">
        {/* Insight Metrics */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="flex items-start gap-3 rounded-lg border border-border bg-background/50 p-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-chart-3/15">
              <Clock className="h-4 w-4 text-chart-3" />
            </div>
            <div>
              <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Peak Time
              </p>
              <p className="mt-0.5 font-mono text-sm font-semibold text-foreground">
                {aiInsights.peakTime}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-lg border border-border bg-background/50 p-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/15">
              <Gauge className="h-4 w-4 text-accent" />
            </div>
            <div>
              <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Avg Occupancy
              </p>
              <p className="mt-0.5 font-mono text-sm font-semibold text-foreground">
                {aiInsights.averageOccupancy}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-lg border border-border bg-background/50 p-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/15">
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Demand Trend
              </p>
              <p className="mt-0.5 font-mono text-sm font-semibold text-primary">
                {aiInsights.demandTrend}
              </p>
            </div>
          </div>
        </div>

        {/* Alerts */}
        <div className="flex flex-col gap-2">
          <h4 className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            Active Alerts
          </h4>
          {aiInsights.alerts.map((alert, i) => (
            <div
              key={i}
              className={`flex items-start gap-2.5 rounded-lg border p-3 ${
                alert.type === "warning"
                  ? "border-chart-3/20 bg-chart-3/5"
                  : "border-accent/20 bg-accent/5"
              }`}
            >
              {alert.type === "warning" ? (
                <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-chart-3" />
              ) : (
                <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
              )}
              <p className="text-xs leading-relaxed text-foreground/80">
                {alert.message}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
