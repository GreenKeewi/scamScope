"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export function SearchHero() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="text-center py-16 px-4">
      <h1 className="text-5xl font-bold mb-4">
        Protect Yourself from Scams
      </h1>
      <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
        Search our community-driven database of scam reports, view AI-generated summaries, 
        and contribute your own experiences to help others stay safe.
      </p>
      <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
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
    </div>
  );
}
