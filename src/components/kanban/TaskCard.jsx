import React from "react";

export default function TaskCard({ task, color }) {
  return (
    <div style={{ padding: 12, borderRadius: 8, marginBottom: 12, background: color }}>
      <h4 style={{ margin: 0 }}>{task.title}</h4>
      <p style={{ margin: "6px 0 0", fontSize: 13 }}>{task.desc}</p>
    </div>
  );
}