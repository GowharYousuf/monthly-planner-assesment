import { TaskCategory } from '../types';

export const CATEGORIES: TaskCategory[] = ['To Do', 'In Progress', 'Review', 'Completed'];

export const CATEGORY_COLORS: Record<TaskCategory, string> = {
  'To Do': 'bg-blue-500',
  'In Progress': 'bg-yellow-500',
  'Review': 'bg-purple-500',
  'Completed': 'bg-green-500'
};

export const CATEGORY_TEXT_COLOR: Record<TaskCategory, string> = {
  'To Do': '#3B82F6',       // Blue
  'In Progress': '#EAB308', // Yellow
  'Review': '#A855F7',      // Purple
  'Completed': '#22C55E'    // Green
};

export const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];