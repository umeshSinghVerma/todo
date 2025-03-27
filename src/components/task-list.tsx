"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TaskItem } from "@/components/task-item";
import { useTaskContext } from "@/context/TaskContent";

export default function TaskList() {
  const { tasks, updateTaskStatus, markAsImportant, deleteTask } = useTaskContext();

  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="grid grid-cols-6 mb-6">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="today">Today</TabsTrigger>
        <TabsTrigger value="important">Important</TabsTrigger>
        <TabsTrigger value="not-started">Not Started</TabsTrigger>
        <TabsTrigger value="in-progress">In Progress</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
      </TabsList>

      {/* Render Tasks based on selected tab */}
      {["all", "today", "important", "not-started", "in-progress", "completed"].map((filter) => (
        <TabsContent key={filter} value={filter} className="space-y-4">
          {tasks
            .filter((task) => {
              switch (filter) {
                case "today":
                  return new Date(task.date).toDateString() === new Date().toDateString();
                case "important":
                  return task.important;
                case "not-started":
                  return task.status === "not-started";
                case "in-progress":
                  return task.status === "in-progress";
                case "completed":
                  return task.status === "completed";
                default:
                  return true; // "all" case
              }
            })
            .map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onStatusChange={(status) => updateTaskStatus(task.id, status)}
                onToggleImportant={() => markAsImportant(task.id)}
                onDelete={() => deleteTask(task.id)}
              />
            ))}
        </TabsContent>
      ))}
    </Tabs>
  );
}
