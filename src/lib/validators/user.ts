import { string, z } from "zod";

export const UserValidator = z.object({
  username: string()
    .min(3, { message: "Username must be atleast 3 characters." })
    .max(30, { message: "Username must be at max 15 characters." }),
  password: string().min(3).max(30),
});

export type UserRequest = z.infer<typeof UserValidator>;
