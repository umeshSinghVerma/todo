"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Task, TaskStatus } from "@/types/task";
import { useTaskContext } from "@/context/TaskContent";

// Function to group and calculate tasks per month
const getMonthlyData = (tasks: Task[]) => {
  const monthlyData: Record<string, { completed: number; hours: number }> = {};

  tasks.forEach((task) => {
    const month = task.date.toLocaleString("default", { month: "long" });

    if (!monthlyData[month]) {
      monthlyData[month] = { completed: 0, hours: 0 };
    }

    if (task.status === TaskStatus.Completed) {
      monthlyData[month].completed += 1;
      monthlyData[month].hours += 2; // Assuming avg 2 hours per task
    }
  });

  return Object.entries(monthlyData).map(([month, data]) => ({
    month,
    completed: data.completed,
    hours: data.hours,
  }));
};

export function MonthlySummary() {
  const { tasks } = useTaskContext(); // Fetching tasks from context
  const [view, setView] = useState("monthly");

  const MONTHLY_DATA = useMemo(() => getMonthlyData(tasks as any), [tasks]);
  const maxCompleted = Math.max(...MONTHLY_DATA.map((item) => item.completed), 1);
  const maxHours = Math.max(...MONTHLY_DATA.map((item) => item.hours), 1);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Task Completion</CardTitle>
          <Select defaultValue="monthly" onValueChange={(val) => setView(val)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <div className="flex items-end h-[250px] w-full gap-2">
              {MONTHLY_DATA.map((item, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div
                    className="w-full bg-blue-500 rounded-t-md transition-all duration-500 ease-in-out hover:bg-blue-600"
                    style={{ height: `${(item.completed / maxCompleted) * 100}%` }}
                  ></div>
                  <span className="text-xs mt-2">{item.month}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <span className="text-xs text-muted-foreground">0</span>
              <span className="text-xs text-muted-foreground">{maxCompleted}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Hours Worked</CardTitle>
          <Select defaultValue="monthly">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <div className="flex items-end h-[250px] w-full gap-2">
              {MONTHLY_DATA.map((item, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div
                    className="w-full bg-purple-500 rounded-t-md transition-all duration-500 ease-in-out hover:bg-purple-600"
                    style={{ height: `${(item.hours / maxHours) * 100}%` }}
                  ></div>
                  <span className="text-xs mt-2">{item.month}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <span className="text-xs text-muted-foreground">0</span>
              <span className="text-xs text-muted-foreground">{maxHours}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">Average Tasks per Month</p>
                  <p className="text-2xl font-bold">{(MONTHLY_DATA.reduce((acc, item) => acc + item.completed, 0) / MONTHLY_DATA.length).toFixed(1)}</p>
                </div>
                <div className="border rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">Average Hours per Month</p>
                  <p className="text-2xl font-bold">{(MONTHLY_DATA.reduce((acc, item) => acc + item.hours, 0) / MONTHLY_DATA.length).toFixed(1)}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">Total Tasks (YTD)</p>
                  <p className="text-2xl font-bold">{MONTHLY_DATA.reduce((acc, item) => acc + item.completed, 0)}</p>
                </div>
                <div className="border rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">Total Hours (YTD)</p>
                  <p className="text-2xl font-bold">{MONTHLY_DATA.reduce((acc, item) => acc + item.hours, 0)}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Efficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Average Time per Task</p>
                <p className="text-2xl font-bold">
                  {(MONTHLY_DATA.reduce((acc, item) => acc + item.hours, 0) /
                    MONTHLY_DATA.reduce((acc, item) => acc + item.completed, 0)).toFixed(2)} hours
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Completion Rate</p>
                <div className="flex items-center space-x-2">
                  <p className="text-2xl font-bold">
                    {((tasks.filter((task) => task.status === TaskStatus.Completed).length / tasks.length) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
