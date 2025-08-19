import React, { useState } from "react";
import { useTimetable } from "../../context/TimetableContext";

export default function CohortForm() {
  const { addCohort } = useTimetable();
  const [name, setName] = useState("");
  const [size, setSize] = useState(30);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    addCohort({ name, size: Number(size) });
    setName(""); setSize(30);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
      <div>
        <label className="label">Cohort Name</label>
        <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., CS Year 1" />
      </div>
      <div>
        <label className="label">Size</label>
        <input className="input" type="number" min={1} value={size} onChange={(e) => setSize(e.target.value)} />
      </div>
      <button className="btn" type="submit">Save Cohort</button>
    </form>
  );
}

