import React from "react";
import { useTimetable } from "../../context/TimetableContext";
import RoomForm from "../EntityForms/RoomForm";

export default function RoomsPage() {
  const { rooms, removeRoom } = useTimetable();

  return (
    <div>
      <h2>Rooms</h2>
      <RoomForm />
      <div className="list">
        {rooms.map(r => (
          <div key={r.id} className="list-item">
            <div>
              <strong>{r.name}</strong>
              <div className="small">Capacity: {r.capacity}</div>
            </div>
            <button className="btn secondary" onClick={() => removeRoom(r.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
