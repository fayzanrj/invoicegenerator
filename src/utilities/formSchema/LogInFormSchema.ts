import { z } from "zod";

export const LogInFormSchema = z.object({
  username: z.string().min(1, "Required"),
  password: z.string().min(1, "Required"),
});

export type LogInInputType = z.infer<typeof LogInFormSchema>;
