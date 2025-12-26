import { Task, Priority, TaskStatus } from "./types.js";

// 1. Define the Shape (Interfaces)
export interface TaskCollection {
  tasks: Task[];
  metadata: {
    total: number;
    completed: number;
    lastModified: Date;
  };
}

export interface TaskStats {
  byPriority: Record<Priority, number>;
  byStatus: Record<TaskStatus, number>;
  percentComplete: number;
}

// 2. Function to Calculate Stats (The logic)
export function getTaskStats(tasks: Task[]): TaskStats {
  const stats: TaskStats = {
    byPriority: { low: 0, medium: 0, high: 0 },
    byStatus: { pending: 0, "in-progress": 0, completed: 0 },
    percentComplete: 0
  };

  tasks.forEach(task => {
    stats.byPriority[task.priority]++;
    stats.byStatus[task.status]++;
  });

  const total = tasks.length;
  if (total > 0) {
    stats.percentComplete = Math.round((stats.byStatus.completed / total) * 100);
  }

  return stats;
}

// 3. Function to Create a Collection
export function createCollection(tasks: Task[]): TaskCollection {
  return {
    tasks: tasks,
    metadata: {
      total: tasks.length,
      completed: tasks.filter(t => t.completed).length,
      lastModified: new Date()
    }
  };
}
