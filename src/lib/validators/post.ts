import { z } from "zod";

export const PostValidator = z.object({
  title: z.string(),
  description: z.string(),
  content: z.any(),
});

export type PostRequest = z.infer<typeof PostValidator>;
