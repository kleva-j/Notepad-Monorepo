import { ConvexError, v } from "convex/values";
import { Auth } from "convex/server";

import { mutationWithUser, queryWithUser } from "./utils";

export const getUserId = async (ctx: { auth: Auth }) => {
  return (await ctx.auth.getUserIdentity())?.tokenIdentifier;
};

export const generateUploadUrl = mutationWithUser({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const createNote = mutationWithUser({
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
  handler: async (ctx) => {
    const userId = ctx.userId;
    if (!userId) return null;
    const notes = await ctx.db
      .query("notes")
      .filter((q) => q.eq(q.field("userId"), userId))
      .collect();
    return notes;
  },
});

export const deleteNote = mutationWithUser({
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