import { Task, Priority, TaskStatus } from "./types.js";
import chalk from "chalk";

// 1. Create a Task
export function createTask(title: string, priority: Priority = "medium"): Task {
  return {
    id: crypto.randomUUID(),
    title,
    completed: false,
    status: "pending",
    priority,
    createdAt: new Date(),
  };
}

// 2. Mark as Completed
export function markCompleted(task: Task): Task {
  return {
    ...task,
    completed: true,
    status: "completed",
  };
}

// 3. Filter Tasks
export function filterByStatus(tasks: Task[], status: TaskStatus): Task[] {
  return tasks.filter((task) => task.status === status);
}

// 4. Print Tasks
export function printTasks(tasks: Task[]): void {
  if (tasks.length === 0) {
    console.log(chalk.gray("  (No tasks found)"));
    return;
  }
  
  tasks.forEach((task) => {
    const icon = task.completed ? "✅" : "⭕";
    const color = task.priority === "high" ? chalk.red : task.priority === "medium" ? chalk.yellow : chalk.green;
    console.log(`${icon} [${color(task.priority)}] ${task.title}`);
  });
}
