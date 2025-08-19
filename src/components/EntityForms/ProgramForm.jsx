import React, { useState } from "react";
import { useTimetable } from "../../context/TimetableContext";

const emptyCourse = { code: "", name: "", hoursPerWeek: 2, cohorts: [] };

export default function ProgramForm() {
  const { cohorts, addProgram } = useTimetable();
  const [name, setName] = useState("");
  const [courses, setCourses] = useState([{ ...emptyCourse }]);

  const addCourseRow = () => setCourses((c) => [...c, { ...emptyCourse }]);
  const rmCourseRow = (idx) => setCourses((cs) => cs.filter((_, i) => i !== idx));

  const updateCourse = (idx, field, val) => {
    setCourses((cs) => cs.map((c, i) => (i === idx ? { ...c, [field]: val } : c)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    const sanitized = courses
      .filter((c) => c.code && c.name)
      .map((c) => ({ ...c, hoursPerWeek: Number(c.hoursPerWeek) || 1, cohorts: c.cohorts }));
    addProgram({ name, courses: sanitized });
    setName("");
    setCourses([{ ...emptyCourse }]);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
      <div>
        <label className="label">Program Name</label>
        <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., BSc Computer Science" />
      </div>

      <div style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: 12, maxHeight: 300, overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <strong>Courses</strong>
          <button type="button" className="btn secondary" onClick={addCourseRow}>Add Course</button>
        </div>
        {courses.map((course, idx) => (
          <div key={idx} className="row" style={{ marginTop: 8 }}>
            <input className="input" placeholder="Code (CS101)" value={course.code} onChange={(e) => updateCourse(idx, "code", e.target.value)} />
            <input className="input" placeholder="Course Name" value={course.name} onChange={(e) => updateCourse(idx, "name", e.target.value)} />
            <input className="input" type="number" min={1} max={10} placeholder="Hours/Week" value={course.hoursPerWeek} onChange={(e) => updateCourse(idx, "hoursPerWeek", e.target.value)} />
            <select className="input" multiple value={course.cohorts} onChange={(e) => updateCourse(idx, "cohorts", Array.from(e.target.selectedOptions).map(o => o.value))}>
              {cohorts.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <button type="button" className="btn secondary" onClick={() => rmCourseRow(idx)}>Remove</button>
          </div>
        ))}
      </div>

      <button className="btn" type="submit">Save Program</button>
    </form>
  );
}