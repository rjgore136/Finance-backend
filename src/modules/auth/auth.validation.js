import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email").max(50),
  password: z.string().min(6, "Password must be at least 6 characters").max(15),
});
