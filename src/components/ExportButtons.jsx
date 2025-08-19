import React from "react";
import { useTimetable } from "../context/TimetableContext";
import { exportToExcel } from "../utils/exportExcel";
import { exportToPDF } from "../utils/exportPDF";

export default function ExportButtons() {
  const { timetable } = useTimetable();

  return (
    <div style={{ display: "flex", gap: 8 }}>
      <button className="btn secondary" onClick={() => exportToExcel(timetable)}>Export Excel</button>
      <button className="btn" onClick={() => exportToPDF(timetable)}>Export PDF</button>
    </div>
  );
}