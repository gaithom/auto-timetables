import React, { createContext, useContext, useMemo, useState, useCallback } from "react";
import { v4 as uuid } from "uuid";
import { DAYS, SLOTS, generateTimetable } from "../utils/timetableGenerator";
import sample from "../data/sampleData";

const TimetableContext = createContext();

export function TimetableProvider({ children }) {
  const [programs, setPrograms] = useState(sample.programs);
  const [lecturers, setLecturers] = useState(sample.lecturers);
  const [cohorts, setCohorts] = useState(sample.cohorts);
  const [rooms, setRooms] = useState(sample.rooms);
  const [timetable, setTimetable] = useState(sample.timetable || {});

  const addProgram = (payload) => setPrograms((p) => [...p, { id: uuid(), ...payload }]);
  const addLecturer = (payload) => setLecturers((p) => [...p, { id: uuid(), ...payload }]);
  const addCohort = (payload) => setCohorts((p) => [...p, { id: uuid(), ...payload }]);
  const addRoom = (payload) => setRooms((p) => [...p, { id: uuid(), ...payload }]);

  const removeById = (setter) => (id) => setter((arr) => arr.filter((x) => x.id !== id));

  const regenerate = useCallback(() => {
    const next = generateTimetable({ programs, lecturers, cohorts, rooms });
    setTimetable(next);
  }, [programs, lecturers, cohorts, rooms]);

  const value = useMemo(
    () => ({
      programs,
      lecturers,
      cohorts,
      rooms,
      timetable,
      DAYS,
      SLOTS,
      addProgram,
      addLecturer,
      addCohort,
      addRoom,
      removeProgram: removeById(setPrograms),
      removeLecturer: removeById(setLecturers),
      removeCohort: removeById(setCohorts),
      removeRoom: removeById(setRooms),
      regenerate,
    }),
    [programs, lecturers, cohorts, rooms, timetable, regenerate]
  );

  return <TimetableContext.Provider value={value}>{children}</TimetableContext.Provider>;
}

export const useTimetable = () => useContext(TimetableContext);