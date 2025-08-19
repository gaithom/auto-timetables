import * as XLSX from "xlsx";

export function exportToExcel(timetable) {
  if (!timetable) return;
  const rows = [];

  for (const [day, slots] of Object.entries(timetable)) {
    if (day.startsWith("__")) continue;
    for (const [slot, sessions] of Object.entries(slots)) {
      if (!Array.isArray(sessions)) continue;
      if (sessions.length === 0) {
        rows.push({ Day: day, Slot: slot, Course: "—", Cohort: "—", Lecturer: "—", Room: "—" });
      } else {
        for (const s of sessions) {
          rows.push({
            Day: day,
            Slot: slot,
            Course: `${s.course.code} ${s.course.name}`,
            Cohort: s.cohort.name,
            Lecturer: s.lecturer.name,
            Room: s.room.name,
          });
        }
      }
    }
  }

  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Timetable");
  XLSX.writeFile(wb, "timetable.xlsx");
}