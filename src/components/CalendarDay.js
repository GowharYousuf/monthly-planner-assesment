import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TaskItem } from "./TaskItem";
export const CalendarDay = ({ day, year, month, taskSegments, isInDragSelection, onMouseDown, onMouseEnter, onTaskMouseDown, onResizeStart, onDeleteTask, }) => {
    if (!day) {
        return _jsx("div", { className: " min-h-20" });
    }
    const today = new Date();
    const isToday = day === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear();
    // CRITICAL FIX: Filter segments to only show those that include this specific day
    const daySegments = taskSegments.filter((segment) => segment.startDay <= day && segment.endDay >= day);
    return (_jsxs("div", { className: `
        relative min-h-20 cursor-pointer overflow-visible
        ${isToday ? "bg-blue-50 border-blue-500" : "bg-white"}
        ${isInDragSelection ? "bg-blue-100 border-blue-400" : ""}
      `, onMouseDown: onMouseDown, onMouseEnter: onMouseEnter, children: [_jsx("div", { className: `absolute top-1 left-1 text-xs sm:text-sm font-semibold pointer-events-none ${isToday ? "text-blue-700" : "text-gray-600"}`, children: day }), _jsx("div", { className: "absolute inset-0 flex flex-col justify-center w-36", children: daySegments.map((segment, index) => (_jsx(TaskItem, { task: segment.task, segment: segment, currentDate: new Date(year, month, day), day: day, year: year, month: month, onMouseDown: onTaskMouseDown, onResizeStart: onResizeStart, onDelete: onDeleteTask }, `${segment.task.id}-${segment.startDay}-${index}`))) })] }));
};
