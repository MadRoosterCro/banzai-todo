import { z } from "zod";

export const todoSchema = z.object({
  id: z.string(),
  text: z.string(),
  completed: z.boolean(),
  createdAt: z.string(),
});

export type Todo = z.infer<typeof todoSchema>;

export const createTodoSchema = z.object({
  text: z.string().min(1, "Todo text cannot be empty"),
});
