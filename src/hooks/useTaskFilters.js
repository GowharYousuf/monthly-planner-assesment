import { useState, useMemo } from "react";
import { CATEGORIES } from "../constants";
export const useTaskFilters = (tasks) => {
    const [categoryFilters, setCategoryFilters] = useState(CATEGORIES);
    const [timeFilter, setTimeFilter] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const filteredTasks = useMemo(() => {
        return tasks.filter((task) => {
            if (!categoryFilters.includes(task.category))
                return false;
            if (timeFilter !== null) {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const filterDate = new Date(today);
                filterDate.setDate(filterDate.getDate() + timeFilter * 7);
                if (task.startDate > filterDate)
                    return false;
            }
            if (searchQuery &&
                !task.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                return false;
            }
            return true;
        });
    }, [tasks, categoryFilters, timeFilter, searchQuery]);
    return {
        categoryFilters,
        setCategoryFilters,
        timeFilter,
        setTimeFilter,
        searchQuery,
        setSearchQuery,
        filteredTasks,
    };
};
