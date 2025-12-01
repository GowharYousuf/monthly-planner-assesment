import React from "react";
import { Search } from "lucide-react";
import { TaskCategory } from "../types";
import { CATEGORIES, CATEGORY_COLORS } from "../constants";

interface FilterPanelProps {
  categoryFilters: TaskCategory[];
  onCategoryFiltersChange: (filters: TaskCategory[]) => void;
  timeFilter: number | null;
  onTimeFilterChange: (weeks: number | null) => void;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  categoryFilters,
  onCategoryFiltersChange,
  timeFilter,
  onTimeFilterChange,
  searchQuery,
  onSearchQueryChange,
}) => {
  return (
    <div className="w-full lg:w-64 bg-white rounded-lg shadow p-3 sm:p-4 h-fit">
      <h3 className="font-semibold text-lg mb-3 sm:mb-4">Filters</h3>

      {/* Search */}
      <div className="mb-3 sm:mb-4">
        <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">
          Search Tasks
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            placeholder="Search by name..."
            className="w-full pl-9 pr-3 py-2 border rounded-md text-sm"
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Categories</label>
        {CATEGORIES.map((cat) => (
          <label key={cat} className="flex items-center mb-2 cursor-pointer">
            <input
              type="checkbox"
              checked={categoryFilters.includes(cat)}
              onChange={(e) => {
                if (e.target.checked) {
                  onCategoryFiltersChange([...categoryFilters, cat]);
                } else {
                  onCategoryFiltersChange(
                    categoryFilters.filter((c) => c !== cat)
                  );
                }
              }}
              className="mr-2"
            />
            <span
              className={`w-3 h-3 rounded mr-2 ${CATEGORY_COLORS[cat]}`}
            ></span>
            <span className="text-sm">{cat}</span>
          </label>
        ))}
      </div>

      {/* Time Filters */}
      <div>
        <label className="block text-sm font-medium mb-2">Time Range</label>
        {[1, 2, 3].map((weeks) => (
          <label key={weeks} className="flex items-center mb-2 cursor-pointer">
            <input
              type="radio"
              name="timeFilter"
              checked={timeFilter === weeks}
              onChange={() => onTimeFilterChange(weeks)}
              className="mr-2"
            />
            <span className="text-sm">
              Within {weeks} week{weeks > 1 ? "s" : ""}
            </span>
          </label>
        ))}
        <label className="flex items-center mb-2 cursor-pointer">
          <input
            type="radio"
            name="timeFilter"
            checked={timeFilter === null}
            onChange={() => onTimeFilterChange(null)}
            className="mr-2"
          />
          <span className="text-sm">All tasks</span>
        </label>
      </div>
    </div>
  );
};
