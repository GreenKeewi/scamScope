import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Save a scam
export const saveScam = mutation({
  args: {
    userId: v.id("users"),
    scamId: v.id("scams"),
  },
  handler: async (ctx, args) => {
    // Check if already saved
    const existing = await ctx.db
      .query("savedScams")
      .withIndex("by_user_scam", (q) =>
        q.eq("userId", args.userId).eq("scamId", args.scamId)
      )
      .first();

    if (existing) {
      // Unsave
      await ctx.db.delete(existing._id);
      return false;
    } else {
      // Save
      await ctx.db.insert("savedScams", {
        userId: args.userId,
        scamId: args.scamId,
        createdAt: Date.now(),
      });
      return true;
    }
  },
});

// Get saved scams by user
export const getSavedScamsByUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const savedScams = await ctx.db
      .query("savedScams")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();

    // Get full scam data
    const scams = await Promise.all(
      savedScams.map(async (saved) => {
        return await ctx.db.get(saved.scamId);
      })
    );

    return scams.filter((scam) => scam !== null);
  },
});

// Check if scam is saved by user
export const isScamSaved = query({
  args: {
    userId: v.id("users"),
    scamId: v.id("scams"),
  },
  handler: async (ctx, args) => {
    const saved = await ctx.db
      .query("savedScams")
      .withIndex("by_user_scam", (q) =>
        q.eq("userId", args.userId).eq("scamId", args.scamId)
      )
      .first();

    return saved !== null;
  },
});
