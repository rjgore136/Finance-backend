import { z } from "zod";

export const createTransactionSchema = z.object({
  amount: z.number().positive(),
  type: z.enum(["income", "expense"]),
  category: z.string().min(1),
  date: z.coerce.date(),
  notes: z.string().optional(),
});

export const filterTransactionSchema = z.object({
  type: z.enum(["income", "expense"]).optional(),
  category: z.string().optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
});

export const updateTransactionSchema = z.object({
  amount: z.number().positive().optional(),
  type: z.enum(["income", "expense"]).optional(),
  category: z.string().optional(),
  date: z.coerce.date().optional(),
  notes: z.string().optional(),
});
