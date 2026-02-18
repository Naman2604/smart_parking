"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { parkingSlots, type ParkingSlot } from "@/lib/mock-data";
import { LayoutGrid } from "lucide-react";

function SlotCell({ slot }: { slot: ParkingSlot }) {
  const [isHovered, setIsHovered] = useState(false);

  const isOccupied = slot.status === "occupied";

  return (
    <button
      type="button"
      className={`relative flex h-10 items-center justify-center rounded-md border font-mono text-[10px] font-bold transition-all duration-200 ${
        isOccupied
          ? "border-destructive/30 bg-destructive/15 text-destructive hover:border-destructive/60 hover:bg-destructive/25"
          : "border-primary/30 bg-primary/10 text-primary hover:border-primary/60 hover:bg-primary/25"
      } ${isHovered ? "scale-110 shadow-lg z-10" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`Slot ${slot.id}: ${slot.status}`}
    >
      {slot.id}
      {isHovered && (
        <div className="absolute -top-8 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-md bg-popover px-2 py-1 text-[10px] text-popover-foreground shadow-lg">
          {isOccupied ? "Occupied" : "Available"}
        </div>
      )}
    </button>
  );
}

export function ParkingGrid() {
  const rows = ["A", "B", "C", "D", "E", "F"];

  return (
    <Card className="border-border bg-card">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <LayoutGrid className="h-4 w-4 text-accent" />
          <CardTitle className="text-sm font-semibold text-foreground">
            Parking Map - Real-time Grid
          </CardTitle>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-sm bg-primary/60" />
            <span className="text-[10px] text-muted-foreground">Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-sm bg-destructive/60" />
            <span className="text-[10px] text-muted-foreground">Occupied</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <div className="rounded-lg border border-border bg-background/50 p-4">
          <div className="flex flex-col gap-2">
            {rows.map((row) => (
              <div key={row} className="flex items-center gap-2">
                <span className="w-6 text-center font-mono text-xs font-bold text-muted-foreground">
                  {row}
                </span>
                <div className="grid flex-1 grid-cols-10 gap-1.5">
                  {parkingSlots
                    .filter((s) => s.row === row)
                    .map((slot) => (
                      <SlotCell key={slot.id} slot={slot} />
                    ))}
                </div>
              </div>
            ))}
          </div>
          {/* Row numbers at the bottom */}
          <div className="mt-2 flex items-center gap-2">
            <span className="w-6" />
            <div className="grid flex-1 grid-cols-10 gap-1.5">
              {Array.from({ length: 10 }, (_, i) => (
                <span
                  key={i}
                  className="text-center font-mono text-[10px] text-muted-foreground"
                >
                  {i + 1}
                </span>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
