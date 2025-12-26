export type Priority = 'low' | 'medium' | 'high';
export type TaskStatus = 'pending' | 'in-progress' | 'completed';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  status: TaskStatus;
  priority: Priority;
  createdAt: Date;
}
