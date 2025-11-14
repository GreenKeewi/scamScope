"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";
import { ArrowUp, ArrowDown, Bookmark, AlertTriangle, ExternalLink, Calendar } from "lucide-react";
import { AdSlot } from "@/components/ad-slot";
import { CommentSection } from "@/components/comment-section";
import { useState } from "react";

export default function ScamDetailPage({ params }: { params: { id: string } }) {
  const { user } = useUser();
  const scam = useQuery(api.scams.getScam, { scamId: params.id as Id<"scams"> });
  const vote = useMutation(api.votes.vote);
  const saveScam = useMutation(api.savedScams.saveScam);
  
  const [userVote, setUserVote] = useState<number | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  if (!scam) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Card className="animate-pulse">
          <CardHeader>
            <div className="h-8 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2 mt-4"></div>
          </CardHeader>
          <CardContent>
            <div className="h-32 bg-muted rounded"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleVote = async (value: 1 | -1) => {
    if (!user) return;
    // In real app, get userId from Convex user table
    // For now, simplified
  };

  const handleSave = async () => {
    if (!user) return;
    // In real app, get userId from Convex user table
    setIsSaved(!isSaved);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-9">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-3xl mb-2">{scam.title}</CardTitle>
                  <CardDescription>
                    Posted {formatDistanceToNow(scam.createdAt, { addSuffix: true })}
                  </CardDescription>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Button
                    variant={userVote === 1 ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleVote(1)}
                  >
                    <ArrowUp className="w-4 h-4" />
                  </Button>
                  <span className="font-semibold">
                    {scam.upvotes - scam.downvotes}
                  </span>
                  <Button
                    variant={userVote === -1 ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleVote(-1)}
                  >
                    <ArrowDown className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {scam.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSave}
                >
                  <Bookmark className={`w-4 h-4 mr-2 ${isSaved ? 'fill-current' : ''}`} />
                  {isSaved ? 'Saved' : 'Save'}
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Description</h3>
                <p className="text-muted-foreground whitespace-pre-wrap">
                  {scam.description}
                </p>
              </div>

              {scam.aiSummary && (
                <>
                  <Separator />
                  <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <span>AI Summary</span>
                      <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded">
                        AI Generated
                      </span>
                    </h3>
                    <p className="text-muted-foreground">{scam.aiSummary}</p>
                  </div>
                </>
              )}

              {scam.redFlags.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-destructive" />
                      Red Flags
                    </h3>
                    <ul className="list-disc list-inside space-y-2">
                      {scam.redFlags.map((flag, index) => (
                        <li key={index} className="text-muted-foreground">
                          {flag}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}

              {scam.timeline && (
                <>
                  <Separator />
                  <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Timeline
                    </h3>
                    <p className="text-muted-foreground whitespace-pre-wrap">
                      {scam.timeline}
                    </p>
                  </div>
                </>
              )}

              {scam.externalLinks && scam.externalLinks.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <h3 className="text-xl font-semibold mb-3">External Links</h3>
                    <div className="space-y-2">
                      {scam.externalLinks.map((link, index) => (
                        <a
                          key={index}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-primary hover:underline"
                        >
                          <ExternalLink className="w-4 h-4" />
                          {link}
                        </a>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <div className="mt-8">
            <AdSlot position="inline" />
          </div>

          <div className="mt-8">
            <CommentSection scamId={params.id as Id<"scams">} />
          </div>
        </div>

        <aside className="lg:col-span-3 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {scam.categories.map((category) => (
                  <span
                    key={category}
                    className="px-2 py-1 bg-secondary/20 text-secondary-foreground text-xs rounded"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          <AdSlot position="sidebar-top" />
          <AdSlot position="sidebar-middle" />
        </aside>
      </div>
    </div>
  );
}
