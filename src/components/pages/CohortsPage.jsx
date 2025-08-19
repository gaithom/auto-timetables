import React from "react";
import { useTimetable } from "../../context/TimetableContext";
import CohortForm from "../EntityForms/CohortForm";

export default function CohortsPage() {
  const { cohorts, removeCohort } = useTimetable();

  return (
    <div>
      <h2>Cohorts</h2>
      <CohortForm />
      <div className="list">
        {cohorts.map(c => (
          <div key={c.id} className="list-item">
            <div>
              <strong>{c.name}</strong>
              <div className="small">Size: {c.size}</div>
            </div>
            <button className="btn secondary" onClick={() => removeCohort(c.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
