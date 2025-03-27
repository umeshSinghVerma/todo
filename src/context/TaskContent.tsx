"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the Task type
interface Task {
  id: number;
  title: string;
  status: string;
  date: Date;
  important: boolean;
}

// Define the context type
interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTaskStatus: (id: number, status: string) => void;
  markAsImportant: (id: number) => void;
  deleteTask: (id: number) => void;
}

// Create the context
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Provide context to the app
export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Complete project proposal", status: "in-progress", date: new Date(), important: false },
    { id: 2, title: "Schedule team meeting", status: "not-started", date: new Date(), important: true },
    { id: 3, title: "Review client feedback", status: "completed", date: new Date(), important: false },
    { id: 4, title: "Update documentation", status: "not-started", date: new Date(), important: false },
  ]);

  // Function to add a task
  const addTask = (task: Task) => {
    setTasks((prev) => [...prev, task]);
  };

  // Function to update task status
  const updateTaskStatus = (id: number, status: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, status } : task))
    );
  };

  // Function to toggle task importance
  const markAsImportant = (id: number) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, important: !task.important } : task))
    );
  };

  // Function to delete a task
  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTaskStatus, markAsImportant, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
}

// Custom hook for easier access
export function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
}
