import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from "@headlessui/react";
import type { User } from "../models/User";

type HeaderProps = {
  users: User[];
  userFilter: number | undefined;
  onUserFilterChange: (id: number) => void;
  statusFilter: string;
  onStatusFilterChange: (id: string) => void;
  searchQuery: string;
  onSearchChange: (text: string) => void;
  onAddTask: () => void;
  onLogout: () => void;
  columns: { id: string; title: string }[];
};

export default function Header({
  users,
  userFilter,
  onUserFilterChange,
  statusFilter,
  onStatusFilterChange,
  searchQuery,
  onSearchChange,
  onAddTask,
  onLogout,
  columns,
}: HeaderProps) {
  return (
    <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
      <h1 className="text-2xl font-semibold">Task Management Dashboard</h1>
      <div className="flex flex-wrap gap-2 items-center">
        <Combobox value={userFilter} onChange={(val: number | null) => onUserFilterChange(val || 0)}>
          <div className="relative">
            <ComboboxInput
              className="border rounded px-3 py-1 w-48"
              displayValue={(id: number) => users.find((u) => u.id === id)?.username || "All Users"}
              placeholder="Filter by user"
              onChange={(e) => onSearchChange(e.target.value)}
            />
            <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">▼</ComboboxButton>
            <ComboboxOptions className="absolute mt-1 max-h-60 w-48 overflow-auto rounded-md bg-white shadow-lg z-10 border">
              <ComboboxOption key="all" value={0} className="px-3 py-1 cursor-pointer">
                All Users
              </ComboboxOption>
              {users.map((user) => (
                <ComboboxOption key={user.id} value={user.id} className="px-3 py-1 cursor-pointer">
                  {user.username}
                </ComboboxOption>
              ))}
            </ComboboxOptions>
          </div>
        </Combobox>

        <select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value)}
          className="border rounded px-3 py-1"
        >
          <option value="">All Statuses</option>
          {columns.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>

        <input
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search tasks..."
          className="border rounded px-3 py-1"
        />

        <button onClick={onAddTask} className="bg-sky-600 text-white px-3 py-1 rounded hover:bg-sky-700">
          + Task
        </button>
        <button onClick={onLogout} className="bg-pink-500 text-white px-3 py-1 rounded hover:bg-pink-400">
          Logout
        </button>
      </div>
    </header>
  );
}
