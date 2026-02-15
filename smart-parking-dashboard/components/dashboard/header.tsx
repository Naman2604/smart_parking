"use client";

import { useEffect, useState } from "react";
import { Activity, Camera, Wifi } from "lucide-react";

export function DashboardHeader() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="flex flex-col gap-4 border-b border-border bg-card px-6 py-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Activity className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-foreground lg:text-xl">
              Smart Parking Control Center
            </h1>
            <p className="text-xs text-muted-foreground">
              Real-time monitoring & analytics
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 lg:gap-6">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
          </span>
          <span className="text-xs font-medium text-primary">
            System Active
          </span>
        </div>

        <div className="flex items-center gap-2 rounded-md bg-secondary px-3 py-1.5">
          <Camera className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground">4</span>/4 Cameras
            Online
          </span>
        </div>

        <div className="flex items-center gap-2 rounded-md bg-secondary px-3 py-1.5">
          <Wifi className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs text-muted-foreground">Connected</span>
        </div>

        <div className="font-mono text-xs text-muted-foreground">
          <span className="text-foreground">
            {currentTime.toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span className="mx-2 text-border">|</span>
          <span className="tabular-nums text-foreground">
            {currentTime.toLocaleTimeString("en-US", { hour12: false })}
          </span>
        </div>
      </div>
    </header>
  );
}
