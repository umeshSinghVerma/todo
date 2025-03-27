export enum TaskStatus {
    NotStarted = "not-started",
    InProgress = "in-progress",
    Completed = "completed",
  }
export interface Task {
    id: number
    title: string
    status: TaskStatus
    date: Date
    important: boolean
}