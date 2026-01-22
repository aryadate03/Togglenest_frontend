import React from "react";

export default function StatsCard({ title, value, subtitle }) {
  return (
    <div style={{ background: "#fff", borderRadius: 8, padding: 20, boxShadow: "0 0 5px #ccc" }}>
      <h4>{title}</h4>
      <p style={{ fontSize: 26, fontWeight: "bold" }}>{value}</p>
      <p style={{ color: "#666" }}>{subtitle}</p>
    </div>
  );
}