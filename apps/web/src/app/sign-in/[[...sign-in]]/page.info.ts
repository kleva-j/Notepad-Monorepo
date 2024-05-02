import { z } from "zod";

export const Route = {
  name: "Signin",
  params: z.object({
    signin: z.string().array().optional(),
  })
};

