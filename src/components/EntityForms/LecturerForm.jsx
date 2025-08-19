import React, { useState } from "react";
import { useTimetable } from "../../context/TimetableContext";
import { DAYS, SLOTS } from "../../utils/timetableGenerator";

export default function LecturerForm() {
  const { addLecturer } = useTimetable();
  const [name, setName] = useState("");
  const [courses, setCourses] = useState("");
  const [availability, setAvailability] = useState(() => Object.fromEntries(DAYS.map(d => [d, []])));

  const toggleAvail = (day, slot) => {
    setAvailability((a) => {
      const set = new Set(a[day]);
      if (set.has(slot)) set.delete(slot); else set.add(slot);
      return { ...a, [day]: Array.from(set).sort() };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    const list = courses.split(",").map(s => s.trim()).filter(Boolean);
    addLecturer({ name, courses: list, availability });
    setName(""); setCourses(""); setAvailability(Object.fromEntries(DAYS.map(d => [d, []])));
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
      <div>
        <label className="label">Lecturer Name</label>
        <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Dr. Jane Doe" />
      </div>
      <div>
        <label className="label">Courses Taught (codes, comma-separated)</label>
        <input className="input" value={courses} onChange={(e) => setCourses(e.target.value)} placeholder="CS101, CS102" />
      </div>

      <div>
        <label className="label">Availability</label>
        <div style={{ overflow: "auto" }}>
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
                  {DAYS.map((day) => (
                    <td key={day+slot}>
                      <input
                        type="checkbox"
                        checked={availability[day].includes(slot)}
                        onChange={() => toggleAvail(day, slot)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <button className="btn" type="submit">Save Lecturer</button>
    </form>
  );
}
