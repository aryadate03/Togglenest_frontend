import React from "react";
import KanbanColumn from "./KanbanColumn";

const columns = [
  {
    title: "Backlog",
    color: "#e9ddff",
    tasks: [
      { id: 1, title: "Project Setup", desc: "Initial project structure" },
      { id: 2, title: "Requirement Analysis", desc: "Gather requirements" },
    ],
  },
  {
    title: "To Do",
    color: "#d6f5e3",
    tasks: [
      { id: 3, title: "UI Design", desc: "Design dashboard UI" },
      { id: 4, title: "API Planning", desc: "Define API contracts" },
    ],
  },
  {
    title: "In Progress",
    color: "#ffe4cc",
    tasks: [
      { id: 5, title: "Frontend Development", desc: "Build React components" },
    ],
  },
  {
    title: "Done",
    color: "#ffd6d6",
    tasks: [
      { id: 6, title: "Login Page", desc: "Auth UI completed" },
    ],
  },
];

export default function KanbanBoard() {
  return (
    <div style={{ padding: 20, background: "#f5f7fa", minHeight: "100vh" }}>
      <h2>Kanban Board</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
        {columns.map((col, i) => (
          <KanbanColumn key={i} column={col} />
        ))}
      </div>
    </div>
  );
}