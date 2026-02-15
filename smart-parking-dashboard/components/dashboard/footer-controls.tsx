"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { Moon, RefreshCw, Sun, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FooterControls() {
  const { theme, setTheme } = useTheme();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  return (
    <footer className="flex flex-col items-center justify-between gap-4 border-t border-border bg-card px-6 py-4 sm:flex-row">
      <div className="flex items-center gap-2">
        <Shield className="h-3.5 w-3.5 text-primary" />
        <span className="text-xs text-muted-foreground">
          System Health:
        </span>
        <span className="flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          <span className="text-[10px] font-semibold text-primary">
            All Systems Operational
          </span>
        </span>
        <span className="ml-2 font-mono text-[10px] text-muted-foreground">
          v2.4.1
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="h-8 gap-1.5 border-border bg-secondary text-xs text-foreground hover:bg-muted"
        >
          <RefreshCw
            className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin" : ""}`}
          />
          {isRefreshing ? "Refreshing..." : "Refresh Data"}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="h-8 w-8 border-border bg-secondary p-0 text-foreground hover:bg-muted"
          aria-label="Toggle theme"
        >
          <Sun className="h-3.5 w-3.5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-3.5 w-3.5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </div>
    </footer>
  );
}
