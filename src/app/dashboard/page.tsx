'use client'
import TaskList from "@/components/task-list"
import { DashboardStats } from "@/components/dashboard-stats"
import { AddTaskButton } from "@/components/add-task-button"
import { useState } from "react"
import { Task } from "@/types/task"
import { useTaskContext } from "@/context/TaskContent"

export default function DashboardPage() {
    const { tasks, updateTaskStatus, markAsImportant, deleteTask } = useTaskContext();
    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <DashboardStats tasks={tasks} />
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4">Today's Tasks</h2>
                    <TaskList/>
                </div>
            </div>
            <AddTaskButton/>
        </main>
    )
}

