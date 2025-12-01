import { useState, useEffect } from "react";
export const useTaskResize = (tasks, updateTask, year, month, daysInMonth) => {
    const [resizingTask, setResizingTask] = useState(null);
    const handleResizeStart = (taskId, edge) => {
        setResizingTask({ taskId, edge });
    };
    const handleResize = (day) => {
        if (!resizingTask)
            return;
        const task = tasks.find((t) => t.id === resizingTask.taskId);
        if (!task)
            return;
        if (resizingTask.edge === "left") {
            const newStartDay = day;
            if (newStartDay >= 1 && newStartDay <= task.endDate.getDate()) {
                updateTask(resizingTask.taskId, {
                    startDate: new Date(year, month, newStartDay),
                });
            }
        }
        else {
            const newEndDay = day;
            if (newEndDay <= daysInMonth && newEndDay >= task.startDate.getDate()) {
                updateTask(resizingTask.taskId, {
                    endDate: new Date(year, month, newEndDay),
                });
            }
        }
    };
    const handleResizeEnd = () => {
        setResizingTask(null);
    };
    useEffect(() => {
        const handleGlobalResizeEnd = () => {
            if (resizingTask) {
                handleResizeEnd();
            }
        };
        document.addEventListener("mouseup", handleGlobalResizeEnd);
        return () => document.removeEventListener("mouseup", handleGlobalResizeEnd);
    }, [resizingTask]);
    return {
        resizingTask,
        handleResizeStart,
        handleResize,
        handleResizeEnd,
    };
};
