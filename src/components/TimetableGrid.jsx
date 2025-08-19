import React from "react";
import { useTimetable } from "../context/TimetableContext";

export default function TimetableGrid({ timetable }) {
  const { DAYS, SLOTS } = useTimetable();

  const getProgramClass = (name) =>
    "program-cell program-" + name.replace(/\s+/g, "");

  return (
    <div style={{ overflow: "auto", maxHeight: 700 }}>
      <table className="table">
        <thead>
          <tr>
            <th>Time</th>
            {DAYS.map((d) => <th key={d}>{d}</th>)}
          </tr>
        </thead>
        <tbody>
          {SLOTS.map((slot) => (
            <tr key={slot}>
              <td className="small">{slot}</td>
              {DAYS.map((day) => {
                const cell = timetable?.[day]?.[slot] || [];
                return (
                  <td key={day + slot} className="cell">
                    {cell.length === 0 ? (
                      <span className="small">—</span>
                    ) : (
                      cell.map((s, idx) => (
                        <div key={idx} className={getProgramClass(s.program.name)}>
                          <div>{s.course.code} {s.course.name}</div>
                          <div className="small">{s.cohort.name} • {s.lecturer.name} • {s.room.name}</div>
                        </div>
                      ))
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
