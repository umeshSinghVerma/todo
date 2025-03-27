"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format, isSameDay } from "date-fns";
import { useTaskContext } from "@/context/TaskContent";

export function CalendarView() {
  const { tasks } = useTaskContext(); // Fetch tasks from context
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Find tasks for the selected date
  const selectedDateTasks = tasks.filter((task) => isSameDay(task.date, selectedDate || new Date()));

  // Function to customize day cell rendering
  const renderDay = (day: Date | undefined) => {
    if (!day || isNaN(day.getTime())) return null;

    const dateHasTasks = tasks.some((task) => isSameDay(task.date, day));

    return (
      <div className="relative flex h-8 w-8 items-center justify-center">
        {day.getDate()}
        {dateHasTasks && <span className="absolute bottom-1 h-1 w-1 rounded-full bg-primary"></span>}
      </div>
    );
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Calendar */}
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

      {/* Task List for Selected Date */}
      <Card>
        <CardHeader>
          <CardTitle>{selectedDate ? format(selectedDate, "MMMM d, yyyy") : "No date selected"}</CardTitle>
        </CardHeader>
        <CardContent>
          {selectedDateTasks.length > 0 ? (
            <div className="space-y-4">
              {selectedDateTasks.map((task) => (
                <div key={task.id} className="flex justify-between items-center p-3 border rounded-md">
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
  );
}
