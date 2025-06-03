import { describe, expect, it } from "vitest";
import { todoSchema } from "./schemas";

describe("todoSchema", () => {
  it("validates a correct todo", () => {
    const todo = {
      id: "123",
      text: "Test",
      completed: false,
      createdAt: new Date().toISOString(),
    };
    expect(() => todoSchema.parse(todo)).not.toThrow();
  });

  it("fails on missing text", () => {
    const todo = {
      id: "123",
      completed: false,
      createdAt: new Date().toISOString(),
    };
    expect(() => todoSchema.parse(todo)).toThrow();
  });

  it("fails on missing id", () => {
    const todo = {
      text: "Test",
      completed: false,
      createdAt: new Date().toISOString(),
    };
    expect(() => todoSchema.parse(todo)).toThrow();
  });
});
