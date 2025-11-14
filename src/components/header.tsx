"use client";

import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Search } from "lucide-react";

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            ScamScope
          </Link>
          
          <nav className="flex items-center gap-4">
            <Link href="/search">
              <Button variant="ghost" size="sm">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </Link>
            <SignedIn>
              <Link href="/submit">
                <Button variant="default" size="sm">
                  Submit Scam
                </Button>
              </Link>
              <Link href="/profile">
                <Button variant="ghost" size="sm">
                  Profile
                </Button>
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="default" size="sm">
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
