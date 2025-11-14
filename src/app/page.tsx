import { SearchHero } from "@/components/search-hero";
import { HowItWorks } from "@/components/how-it-works";
import { AdSlot } from "@/components/ad-slot";
import { RecentScams } from "@/components/recent-scams";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-9">
          <SearchHero />
          <HowItWorks />
          <RecentScams />
        </div>
        <aside className="lg:col-span-3 space-y-4">
          <AdSlot position="sidebar-top" />
          <AdSlot position="sidebar-middle" />
        </aside>
      </div>
      <div className="mt-8">
        <AdSlot position="footer" />
      </div>
    </div>
  );
}
