import { action, mutation, query } from "./_generated/server";
import { ConvexError } from "convex/values";
import { Auth } from "convex/server";
import {
  customMutation,
  customAction,
  customQuery,
  customCtx,
} from "convex-helpers/server/customFunctions";

export const getUserId = async (ctx: { auth: Auth }) => {
  return (await ctx.auth.getUserIdentity())?.tokenIdentifier;
};

export const queryWithUser = customQuery(
  query,
  customCtx(async (ctx) => {
    const userId = await getUserId(ctx);
    if (userId === undefined) {
      throw new ConvexError("User must be logged in.");
    }
    return { userId };
  })
);

export const mutationWithUser = customMutation(
  mutation,
  customCtx(async (ctx) => {
    const userId = await getUserId(ctx);
    if (userId === undefined) {
      throw new ConvexError("User must be logged in.");
    }
    return { userId };
  })
);

export const actionWithUser = customAction(
  action,
  customCtx(async (ctx) => {
    const userId = await getUserId(ctx);
    if (userId === undefined) {
      throw new ConvexError("User must be logged in.");
    }
    return { userId };
  })
);

export const envVarsMissing = query({
  args: {},
  handler: async () => {
    if (process.env.REPLICATE_API_KEY && process.env.TOGETHER_API_KEY) {
      return null;
    }
    const deploymentName = process.env.CONVEX_CLOUD_URL?.slice(8).replace(
      ".convex.cloud",
      ""
    );
    return (
      "https://dashboard.convex.dev/d/" +
      deploymentName +
      `/settings/environment-variables?var=REPLICATE_API_KEY&var=TOGETHER_API_KEY`
    );
  },
});
