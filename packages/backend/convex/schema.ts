import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  notes: defineTable({
    userId: v.string(),
    audioFileId: v.string(),
    audioFileUrl: v.string(),
    title: v.optional(v.string()),
    summary: v.optional(v.string()),
    transcription: v.optional(v.string()),
  }).index("by_userId", ["userId"]),
  users: defineTable({
    // this is UserJSON from @clerk/backend
    clerkUser: v.any(),
  }).index("by_clerk_id", ["clerkUser.id"]),
  actionItems: defineTable({
    noteId: v.id("notes"),
    userId: v.string(),
    title: v.string(),
    description: v.optional(v.string()),
    column: v.string(),
    status: v.string(),
    priority: v.string(),
    tags: v.optional(v.array(v.string())),
    dueDate: v.optional(v.string()),
    completedAt: v.optional(v.string()),
  })
    .index("by_noteId", ["noteId"])
    .index("by_userId", ["userId"]),
});
