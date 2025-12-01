import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarHeaderProps {
  year: number;
  month: number;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  year,
  month,
  onPreviousMonth,
  onNextMonth,
}) => {
  return (
    <div className="flex items-center justify-between p-3 sm:p-4 md:p-6 border-b">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold truncate text-gray-600">
        {new Date(year, month).toLocaleString("default", {
          month: "long",
          year: "numeric",
        })}
      </h2>

      <div className="flex gap-1 sm:gap-2">
        <button
          onClick={onPreviousMonth}
          className="p-2 sm:p-3 hover:bg-gray-100 rounded transition"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <button
          onClick={onNextMonth}
          className="p-2 sm:p-3 hover:bg-gray-100 rounded transition"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
};
