"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { hourlyUsage, slotUtilization } from "@/lib/mock-data";
import { BarChart3, PieChart, TrendingUp } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const doughnutData = [
  { name: "Occupied", value: 167, color: "hsl(0, 72%, 51%)" },
  { name: "Available", value: 73, color: "hsl(152, 70%, 50%)" },
];

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; name: string; color: string }>;
  label?: string;
}) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-xl">
        {label && (
          <p className="mb-1 font-mono text-[10px] text-muted-foreground">
            {label}
          </p>
        )}
        {payload.map((entry, i) => (
          <p key={i} className="text-xs font-medium" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
}

function OccupancyDoughnut() {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <PieChart className="h-4 w-4 text-accent" />
          <CardTitle className="text-sm font-semibold text-foreground">
            Occupancy Distribution
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center p-4 pt-0">
        <div className="h-52 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              <Pie
                data={doughnutData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
                strokeWidth={0}
              >
                {doughnutData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                content={<CustomTooltip />}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value: string) => (
                  <span className="text-xs text-muted-foreground">{value}</span>
                )}
              />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-1 text-center">
          <p className="font-mono text-2xl font-bold text-foreground">69.6%</p>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
            Current Occupancy
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function UsageLineChart() {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" />
          <CardTitle className="text-sm font-semibold text-foreground">
            Parking Usage Over Time
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={hourlyUsage}>
              <defs>
                <linearGradient id="occupiedGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(0, 72%, 51%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(0, 72%, 51%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="availableGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(152, 70%, 50%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(152, 70%, 50%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 18%)" />
              <XAxis
                dataKey="hour"
                tick={{ fontSize: 10, fill: "hsl(215, 12%, 55%)" }}
                axisLine={{ stroke: "hsl(220, 14%, 18%)" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "hsl(215, 12%, 55%)" }}
                axisLine={{ stroke: "hsl(220, 14%, 18%)" }}
                tickLine={false}
              />
              <Tooltip
                content={<CustomTooltip />}
              />
              <Area
                type="monotone"
                dataKey="occupied"
                name="Occupied"
                stroke="hsl(0, 72%, 51%)"
                fill="url(#occupiedGrad)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="available"
                name="Available"
                stroke="hsl(152, 70%, 50%)"
                fill="url(#availableGrad)"
                strokeWidth={2}
              />
              <Legend
                verticalAlign="top"
                height={36}
                formatter={(value: string) => (
                  <span className="text-xs text-muted-foreground">{value}</span>
                )}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

function UtilizationBarChart() {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-chart-3" />
          <CardTitle className="text-sm font-semibold text-foreground">
            Zone Utilization
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={slotUtilization} barCategoryGap="20%">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 18%)" />
              <XAxis
                dataKey="zone"
                tick={{ fontSize: 10, fill: "hsl(215, 12%, 55%)" }}
                axisLine={{ stroke: "hsl(220, 14%, 18%)" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "hsl(215, 12%, 55%)" }}
                axisLine={{ stroke: "hsl(220, 14%, 18%)" }}
                tickLine={false}
                domain={[0, 100]}
              />
              <Tooltip
                content={<CustomTooltip />}
              />
              <Bar
                dataKey="utilization"
                name="Utilization %"
                radius={[4, 4, 0, 0]}
              >
                {slotUtilization.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.utilization > 80
                        ? "hsl(0, 72%, 51%)"
                        : entry.utilization > 60
                          ? "hsl(38, 92%, 50%)"
                          : "hsl(152, 70%, 50%)"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export function ChartsSection() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <OccupancyDoughnut />
      <UsageLineChart />
      <UtilizationBarChart />
    </div>
  );
}
