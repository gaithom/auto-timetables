import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Download, Filter, Grid, List, Calendar, FileText, RotateCw } from "lucide-react";
import { exportToExcel } from "../../utils/exportExcel";
import { exportToPDF } from "../../utils/exportPDF";
import { useTimetable } from "../../context/TimetableContext";

export default function TimetablesPage() {
  const navigate = useNavigate();
  const { timetable, programs, cohorts, DAYS, SLOTS, regenerate } = useTimetable();
  const [viewMode, setViewMode] = useState("grid");
  const [selectedProgram, setSelectedProgram] = useState("All Programs");
  const [selectedCohort, setSelectedCohort] = useState("All Cohorts");

  const allSessions = useMemo(() => {
    const sessions = [];
    DAYS.forEach((day) => {
      const slots = timetable?.[day] || {};
      SLOTS.forEach((slot) => {
        const slotSessions = slots?.[slot] || [];
        slotSessions.forEach((entry) => {
          sessions.push({
            ...entry,
            day,
            slot,
            programName: entry.program?.name ?? "Program",
            cohortName: entry.cohort?.name ?? "Cohort",
          });
        });
      });
    });
    return sessions;
  }, [timetable, DAYS, SLOTS]);

  const filteredSessions = useMemo(() => {
    return allSessions.filter((session) => {
      const matchesProgram =
        selectedProgram === "All Programs" || session.programName === selectedProgram;
      const matchesCohort =
        selectedCohort === "All Cohorts" || session.cohortName === selectedCohort;
      return matchesProgram && matchesCohort;
    });
  }, [allSessions, selectedProgram, selectedCohort]);

  const gridLookup = useMemo(() => {
    const lookup = {};
    DAYS.forEach((day) => {
      lookup[day] = {};
      SLOTS.forEach((slot) => {
        lookup[day][slot] = [];
      });
    });
    filteredSessions.forEach((session) => {
      if (!lookup[session.day]) lookup[session.day] = {};
      if (!lookup[session.day][session.slot]) lookup[session.day][session.slot] = [];
      lookup[session.day][session.slot].push(session);
    });
    return lookup;
  }, [filteredSessions, DAYS, SLOTS]);

  const stats = {
    scheduled: filteredSessions.length,
    totalSlots: DAYS.length * SLOTS.length,
    unplaced: timetable?.__unplaced?.length || 0,
  };

  const handleExportToExcel = () => exportToExcel(timetable);
  const handleExportToPDF = () => exportToPDF(timetable);

  const programOptions = ["All Programs", ...programs.map((prog) => prog.name)];
  const cohortOptions = ["All Cohorts", ...cohorts.map((c) => c.name)];

  const renderSlotSessions = (slotSessions) => {
    if (slotSessions.length === 0) {
      return <div style={{ color: "var(--text-secondary)", fontSize: 12 }}>—</div>;
    }

    return slotSessions.map((session) => (
      <div
        key={`${session.course.code}-${session.cohort.id}`}
        style={{
          backgroundColor: "var(--surface)",
          borderLeft: "4px solid var(--accent-primary)",
          borderRadius: 6,
          padding: "0.5rem",
          marginBottom: "0.5rem",
        }}
      >
        <strong style={{ color: "var(--accent-strong)" }}>
          {session.course.code} {session.course.name}
        </strong>
        <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>
          {session.cohortName} · {session.lecturer.name}
        </div>
        <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>
          Room {session.room.name}
        </div>
      </div>
    ));
  };

  const renderGridView = () => {
    const rows = [];
    for (const slot of SLOTS) {
      const cells = [];
      for (const day of DAYS) {
        const slotSessions = gridLookup[day]?.[slot] || [];
        cells.push(
          <td
            key={`${day}-${slot}`}
            style={{
              border: "1px solid var(--border-color)",
              padding: "0.8rem",
              backgroundColor: "var(--surface-muted)",
              minHeight: 80,
              verticalAlign: "top",
            }}
          >
            {renderSlotSessions(slotSessions)}
          </td>
        );
      }

      rows.push(
        <tr key={slot}>
          <td
            style={{
              border: "1px solid var(--border-color)",
              padding: "0.8rem",
              textAlign: "center",
              fontWeight: "bold",
              backgroundColor: "var(--table-header-bg)",
              color: "var(--table-header-text)",
            }}
          >
            {slot}
          </td>
          {cells}
        </tr>
      );
    }

    return (
      <div
        style={{
          backgroundColor: "var(--surface)",
          borderRadius: "8px",
          padding: "1.5rem",
          marginBottom: "2rem",
          overflowX: "auto",
          border: "1px solid var(--border-color)",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 800 }}>
          <thead>
            <tr>
              <th
                style={{
                  border: "1px solid var(--border-color)",
                  padding: "0.8rem",
                  textAlign: "center",
                  backgroundColor: "var(--table-header-bg)",
                  color: "var(--table-header-text)",
                }}
              >
                Time/Day
              </th>
              {DAYS.map((day) => (
                <th
                  key={day}
                  style={{
                    border: "1px solid var(--border-color)",
                    padding: "0.8rem",
                    textAlign: "center",
                    backgroundColor: "var(--table-header-bg)",
                    color: "var(--table-header-text)",
                  }}
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  };

  const renderListView = () => {
    if (filteredSessions.length === 0) {
      return (
        <div className="form-container" style={{ textAlign: "center" }}>
          <p>No sessions match the current filters.</p>
        </div>
      );
    }

    const dayOrder = Object.fromEntries(DAYS.map((day, idx) => [day, idx]));
    const sorted = [...filteredSessions].sort((a, b) => {
      if (a.day === b.day) return SLOTS.indexOf(a.slot) - SLOTS.indexOf(b.slot);
      return dayOrder[a.day] - dayOrder[b.day];
    });

    return (
      <div
        style={{
          backgroundColor: "var(--surface)",
          borderRadius: "8px",
          padding: "1.5rem",
          marginBottom: "2rem",
          border: "1px solid var(--border-color)",
        }}
      >
        <h3 style={{ marginBottom: "1rem", color: "var(--text-primary)" }}>Class Schedule List</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {sorted.map((session) => (
            <div
              key={`${session.day}-${session.slot}-${session.course.code}-${session.cohort.id}`}
              style={{
                padding: "1rem",
                borderRadius: "8px",
                backgroundColor: "var(--surface-muted)",
                display: "flex",
                justifyContent: "space-between",
                gap: "1rem",
                flexWrap: "wrap",
              }}
            >
              <div style={{ flex: 1 }}>
                <strong style={{ color: "var(--accent-strong)" }}>
                  {session.course.code} • {session.course.name}
                </strong>
                <div style={{ color: "var(--text-secondary)", fontSize: 13 }}>
                  {session.day} · {session.slot}
                </div>
                <div style={{ color: "var(--text-primary)", marginTop: 6 }}>
                  {session.cohortName}
                </div>
              </div>
              <div style={{ textAlign: "right", minWidth: 160 }}>
                <div style={{ color: "var(--text-primary)" }}>{session.lecturer.name}</div>
                <div style={{ color: "var(--text-secondary)", fontSize: 13 }}>
                  Room {session.room.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div style={{ marginBottom: "1rem" }}>
        <button
          onClick={() => navigate("/")}
          className="btn btn-primary"
          style={{ display: "flex", alignItems: "center", gap: 8 }}
        >
          ← Back to Dashboard
        </button>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <div>
          <h1 style={{ display: "flex", alignItems: "center", gap: 12, color: "var(--heading-color)" }}>
            <Calendar size={32} color="#4caf50" />
            Timetable Viewer
          </h1>
          <p style={{ color: "var(--text-secondary)" }}>View and manage class schedules</p>
        </div>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <button
            className="btn btn-primary"
            onClick={handleExportToExcel}
            style={{ display: "flex", alignItems: "center", gap: 8 }}
          >
            <Download size={16} /> Export Excel
          </button>
          <button
            className="btn btn-primary"
            onClick={handleExportToPDF}
            style={{ display: "flex", alignItems: "center", gap: 8 }}
          >
            <FileText size={16} /> Export PDF
          </button>
          <button
            className="btn btn-secondary"
            onClick={regenerate}
            style={{ display: "flex", alignItems: "center", gap: 8 }}
          >
            <RotateCw size={16} /> Regenerate
          </button>
        </div>
      </div>

      <div
        style={{
          backgroundColor: "var(--surface)",
          borderRadius: "8px",
          padding: "1.5rem",
          marginBottom: "2rem",
          border: "1px solid var(--border-color)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Filter size={16} />
            <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>Filters</span>
          </div>
          <select
            value={selectedProgram}
            onChange={(e) => setSelectedProgram(e.target.value)}
            className="input"
            style={{ maxWidth: 220 }}
          >
            {programOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
          <select
            value={selectedCohort}
            onChange={(e) => setSelectedCohort(e.target.value)}
            className="input"
            style={{ maxWidth: 220 }}
          >
            {cohortOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
          <button
            onClick={() => setViewMode("grid")}
            className="view-toggle"
            style={{
              backgroundColor: viewMode === "grid" ? "var(--accent-primary)" : "transparent",
              color: viewMode === "grid" ? "#fff" : "var(--text-secondary)",
            }}
          >
            <Grid size={14} /> Grid
          </button>
          <button
            onClick={() => setViewMode("list")}
            className="view-toggle"
            style={{
              backgroundColor: viewMode === "list" ? "var(--accent-primary)" : "transparent",
              color: viewMode === "list" ? "#fff" : "var(--text-secondary)",
            }}
          >
            <List size={14} /> List
          </button>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: 16,
          marginBottom: 24,
        }}
      >
        <div className="stat-card">
          <div style={{ fontSize: 24, fontWeight: 700, color: "var(--accent-strong)" }}>{stats.scheduled}</div>
          <div style={{ color: "var(--text-secondary)" }}>Scheduled sessions</div>
        </div>
        <div className="stat-card">
          <div style={{ fontSize: 24, fontWeight: 700, color: "var(--accent-strong)" }}>{stats.totalSlots}</div>
          <div style={{ color: "var(--text-secondary)" }}>Slots scanned</div>
        </div>
        <div className="stat-card">
          <div style={{ fontSize: 24, fontWeight: 700, color: "var(--accent-strong)" }}>{stats.unplaced}</div>
          <div style={{ color: "var(--text-secondary)" }}>Unplaced sessions</div>
        </div>
      </div>

      {viewMode === "grid" ? renderGridView() : renderListView()}

      {timetable?.__unplaced?.length ? (
        <div className="form-container">
          <h3>Unplaced Sessions</h3>
          <p style={{ color: "var(--text-secondary)" }}>
            These sessions could not be scheduled due to lecturer, room, or capacity conflicts.
          </p>
          <ul>
            {timetable.__unplaced.map((item, idx) => (
              <li
                key={`${item.course.code}-${item.cohort?.id ?? idx}-${idx}`}
                style={{ color: "var(--text-secondary)" }}
              >
                {item.course.code} {item.course.name} for {item.cohort.name}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

