"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { addDays, format, isSameDay } from "date-fns"

// Mock data for demonstration
const TASKS_BY_DATE = [
  {
    date: new Date(),
    tasks: [
      { title: "Team meeting", status: "completed" },
      { title: "Project review", status: "in-progress" },
    ],
  },
  { date: addDays(new Date(), 1), tasks: [{ title: "Client call", status: "not-started" }] },
  {
    date: addDays(new Date(), 3),
    tasks: [
      { title: "Presentation", status: "not-started" },
      { title: "Report submission", status: "not-started" },
    ],
  },
]

export function CalendarView() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  // Find tasks for the selected date
  const selectedDateTasks = selectedDate
    ? TASKS_BY_DATE.find((item) => isSameDay(item.date, selectedDate))?.tasks || []
    : []

  // Function to customize day cell rendering
  const renderDay = (day: Date | undefined) => {
    // Check if day is a valid Date object
    if (!day || !(day instanceof Date) || isNaN(day.getTime())) {
      return null
    }

    const dateHasTasks = TASKS_BY_DATE.some((item) => isSameDay(item.date, day))

    if (dateHasTasks) {
      return (
        <div className="relative flex h-8 w-8 items-center justify-center">
          {day.getDate()}
          <span className="absolute bottom-1 h-1 w-1 rounded-full bg-primary"></span>
        </div>
      )
    }

    return day.getDate()
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
            components={{
              DayContent: (props) => renderDay(props.date),
            }}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{selectedDate ? format(selectedDate, "MMMM d, yyyy") : "No date selected"}</CardTitle>
        </CardHeader>
        <CardContent>
          {selectedDateTasks.length > 0 ? (
            <div className="space-y-4">
              {selectedDateTasks.map((task, index) => (
                <div key={index} className="flex justify-between items-center p-3 border rounded-md">
                  <span className="font-medium">{task.title}</span>
                  <Badge
                    variant="outline"
                    className={
                      task.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : task.status === "in-progress"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                    }
                  >
                    {task.status === "in-progress"
                      ? "In Progress"
                      : task.status === "not-started"
                        ? "Not Started"
                        : "Completed"}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No tasks scheduled for this date.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

