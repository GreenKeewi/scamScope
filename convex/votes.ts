import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Vote on a scam or comment
export const vote = mutation({
  args: {
    userId: v.id("users"),
    targetId: v.string(),
    targetType: v.union(v.literal("scam"), v.literal("comment")),
    value: v.union(v.literal(1), v.literal(-1)),
  },
  handler: async (ctx, args) => {
    // Check if user already voted
    const existingVote = await ctx.db
      .query("votes")
      .withIndex("by_user_target", (q) =>
        q.eq("userId", args.userId).eq("targetId", args.targetId)
      )
      .first();

    if (existingVote) {
      // Update existing vote
      if (existingVote.value === args.value) {
        // Remove vote if clicking same button
        await ctx.db.delete(existingVote._id);
        await updateVoteCount(ctx, args.targetId, args.targetType, args.value, -1);
      } else {
        // Change vote
        await ctx.db.patch(existingVote._id, { value: args.value });
        await updateVoteCount(ctx, args.targetId, args.targetType, (-existingVote.value) as 1 | -1, 1);
        await updateVoteCount(ctx, args.targetId, args.targetType, args.value, 1);
      }
    } else {
      // Create new vote
      await ctx.db.insert("votes", {
        userId: args.userId,
        targetId: args.targetId,
        targetType: args.targetType,
        value: args.value,
        createdAt: Date.now(),
      });
      await updateVoteCount(ctx, args.targetId, args.targetType, args.value, 1);
    }
  },
});

// Helper function to update vote counts
async function updateVoteCount(
  ctx: any,
  targetId: string,
  targetType: "scam" | "comment",
  value: 1 | -1,
  delta: number
) {
  if (targetType === "scam") {
    const scam = await ctx.db.get(targetId);
    if (scam) {
      const updates: any = {};
      if (value === 1) {
        updates.upvotes = scam.upvotes + delta;
      } else {
        updates.downvotes = scam.downvotes + delta;
      }
      await ctx.db.patch(targetId, updates);
    }
  } else {
    const comment = await ctx.db.get(targetId);
    if (comment) {
      const updates: any = {};
      if (value === 1) {
        updates.upvotes = comment.upvotes + delta;
      } else {
        updates.downvotes = comment.downvotes + delta;
      }
      await ctx.db.patch(targetId, updates);
    }
  }
}

// Get user's vote for a target
export const getUserVote = query({
  args: {
    userId: v.id("users"),
    targetId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("votes")
      .withIndex("by_user_target", (q) =>
        q.eq("userId", args.userId).eq("targetId", args.targetId)
      )
      .first();
  },
});
