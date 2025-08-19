// Days and default slots (customize as needed)
export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
export const SLOTS = [
  "08:00-09:00",
  "09:00-10:00",
  "10:00-11:00",
  "11:00-12:00",
  "12:00-13:00",
  "13:00-14:00",
  "14:00-15:00",
  "15:00-16:00",
];

// Helper: create empty timetable grid
function emptyGrid() {
  const grid = {};
  for (const d of DAYS) {
    grid[d] = {};
    for (const s of SLOTS) grid[d][s] = [];
  }
  return grid;
}

// Check room availability & conflicts for lecturer and cohort
function canPlace(grid, { day, slot, lecturer, cohort, room }) {
  // Room not already used in that slot
  const roomUsed = grid[day][slot].some((x) => x.room.id === room.id);
  if (roomUsed) return false;

  // Lecturer & cohort not double-booked in that slot
  const clash = grid[day][slot].some(
    (x) => x.lecturer.id === lecturer.id || x.cohort.id === cohort.id
  );
  return !clash;
}

// Find a lecturer qualified and available
function findLecturer(lecturers, courseCode, day, slot) {
  return lecturers.find(
    (l) => l.courses.includes(courseCode) && (l.availability?.[day] || []).includes(slot)
  );
}

// Find a room that fits capacity and is free
function findRoom(rooms, size, grid, day, slot) {
  // try exact/closest fit first
  const sorted = [...rooms].sort((a, b) => a.capacity - b.capacity);
  for (const r of sorted) {
    const taken = grid[day][slot].some((x) => x.room.id === r.id);
    if (!taken && r.capacity >= size) return r;
  }
  return null;
}

// Main generator
export function generateTimetable({ programs, lecturers, cohorts, rooms }) {
  const grid = emptyGrid();

  // Build course sessions required: for each program course, for each linked cohort, create hoursPerWeek sessions
  const sessions = [];
  for (const prog of programs) {
    for (const course of prog.courses) {
      const linkedCohorts = course.cohorts
        .map((cid) => cohorts.find((c) => c.id === cid))
        .filter(Boolean);
      for (const cohort of linkedCohorts) {
        const count = Math.max(1, Number(course.hoursPerWeek) || 1);
        for (let i = 0; i < count; i++) {
          sessions.push({ program: prog, course, cohort });
        }
      }
    }
  }

  // Greedy placement across days/slots
  for (const sess of sessions) {
    let placed = false;
    outer: for (const day of DAYS) {
      for (const slot of SLOTS) {
        const lecturer = findLecturer(lecturers, sess.course.code, day, slot);
        if (!lecturer) continue;
        const room = findRoom(rooms, sess.cohort.size, grid, day, slot);
        if (!room) continue;
        const candidate = { day, slot, lecturer, room, cohort: sess.cohort, course: sess.course, program: sess.program };
        if (canPlace(grid, candidate)) {
          grid[day][slot].push(candidate);
          placed = true;
          break outer;
        }
      }
    }
    if (!placed) {
      // If not placed, leave unassigned list (optional: return these to UI)
      if (!grid.__unplaced) grid.__unplaced = [];
      grid.__unplaced.push(sess);
    }
  }

  return grid;
}