import { ConvexError, v } from "convex/values";

import { mutateWithUser, queryWithUser } from "./utils";

const actionItemSchema = v.object({
  title: v.string(),
  description: v.string(),
  status: v.string(),
  priority: v.string(),
  column: v.string(),
  tags: v.array(v.string()),
});

export const generateUploadUrl = mutateWithUser({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const createNote = mutateWithUser({
  args: {
    storageId: v.id("_storage"),
  },
  handler: async (ctx, { storageId }) => {
    const userId = ctx.userId;
    const fileUrl = (await ctx.storage.getUrl(storageId))!;

    const noteId = await ctx.db.insert("notes", {
      userId,
      audioFileId: storageId,
      audioFileUrl: fileUrl,
    });
    return noteId;
  },
});

// Get note for a specific note
export const getNote = queryWithUser({
  args: {
    id: v.id("notes"),
  },
  handler: async (ctx, args) => {
    const { id } = args;
    if (!id) return { note: null };
    const note = await ctx.db.get(id);
    if (note?.userId !== ctx.userId) {
      throw new ConvexError("Not your note.");
    }
    return note;
  },
});

// Get all notes for a specific user
export const getNotes = queryWithUser({
  args: {},
  handler: async ({ userId, db }) => {
    if (!userId) return null;
    const notes = await db
      .query("notes")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .collect();
    return notes;
  },
});

export const deleteNote = mutateWithUser({
  args: {
    id: v.id("notes"),
  },
  handler: async (ctx, args) => {
    const { id } = args;
    if (!id) return null;
    const existingNote = await ctx.db.get(id);

    if (existingNote) {
      if (existingNote?.userId !== ctx.userId) {
        throw new ConvexError("Not your note.");
      }
      const note = await ctx.db.delete(id);
      return note;
    }
  },
});

export const getAllActionItems = queryWithUser({
  args: {},
  handler: async (ctx) => {
    const userId = ctx.userId;

    if (!userId) return null;

    const notes = await ctx.db
      .query("notes")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .collect();

    const actionItems = [];

    for (const note of notes) {
      const item = await ctx.db
        .query("actionItems")
        .withIndex("by_noteId", (q) => q.eq("noteId", note._id))
        .collect();
      actionItems.push(...item);
    }

    return actionItems;
  },
});

export const getActionItemById = queryWithUser({
  args: {
    id: v.id("actionItems"),
  },
  handler: async (ctx, { id }) => {
    if (!id) return null;

    const actionItem = await ctx.db.get(id);

    if (!actionItem) return null;

    const note = await ctx.db.get(actionItem?.noteId);

    if (note) {
      if (note?.userId !== ctx.userId) throw new ConvexError("Not your note.");
      return actionItem;
    }
  },
});

export const createActionItem = mutateWithUser({
  args: {
    noteId: v.id("notes"),
    data: actionItemSchema,
  },
  handler: async ({ userId, db }, { noteId, data }) => {
    if (!noteId) return null;

    if (!userId) return null;

    const note = await db.get(noteId);

    if (!note) return null;

    const id = await db.insert("actionItems", {
      noteId,
      userId,
      ...data,
    });

    const actionItem = await db.get(id);

    return actionItem;
  },
});

export const updateActionItem = mutateWithUser({
  args: {
    id: v.id("actionItems"),
    data: v.object({
      title: v.optional(v.string()),
      description: v.string(),
      status: v.string(),
      priority: v.optional(v.string()),
      column: v.optional(v.string()),
      tags: v.optional(v.array(v.string())),
    }),
  },
  handler: async (ctx, { id, data }) => {
    if (!id) return null;

    const actionItem = await ctx.db.get(id);

    if (!actionItem) return null;

    const note = await ctx.db.get(actionItem?.noteId);

    if (note) {
      if (note?.userId !== ctx.userId) throw new ConvexError("Not your note.");
      await ctx.db.patch(id, { ...actionItem, ...data });
      const updatedActionItem = await ctx.db.get(id);
      return updatedActionItem;
    }
  },
});
