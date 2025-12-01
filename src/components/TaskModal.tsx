import React, { useState, useEffect } from "react";
import { TaskCategory } from "../types";
import { CATEGORIES, CATEGORY_TEXT_COLOR } from "../constants";

interface TaskModalProps {
  isOpen: boolean;
  startDate: Date;
  endDate: Date;
  onClose: () => void;
  onCreate: (name: string, category: TaskCategory, notes?: string) => void;
}

export const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  startDate,
  endDate,
  onClose,
  onCreate,
}) => {
  const [taskName, setTaskName] = useState("");
  const [taskCategory, setTaskCategory] = useState<TaskCategory>("To Do");
  const [taskNotes, setTaskNotes] = useState("");

  useEffect(() => {
    if (isOpen) {
      setTaskName("");
      setTaskCategory("To Do");
      setTaskNotes("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCreate = () => {
    if (taskName.trim()) {
      onCreate(taskName, taskCategory, taskNotes.trim() || undefined);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleCreate();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-20 bg-black/50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="bg-white rounded-2xl w-[380px] shadow-2xl overflow-hidden animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
          <h3 className="text-xl font-semibold text-white">Create New Task</h3>
          <p className="text-blue-100 text-sm mt-1">
            {startDate.toLocaleDateString()}
          </p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {/* Task Name */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Task Name
            </label>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="e.g. Design Homepage UI"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              autoFocus
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Category
            </label>
            <select
              value={taskCategory}
              onChange={(e) => setTaskCategory(e.target.value as TaskCategory)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            >
              {CATEGORIES.map((cat) => (
                <option
                  key={cat}
                  value={cat}
                  style={{ color: CATEGORY_TEXT_COLOR[cat] }}
                >
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Notes
            </label>
            <textarea
              value={taskNotes}
              onChange={(e) => setTaskNotes(e.target.value)}
              placeholder="Add any notes or details..."
              rows={3}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex gap-3 border-t border-gray-200">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-lg font-medium border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={!taskName.trim()}
            className={`flex-1 py-2 rounded-lg text-white font-medium transition-all 
              ${
                taskName.trim()
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
          >
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
};
