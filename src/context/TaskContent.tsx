"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { useUser } from "@clerk/nextjs"; // Import Clerk user hook
import { createClient } from "@supabase/supabase-js";
import { isSameDay } from "date-fns";

// Initialize Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl as string, supabaseAnonKey as string);

// Define Task type
interface Task {
  id: number;
  title: string;
  status: "not-started" | "in-progress" | "completed";
  date: string; // Stored as "YYYY-MM-DD"
  important: boolean;
  user_id: string; // Each task is associated with a user
}

// Define Task Context Type
interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, "id">) => void;
  updateTaskStatus: (id: number, status: Task["status"]) => void;
  markAsImportant: (id: number) => void;
  deleteTask: (id: number) => void;
  getTasksByDate: (date: Date) => Task[];
}

// Create Context
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Utility Function: Format Date as "YYYY-MM-DD"
const formatDateToLocal = (date: Date): string => {
  return date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0");
};

// Task Provider Component
export function TaskProvider({ children }: { children: ReactNode }) {
  const { user } = useUser(); // Get authenticated user from Clerk
  const [tasks, setTasks] = useState<Task[]>([]);

  // Fetch tasks when user logs in
  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  // Fetch user-specific tasks from Supabase
  const fetchTasks = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", user.id); // Get only logged-in user's tasks

    if (error) {
      console.error("Error fetching tasks:", error.message);
    } else {
      setTasks(data || []);
    }
  };

  // Add new task
  const addTask = async (task: Omit<Task, "id">) => {
    if (!user) {
      console.error("User not found!");
      return;
    }

    const formattedTask = {
      ...task,
      user_id: user.id, // Assign task to the logged-in user
      date: formatDateToLocal(new Date(task.date)), // Store date correctly
    };

    const { data, error } = await supabase.from("tasks").insert([formattedTask]).select();

    if (error) {
      console.error("Error adding task:", error.message);
    } else if (data) {
      setTasks((prev) => [data[0], ...prev]); // Add task to the top
    }
  };

  // Update task status
  const updateTaskStatus = async (id: number, status: Task["status"]) => {
    const { data, error } = await supabase
      .from("tasks")
      .update({ status })
      .eq("id", id)
      .select();

    if (error) {
      console.error("Error updating task:", error.message);
    } else {
      setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, status } : task)));
    }
  };

  // Toggle important flag
  const markAsImportant = async (id: number) => {
    const task = tasks.find((task) => task.id === id);
    if (!task) return;

    const { data, error } = await supabase
      .from("tasks")
      .update({ important: !task.important })
      .eq("id", id)
      .select();

    if (error) {
      console.error("Error updating importance:", error.message);
    } else {
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? { ...task, important: !task.important } : task))
      );
    }
  };

  // Delete task
  const deleteTask = async (id: number) => {
    const { error } = await supabase.from("tasks").delete().eq("id", id);

    if (error) {
      console.error("Error deleting task:", error.message);
    } else {
      setTasks((prev) => prev.filter((task) => task.id !== id));
    }
  };

  // Get tasks by date
  const getTasksByDate = (date: Date): Task[] => {
    const selectedDate = formatDateToLocal(date);
    return tasks.filter((task) => task.date === selectedDate);
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTaskStatus, markAsImportant, deleteTask, getTasksByDate }}>
      {children}
    </TaskContext.Provider>
  );
}

// Custom Hook for Using Task Context
export function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
}

// Hook to Get Tasks for a Specific Date
export function useTasksByDate(date: Date | undefined): Task[] {
  const { getTasksByDate } = useTaskContext();
  return date ? getTasksByDate(date) : [];
}
