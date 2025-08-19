import React from "react";
import { useTimetable } from "../../context/TimetableContext";
import TimetableGrid from "../TimetableGrid";
import ExportButtons from "../ExportButtons";

export default function DashboardPage() {
  const { timetable, regenerate } = useTimetable();

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
        <h2>Generated Timetable</h2>
        <button className="btn" onClick={regenerate}>Generate Timetable</button>
      </div>
      <ExportButtons />
      <TimetableGrid timetable={timetable} />
    </div>
  );
}
