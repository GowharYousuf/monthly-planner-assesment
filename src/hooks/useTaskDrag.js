import { useState, useEffect } from "react";
export const useTaskDrag = (tasks, updateTask, year, month, daysInMonth) => {
    const [draggedTask, setDraggedTask] = useState(null);
    const [dragOffset, setDragOffset] = useState(0);
    const handleTaskMouseDown = (taskId, day) => {
        const task = tasks.find((t) => t.id === taskId);
        if (!task)
            return;
        document.body.style.userSelect = "none";
        setDraggedTask(taskId);
        setDragOffset(day - task.startDate.getDate());
    };
    const handleTaskDrag = (day) => {
        if (!draggedTask)
            return;
        const task = tasks.find((t) => t.id === draggedTask);
        if (!task)
            return;
        const start = new Date(task.startDate);
        const end = new Date(task.endDate);
        const duration = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
        const newStartDay = day - dragOffset;
        if (newStartDay >= 1 && newStartDay + duration <= daysInMonth) {
            updateTask(draggedTask, {
                startDate: new Date(year, month, newStartDay),
                endDate: new Date(year, month, newStartDay + duration),
            });
        }
    };
    const handleTaskMouseUp = () => {
        // ✅ Restore text selection when drag ends
        document.body.style.userSelect = "auto";
        setDraggedTask(null);
        setDragOffset(0);
    };
    useEffect(() => {
        const handleGlobalTaskMouseUp = () => {
            if (draggedTask) {
                handleTaskMouseUp();
            }
        };
        document.addEventListener("mouseup", handleGlobalTaskMouseUp);
        return () => {
            document.removeEventListener("mouseup", handleGlobalTaskMouseUp);
        };
    }, [draggedTask]);
    return {
        draggedTask,
        handleTaskMouseDown,
        handleTaskDrag,
        handleTaskMouseUp,
    };
};
