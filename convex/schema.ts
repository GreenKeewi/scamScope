import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    username: v.string(),
    imageUrl: v.optional(v.string()),
    bio: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_clerk_id", ["clerkId"]),

  scams: defineTable({
    title: v.string(),
    description: v.string(),
    aiSummary: v.optional(v.string()),
    tags: v.array(v.string()),
    categories: v.array(v.string()),
    redFlags: v.array(v.string()),
    screenshotUrls: v.optional(v.array(v.string())),
    externalLinks: v.optional(v.array(v.string())),
    timeline: v.optional(v.string()),
    sources: v.optional(v.array(v.string())),
    submittedBy: v.id("users"),
    aiFlags: v.optional(v.array(v.string())),
    similarityScores: v.optional(v.array(v.object({
      scamId: v.id("scams"),
      score: v.number(),
    }))),
    status: v.union(v.literal("pending"), v.literal("approved"), v.literal("rejected")),
    upvotes: v.number(),
    downvotes: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_status", ["status"])
    .index("by_submitter", ["submittedBy"])
    .searchIndex("search_title", {
      searchField: "title",
      filterFields: ["status"],
    }),

  comments: defineTable({
    scamId: v.id("scams"),
    userId: v.id("users"),
    content: v.string(),
    parentId: v.optional(v.id("comments")),
    upvotes: v.number(),
    downvotes: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_scam", ["scamId"])
    .index("by_parent", ["parentId"])
    .index("by_user", ["userId"]),

  votes: defineTable({
    userId: v.id("users"),
    targetId: v.string(), // Can be scamId or commentId
    targetType: v.union(v.literal("scam"), v.literal("comment")),
    value: v.union(v.literal(1), v.literal(-1)), // 1 for upvote, -1 for downvote
    createdAt: v.number(),
  })
    .index("by_user_target", ["userId", "targetId"])
    .index("by_target", ["targetId"]),

  savedScams: defineTable({
    userId: v.id("users"),
    scamId: v.id("scams"),
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_user_scam", ["userId", "scamId"]),
});
