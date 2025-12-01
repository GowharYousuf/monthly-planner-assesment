# 📅 Monthly Planner — React Task Scheduling Calendar

A fully interactive **monthly planner** built with **React + TypeScript**, featuring drag-and-drop tasks, resizable task durations, date selection, filter panel, and a clean TailwindCSS UI.

---

## 🔗 Live Demo  
👉 **https://monthly-palnner.netlify.app/**

## 📦 GitHub Repository  
👉 **https://github.com/GowharYousuf/monthly-planner-assesment.git**

---

## 🚀 Features

### 📅 Calendar
- Full **6-row month grid** (42 cells)
- Highlights **today** with blue accent
- Hover and drag-selection support
- Clean responsive layout

### 📝 Task Management
- Add tasks with:
  - Title  
  - Category  
  - Start date & end date  
- Tasks span across multiple days
- Drag tasks to move across dates
- Resize tasks using left/right handles
- Delete tasks via quick action button

### 🎛 Filters & Panels
- Filter tasks by category
- Quick toggles
- Smooth UI transitions

### ⚡ Advanced Interactions
Implemented with custom React hooks:

| Hook | Feature |
|------|---------|
| `useDragSelection` | Day-range drag selection |
| `useTaskDrag` | Dragging tasks across days |
| `useTaskResize` | Resize start/end date of tasks |
| `useTaskFilters` | Category filtering logic |

---

## 🛠 Tech Stack

- **React** + **TypeScript**
- **TailwindCSS**
- **Custom React Hooks**
- **Date Utilities (custom)**

---


## 📥 Installation & Setup

### 1️⃣ Clone the repository
```sh
git clone https://github.com/GowharYousuf/assesment-monthly-planner.git
cd assesment-monthly-planner
npm install
npm run dev


