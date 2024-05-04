import { z } from "zod";

export const Route = {
  name: "DashboardSearch",
  params: z.object({}),
  search: z.object({
    q: z.string().optional(),
  }),
};
