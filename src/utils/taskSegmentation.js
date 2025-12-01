export const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
};
export const getTaskSegments = (task, year, month) => {
    const segments = [];
    if (!task.startDate || !task.endDate)
        return segments;
    const monthStart = new Date(year, month, 1);
    const monthEnd = new Date(year, month + 1, 0);
    const taskStart = task.startDate;
    const taskEnd = task.endDate;
    // Task must overlap with month
    if (taskEnd < monthStart || taskStart > monthEnd)
        return segments;
    // Clip to month boundaries
    const visibleStart = Math.max(1, taskStart.getMonth() === month && taskStart.getFullYear() === year
        ? taskStart.getDate()
        : 1);
    const visibleEnd = taskEnd.getMonth() === month && taskEnd.getFullYear() === year
        ? taskEnd.getDate()
        : monthEnd.getDate();
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    let currentDay = visibleStart;
    while (currentDay <= visibleEnd) {
        const dow = (firstDayOfMonth + currentDay - 1) % 7;
        const daysUntilWeekEnd = 6 - dow;
        const segmentEnd = Math.min(currentDay + daysUntilWeekEnd, visibleEnd);
        segments.push({
            task,
            startDay: currentDay,
            endDay: segmentEnd,
            isFirst: currentDay === visibleStart,
            isLast: segmentEnd === visibleEnd,
        });
        currentDay = segmentEnd + 1;
    }
    return segments;
};
