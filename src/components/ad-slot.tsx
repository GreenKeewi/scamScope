"use client";

import { Card, CardContent } from "@/components/ui/card";

interface AdSlotProps {
  position: "sidebar-top" | "sidebar-middle" | "footer" | "inline";
}

export function AdSlot({ position }: AdSlotProps) {
  const dimensions = {
    "sidebar-top": "w-full h-[250px]",
    "sidebar-middle": "w-full h-[250px]",
    "footer": "w-full h-[100px]",
    "inline": "w-full h-[90px]",
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className={`p-0 ${dimensions[position]} flex items-center justify-center bg-muted/50`}>
        <div className="text-center text-sm text-muted-foreground">
          <p>Advertisement</p>
          <p className="text-xs mt-1">Ad Space: {position}</p>
        </div>
      </CardContent>
    </Card>
  );
}
