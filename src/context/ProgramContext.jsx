import React, { createContext, useContext, useState } from "react";

const ProgramContext = createContext();

export function ProgramProvider({ children }) {
  const [programs, setPrograms] = useState([
    {
      id: 1,
      name: "Computer Science",
      code: "CS101",
      department: "School of Computing",
      duration: "4 years",
      status: "Active",
      courses: []
    },
    {
      id: 2,
      name: "Electrical Engineering",
      code: "EE202",
      department: "School of Engineering",
      duration: "4 years",
      status: "Active",
      courses: []
    }
  ]);

  const addProgram = (programData) => {
    setPrograms((prev) => [...prev, { ...programData, id: Date.now() }]);
  };

  const updateProgram = (programData) => {
    setPrograms((prev) =>
      prev.map((p) => (p.id === programData.id ? programData : p))
    );
  };

  const removeProgram = (id) => {
    setPrograms((prev) => prev.filter((p) => p.id !== id));
  };

  const toggleProgramStatus = (id) => {
    setPrograms((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, status: p.status === "Active" ? "Inactive" : "Active" }
          : p
      )
    );
  };

  return (
    <ProgramContext.Provider
      value={{ programs, addProgram, updateProgram, removeProgram, toggleProgramStatus }}
    >
      {children}
    </ProgramContext.Provider>
  );
}

export function usePrograms() {
  return useContext(ProgramContext);
}
