"use client";

import React from "react";
import { useEffect, useState } from "react";
import { Car, CircleParking, LayoutGrid, Percent } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  suffix?: string;
  color: string;
  delay: number;
}

function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1200;
    const steps = 40;
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(current + increment, target);
      setCount(step >= steps ? target : Math.round(current * 10) / 10);

      if (step >= steps) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <span className="animate-count-up font-mono text-3xl font-bold tracking-tight">
      {typeof count === "number" && count % 1 !== 0 ? count.toFixed(1) : count}
      {suffix}
    </span>
  );
}

function StatCard({ icon, label, value, suffix, color, delay }: StatCardProps) {
  return (
    <Card
      className="group relative overflow-hidden border-border bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardContent className="flex items-center gap-4 p-5">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
          style={{ backgroundColor: `${color}15` }}
        >
          <div style={{ color }}>{icon}</div>
        </div>

        <div className="flex flex-col gap-0.5">
          <AnimatedNumber target={value} suffix={suffix} />
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {label}
          </span>
        </div>
      </CardContent>

      <div
        className="absolute bottom-0 left-0 h-0.5 w-full opacity-60 transition-opacity group-hover:opacity-100"
        style={{ backgroundColor: color }}
      />
    </Card>
  );
}

export function AnalyticsCards() {
  const [statsData, setStatsData] = useState<any>(null);

  useEffect(() => {
    const fetchStats = () => {
      fetch("http://127.0.0.1:5000/api/stats")
        .then((res) => res.json())
        .then((data) => setStatsData(data))
        .catch((err) => console.error("API error:", err));
    };

    fetchStats(); // initial load
    const interval = setInterval(fetchStats, 1000); // live update every second

    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      icon: <LayoutGrid className="h-5 w-5" />,
      label: "Total Slots",
      value: statsData?.total || 0,
      color: "hsl(199, 89%, 48%)",
      delay: 0,
    },
    {
      icon: <Car className="h-5 w-5" />,
      label: "Occupied",
      value: statsData?.occupied || 0,
      color: "hsl(0, 72%, 51%)",
      delay: 100,
    },
    {
      icon: <CircleParking className="h-5 w-5" />,
      label: "Available",
      value: statsData?.available || 0,
      color: "hsl(152, 70%, 50%)",
      delay: 200,
    },
    {
      icon: <Percent className="h-5 w-5" />,
      label: "Occupancy",
      value: statsData?.occupancy_rate || 0, // change to occupancy if your Flask uses that key
      suffix: "%",
      color: "hsl(38, 92%, 50%)",
      delay: 300,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}
