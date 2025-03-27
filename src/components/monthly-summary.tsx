"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for demonstration
const MONTHLY_DATA = [
  { month: "January", completed: 12, hours: 28 },
  { month: "February", completed: 18, hours: 34 },
  { month: "March", completed: 24, hours: 42 },
  { month: "April", completed: 32, hours: 38 },
  { month: "May", completed: 28, hours: 36 },
  { month: "June", completed: 34, hours: 50 },
]

// Weekly data
const WEEKLY_DATA = [
  { week: "Week 1", completed: 6, hours: 12 },
  { week: "Week 2", completed: 8, hours: 14 },
  { week: "Week 3", completed: 10, hours: 12 },
  { week: "Week 4", completed: 12, hours: 16 },
]

export function MonthlySummary() {
  // Find the maximum value for scaling
  const maxCompleted = Math.max(...MONTHLY_DATA.map((item) => item.completed))
  const maxHours = Math.max(...MONTHLY_DATA.map((item) => item.hours))

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Task Completion</CardTitle>
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
                  <p className="text-2xl font-bold">24.6</p>
                </div>
                <div className="border rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">Average Hours per Month</p>
                  <p className="text-2xl font-bold">38.0</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">Total Tasks (YTD)</p>
                  <p className="text-2xl font-bold">148</p>
                </div>
                <div className="border rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">Total Hours (YTD)</p>
                  <p className="text-2xl font-bold">228</p>
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
                <p className="text-2xl font-bold">1.54 hours</p>
                <p className="text-xs text-muted-foreground mt-1">-0.2 hours from last month</p>
              </div>
              <div className="border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Completion Rate</p>
                <div className="flex items-center space-x-2">
                  <p className="text-2xl font-bold">92%</p>
                  <span className="text-xs text-green-600">↑ 3%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: "92%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

