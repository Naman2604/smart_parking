"use client";

import { useEffect, useState } from "react";
import { Camera, Circle, Maximize2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CCTVPanel() {
  const [isRecording, setIsRecording] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsRecording((prev) => !prev);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="border-border bg-card">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <Camera className="h-4 w-4 text-primary" />
          <CardTitle className="text-sm font-semibold text-foreground">
            Live CCTV Feed - Parking Lot A
          </CardTitle>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <Circle
              className={`h-2 w-2 fill-current ${
                isRecording ? "text-destructive" : "text-destructive/40"
              }`}
            />
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              REC
            </span>
          </div>

          <button
            type="button"
            className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Fullscreen"
          >
            <Maximize2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </CardHeader>

      <CardContent className="p-3 pt-0">
        <div className="relative aspect-video overflow-hidden rounded-lg bg-black">

          {/* 🎥 LIVE VIDEO STREAM FROM FLASK */}
          <img
            src="http://127.0.0.1:5000/video_feed"
            alt="Live CCTV Stream"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* overlay gradient for professional look */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {/* Camera overlay info */}
          <div className="absolute bottom-3 left-3 flex items-center gap-2">
            <span className="rounded bg-background/80 px-2 py-1 font-mono text-[10px] text-foreground backdrop-blur-sm">
              CAM-01 | AI ACTIVE | 1080p
            </span>
          </div>

          {/* status badge */}
          <div className="absolute right-3 top-3">
            <span className="rounded bg-primary/20 px-2 py-1 font-mono text-[10px] text-primary backdrop-blur-sm">
              LIVE DETECTION
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
