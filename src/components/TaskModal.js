import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { CATEGORIES, CATEGORY_TEXT_COLOR } from "../constants";
export const TaskModal = ({ isOpen, startDate, endDate, onClose, onCreate, }) => {
    const [taskName, setTaskName] = useState("");
    const [taskCategory, setTaskCategory] = useState("To Do");
    const [taskNotes, setTaskNotes] = useState("");
    useEffect(() => {
        if (isOpen) {
            setTaskName("");
            setTaskCategory("To Do");
            setTaskNotes("");
        }
    }, [isOpen]);
    if (!isOpen)
        return null;
    const handleCreate = () => {
        if (taskName.trim()) {
            onCreate(taskName, taskCategory, taskNotes.trim() || undefined);
        }
    };
    const handleKeyPress = (e) => {
        if (e.key === "Enter")
            handleCreate();
    };
    return (_jsx("div", { className: "fixed inset-0 flex items-center justify-center z-20 bg-black/50", onClick: (e) => e.target === e.currentTarget && onClose(), children: _jsxs("div", { className: "bg-white rounded-2xl w-[380px] shadow-2xl overflow-hidden animate-fadeIn", onClick: (e) => e.stopPropagation(), children: [_jsxs("div", { className: "bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4", children: [_jsx("h3", { className: "text-xl font-semibold text-white", children: "Create New Task" }), _jsx("p", { className: "text-blue-100 text-sm mt-1", children: startDate.toLocaleDateString() })] }), _jsxs("div", { className: "p-6 space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2 text-gray-700", children: "Task Name" }), _jsx("input", { type: "text", value: taskName, onChange: (e) => setTaskName(e.target.value), onKeyPress: handleKeyPress, placeholder: "e.g. Design Homepage UI", className: "w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition", autoFocus: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2 text-gray-700", children: "Category" }), _jsx("select", { value: taskCategory, onChange: (e) => setTaskCategory(e.target.value), className: "w-full px-4 py-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition", children: CATEGORIES.map((cat) => (_jsx("option", { value: cat, style: { color: CATEGORY_TEXT_COLOR[cat] }, children: cat }, cat))) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2 text-gray-700", children: "Notes" }), _jsx("textarea", { value: taskNotes, onChange: (e) => setTaskNotes(e.target.value), placeholder: "Add any notes or details...", rows: 3, className: "w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none" })] })] }), _jsxs("div", { className: "bg-gray-50 px-6 py-4 flex gap-3 border-t border-gray-200", children: [_jsx("button", { onClick: onClose, className: "flex-1 py-2 rounded-lg font-medium border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all", children: "Cancel" }), _jsx("button", { onClick: handleCreate, disabled: !taskName.trim(), className: `flex-1 py-2 rounded-lg text-white font-medium transition-all 
              ${taskName.trim()
                                ? "bg-green-600 hover:bg-green-700"
                                : "bg-gray-300 cursor-not-allowed"}`, children: "Create Task" })] })] }) }));
};
