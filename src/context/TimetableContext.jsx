/**
 * Timetable Context Module
 * 
 * This module provides a React context for managing the application's timetable data,
 * including programs, lecturers, cohorts, and rooms. It handles data persistence
 * using localStorage and provides methods for CRUD operations on the data.
 */

/* global globalThis */
import React, { createContext, useContext, useMemo, useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { v4 as uuid } from "uuid";
import { DAYS, SLOTS, generateTimetable } from "../utils/timetableGenerator";
import sample from "../data/sampleData";

// Create a new context for the timetable data
const TimetableContext = createContext();

// Check if the code is running in a browser environment
const isBrowser = typeof globalThis !== "undefined" && !!globalThis.window;

// Keys used for storing data in localStorage
const STORAGE_KEYS = {
  programs: "tt-programs",
  lecturers: "tt-lecturers",
  cohorts: "tt-cohorts",
  rooms: "tt-rooms",
};

/**
 * Deep clones a value, handling objects, arrays, and primitives.
 * Uses structuredClone if available, otherwise falls back to a manual implementation.
 * @param {*} value - The value to clone
 * @returns {*} A deep clone of the value
 */
const clone = (value) => {
  // Use the browser's native structuredClone if available (faster and handles more cases)
  if (typeof globalThis.structuredClone === "function") {
    return globalThis.structuredClone(value);
  }
  // Handle arrays
  if (Array.isArray(value)) {
    return value.map(clone);
  }
  // Handle plain objects
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, val]) => [key, clone(val)]));
  }
  // Return primitives directly
  return value;
};

/**
 * Custom hook for managing a list with localStorage persistence
 * @param {string} key - The localStorage key to use for persistence
 * @param {Array} fallback - Default value to use if no data is found in localStorage
 * @returns {Array} [state, setState] - The state and setter function
 */
function usePersistentList(key, fallback) {
  // Initialize state with data from localStorage or fallback
  const [state, setState] = useState(() => {
    if (!isBrowser) return clone(fallback);
    try {
      // Try to load data from localStorage
      const stored = globalThis.localStorage?.getItem(key);
      return stored ? JSON.parse(stored) : clone(fallback);
    } catch (err) {
      console.warn(`Failed to parse ${key} from localStorage`, err);
      return clone(fallback);
    }
  });

  // Persist state to localStorage whenever it changes
  useEffect(() => {
    if (!isBrowser) return;
    try {
      globalThis.localStorage?.setItem(key, JSON.stringify(state));
    } catch (err) {
      console.warn(`Failed to persist ${key} to localStorage`, err);
    }
  }, [key, state]);

  return [state, setState];
}

/**
 * Timetable Provider Component
 * 
 * This component wraps the application and provides the timetable data and methods
 * to its children through the TimetableContext.
 * 
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child components
 */
export function TimetableProvider({ children }) {
  // Initialize state for programs, lecturers, cohorts, and rooms
  const [programs, setPrograms] = usePersistentList(STORAGE_KEYS.programs, sample.programs);
  const [lecturers, setLecturers] = usePersistentList(STORAGE_KEYS.lecturers, sample.lecturers);
  const [cohorts, setCohorts] = usePersistentList(STORAGE_KEYS.cohorts, sample.cohorts);
  const [rooms, setRooms] = usePersistentList(STORAGE_KEYS.rooms, sample.rooms);

  const [manualSeed, setManualSeed] = useState(0);

  const timetable = useMemo(
    () => generateTimetable({ programs, lecturers, cohorts, rooms, manualSeed }),
    [programs, lecturers, cohorts, rooms, manualSeed]
  );

  const addProgram = useCallback(
    (payload) => setPrograms((prev) => [...prev, { courses: [], ...payload, id: uuid() }]),
    [setPrograms]
  );
  const updateProgram = useCallback(
    (id, updates) =>
      setPrograms((prev) => prev.map((program) => (program.id === id ? { ...program, ...updates } : program))),
    [setPrograms]
  );
  const removeProgram = useCallback(
    (id) => setPrograms((prev) => prev.filter((program) => program.id !== id)),
    [setPrograms]
  );

  const addLecturer = useCallback(
    (payload) => setLecturers((prev) => [...prev, { ...payload, id: uuid() }]),
    [setLecturers]
  );
  const updateLecturer = useCallback(
    (id, updates) =>
      setLecturers((prev) => prev.map((lecturer) => (lecturer.id === id ? { ...lecturer, ...updates } : lecturer))),
    [setLecturers]
  );
  const removeLecturer = useCallback(
    (id) => setLecturers((prev) => prev.filter((lecturer) => lecturer.id !== id)),
    [setLecturers]
  );

  const addCohort = useCallback(
    (payload) => setCohorts((prev) => [...prev, { ...payload, id: uuid() }]),
    [setCohorts]
  );
  const updateCohort = useCallback(
    (id, updates) =>
      setCohorts((prev) => prev.map((cohort) => (cohort.id === id ? { ...cohort, ...updates } : cohort))),
    [setCohorts]
  );
  const removeCohort = useCallback(
    (id) => setCohorts((prev) => prev.filter((cohort) => cohort.id !== id)),
    [setCohorts]
  );

  const addRoom = useCallback(
    (payload) => setRooms((prev) => [...prev, { ...payload, id: uuid() }]),
    [setRooms]
  );
  const updateRoom = useCallback(
    (id, updates) =>
      setRooms((prev) => prev.map((room) => (room.id === id ? { ...room, ...updates } : room))),
    [setRooms]
  );
  const removeRoom = useCallback(
    (id) => setRooms((prev) => prev.filter((room) => room.id !== id)),
    [setRooms]
  );

  const regenerate = useCallback(() => {
    setManualSeed((seed) => seed + 1);
  }, []);

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
      updateProgram,
      updateLecturer,
      updateCohort,
      updateRoom,
      removeProgram,
      removeLecturer,
      removeCohort,
      removeRoom,
      regenerate,
    }),
    [
      programs,
      lecturers,
      cohorts,
      rooms,
      timetable,
      regenerate,
      addProgram,
      addLecturer,
      addCohort,
      addRoom,
      updateProgram,
      updateLecturer,
      updateCohort,
      updateRoom,
      removeProgram,
      removeLecturer,
      removeCohort,
      removeRoom,
    ]
  );

  return <TimetableContext.Provider value={value}>{children}</TimetableContext.Provider>;
}

export const useTimetable = () => useContext(TimetableContext);

TimetableProvider.propTypes = {
  children: PropTypes.node.isRequired,
};