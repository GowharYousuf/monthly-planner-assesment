import React, { useState } from "react";
import { X } from "lucide-react";
import { Task } from "../types";
import { CATEGORY_COLORS } from "../constants";
import { TaskSegment } from "../utils/taskSegmentation";

interface TaskItemProps {
  task: Task;
  segment: TaskSegment;
  currentDate: Date;
  day: number;
  year: number;
  month: number;
  onMouseDown: (taskId: string, day: number) => void;
  onResizeStart: (taskId: string, edge: "left" | "right") => void;
  onDelete: (taskId: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  segment,
  day,
  onMouseDown,
  onResizeStart,
  onDelete,
}) => {
  const [isResizing, setIsResizing] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  if (!segment) return null;

  const handleResizeStart = (e: React.MouseEvent, edge: "left" | "right") => {
    e.stopPropagation();
    e.preventDefault();
    setIsResizing(true);
    onResizeStart(task.id, edge);

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener("mouseup", handleMouseUp);
    };
    document.addEventListener("mouseup", handleMouseUp);
  };

  const getBorderRadius = () => {
    if (segment.isFirst && segment.isLast) return "rounded";
    if (segment.isFirst) return "rounded-l";
    if (segment.isLast) return "rounded-r";
    return "";
  };

  // Check if THIS specific day is the start or end of the segment
  const isStartDay = segment.startDay === day;
  const isEndDay = segment.endDay === day;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString();
  };

  return (
    <div
      className={`${CATEGORY_COLORS[task.category]}
          text-white text-xs h-5 flex items-center ${getBorderRadius()}
          cursor-move group transition-all`}
      style={{
        width: "100%",
        marginLeft: segment.isFirst ? "0" : "-2px",
        marginRight: segment.isLast ? "0" : "-2px",
        position: "relative",
        zIndex: showTooltip ? 50 : 10,
        userSelect: isResizing ? "none" : "auto",
      }}
      onMouseDown={(e) => {
        if (!isResizing) {
          e.stopPropagation();
          onMouseDown(task.id, day);
        }
      }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Tooltip */}
      {showTooltip && isStartDay && (
        <div className="absolute bottom-full left-0 mb-2 bg-gray-900 text-white text-xs rounded-lg p-3 shadow-xl z-50 min-w-[200px] pointer-events-none">
          <div className="font-bold mb-1">{task.notes}</div>
          <div className="text-gray-300 mb-1">
            {formatDate(task.startDate)} - {formatDate(task.endDate)}
          </div>
          {task.name && (
            <div className="text-gray-400 border-t border-gray-700 pt-1 mt-1">
              {task.name}
            </div>
          )}
          <div className="absolute -bottom-1 left-4 w-2 h-2 bg-gray-900 rotate-45"></div>
        </div>
      )}
      {/* Left resize handle - ONLY on the actual start day */}
      {isStartDay && segment.isFirst && (
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-full flex items-center justify-center cursor-ew-resize z-20 opacity-0 group-hover:opacity-100 transition-opacity"
          onMouseDown={(e) => handleResizeStart(e, "left")}
        >
          <div
            className="w-1 border-t-4 border-b-4 border-r-4 
                          border-t-transparent border-b-transparent border-r-white"
          />
        </div>
      )}

      {/* Label - ONLY on the actual start day */}
      <span
        className="truncate flex-1 text-center pointer-events-none font-bold px-6"
        title={task.name}
      >
        {isStartDay && segment.isFirst ? task.name : ""}
      </span>

      {/* Delete button - ONLY on the actual end day */}
      {isEndDay && segment.isLast && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task.id);
          }}
          className="absolute -top-1 -right-3 bg-red-500 hover:bg-red-600 
                     text-white rounded-full w-5 h-5 flex items-center justify-center 
                     opacity-0 group-hover:opacity-100 transition-opacity z-20"
        >
          <X className="w-3 h-3" />
        </button>
      )}

      {/* Right resize handle - ONLY on the actual end day */}
      {isEndDay && segment.isLast && (
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-full flex items-center justify-center cursor-ew-resize z-20 opacity-0 group-hover:opacity-100 transition-opacity"
          onMouseDown={(e) => handleResizeStart(e, "right")}
        >
          <div
            className="w-1 border-t-4 border-b-4 border-l-4 
                          border-t-transparent border-b-transparent border-l-white"
          />
        </div>
      )}
    </div>
  );
};
