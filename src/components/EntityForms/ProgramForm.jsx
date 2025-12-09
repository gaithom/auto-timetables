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
    <form onSubmit={handleSubmit} className="program-form">
      <div className="form-group">
        <label className="form-label" htmlFor="programNameInput">
          Program Name
          <span className="required">*</span>
        </label>
        <input 
          id="programNameInput"
          className="form-input" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="e.g., BSc Computer Science" 
          required
        />
      </div>

      <div className="courses-section">
        <div className="section-header">
          <h3 className="section-title">Courses</h3>
          <button 
            type="button" 
            className="btn btn-secondary btn-sm" 
            onClick={addCourseRow}
          >
            + Add Course
          </button>
        </div>
        
        <div className="courses-list">
          {courses.map((course, idx) => (
            <div key={course.localId} className="course-card">
              <div className="course-row">
                <div className="form-group">
                  <label className="form-label" htmlFor={`course-code-${course.localId}`}>
                    Course Code <span className="required">*</span>
                  </label>
                  <input 
                    id={`course-code-${course.localId}`} 
                    className="form-input" 
                    placeholder="CS101" 
                    value={course.code} 
                    onChange={(e) => updateCourse(idx, "code", e.target.value)} 
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label" htmlFor={`course-name-${course.localId}`}>
                    Course Name <span className="required">*</span>
                  </label>
                  <input 
                    id={`course-name-${course.localId}`} 
                    className="form-input" 
                    placeholder="Introduction to Programming" 
                    value={course.name} 
                    onChange={(e) => updateCourse(idx, "name", e.target.value)} 
                    required
                  />
                </div>
                
                <div className="form-group hours-input">
                  <label className="form-label" htmlFor={`course-hours-${course.localId}`}>
                    Hours/Week
                  </label>
                  <input 
                    id={`course-hours-${course.localId}`} 
                    className="form-input" 
                    type="number" 
                    min={1} 
                    max={40} 
                    value={course.hoursPerWeek} 
                    onChange={(e) => updateCourse(idx, "hoursPerWeek", e.target.value)} 
                  />
                </div>
                
                <button 
                  type="button" 
                  className="btn btn-danger btn-sm remove-btn" 
                  onClick={() => rmCourseRow(idx)}
                  title="Remove course"
                >
                  ×
                </button>
              </div>
              
              <div className="form-group cohorts-select">
                <label className="form-label" htmlFor={`course-cohorts-${course.localId}`}>
                  Linked Cohorts (Hold Ctrl/Cmd to select multiple)
                </label>
                <select 
                  id={`course-cohorts-${course.localId}`} 
                  className="form-input" 
                  multiple 
                  value={course.cohorts} 
                  onChange={(e) => updateCourse(idx, "cohorts", Array.from(e.target.selectedOptions).map(o => o.value))}
                >
                  {cohorts.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <div className="selected-cohorts">
                  {course.cohorts.length > 0 ? (
                    course.cohorts.map(cohortId => {
                      const cohort = cohorts.find(c => c.id === cohortId);
                      return cohort ? (
                        <span key={cohortId} className="cohort-tag">
                          {cohort.name}
                        </span>
                      ) : null;
                    })
                  ) : (
                    <span className="text-muted">No cohorts selected</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="form-actions">
        <button className="btn btn-primary" type="submit">
          {program ? 'Update Program' : 'Create Program'}
        </button>
      </div>
      
      <style jsx>{`
        .program-form {
          display: grid;
          gap: 1.5rem;
        }
        
        .form-group {
          margin-bottom: 1rem;
        }
        
        .form-label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: var(--text-primary);
        }
        
        .required {
          color: #ef4444;
          margin-left: 0.25rem;
        }
        
        .form-input {
          width: 100%;
          padding: 0.5rem 0.75rem;
          border: 1px solid var(--border-color);
          border-radius: 0.375rem;
          background-color: var(--surface-alt);
          color: var(--text-primary);
          transition: border-color 0.2s;
        }
        
        .form-input:focus {
          outline: none;
          border-color: var(--accent-color);
          box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
        }
        
        .courses-section {
          border: 1px solid var(--border-color);
          border-radius: 0.5rem;
          padding: 1.25rem;
          background-color: var(--surface);
        }
        
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        
        .section-title {
          margin: 0;
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        
        .courses-list {
          display: grid;
          gap: 1rem;
        }
        
        .course-card {
          padding: 1rem;
          border: 1px solid var(--border-color);
          border-radius: 0.375rem;
          background-color: var(--surface-alt);
        }
        
        .course-row {
          display: grid;
          grid-template-columns: 1fr 2fr 100px auto;
          gap: 1rem;
          align-items: flex-end;
          margin-bottom: 1rem;
        }
        
        .hours-input {
          max-width: 100px;
        }
        
        .remove-btn {
          margin-left: 0.5rem;
          padding: 0.25rem 0.5rem;
          min-width: auto;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .cohorts-select {
          margin-top: 0.5rem;
        }
        
        .selected-cohorts {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 0.5rem;
        }
        
        .cohort-tag {
          background-color: var(--accent-soft);
          color: var(--accent-strong);
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.75rem;
          font-weight: 500;
        }
        
        .form-actions {
          display: flex;
          justify-content: flex-end;
          margin-top: 1rem;
        }
        
        .btn {
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          border: 1px solid transparent;
        }
        
        .btn-sm {
          padding: 0.25rem 0.5rem;
          font-size: 0.875rem;
        }
        
        .btn-primary {
          background-color: var(--accent-color);
          color: white;
        }
        
        .btn-primary:hover {
          background-color: var(--accent-hover);
        }
        
        .btn-secondary {
          background-color: var(--surface-alt);
          border-color: var(--border-color);
          color: var(--text-primary);
        }
        
        .btn-secondary:hover {
          background-color: var(--surface-hover);
        }
        
        .btn-danger {
          background-color: #fee2e2;
          color: #dc2626;
          border-color: #fca5a5;
        }
        
        .btn-danger:hover {
          background-color: #fecaca;
        }
        
        .text-muted {
          color: var(--text-secondary);
          font-style: italic;
        }
      `}</style>
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