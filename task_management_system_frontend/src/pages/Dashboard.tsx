import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import type { User } from "../models/User";
import type { TaskItem, TaskStatus, Priority } from "../models/TaskItem";
import EditableCard from "../components/EditableCard";
import Header from "../components/Header";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import CreateTaskModal from "../components/Task";
import type { TaskForm } from "../models/TaskForm";

type Column = { id: string; title: string; status: TaskStatus; cards: TaskItem[] };

const initialColumns = (): Column[] => [
  { id: "col_todo", title: "To Do", status: "TODO", cards: [] },
  { id: "col_inprogress", title: "In Progress", status: "IN_PROGRESS", cards: [] },
  { id: "col_done", title: "Done", status: "DONE", cards: [] },
];

export default function Dashboard() {
  const { users, tasks } = useLoaderData() as { users: User[]; tasks: TaskItem[] };
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [columns, setColumns] = useState<Column[]>(() => {
    const cols = initialColumns();
    cols.forEach((c) => {
      c.cards = tasks.filter((t) => t.status === c.status);
    });
    return cols;
  });

  const [userFilter, setUserFilter] = useState<number>();
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [searchQuery, setSearch] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
   // const [newTitle, setNewTitle] = useState("");
   // const [newDesc, setNewDesc] = useState("");
   // const [newAssignee, setNewAssignee] = useState<number>(users[0]?.id || 0);  
    //const [targetStatus, setTargetStatus] = useState<TaskStatus>("TODO");


  const filterTasks = (cards: TaskItem[]) =>
    cards.filter(
      (c) =>
        (statusFilter === "" || c.status === columns.find((col) => col.id === statusFilter)?.status) &&
        (userFilter === 0 || userFilter === undefined || c.assigneeId === userFilter) &&
        (searchQuery === "" || c.title.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  const handleDeleteCard = async (colId: string, cardId: number) => {
    if (!confirm("Are you sure to delete this task?")) return;
    await api.delete(`tasks/${cardId}`);
    setColumns((prev) =>
      prev.map((c) => (c.id === colId ? { ...c, cards: c.cards.filter((x) => x.id !== cardId) } : c))
    );
  };

  const handleEditCard = async (
    colId: string,
    cardId: number,
    newTitle: string,
    newDesc: string,
    userId: number,
    status: string,
    priority: Priority
  ) => {
    setColumns((prev) => {
      const sourceCol = prev.find((c) => c.id === colId)!;
      const card = sourceCol.cards.find((x) => x.id === cardId)!;

      if (card.status !== status) {
        return prev.map((col) => {
          if (col.id === colId) return { ...col, cards: col.cards.filter((x) => x.id !== cardId) };
          if (col.status === status)
            return {
              ...col,
              cards: [{ ...card, title: newTitle, description: newDesc, assigneeId: userId, status, priority }, ...col.cards],
            };
          return col;
        });
      }

      return prev.map((col) =>
        col.id === colId
          ? {
              ...col,
              cards: col.cards.map((x) =>
                x.id === cardId ? { ...x, title: newTitle, description: newDesc, assigneeId: userId, status, priority } : x
              ),
            }
          : col
      );
    });

    await api.put(`tasks/${cardId}`, { title: newTitle, description: newDesc, assigneeId: userId, status, priority });
  };

  const logoutHandler = () => {
    localStorage.removeItem("kanban");
    localStorage.removeItem("token");
    logout();
    navigate("/login");
  };
  const handleAddCard = async (task:TaskForm) => {
      const card: TaskItem = {
        id: tasks.length>0?tasks[tasks.length-1].id+1:1,
        priority: "LOW",
        status: task.status, //columns.find(c => c.id === targetColumnId)?.status || "TODO",
        title: task.title.trim(),
        description: task.description.trim(),
        assigneeId: task.assigneeId,
      };
      setColumns(prev => prev.map(c => (c.status ===  task.status ? { ...c, cards: [card, ...c.cards] } : c)));
      setIsModalOpen(false);
      await api.post("tasks", card);
    };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        <Header
          users={users}
          userFilter={userFilter}
          onUserFilterChange={setUserFilter}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearch}
          onAddTask={() => setIsModalOpen(true)}
          onLogout={logoutHandler}
          columns={columns}
        />

        <main className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {columns.map((col) => (
            <section key={col.id} className="rounded-lg p-3 shadow-md bg-white flex flex-col min-h-[200px]">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-medium text-lg">
                  {col.title} <span className="text-sm text-slate-400">({col.cards.length})</span>
                </h2>
              </div>
              <div className="flex-1 space-y-2 overflow-auto pr-1">
                {filterTasks(col.cards).map((card) => (
                  <EditableCard
                    key={card.id}
                    columns={columns}
                    card={card}
                    users={users}
                    onDelete={() => handleDeleteCard(col.id, card.id)}
                    onEdit={(title, desc, uid, status) => handleEditCard(col.id, card.id, title, desc, uid, status, card.priority)}
                  />
                ))}
                {col.cards.length === 0 && <div className="text-sm text-slate-400 italic">No matching tasks</div>}
              </div>
            </section>
          ))}
        </main>
        {isModalOpen && (
          <CreateTaskModal
            users={users}
            columns={columns}
            onClose={() => setIsModalOpen(false)}
            onCreate={(task)=>handleAddCard(task)}
            // onCreate={(task) => {
            //   // Convert into your Card object
            //   const newCard: Card = {
            //     id: uid("c"),
            //     title: task.title,
            //     description: task.description,
            //     createdAt: new Date().toISOString(),
            //     assigneeId: String(task.assigneeId),
            //   };
            //   setColumns(prev =>
            //     prev.map(c => (c.status === task.status ? { ...c, cards: [newCard, ...c.cards] } : c))
            //   );
            // }}
          />
        )}
         {/* {isModalOpen && (
                  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                      <h2 className="text-lg font-semibold mb-4">Create Task</h2>
                      <div className="space-y-3">
                        <input
                          value={newTitle}
                          onChange={e => setNewTitle(e.target.value)}
                          placeholder="Task title"
                          className="w-full border rounded px-3 py-2"
                        />
                        <textarea
                          value={newDesc}
                          onChange={e => setNewDesc(e.target.value)}
                          placeholder="Description"
                          className="w-full border rounded px-3 py-2"
                        />
                        <select value={newAssignee} onChange={e => setNewAssignee(Number(e.target.value))} className="border rounded px-3 py-2 w-full">
                          {users.map(u => <option key={u.id} value={u.id}>{u.username}</option>)}
                        </select>
                        <select value={targetStatus} onChange={e => setTargetStatus(e.target.value as TaskStatus)} className="border rounded px-3 py-2 w-full">
                          {columns.map(c => <option key={c.status} value={c.status}>{c.title}</option>)}
                        </select>
                      </div>
                      <div className="mt-4 flex justify-end gap-2">
                        <button onClick={() => setIsModalOpen(false)} className="px-3 py-1 border rounded">Cancel</button>
                        <button onClick={handleAddCard} className="px-3 py-1 bg-sky-600 text-white rounded">Create</button>
                      </div>
                    </div>
                  </div>
                )} */}
      </div>
    </div>
  );
}
