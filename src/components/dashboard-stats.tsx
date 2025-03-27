import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Task } from "@/types/task"
import { CheckCircle, Calendar, Clock } from "lucide-react"

export function DashboardStats({tasks}:{tasks:Task[]}) {
  const completedTasks = tasks.filter(task => task.status === "completed").length;

  const remainingTasks = tasks.filter(task => task.status !== "completed").length;

  const hoursWorked = completedTasks * 1.5;

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
          <CheckCircle className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{completedTasks}</div>
          <p className="text-xs text-muted-foreground">+5 from last month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Hours Worked</CardTitle>
          <Clock className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{hoursWorked.toFixed(1)}h</div>
          <p className="text-xs text-muted-foreground">+2.5h from last month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Remaining Tasks</CardTitle>
          <Calendar className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{remainingTasks}</div>
          <p className="text-xs text-muted-foreground">-3 from last week</p>
        </CardContent>
      </Card>
    </>
  )
}