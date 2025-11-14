"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";

export default function SubmitScamPage() {
  const { user } = useUser();
  const router = useRouter();
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [currentCategory, setCurrentCategory] = useState("");
  const [redFlags, setRedFlags] = useState<string[]>([]);
  const [currentRedFlag, setCurrentRedFlag] = useState("");
  const [timeline, setTimeline] = useState("");
  const [externalLinks, setExternalLinks] = useState<string[]>([]);
  const [currentLink, setCurrentLink] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              You must be signed in to submit a scam report.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const addCategory = () => {
    if (currentCategory.trim() && !categories.includes(currentCategory.trim())) {
      setCategories([...categories, currentCategory.trim()]);
      setCurrentCategory("");
    }
  };

  const removeCategory = (category: string) => {
    setCategories(categories.filter(c => c !== category));
  };

  const addRedFlag = () => {
    if (currentRedFlag.trim()) {
      setRedFlags([...redFlags, currentRedFlag.trim()]);
      setCurrentRedFlag("");
    }
  };

  const removeRedFlag = (index: number) => {
    setRedFlags(redFlags.filter((_, i) => i !== index));
  };

  const addLink = () => {
    if (currentLink.trim()) {
      setExternalLinks([...externalLinks, currentLink.trim()]);
      setCurrentLink("");
    }
  };

  const removeLink = (index: number) => {
    setExternalLinks(externalLinks.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In real app: submit to Convex
      // For now, just simulate
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to home or scam detail page
      router.push("/");
    } catch (error) {
      console.error("Error submitting scam:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Submit a Scam Report</CardTitle>
          <CardDescription>
            Help others by sharing your experience with a scam. Your report will be reviewed before publication.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder="Brief title describing the scam"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Detailed description of the scam, including how it works and your experience..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={8}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <div className="flex gap-2">
                <Input
                  id="tags"
                  placeholder="Add a tag"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                />
                <Button type="button" onClick={addTag} variant="outline">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full flex items-center gap-2"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="categories">Categories</Label>
              <div className="flex gap-2">
                <Input
                  id="categories"
                  placeholder="Add a category"
                  value={currentCategory}
                  onChange={(e) => setCurrentCategory(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addCategory();
                    }
                  }}
                />
                <Button type="button" onClick={addCategory} variant="outline">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {categories.map((category) => (
                    <span
                      key={category}
                      className="px-3 py-1 bg-secondary/20 text-secondary-foreground text-sm rounded flex items-center gap-2"
                    >
                      {category}
                      <button
                        type="button"
                        onClick={() => removeCategory(category)}
                        className="hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="redFlags">Red Flags</Label>
              <div className="flex gap-2">
                <Input
                  id="redFlags"
                  placeholder="Add a red flag"
                  value={currentRedFlag}
                  onChange={(e) => setCurrentRedFlag(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addRedFlag();
                    }
                  }}
                />
                <Button type="button" onClick={addRedFlag} variant="outline">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {redFlags.length > 0 && (
                <ul className="list-disc list-inside space-y-1 mt-2">
                  {redFlags.map((flag, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="flex-1">{flag}</span>
                      <button
                        type="button"
                        onClick={() => removeRedFlag(index)}
                        className="hover:text-destructive"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeline">Timeline (optional)</Label>
              <Textarea
                id="timeline"
                placeholder="Timeline of events related to this scam..."
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="links">External Links (optional)</Label>
              <div className="flex gap-2">
                <Input
                  id="links"
                  type="url"
                  placeholder="Add a link"
                  value={currentLink}
                  onChange={(e) => setCurrentLink(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addLink();
                    }
                  }}
                />
                <Button type="button" onClick={addLink} variant="outline">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {externalLinks.length > 0 && (
                <ul className="space-y-1 mt-2">
                  {externalLinks.map((link, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-sm text-primary hover:underline truncate"
                      >
                        {link}
                      </a>
                      <button
                        type="button"
                        onClick={() => removeLink(index)}
                        className="hover:text-destructive"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                disabled={isSubmitting || !title || !description}
                className="flex-1"
              >
                {isSubmitting ? "Submitting..." : "Submit Report"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
