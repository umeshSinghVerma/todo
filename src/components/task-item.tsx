"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Clock, CheckCircle, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"

type Task = {
    id: number
    title: string
    status: string
    date: Date
    important: boolean
}

type TaskItemProps = {
    task: Task
    onStatusChange: (status: string) => void
    onToggleImportant: () => void
    onDelete: () => void
}

export function TaskItem({ task, onStatusChange, onToggleImportant, onDelete }: TaskItemProps) {
    const [formattedDate, setFormattedDate] = useState("");
    
    useEffect(() => {
        setFormattedDate(new Date(task.date).toLocaleDateString());
    }, [task.date]);

    const statusColors = {
        completed: "bg-green-100 text-green-800",
        "in-progress": "bg-blue-100 text-blue-800",
        "not-started": "bg-gray-100 text-gray-800",
    }

    const statusIcons = {
        completed: <CheckCircle className="h-4 w-4" />,
        "in-progress": <Clock className="h-4 w-4" />,
        "not-started": <Clock className="h-4 w-4 text-gray-400" />,
    }

    return (
        <Card className="transform transition-all hover:scale-[1.01] hover:shadow-lg">
            <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onToggleImportant}
                        className={task.important ? "text-yellow-500" : "text-gray-300"}
                    >
                        <Star className="h-5 w-5" fill={task.important ? "currentColor" : "none"} />
                        <span className="sr-only">Toggle important</span>
                    </Button>

                    <div>
                        <h3 className="font-medium">{task.title}</h3>
                        <p className="text-sm text-muted-foreground">{formattedDate}</p>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <Badge
                        variant="outline"
                        className={`flex items-center gap-1 ${statusColors[task.status as keyof typeof statusColors]}`}
                    >
                        {statusIcons[task.status as keyof typeof statusIcons]}
                        {task.status === "in-progress"
                            ? "In Progress"
                            : task.status === "not-started"
                                ? "Not Started"
                                : "Completed"}
                    </Badge>

                    <Select value={task.status} onValueChange={onStatusChange}>
                        <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="not-started">Not Started</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Delete button */}
                    <Button variant="destructive" size="icon" onClick={onDelete}>
                        <Trash2 className="h-5 w-5" />
                        <span className="sr-only">Delete task</span>
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
