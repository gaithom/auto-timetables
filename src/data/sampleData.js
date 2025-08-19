import { v4 as uuid } from "uuid";
import { DAYS, SLOTS } from "../utils/timetableGenerator";

const cohortA = { id: uuid(), name: "CS Year 1", size: 45 };
const cohortB = { id: uuid(), name: "CS Year 2", size: 35 };

const programs = [
  {
    id: uuid(),
    name: "BSc Computer Science",
    courses: [
      { code: "CS101", name: "Intro to CS", hoursPerWeek: 2, cohorts: [cohortA.id] },
      { code: "CS102", name: "Programming I", hoursPerWeek: 3, cohorts: [cohortA.id] },
      { code: "CS201", name: "Data Structures", hoursPerWeek: 2, cohorts: [cohortB.id] },
    ],
  },
];

const lecturers = [
  {
    id: uuid(),
    name: "Dr. Jane Doe",
    courses: ["CS101", "CS102"],
    availability: {
      Mon: [SLOTS[0], SLOTS[1], SLOTS[2]],
      Tue: [SLOTS[1], SLOTS[2], SLOTS[3]],
      Wed: [SLOTS[0], SLOTS[3], SLOTS[4]],
      Thu: [SLOTS[2], SLOTS[3], SLOTS[4]],
      Fri: [SLOTS[1], SLOTS[2]],
    },
  },
  {
    id: uuid(),
    name: "Mr. John Smith",
    courses: ["CS201", "CS102"],
    availability: {
      Mon: [SLOTS[3], SLOTS[4], SLOTS[5]],
      Tue: [SLOTS[0], SLOTS[4], SLOTS[5]],
      Wed: [SLOTS[1], SLOTS[2]],
      Thu: [SLOTS[0], SLOTS[1], SLOTS[2]],
      Fri: [SLOTS[2], SLOTS[3]],
    },
  },
];

const rooms = [
  { id: uuid(), name: "Room A", capacity: 50 },
  { id: uuid(), name: "Room B", capacity: 40 },
  { id: uuid(), name: "Lab 1", capacity: 30 },
];

// Optionally, pre-generate a timetable at load (demo purpose)
function emptyGrid() {
  const grid = {};
  for (const d of DAYS) {
    grid[d] = {};
    for (const s of SLOTS) grid[d][s] = [];
  }
  return grid;
}

const sample = {
  programs,
  lecturers,
  cohorts: [cohortA, cohortB],
  rooms,
  timetable: emptyGrid(),
};

export default sample;