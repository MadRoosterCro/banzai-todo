import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import clientPromise from "../db";
import { ObjectId, Document } from "mongodb";
import { todoSchema, Todo, createTodoSchema } from "../schemas";

const toTodo = (doc: Document): Todo => {
  return {
    id: doc._id.toString(),
    text: doc.text,
    completed: doc.completed,
    createdAt:
      doc.createdAt instanceof Date
        ? doc.createdAt.toISOString()
        : doc.createdAt,
  };
};

export const todoRouter = router({
  getAll: publicProcedure.output(z.array(todoSchema)).query(async () => {
    const client = await clientPromise;
    const db = client.db("banzai");
    const todos = await db
      .collection("todos")
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    return todos.map(toTodo);
  }),

  create: publicProcedure
    .input(createTodoSchema)
    .mutation(async ({ input }) => {
      const client = await clientPromise;
      const db = client.db("banzai");
      const now = new Date();
      const result = await db.collection("todos").insertOne({
        text: input.text,
        completed: false,
        createdAt: now,
      });
      return toTodo({
        _id: result.insertedId,
        text: input.text,
        completed: false,
        createdAt: now,
      });
    }),

  toggle: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const client = await clientPromise;
      const db = client.db("banzai");
      if (!ObjectId.isValid(input.id)) throw new Error("Invalid ObjectId");
      const objectId = new ObjectId(input.id);
      const todo = await db.collection("todos").findOne({ _id: objectId });
      if (!todo) throw new Error("Todo not found");
      const updated = await db
        .collection("todos")
        .findOneAndUpdate(
          { _id: objectId },
          { $set: { completed: !todo.completed } },
          { returnDocument: "after" }
        );
      const resultTodo =
        updated && updated.value
          ? updated.value
          : await db.collection("todos").findOne({ _id: objectId });
      if (!resultTodo) throw new Error("Failed to update todo");
      return toTodo(resultTodo);
    }),
});
