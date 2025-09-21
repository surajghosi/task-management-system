import type { TaskItem, TaskStatus } from "./TaskItem";

export type Column = {
    id: string;
    title: string;
    status: TaskStatus;
    cards: TaskItem[];
  };
  

  export const initialColumns = (): Column[] => [
    {
      id: "col_todo",
      title: "To Do",
      status: "TODO",
      cards: [],
    },
    {
      id: "col_inprogress",
      title: "In Progress",
      status: "IN_PROGRESS",
      cards: [],
    },
    {
      id: "col_done",
      title: "Done",
      status: "DONE",
      cards: [],
    },
  ];