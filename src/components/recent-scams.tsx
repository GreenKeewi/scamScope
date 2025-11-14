"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ArrowUp, ArrowDown, MessageSquare } from "lucide-react";

export function RecentScams() {
  const scams = useQuery(api.scams.getScams, { limit: 10 });

  if (!scams) {
    return (
      <div className="py-12">
        <h2 className="text-3xl font-bold mb-6">Recent Scam Reports</h2>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-6 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2 mt-2"></div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (scams.length === 0) {
    return (
      <div className="py-12">
        <h2 className="text-3xl font-bold mb-6">Recent Scam Reports</h2>
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No scam reports yet. Be the first to contribute!</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold mb-6">Recent Scam Reports</h2>
      <div className="space-y-4">
        {scams.map((scam) => (
          <Link key={scam._id} href={`/scam/${scam._id}`}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{scam.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {scam.description}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground ml-4">
                    <span className="flex items-center gap-1">
                      <ArrowUp className="w-4 h-4" />
                      {scam.upvotes}
                    </span>
                    <span className="flex items-center gap-1">
                      <ArrowDown className="w-4 h-4" />
                      {scam.downvotes}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {scam.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {formatDistanceToNow(scam.createdAt, { addSuffix: true })}
                </p>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
