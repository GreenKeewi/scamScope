import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Create a new scam report
export const createScam = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    tags: v.array(v.string()),
    categories: v.array(v.string()),
    redFlags: v.array(v.string()),
    screenshotUrls: v.optional(v.array(v.string())),
    externalLinks: v.optional(v.array(v.string())),
    timeline: v.optional(v.string()),
    sources: v.optional(v.array(v.string())),
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const scamId = await ctx.db.insert("scams", {
      title: args.title,
      description: args.description,
      tags: args.tags,
      categories: args.categories,
      redFlags: args.redFlags,
      screenshotUrls: args.screenshotUrls,
      externalLinks: args.externalLinks,
      timeline: args.timeline,
      sources: args.sources,
      submittedBy: args.userId,
      status: "pending",
      upvotes: 0,
      downvotes: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return scamId;
  },
});

// Get all approved scams
export const getScams = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 50;
    const scams = await ctx.db
      .query("scams")
      .withIndex("by_status", (q) => q.eq("status", "approved"))
      .order("desc")
      .take(limit);

    return scams;
  },
});

// Get a single scam by ID
export const getScam = query({
  args: { scamId: v.id("scams") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.scamId);
  },
});

// Search scams
export const searchScams = query({
  args: {
    searchTerm: v.string(),
  },
  handler: async (ctx, args) => {
    const results = await ctx.db
      .query("scams")
      .withSearchIndex("search_title", (q) =>
        q.search("title", args.searchTerm).eq("status", "approved")
      )
      .take(20);

    return results;
  },
});

// Update scam status (for moderation)
export const updateScamStatus = mutation({
  args: {
    scamId: v.id("scams"),
    status: v.union(v.literal("pending"), v.literal("approved"), v.literal("rejected")),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.scamId, {
      status: args.status,
      updatedAt: Date.now(),
    });
  },
});

// Get scams by user
export const getScamsByUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("scams")
      .withIndex("by_submitter", (q) => q.eq("submittedBy", args.userId))
      .order("desc")
      .collect();
  },
});

// Update AI summary
export const updateAISummary = mutation({
  args: {
    scamId: v.id("scams"),
    aiSummary: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.scamId, {
      aiSummary: args.aiSummary,
      updatedAt: Date.now(),
    });
  },
});
