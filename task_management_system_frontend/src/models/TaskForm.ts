import * as yup from "yup";
import type { TaskStatus } from "./TaskItem";

export interface TaskForm {
  title: string;
  description: string;
  assigneeId: number;
  status: TaskStatus; // reuse your enum/type
}

export const taskSchema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required").max(500, "Description is too long"),
  assigneeId: yup.number().required("Please select an assignee"),
  status: yup.string().oneOf(["TODO", "IN_PROGRESS", "DONE"]).required("Please select a status"),
});
