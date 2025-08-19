import React from "react";
import { useTimetable } from "../../context/TimetableContext";
import ProgramForm from "../EntityForms/ProgramForm";

export default function ProgramsPage() {
  const { programs, removeProgram } = useTimetable();

  return (
    <div>
      <h2>Programs</h2>
      <ProgramForm />
      <div className="list">
        {programs.map((p) => (
          <div key={p.id} className="list-item">
            <div>
              <strong>{p.name}</strong>
              <div className="small">Courses: {p.courses.map(c => c.code).join(", ")}</div>
            </div>
            <button className="btn secondary" onClick={() => removeProgram(p.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
