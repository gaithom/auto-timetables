import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { v4 as uuid } from "uuid";
import { useTimetable } from "../../context/TimetableContext";

const emptyCourse = { code: "", name: "", hoursPerWeek: 2, cohorts: [] };
const createCourseRow = (course) => ({ ...emptyCourse, ...course, localId: course?.localId || uuid() });

export default function ProgramForm({ program = null, onSuccess }) {
  const { cohorts, addProgram, updateProgram } = useTimetable();
  const [name, setName] = useState(program?.name || "");
  const [courses, setCourses] = useState(
    program?.courses?.length ? program.courses.map(createCourseRow) : [createCourseRow()]
  );

  useEffect(() => {
    setName(program?.name || "");
    setCourses(program?.courses?.length ? program.courses.map(createCourseRow) : [createCourseRow()]);
  }, [program]);

  const addCourseRow = () => setCourses((c) => [...c, createCourseRow()]);
  const rmCourseRow = (idx) => setCourses((cs) => cs.filter((_, i) => i !== idx));

  const updateCourse = (idx, field, val) => {
    setCourses((cs) => cs.map((c, i) => (i === idx ? { ...c, [field]: val } : c)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Program name is required");
      return;
    }
    const sanitized = courses
      .filter((c) => c.code && c.name)
      .map((c) => ({ ...c, hoursPerWeek: Number(c.hoursPerWeek) || 1, cohorts: c.cohorts }));
    if (sanitized.length === 0) {
      alert("Add at least one course with a code and name");
      return;
    }

    if (program) {
      updateProgram(program.id, { name: name.trim(), courses: sanitized });
    } else {
      addProgram({ name: name.trim(), courses: sanitized });
    }

    if (!program) {
      setName("");
      setCourses([{ ...emptyCourse }]);
    }
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
      <div>
        <label className="label" htmlFor="programNameInput">Program Name</label>
        <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., BSc Computer Science" />
      </div>

      <div style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: 12, maxHeight: 300, overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <strong>Courses</strong>
          <button type="button" className="btn secondary" onClick={addCourseRow}>Add Course</button>
        </div>
        {courses.map((course, idx) => (
          <div key={course.localId} className="row" style={{ marginTop: 8 }}>
            <label className="sr-only" htmlFor={`course-code-${course.localId}`}>Course Code</label>
            <input id={`course-code-${course.localId}`} className="input" placeholder="Code (CS101)" value={course.code} onChange={(e) => updateCourse(idx, "code", e.target.value)} />
            <label className="sr-only" htmlFor={`course-name-${course.localId}`}>Course Name</label>
            <input id={`course-name-${course.localId}`} className="input" placeholder="Course Name" value={course.name} onChange={(e) => updateCourse(idx, "name", e.target.value)} />
            <label className="sr-only" htmlFor={`course-hours-${course.localId}`}>Hours per week</label>
            <input id={`course-hours-${course.localId}`} className="input" type="number" min={1} max={10} placeholder="Hours/Week" value={course.hoursPerWeek} onChange={(e) => updateCourse(idx, "hoursPerWeek", e.target.value)} />
            <label className="sr-only" htmlFor={`course-cohorts-${course.localId}`}>Linked cohorts</label>
            <select id={`course-cohorts-${course.localId}`} className="input" multiple value={course.cohorts} onChange={(e) => updateCourse(idx, "cohorts", Array.from(e.target.selectedOptions).map(o => o.value))}>
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

ProgramForm.propTypes = {
  program: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    courses: PropTypes.arrayOf(
      PropTypes.shape({
        code: PropTypes.string,
        name: PropTypes.string,
        hoursPerWeek: PropTypes.number,
        cohorts: PropTypes.arrayOf(PropTypes.string),
      })
    ),
  }),
  onSuccess: PropTypes.func,
};