import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Create a comment
export const createComment = mutation({
  args: {
    scamId: v.id("scams"),
    userId: v.id("users"),
    content: v.string(),
    parentId: v.optional(v.id("comments")),
  },
  handler: async (ctx, args) => {
    const commentId = await ctx.db.insert("comments", {
      scamId: args.scamId,
      userId: args.userId,
      content: args.content,
      parentId: args.parentId,
      upvotes: 0,
      downvotes: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return commentId;
  },
});

// Get comments for a scam
export const getCommentsByScam = query({
  args: { scamId: v.id("scams") },
  handler: async (ctx, args) => {
    const comments = await ctx.db
      .query("comments")
      .withIndex("by_scam", (q) => q.eq("scamId", args.scamId))
      .order("desc")
      .collect();

    return comments;
  },
});

// Get replies to a comment
export const getReplies = query({
  args: { commentId: v.id("comments") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("comments")
      .withIndex("by_parent", (q) => q.eq("parentId", args.commentId))
      .order("desc")
      .collect();
  },
});

// Get comments by user
export const getCommentsByUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("comments")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();
  },
});
