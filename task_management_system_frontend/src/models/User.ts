import type { TaskItem } from "./TaskItem";

export interface User {
    id: number;
    username: string;
    email: string;
    passwordHash: string;
    role: "USER" | "ADMIN"
  
    createdAt: Date;
  
    assignedTasks: TaskItem[];
  }