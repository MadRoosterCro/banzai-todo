import { describe, it, expect, beforeEach, vi } from "vitest";
import { todoRouter } from "./todo";
import * as dbModule from "../db";

describe("todoRouter", () => {
  const mockTodosCollection = {
    insertOne: vi.fn(),
    find: vi.fn().mockReturnThis(),
    sort: vi.fn().mockReturnThis(),
    toArray: vi.fn(),
    findOne: vi.fn(),
    findOneAndUpdate: vi.fn(),
  };

  const mockDb = {
    collection: vi.fn(() => mockTodosCollection),
  };

  const mockClient = { db: vi.fn(() => mockDb) };

  beforeEach(() => {
    vi.resetAllMocks();
    vi.spyOn(dbModule, "default", "get").mockResolvedValue(mockClient as any);
  });

  it("creates a todo", async () => {
    mockTodosCollection.insertOne.mockResolvedValue({ insertedId: "abc" });
    const caller = todoRouter.createCaller({});
    const result = await caller.create({ text: "Test" });
    expect(result.id).toBe("abc");
    expect(result.text).toBe("Test");
    expect(result.completed).toBe(false);
  });

  it("gets all todos", async () => {
    mockTodosCollection.find.mockReturnThis();
    mockTodosCollection.sort.mockReturnThis();
    mockTodosCollection.toArray.mockResolvedValue([
      {
        _id: { toString: () => "abc" },
        text: "Test",
        completed: false,
        createdAt: new Date("2024-01-01T00:00:00Z"),
      },
    ]);
    const caller = todoRouter.createCaller({});
    const result = await caller.getAll();
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      id: "abc",
      text: "Test",
      completed: false,
      createdAt: "2024-01-01T00:00:00.000Z",
    });
  });

  it("toggles a todo", async () => {
    const validId = "507f1f77bcf86cd799439011";
    const todoDoc = {
      _id: { toString: () => validId },
      text: "Test",
      completed: false,
      createdAt: new Date("2024-01-01T00:00:00Z"),
    };
    mockTodosCollection.findOne.mockResolvedValue(todoDoc);
    mockTodosCollection.findOneAndUpdate.mockResolvedValue({
      value: {
        ...todoDoc,
        completed: true,
      },
    });
    const caller = todoRouter.createCaller({});
    const result = await caller.toggle({ id: validId });
    expect(result).toEqual({
      id: validId,
      text: "Test",
      completed: true,
      createdAt: "2024-01-01T00:00:00.000Z",
    });
  });
});
