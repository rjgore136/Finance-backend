import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(2, "Name is required").max(20),
  email: z.string().email("Invalid email").max(50),
  password: z.string().min(6, "Password must be at least 6 chars").max(15),
  role: z.enum(["viewer", "analyst", "admin"]).optional(),
});

export const updateUserSchema = z.object({
  name: z.string().optional(),
  role: z.enum(["viewer", "analyst", "admin"]).optional(),
  status: z.enum(["active", "inactive"]).optional(),
});
