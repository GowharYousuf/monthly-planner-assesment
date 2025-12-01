import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useMemo } from "react";
import { CalendarDay } from "./CalendarDay";
import { DAYS_OF_WEEK } from "../constants";
import { getTaskSegments } from "../utils/taskSegmentation";
export const CalendarGrid = React.forwardRef(({ calendarDays, year, month, getTasksForDay, isInDragSelection, onDayMouseDown, onDayMouseEnter, onTaskMouseDown, onResizeStart, onDeleteTask, }, ref) => {
    const segmentsByDay = useMemo(() => {
        const map = new Map();
        const seenTaskIds = new Set();
        const allTasks = [];
        calendarDays.forEach((day) => {
            if (day) {
                const dayTasks = getTasksForDay(day);
                dayTasks.forEach((task) => {
                    if (!seenTaskIds.has(task.id)) {
                        seenTaskIds.add(task.id);
                        allTasks.push(task);
                    }
                });
            }
        });
        allTasks.forEach((task) => {
            const segments = getTaskSegments(task, year, month);
            segments.forEach((segment) => {
                for (let d = segment.startDay; d <= segment.endDay; d++) {
                    if (!map.has(d)) {
                        map.set(d, []);
                    }
                    map.get(d).push(segment);
                }
            });
        });
        return map;
    }, [calendarDays, getTasksForDay, year, month]);
    return (_jsx("div", { className: "w-full p-2", ref: ref, children: _jsxs("div", { className: "w-full", children: [_jsx("div", { className: "grid grid-cols-7 gap-0  mb-2", children: DAYS_OF_WEEK.map((d) => (_jsx("div", { className: "text-center font-semibold text-[10px] sm:text-xs md:text-sm text-gray-700 py-1", "aria-hidden": true, children: d }, d))) }), _jsx("div", { className: "grid grid-cols-7 ", children: calendarDays.map((day, idx) => (_jsx("div", { className: "rounded-lg border border-gray-200 bg-white p-0.5 sm:p-1 min-h-[56px] md:min-h-[72px] overflow-visible", children: _jsx(CalendarDay, { day: day, year: year, month: month, tasks: day ? getTasksForDay(day) : [], taskSegments: day ? segmentsByDay.get(day) || [] : [], isInDragSelection: day ? isInDragSelection(day) : false, onMouseDown: () => day && onDayMouseDown(day), onMouseEnter: () => day && onDayMouseEnter(day), onTaskMouseDown: onTaskMouseDown, onResizeStart: onResizeStart, onDeleteTask: onDeleteTask }) }, idx))) })] }) }));
});
CalendarGrid.displayName = "CalendarGrid";
