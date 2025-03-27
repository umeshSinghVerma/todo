"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TaskItem } from "@/components/task-item";
import { isToday } from "date-fns";
import type { Task, TaskStatus } from "@/types/task";
import { useTaskContext } from "@/context/TaskContent";

// Define allowed task statuses

export default function TaskList() {
  const { tasks, updateTaskStatus, markAsImportant, deleteTask } = useTaskContext();

  // Define filters for different task categories
  const filterTasks = (filter: string) => {
    return tasks.filter((task:any) => {
      switch (filter) {
        case "today":
          return isToday(task.date);
        case "important":
          return task.important;
        case "not-started":
        case "in-progress":
        case "completed":
          return task.status === (filter as TaskStatus);; // ✅ Now TypeScript knows it's a valid status
        default:
          return true; // "all" case
      }
    });
  };

  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="grid grid-cols-3 mb-6">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="today">Today</TabsTrigger>
        <TabsTrigger value="important">Important</TabsTrigger>
        {/* <TabsTrigger value="not-started">Not Started</TabsTrigger>
        <TabsTrigger value="in-progress">In Progress</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger> */}
      </TabsList>

      {/* Render Tasks based on selected tab */}
      {["all", "today", "important", "not-started", "in-progress", "completed"].map((filter) => (
        <TabsContent key={filter} value={filter} className="space-y-4">
          {filterTasks(filter).length > 0 ? (
            filterTasks(filter).map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onStatusChange={(status) => updateTaskStatus(task.id, status as TaskStatus)} // ✅ Cast status correctly
                onToggleImportant={() => markAsImportant(task.id)}
                onDelete={() => deleteTask(task.id)}
              />
            ))
          ) : (
            <p className="text-muted-foreground text-center">No tasks found.</p>
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
}
