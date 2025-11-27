import React, { useMemo, useState } from "react";
import { GraduationCap, Edit2, Trash2 } from "lucide-react";
import { useTimetable } from "../../context/TimetableContext";
import ProgramForm from "../EntityForms/ProgramForm";

export default function ProgramsPage() {
  const { programs, cohorts, removeProgram } = useTimetable();
  const [editingProgram, setEditingProgram] = useState(null);

  const stats = useMemo(() => {
    const totalCourses = programs.reduce((sum, prog) => sum + prog.courses.length, 0);
    const totalCohorts = programs.reduce(
      (sum, prog) =>
        sum + prog.courses.reduce((inner, course) => inner + (course.cohorts?.length || 0), 0),
      0
    );
    return { totalPrograms: programs.length, totalCourses, totalCohorts };
  }, [programs]);

  const resolveCohortNames = (ids = []) => {
    const map = new Map(cohorts.map((c) => [c.id, c.name]));
    return ids.map((id) => map.get(id) || "Unknown cohort");
  };

  return (
    <div className="page active">
      <h1>Program Management</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: 16,
          marginBottom: 32,
        }}
      >
        <div className="stat-card">
          <div style={{ fontSize: 24, fontWeight: 700, color: "var(--accent-strong)" }}>
            {stats.totalPrograms}
          </div>
          <div style={{ color: "var(--text-secondary)" }}>Programs</div>
        </div>
        <div className="stat-card">
          <div style={{ fontSize: 24, fontWeight: 700, color: "var(--accent-strong)" }}>
            {stats.totalCourses}
          </div>
          <div style={{ color: "var(--text-secondary)" }}>Courses</div>
        </div>
        <div className="stat-card">
          <div style={{ fontSize: 24, fontWeight: 700, color: "var(--accent-strong)" }}>
            {stats.totalCohorts}
          </div>
          <div style={{ color: "var(--text-secondary)" }}>Course ↔ Cohort links</div>
        </div>
      </div>

      <div style={{ display: "grid", gap: 24, gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))" }}>
        <section className="form-container" style={{ minHeight: "fit-content" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <h2 style={{ margin: 0 }}>{editingProgram ? "Edit Program" : "Add Program"}</h2>
            {editingProgram && (
              <button className="btn btn-secondary" type="button" onClick={() => setEditingProgram(null)}>
                Cancel edit
              </button>
            )}
          </div>
          <ProgramForm program={editingProgram} onSuccess={() => setEditingProgram(null)} />
        </section>

        <section className="form-container">
          <h2>Programs</h2>
          {programs.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">
                <GraduationCap size={32} />
              </div>
              <div className="empty-state-title">No programs yet</div>
              <div className="empty-state-description">
                Add a program to start attaching courses, cohorts, and lecturers.
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {programs.map((program) => (
                <div key={program.id} className="data-card">
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
                    <div>
                      <h3 style={{ margin: "0 0 4px 0", color: "var(--text-primary)" }}>{program.name}</h3>
                      <p style={{ margin: 0, color: "var(--text-secondary)" }}>
                        {program.courses.length} courses
                      </p>
                    </div>
                    <div className="action-buttons">
                      <button className="icon-btn" onClick={() => setEditingProgram(program)} title="Edit program">
                        <Edit2 size={16} />
                      </button>
                      <button
                        className="icon-btn"
                        onClick={() => removeProgram(program.id)}
                        title="Remove program"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {program.courses.length > 0 && (
                    <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
                      {program.courses.map((course) => (
                        <div
                          key={course.code}
                          style={{
                            border: `1px solid var(--border-color)`,
                            borderRadius: 8,
                            padding: 12,
                            background: "var(--surface-alt)",
                          }}
                        >
                          <div style={{ fontWeight: 600, color: "var(--text-primary)" }}>
                            {course.code} · {course.name}
                          </div>
                          <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 4 }}>
                            {course.hoursPerWeek} hour(s)/week
                          </div>
                          <div style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 8 }}>
                            Cohorts:{" "}
                            {resolveCohortNames(course.cohorts).length
                              ? resolveCohortNames(course.cohorts).join(", ")
                              : "No cohort linked"}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}