import React, { useState } from "react";
import { useTimetable } from "../../context/TimetableContext";

export default function RoomForm() {
  const { addRoom } = useTimetable();
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState(40);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    addRoom({ name, capacity: Number(capacity) });
    setName(""); setCapacity(40);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
      <div>
        <label className="label">Room Name</label>
        <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Lab A" />
      </div>
      <div>
        <label className="label">Capacity</label>
        <input className="input" type="number" min={1} value={capacity} onChange={(e) => setCapacity(e.target.value)} />
      </div>
      <button className="btn" type="submit">Save Room</button>
    </form>
  );
}