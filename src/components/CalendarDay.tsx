import React from "react";
import { Task } from "../types";
import { TaskItem } from "./TaskItem";
import { TaskSegment } from "../utils/taskSegmentation";

interface CalendarDayProps {
  day: number | null;
  year: number;
  month: number;
  tasks: Task[];
  taskSegments: TaskSegment[];
  isInDragSelection: boolean;
  onMouseDown: () => void;
  onMouseEnter: () => void;
  onTaskMouseDown: (taskId: string, day: number) => void;
  onResizeStart: (taskId: string, edge: "left" | "right") => void;
  onDeleteTask: (taskId: string) => void;
}

export const CalendarDay: React.FC<CalendarDayProps> = ({
  day,
  year,
  month,
  taskSegments,
  isInDragSelection,
  onMouseDown,
  onMouseEnter,
  onTaskMouseDown,
  onResizeStart,
  onDeleteTask,
}) => {
  if (!day) {
    return <div className=" min-h-20" />;
  }

  const today = new Date();
  const isToday =
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  // CRITICAL FIX: Filter segments to only show those that include this specific day
  const daySegments = taskSegments.filter(
    (segment) => segment.startDay <= day && segment.endDay >= day
  );

  return (
    <div
      className={`
        relative min-h-20 cursor-pointer overflow-visible
        ${isToday ? "bg-blue-50 border-blue-500" : "bg-white"}
        ${isInDragSelection ? "bg-blue-100 border-blue-400" : ""}
      `}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
    >
      {/* Day number */}
      <div
        className={`absolute top-1 left-1 text-xs sm:text-sm font-semibold pointer-events-none ${
          isToday ? "text-blue-700" : "text-gray-600"
        }`}
      >
        {day}
      </div>

      {/* Task bars - only render segments that include this day */}
      <div className="absolute inset-0 flex flex-col justify-center w-36">
        {daySegments.map((segment, index) => (
          <TaskItem
            key={`${segment.task.id}-${segment.startDay}-${index}`}
            task={segment.task}
            segment={segment}
            currentDate={new Date(year, month, day)}
            day={day}
            year={year}
            month={month}
            onMouseDown={onTaskMouseDown}
            onResizeStart={onResizeStart}
            onDelete={onDeleteTask}
          />
        ))}
      </div>
    </div>
  );
};
