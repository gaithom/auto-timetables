import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Users, Search, Building2 } from 'lucide-react';

// Function to load rooms from localStorage
const loadRoomsFromStorage = () => {
  try {
    const saved = localStorage.getItem('rooms');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Error loading rooms from storage:", error);
    return [];
  }
};

// Function to save rooms to localStorage
const saveRoomsToStorage = (rooms) => {
  try {
    localStorage.setItem('rooms', JSON.stringify(rooms));
  } catch (error) {
    console.error("Error saving rooms to storage:", error);
  }
};

// Custom hook for room management
const useTimetable = () => {
  const [rooms, setRooms] = useState([]);

  // Load rooms from localStorage on component mount
  useEffect(() => {
    const savedRooms = loadRoomsFromStorage();
    setRooms(savedRooms);
  }, []);

  // Save rooms to localStorage whenever they change
  useEffect(() => {
    saveRoomsToStorage(rooms);
  }, [rooms]);

  const removeRoom = (id) => {
    setRooms(prev => prev.filter(room => room.id !== id));
  };

  const addRoom = (room) => {
    setRooms(prev => [...prev, { ...room, id: Date.now() }]);
  };

  return { rooms, removeRoom, addRoom };
};

const RoomForm = ({ onAddRoom }) => {
  const [name, setName] = useState('');
  const [capacity, setCapacity] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = () => {
    if (name.trim() && capacity && parseInt(capacity) > 0) {
      onAddRoom({ name: name.trim(), capacity: parseInt(capacity) });
      setName('');
      setCapacity('');
      setIsOpen(false);
    } else {
      alert('Please enter a valid room name and capacity greater than 0');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="btn btn-primary"
        style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
      >
        <Plus size={16} />
        Add New Room
      </button>
    );
  }

  return (
    <div className="form-container">
      <h3 style={{ 
        fontSize: '20px', 
        fontWeight: '600', 
        color: '#e0e0e0', 
        marginBottom: '16px',
        marginTop: '0',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          backgroundColor: '#2d5a27',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Plus style={{ width: '20px', height: '20px', color: '#4caf50' }} />
        </div>
        Add New Room
      </h3>
      <div className="form-grid">
        <div className="form-group">
          <label>Room Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g., Lab A"
          />
        </div>
        <div className="form-group">
          <label>Capacity</label>
          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="40"
            min="1"
          />
        </div>
      </div>
      <div className="form-actions">
        <button
          onClick={() => setIsOpen(false)}
          className="btn btn-secondary"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="btn btn-primary"
        >
          Save Room
        </button>
      </div>
    </div>
  );
};

export default function RoomsPage() {
  const { rooms, removeRoom, addRoom } = useTimetable();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRooms = rooms.filter(room =>
    room.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRemoveRoom = (id, roomName) => {
    if (window.confirm(`Are you sure you want to delete "${roomName}"?`)) {
      removeRoom(id);
    }
  };

  // Statistics
  const totalCapacity = rooms.reduce((sum, room) => sum + room.capacity, 0);
  const largeRooms = rooms.filter(room => room.capacity >= 50).length;

  return (
    <div className="page active">
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1>Room Management</h1>
        <p>Manage your facility rooms and their capacities</p>
      </div>

      {/* Statistics Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        <div className="stat-card">
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#4caf50', marginBottom: '4px' }}>
            {rooms.length}
          </div>
          <div style={{ fontSize: '14px', color: '#a0a0a0' }}>Total Rooms</div>
        </div>
        <div className="stat-card">
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#4caf50', marginBottom: '4px' }}>
            {totalCapacity}
          </div>
          <div style={{ fontSize: '14px', color: '#a0a0a0' }}>Total Capacity</div>
        </div>
        <div className="stat-card">
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#4caf50', marginBottom: '4px' }}>
            {largeRooms}
          </div>
          <div style={{ fontSize: '14px', color: '#a0a0a0' }}>Large Rooms</div>
        </div>
      </div>

      {/* Add Room Form */}
      <div style={{ marginBottom: '24px' }}>
        <RoomForm onAddRoom={addRoom} />
      </div>

      {/* Search and Stats */}
      <div className="form-container">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ position: 'relative', maxWidth: '320px' }}>
            <Search
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#a0a0a0'
              }}
              size={16}
            />
            <input
              type="text"
              placeholder="Search rooms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            fontSize: '14px',
            color: '#a0a0a0'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '8px',
                height: '8px',
                background: '#4caf50',
                borderRadius: '50%'
              }}></div>
              <span>Total Rooms: {rooms.length}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users size={14} />
              <span>Total Capacity: {totalCapacity}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Rooms Grid */}
      {filteredRooms.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px'
        }}>
          {filteredRooms.map(room => (
            <div
              key={room.id}
              className="data-card"
            >
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                marginBottom: '16px'
              }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#e0e0e0',
                    margin: '0 0 4px 0'
                  }}>
                    {room.name}
                  </h3>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#a0a0a0'
                  }}>
                    <Users size={16} />
                    <span style={{ fontSize: '14px' }}>Capacity: {room.capacity}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveRoom(room.id, room.name)}
                  className="icon-btn"
                  title={`Delete ${room.name}`}
                >
                  <Trash2 size={16} />
                </button>
              </div>
              
              {/* Capacity Bar */}
              <div style={{
                width: '100%',
                background: '#333',
                borderRadius: '9999px',
                height: '8px',
                marginBottom: '12px'
              }}>
                <div 
                  style={{
                    background: '#4caf50',
                    height: '8px',
                    borderRadius: '9999px',
                    width: `${Math.min((room.capacity / 100) * 100, 100)}%`,
                    transition: 'width 0.3s ease'
                  }}
                ></div>
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '12px',
                color: '#888'
              }}>
                <span>Room ID: {room.id}</span>
                <span style={{
                  padding: '4px 8px',
                  borderRadius: '9999px',
                  fontSize: '12px',
                  fontWeight: '500',
                  ...(room.capacity >= 50 
                    ? { background: 'rgba(76, 175, 80, 0.2)', color: '#4caf50' }
                    : room.capacity >= 30 
                    ? { background: 'rgba(255, 152, 0, 0.2)', color: '#ff9800' }
                    : { background: 'rgba(244, 67, 54, 0.2)', color: '#f44336' })
                }}>
                  {room.capacity >= 50 ? 'Large' : room.capacity >= 30 ? 'Medium' : 'Small'}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="form-container" style={{ textAlign: 'center', padding: '48px' }}>
          <Building2 style={{ margin: '0 auto 16px', color: '#4caf50' }} size={48} />
          <h3 style={{
            fontSize: '18px',
            fontWeight: '500',
            color: '#e0e0e0',
            margin: '0 0 8px 0'
          }}>
            {searchTerm ? 'No rooms found' : 'No rooms yet'}
          </h3>
          <p style={{ color: '#a0a0a0', margin: '0 0 24px 0' }}>
            {searchTerm 
              ? `No rooms match "${searchTerm}". Try a different search term.`
              : 'Get started by adding your first room to the system.'
            }
          </p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="btn btn-secondary"
            >
              Clear search
            </button>
          )}
        </div>
      )}
    </div>
  );
}