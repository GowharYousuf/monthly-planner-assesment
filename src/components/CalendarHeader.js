import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChevronLeft, ChevronRight } from "lucide-react";
export const CalendarHeader = ({ year, month, onPreviousMonth, onNextMonth, }) => {
    return (_jsxs("div", { className: "flex items-center justify-between p-3 sm:p-4 md:p-6 border-b", children: [_jsx("h2", { className: "text-xl sm:text-2xl md:text-3xl font-bold truncate text-gray-600", children: new Date(year, month).toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                }) }), _jsxs("div", { className: "flex gap-1 sm:gap-2", children: [_jsx("button", { onClick: onPreviousMonth, className: "p-2 sm:p-3 hover:bg-gray-100 rounded transition", children: _jsx(ChevronLeft, { className: "w-4 h-4 sm:w-5 sm:h-5" }) }), _jsx("button", { onClick: onNextMonth, className: "p-2 sm:p-3 hover:bg-gray-100 rounded transition", children: _jsx(ChevronRight, { className: "w-4 h-4 sm:w-5 sm:h-5" }) })] })] }));
};
