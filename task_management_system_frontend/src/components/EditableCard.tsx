import { useState } from "react";
import type { TaskItem, Priority } from "../models/TaskItem";
import type { User } from "../models/User";

type EditableCardProps = {
  columns: { status: string; title: string }[];
  card: TaskItem;
  users: User[];
  onDelete: () => void;
  onEdit: (title: string, desc: string, assignId: number, status: string, priority: Priority) => void;
};

export default function EditableCard({ columns, card, users, onDelete, onEdit }: EditableCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(card.title);
  const [draftDescription, setDraftDescription] = useState(card.description || "");
  const [draftAssignId, setDraftAssignId] = useState(card.assigneeId);
  const [targetStatus, setTargetStatus] = useState<string>(card.status);

  const save = () => {
    if (!draftTitle.trim()) return;
    onEdit(draftTitle.trim(), draftDescription.trim(), draftAssignId!, targetStatus, card.priority);
    setIsEditing(false);
  };

  return (
    <div className="bg-slate-50 border rounded p-3 hover:shadow-md">
      {isEditing ? (
        <div className="space-y-2">
          <input
            value={draftTitle}
            onChange={(e) => setDraftTitle(e.target.value)}
            className="border rounded px-2 py-1 w-full"
          />
          <textarea
            value={draftDescription}
            onChange={(e) => setDraftDescription(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          <select
            value={draftAssignId}
            onChange={(e) => setDraftAssignId(Number(e.target.value))}
            className="border rounded px-2 py-1 w-full"
          >
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.username}
              </option>
            ))}
          </select>
          <select
            value={targetStatus}
            onChange={(e) => setTargetStatus(e.target.value)}
            className="border rounded px-3 py-2 w-full"
          >
            {columns.map((c) => (
              <option key={c.status} value={c.status}>
                {c.title}
              </option>
            ))}
          </select>
          <div className="flex gap-2 justify-end">
            <button onClick={() => setIsEditing(false)} className="px-2 py-1 border rounded">
              Cancel
            </button>
            <button onClick={save} className="px-2 py-1 bg-emerald-600 text-white rounded">
              Save
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold">{card.title}</h3>
              {card.description && <p className="text-sm text-slate-600 mt-1">{card.description}</p>}
              <div className="text-xs text-slate-400 mt-2">
                {card.createdAt ? new Date(card.createdAt).toLocaleString() : ""}
              </div>
            </div>
            <div className="flex flex-col gap-1 ml-3">
              <button onClick={() => setIsEditing(true)} className="text-xs px-2 py-1 border rounded">
                Edit
              </button>
              <button onClick={onDelete} className="text-xs px-2 py-1 border rounded text-red-600">
                Del
              </button>
            </div>
          </div>
          <div className="mt-2">
            Assigned to: {users.find((u) => u.id === card.assigneeId)?.username || "Unassigned"}
          </div>
        </div>
      )}
    </div>
  );
}
