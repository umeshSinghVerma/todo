"use client"

import type React from "react"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DatePicker } from "@/components/date-picker"

interface Task {
    id: number
    title: string
    status: string
    date: Date
    important: boolean
}


export function AddTaskButton({ tasks, setTasks }: { tasks: Task[], setTasks: any }) {
    const [open, setOpen] = useState(false)
    const [taskTitle, setTaskTitle] = useState("")
    const [date, setDate] = useState<Date | undefined>(new Date())

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const capitalizedTitle = taskTitle.charAt(0).toUpperCase() + taskTitle.slice(1)

        const newTask: Task = {
            id: tasks.length + 1, 
            title: capitalizedTitle,
            status: "not-started",
            date: date || new Date(),
            important: false,
        }

        setTasks([...tasks, newTask])

        console.log("Task added:", newTask)

        setTaskTitle("")
        setDate(new Date())
        setOpen(false)
    }


    return (
        <>
            <Button
                size="icon"
                className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
                onClick={() => setOpen(true)}
            >
                <Plus className="h-6 w-6" />
                <span className="sr-only">Add Task</span>
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Task</DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="task-title">Task Title</Label>
                            <Input
                                id="task-title"
                                value={taskTitle}
                                onChange={(e) => setTaskTitle(e.target.value)}
                                placeholder="Enter your task"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Due Date</Label>
                            <DatePicker date={date} setDate={setDate} />
                        </div>

                        <Button type="submit" className="w-full">
                            Add Task
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}

