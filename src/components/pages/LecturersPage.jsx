import React from "react";
import { useTimetable } from "../../context/TimetableContext";
import LecturerForm from "../EntityForms/LecturerForm";

export default function LecturersPage() {
  const { lecturers, removeLecturer } = useTimetable();

  return (
    <div>
      <h2>Lecturers</h2>
      <LecturerForm />
      <div className="list">
        {lecturers.map(l => (
          <div key={l.id} className="list-item">
            <div>
              <strong>{l.name}</strong>
              <div className="small">Teaches: {l.courses.join(", ") || "—"}</div>
            </div>
            <button className="btn secondary" onClick={() => removeLecturer(l.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
