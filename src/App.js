import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from "react";
import "./index.css";
import { getDaysInMonth, generateCalendarDays, isDateInRange, } from "./utils/dateUtils";
import { useTaskFilters } from "./hooks/useTaskFilters";
import { useDragSelection } from "./hooks/useDragSelection";
import { useTaskDrag } from "./hooks/useTaskDrag";
import { useTaskResize } from "./hooks/useTaskResize";
import { FilterPanel } from "./components/FilterPanel";
import { CalendarHeader } from "./components/CalendarHeader";
import { CalendarGrid } from "./components/CalendarGrid";
import { TaskModal } from "./components/TaskModal";
const App = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [tasks, setTasks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState({
        startDate: new Date(),
        endDate: new Date(),
    });
    const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentDate);
    const calendarDays = generateCalendarDays(daysInMonth, startingDayOfWeek);
    const { categoryFilters, setCategoryFilters, timeFilter, setTimeFilter, searchQuery, setSearchQuery, filteredTasks, } = useTaskFilters(tasks);
    const { isDragging, dragSelection, handleMouseDown, handleMouseEnter, clearSelection, isInDragSelection, } = useDragSelection();
    const updateTask = (taskId, updates) => {
        setTasks(tasks.map((t) => (t.id === taskId ? { ...t, ...updates } : t)));
    };
    const { draggedTask, handleTaskMouseDown, handleTaskDrag } = useTaskDrag(tasks, updateTask, year, month, daysInMonth);
    const { resizingTask, handleResizeStart, handleResize } = useTaskResize(tasks, updateTask, year, month, daysInMonth);
    const goToPreviousMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };
    const goToNextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };
    const createTask = (name, category) => {
        const newTask = {
            id: Date.now().toString(),
            name,
            startDate: modalData.startDate,
            endDate: modalData.endDate,
            category,
        };
        setTasks([...tasks, newTask]);
        setIsModalOpen(false);
    };
    const deleteTask = (taskId) => {
        setTasks(tasks.filter((t) => t.id !== taskId));
    };
    const getTasksForDay = (day) => {
        const date = new Date(year, month, day);
        return filteredTasks.filter((task) => isDateInRange(date, task.startDate, task.endDate));
    };
    const handleDayMouseEnter = (day) => {
        if (isDragging) {
            handleMouseEnter(day);
        }
        else if (draggedTask) {
            handleTaskDrag(day);
        }
        else if (resizingTask) {
            handleResize(day);
        }
    };
    // Handle drag selection completion
    React.useEffect(() => {
        if (!isDragging && dragSelection) {
            const start = Math.min(dragSelection.startDay, dragSelection.endDay);
            const end = Math.max(dragSelection.startDay, dragSelection.endDay);
            setModalData({
                startDate: new Date(year, month, start),
                endDate: new Date(year, month, end),
            });
            setIsModalOpen(true);
            clearSelection();
        }
    }, [isDragging, dragSelection]);
    return (_jsxs("div", { className: "min-h-screen bg-gray-50 p-4", children: [_jsx("div", { className: "max-w-7xl mx-auto", children: _jsxs("div", { className: "flex gap-4", children: [_jsx(FilterPanel, { categoryFilters: categoryFilters, onCategoryFiltersChange: setCategoryFilters, timeFilter: timeFilter, onTimeFilterChange: setTimeFilter, searchQuery: searchQuery, onSearchQueryChange: setSearchQuery }), _jsx("div", { className: "flex-1", children: _jsxs("div", { className: "bg-white rounded-lg shadow", children: [_jsx(CalendarHeader, { year: year, month: month, onPreviousMonth: goToPreviousMonth, onNextMonth: goToNextMonth }), _jsx(CalendarGrid, { calendarDays: calendarDays, year: year, month: month, getTasksForDay: getTasksForDay, isInDragSelection: isInDragSelection, onDayMouseDown: handleMouseDown, onDayMouseEnter: handleDayMouseEnter, onTaskMouseDown: handleTaskMouseDown, onResizeStart: handleResizeStart, onDeleteTask: deleteTask })] }) })] }) }), _jsx(TaskModal, { isOpen: isModalOpen, startDate: modalData.startDate, endDate: modalData.endDate, onClose: () => setIsModalOpen(false), onCreate: createTask })] }));
};
export default App;
