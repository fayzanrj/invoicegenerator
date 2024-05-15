import { z } from "zod";

export const RegisterUserSchema = z.object({
  name: z.string().min(4, "Min. 4 characters"),
  username: z.string().min(4, "Min. 4 characters"),
  password: z.string().min(6, "Min. 6 characters"),
  confirmPassword: z.string().min(1, "Required"),
  role: z.enum(["editor", "admin"]),
});

export type RegisterUserInputType = z.infer<typeof RegisterUserSchema>;
