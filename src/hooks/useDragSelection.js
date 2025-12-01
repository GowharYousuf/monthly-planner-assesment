import { useState, useEffect } from "react";
export const useDragSelection = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [dragSelection, setDragSelection] = useState(null);
    const handleMouseDown = (day) => {
        setIsDragging(true);
        setDragSelection({ startDay: day, endDay: day });
    };
    const handleMouseEnter = (day) => {
        if (isDragging && dragSelection) {
            setDragSelection({ ...dragSelection, endDay: day });
        }
    };
    const handleMouseUp = () => {
        setIsDragging(false);
    };
    const clearSelection = () => {
        setDragSelection(null);
    };
    useEffect(() => {
        const handleGlobalMouseUp = () => {
            if (isDragging) {
                handleMouseUp();
            }
        };
        document.addEventListener("mouseup", handleGlobalMouseUp);
        return () => document.removeEventListener("mouseup", handleGlobalMouseUp);
    }, [isDragging]);
    const isInDragSelection = (day) => {
        if (!dragSelection)
            return false;
        const min = Math.min(dragSelection.startDay, dragSelection.endDay);
        const max = Math.max(dragSelection.startDay, dragSelection.endDay);
        return day >= min && day <= max;
    };
    return {
        isDragging,
        dragSelection,
        handleMouseDown,
        handleMouseEnter,
        handleMouseUp,
        clearSelection,
        isInDragSelection,
    };
};
