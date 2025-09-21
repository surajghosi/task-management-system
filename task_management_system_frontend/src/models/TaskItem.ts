import type { User } from "./User";

export interface TaskItem {
    id: number;
    title: string;
    description?: string;
    status: TaskStatus //"TODO" | "IN_PROGRESS" | "DONE"
    priority:Priority // "LOW" | "MEDIUM" | "HIGH" 
  
    createdAt?: Date;   
    updatedAt?: Date;
  
    assigneeId?: number;
    assignee?: User;   
    creatorId?: number;
    creator?: User;
  }


  export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";
  export type Priority = "LOW" | "MEDIUM" | "HIGH";