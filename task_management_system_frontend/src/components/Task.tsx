import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { User } from "../models/User";
import type { TaskStatus } from "../models/TaskItem";
import { taskSchema } from "../models/TaskForm";
import type { TaskForm } from "../models/TaskForm"


export default function CreateTaskModal({ users, columns, onClose, onCreate }: {
  users: User[];
  columns: { status: TaskStatus; title: string }[];
  onClose: () => void;
  onCreate: (task: TaskForm) => void;
}) {
  const { register, handleSubmit, formState: { errors } } = useForm<TaskForm>({
    resolver: yupResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      assigneeId: users[0]?.id ?? 0,
      status: columns[0]?.status ?? "TODO",
    }
  });

  const onSubmit = (data: TaskForm) => {
    onCreate(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-lg font-semibold mb-4">Create Task</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* Title */}
          <div>
            <input
              {...register("title")}
              placeholder="Task title"
              className="w-full border rounded px-3 py-2"
            />
            {errors.title && <p className="text-red-600 text-sm">{errors.title.message}</p>}
          </div>

          {/* Description */}
          <div>
            <textarea
              {...register("description")}
              placeholder="Description"
              className="w-full border rounded px-3 py-2"
            />
            {errors.description && <p className="text-red-600 text-sm">{errors.description.message}</p>}
          </div>

          {/* Assignee */}
          <div>
            <select {...register("assigneeId")} className="border rounded px-3 py-2 w-full">
              {users.map(u => <option key={u.id} value={u.id}>{u.username}</option>)}
            </select>
            {errors.assigneeId && <p className="text-red-600 text-sm">{errors.assigneeId.message}</p>}
          </div>

          {/* Status */}
          <div>
            <select {...register("status")} className="border rounded px-3 py-2 w-full">
              {columns.map(c => <option key={c.status} value={c.status}>{c.title}</option>)}
            </select>
            {errors.status && <p className="text-red-600 text-sm">{errors.status.message}</p>}
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-3 py-1 border rounded">Cancel</button>
            <button type="submit" className="px-3 py-1 bg-sky-600 text-white rounded">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}
