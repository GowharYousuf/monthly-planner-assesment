export type TaskCategory = "To Do" | "In Progress" | "Review" | "Completed";

export interface Task {
  id: string;
  name: string;
  category: TaskCategory;
  startDate: string;
  endDate: string;
  notes?: string;
}

export interface DragSelection {
  startDay: number;
  endDay: number;
}

export interface ResizingTask {
  taskId: string;
  edge: "left" | "right";
}
