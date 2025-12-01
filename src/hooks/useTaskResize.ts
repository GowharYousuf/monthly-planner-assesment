import { useState, useEffect } from "react";
import { Task, ResizingTask } from "../types";

export const useTaskResize = (
  tasks: Task[],
  updateTask: (taskId: string, updates: Partial<Task>) => void,
  year: number,
  month: number,
  daysInMonth: number
) => {
  const [resizingTask, setResizingTask] = useState<ResizingTask | null>(null);

  const handleResizeStart = (taskId: string, edge: "left" | "right") => {
    setResizingTask({ taskId, edge });
  };

  const handleResize = (day: number) => {
    if (!resizingTask) return;

    const task = tasks.find((t) => t.id === resizingTask.taskId);
    if (!task) return;

    if (resizingTask.edge === "left") {
      const newStartDay = day;
      if (newStartDay >= 1 && newStartDay <= task.endDate.getDate()) {
        updateTask(resizingTask.taskId, {
          startDate: new Date(year, month, newStartDay),
        });
      }
    } else {
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
