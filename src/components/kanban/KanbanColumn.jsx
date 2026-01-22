import React from "react";
import TaskCard from "./TaskCard";

export default function KanbanColumn({ column }) {
  return (
    <div style={{ background: "#fff", padding: 15, borderRadius: 10, minHeight: 400, boxShadow: "0 0 8px rgba(0,0,0,0.1)" }}>
      <h3 style={{ marginBottom: 15 }}>{column.title}</h3>
      {column.tasks.map(task => (
        <TaskCard key={task.id} task={task} color={column.color} />
      ))}
    </div>
  );
}