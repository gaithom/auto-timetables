import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function exportToPDF(timetable) {
  if (!timetable) return;
  const doc = new jsPDF({ orientation: "landscape" });
  doc.setFontSize(14);
  doc.text("Generated Timetable", 14, 14);

  const head = [["Day", "Time", "Course", "Cohort", "Lecturer", "Room"]];
  const body = [];

  for (const [day, slots] of Object.entries(timetable)) {
    if (day.startsWith("__")) continue;
    for (const [slot, sessions] of Object.entries(slots)) {
      if (!Array.isArray(sessions)) continue;
      if (sessions.length === 0) {
        body.push([day, slot, "—", "—", "—", "—"]);
      } else {
        for (const s of sessions) {
          body.push([
            day,
            slot,
            `${s.course.code} ${s.course.name}`,
            s.cohort.name,
            s.lecturer.name,
            s.room.name,
          ]);
        }
      }
    }
  }

  autoTable(doc, {
    head,
    body,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [99, 102, 241] },
    startY: 20,
  });

  doc.save("timetable.pdf");
}