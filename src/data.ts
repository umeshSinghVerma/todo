import { Task, TaskStatus } from "./types/task";

// Utility function to get a date offset from today
const getDateOffset = (days: number) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
};

export const INITIAL_TASKS: Task[] = [
    { id: 1, title: "Prepare budget report", status: TaskStatus.InProgress, date: getDateOffset(0), important: true },
    // Tasks for Tomorrow
    { id: 2, title: "Review Q1 performance metrics", status: TaskStatus.NotStarted, date: getDateOffset(1), important: true },
    { id: 3, title: "Finalize marketing strategy", status: TaskStatus.NotStarted, date: getDateOffset(1), important: true },

    // Tasks for Day After Tomorrow
    { id: 4, title: "Team sync-up meeting", status: TaskStatus.Completed, date: getDateOffset(2), important: false },
    { id: 5, title: "Client presentation", status: TaskStatus.InProgress, date: getDateOffset(2), important: true },
    { id: 6, title: "Product demo for stakeholders", status: TaskStatus.NotStarted, date: getDateOffset(2), important: true },

    // Tasks for 3 Days Later
    { id: 7, title: "Fix critical bug in authentication module", status: TaskStatus.InProgress, date: getDateOffset(3), important: true },
    { id: 8, title: "Code review for feature X", status: TaskStatus.Completed, date: getDateOffset(3), important: false },
    { id: 9, title: "Implement API rate limiting", status: TaskStatus.NotStarted, date: getDateOffset(3), important: true },

    // Tasks for 4 Days Later
    { id: 10, title: "Submit expense reports", status: TaskStatus.Completed, date: getDateOffset(4), important: false }
];
