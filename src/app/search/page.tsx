"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Search, ArrowUp, ArrowDown } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { AdSlot } from "@/components/ad-slot";

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const [searchTerm, setSearchTerm] = useState(searchParams.q || "");
  const [currentSearch, setCurrentSearch] = useState(searchParams.q || "");
  
  const results = useQuery(
    api.scams.searchScams,
    currentSearch ? { searchTerm: currentSearch } : "skip"
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentSearch(searchTerm);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-9">
          <h1 className="text-4xl font-bold mb-6">Search Scams</h1>
          
          <form onSubmit={handleSearch} className="mb-8">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Search for scams..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="text-lg h-12"
              />
              <Button type="submit" size="lg">
                <Search className="w-5 h-5 mr-2" />
                Search
              </Button>
            </div>
          </form>

          {currentSearch && (
            <div className="mb-4">
              <p className="text-muted-foreground">
                Search results for: <span className="font-semibold">{currentSearch}</span>
              </p>
            </div>
          )}

          {results === undefined && currentSearch && (
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
          )}

          {results && results.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">
                  No results found. Try a different search term.
                </p>
              </CardContent>
            </Card>
          )}

          {results && results.length > 0 && (
            <div className="space-y-4">
              {results.map((scam) => (
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
          )}
        </div>

        <aside className="lg:col-span-3 space-y-4">
          <AdSlot position="sidebar-top" />
          <AdSlot position="sidebar-middle" />
        </aside>
      </div>
    </div>
  );
}
