import React, { useMemo } from "react";
import { Task } from "../types";
import { CalendarDay } from "./CalendarDay";
import { DAYS_OF_WEEK } from "../constants";
import { getTaskSegments, TaskSegment } from "../utils/taskSegmentation";

export interface CalendarGridProps {
  calendarDays: (number | null)[];
  year: number;
  month: number;
  getTasksForDay: (day: number) => Task[];
  isInDragSelection: (day: number) => boolean;
  onDayMouseDown: (day: number) => void;
  onDayMouseEnter: (day: number) => void;
  onTaskMouseDown: (taskId: string, day: number) => void;
  onResizeStart: (taskId: string, edge: "left" | "right") => void;
  onDeleteTask: (taskId: string) => void;
}

export const CalendarGrid = React.forwardRef<HTMLDivElement, CalendarGridProps>(
  (
    {
      calendarDays,
      year,
      month,
      getTasksForDay,
      isInDragSelection,
      onDayMouseDown,
      onDayMouseEnter,
      onTaskMouseDown,
      onResizeStart,
      onDeleteTask,
    },
    ref
  ) => {
    const segmentsByDay = useMemo(() => {
      const map = new Map<number, TaskSegment[]>();
      const seenTaskIds = new Set<string>();
      const allTasks: Task[] = [];

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
            map.get(d)!.push(segment);
          }
        });
      });

      return map;
    }, [calendarDays, getTasksForDay, year, month]);

    return (
      <div className="w-full p-2" ref={ref}>
        <div className="w-full">
          <div className="grid grid-cols-7 gap-0  mb-2">
            {DAYS_OF_WEEK.map((d) => (
              <div
                key={d}
                className="text-center font-semibold text-[10px] sm:text-xs md:text-sm text-gray-700 py-1"
                aria-hidden
              >
                {d}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 ">
            {calendarDays.map((day, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-gray-200 bg-white p-0.5 sm:p-1 min-h-[56px] md:min-h-[72px] overflow-visible"
              >
                <CalendarDay
                  day={day}
                  year={year}
                  month={month}
                  tasks={day ? getTasksForDay(day) : []}
                  taskSegments={day ? segmentsByDay.get(day) || [] : []}
                  isInDragSelection={day ? isInDragSelection(day) : false}
                  onMouseDown={() => day && onDayMouseDown(day)}
                  onMouseEnter={() => day && onDayMouseEnter(day)}
                  onTaskMouseDown={onTaskMouseDown}
                  onResizeStart={onResizeStart}
                  onDeleteTask={onDeleteTask}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

CalendarGrid.displayName = "CalendarGrid";
