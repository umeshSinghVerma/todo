"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";
import { isSameDay } from "date-fns";

// Define the Task type
interface Task {
  id: number;
  title: string;
  status: "not-started" | "in-progress" | "completed";
  date: Date;
  important: boolean;
}

// Define the context type
interface TaskContextType {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  addTask: (task: Task) => void;
  updateTaskStatus: (id: number, status: Task["status"]) => void;
  markAsImportant: (id: number) => void;
  deleteTask: (id: number) => void;
  getTasksByDate: (date: Date) => Task[];
}

// Create the context
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Provide context to the app
export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Function to add a task
  const addTask = (task: Task) => {
    setTasks((prev) => [...prev, task]);
  };

  // Function to update task status
  const updateTaskStatus = (id: number, status: Task["status"]) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, status } : task))
    );
  };

  // Function to toggle task importance
  const markAsImportant = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, important: !task.important } : task
      )
    );
  };

  // Function to delete a task
  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // Function to get tasks for a specific date
  const getTasksByDate = (date: Date): Task[] => {
    return tasks.filter((task) => isSameDay(task.date, date));
  };

  return (
    <TaskContext.Provider
      value={{ tasks, setTasks, addTask, updateTaskStatus, markAsImportant, deleteTask, getTasksByDate }}
    >
      {children}
    </TaskContext.Provider>
  );
}

// Custom hooks for accessing the task context
export function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
}

// Hook for fetching tasks for a specific date
export function useTasksByDate(date: Date | undefined): Task[] {
  const { getTasksByDate } = useTaskContext();
  return date ? getTasksByDate(date) : [];
}
