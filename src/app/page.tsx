"use client";

import { trpc } from "@/utils/trpc";
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [newTodo, setNewTodo] = useState("");
  const utils = trpc.useUtils();

  const { data: todos = [] } = trpc.todo.getAll.useQuery();

  const createTodo = trpc.todo.create.useMutation({
    onSuccess: () => {
      utils.todo.getAll.invalidate();
      setNewTodo("");
    },
  });

  const toggleTodo = trpc.todo.toggle.useMutation({
    onSettled: () => {
      utils.todo.getAll.refetch();
    },
  });

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>
          Todo List
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (newTodo.trim()) {
              createTodo.mutate({ text: newTodo });
            }
          }}
          className={styles.todoForm}
        >
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo..."
            className={styles.todoInput}
          />
          <button type="submit" className={styles.todoButton}>
            Add
          </button>
        </form>
        <ul className={styles.todoList}>
          {todos.length === 0 && (
            <li style={{ color: "#aaa", textAlign: "center", padding: 16 }}>
              No todos yet. Add your first one!
            </li>
          )}
          {todos.map((todo) => (
            <li
              className={styles.todoItem}
              key={todo.id}
              onClick={async (e) => {
                if ((e.target as HTMLElement).tagName === "INPUT") return;
                await toggleTodo.mutateAsync({ id: todo.id });
              }}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={async () => {
                  await toggleTodo.mutateAsync({ id: todo.id });
                }}
              />
              <span
                className={
                  todo.completed ? styles.todoTextCompleted : styles.todoText
                }
              >
                {todo.text}
              </span>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
