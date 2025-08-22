import React, { useState } from 'react';
import { Trash2, Plus, Users, Search, Building2 } from 'lucide-react';

// Mock context and form component for demonstration
const useTimetable = () => {
  const [rooms, setRooms] = useState([
    { id: 1, name: 'Room A', capacity: 50 },
    { id: 2, name: 'Room B', capacity: 40 },
    { id: 3, name: 'Lab 1', capacity: 30 }
  ]);

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
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: '#3b82f6',
          color: 'white',
          padding: '10px 16px',
          borderRadius: '8px',
          fontWeight: '500',
          border: 'none',
          cursor: 'pointer',
          transition: 'background-color 0.2s ease'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
      >
        <Plus size={16} />
        Add New Room
      </button>
    );
  }

  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      padding: '24px',
      marginBottom: '24px'
    }}>
      <h3 style={{ 
        fontSize: '18px', 
        fontWeight: '600', 
        color: '#1f2937', 
        marginBottom: '16px',
        marginTop: '0'
      }}>
        Add New Room
      </h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '16px'
      }}>
        <div>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '8px'
          }}>
            Room Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g., Lab A"
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none',
              transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#3b82f6';
              e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#d1d5db';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>
        <div>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '8px'
          }}>
            Capacity
          </label>
          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="40"
            min="1"
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none',
              transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#3b82f6';
              e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#d1d5db';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>
      </div>
      <div style={{ display: 'flex', gap: '12px', paddingTop: '8px' }}>
        <button
          onClick={handleSubmit}
          style={{
            background: '#3b82f6',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '8px',
            fontWeight: '500',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
        >
          Save Room
        </button>
        <button
          onClick={() => setIsOpen(false)}
          style={{
            background: '#f3f4f6',
            color: '#374151',
            padding: '8px 16px',
            borderRadius: '8px',
            fontWeight: '500',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#e5e7eb'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#f3f4f6'}
        >
          Cancel
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

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f9fafb',
      padding: '24px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <Building2 style={{ color: '#3b82f6' }} size={32} />
            <h1 style={{
              fontSize: '32px',
              fontWeight: '700',
              color: '#1f2937',
              margin: '0'
            }}>
              Room Management
            </h1>
          </div>
          <p style={{ color: '#6b7280', margin: '0' }}>
            Manage your facility rooms and their capacities
          </p>
        </div>

        {/* Add Room Form */}
        <div style={{ marginBottom: '24px' }}>
          <RoomForm onAddRoom={addRoom} />
        </div>

        {/* Search and Stats */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb',
          padding: '24px',
          marginBottom: '24px'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            marginBottom: '16px'
          }}>
            <div style={{ position: 'relative', maxWidth: '320px' }}>
              <Search
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9ca3af'
                }}
                size={16}
              />
              <input
                type="text"
                placeholder="Search rooms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  paddingLeft: '40px',
                  paddingRight: '16px',
                  paddingTop: '8px',
                  paddingBottom: '8px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#3b82f6';
                  e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              fontSize: '14px',
              color: '#6b7280'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  background: '#3b82f6',
                  borderRadius: '50%'
                }}></div>
                <span>Total Rooms: {rooms.length}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Users size={14} />
                <span>Total Capacity: {rooms.reduce((sum, room) => sum + room.capacity, 0)}</span>
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
                style={{
                  background: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #e5e7eb',
                  overflow: 'hidden',
                  transition: 'box-shadow 0.2s ease, transform 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ padding: '24px' }}>
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
                        color: '#1f2937',
                        margin: '0 0 4px 0'
                      }}>
                        {room.name}
                      </h3>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: '#6b7280'
                      }}>
                        <Users size={16} />
                        <span style={{ fontSize: '14px' }}>Capacity: {room.capacity}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveRoom(room.id, room.name)}
                      style={{
                        padding: '8px',
                        color: '#ef4444',
                        background: 'transparent',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s ease'
                      }}
                      onMouseOver={(e) => e.target.style.backgroundColor = '#fef2f2'}
                      onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                      title={`Delete ${room.name}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  {/* Capacity Bar */}
                  <div style={{
                    width: '100%',
                    background: '#e5e7eb',
                    borderRadius: '9999px',
                    height: '8px',
                    marginBottom: '12px'
                  }}>
                    <div 
                      style={{
                        background: '#3b82f6',
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
                    color: '#9ca3af'
                  }}>
                    <span>Room ID: {room.id}</span>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '9999px',
                      fontSize: '12px',
                      fontWeight: '500',
                      ...(room.capacity >= 50 
                        ? { background: '#dcfce7', color: '#166534' }
                        : room.capacity >= 30 
                        ? { background: '#fef3c7', color: '#92400e' }
                        : { background: '#fee2e2', color: '#991b1b' })
                    }}>
                      {room.capacity >= 50 ? 'Large' : room.capacity >= 30 ? 'Medium' : 'Small'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '48px',
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <Building2 style={{ margin: '0 auto 16px', color: '#9ca3af' }} size={48} />
            <h3 style={{
              fontSize: '18px',
              fontWeight: '500',
              color: '#1f2937',
              margin: '0 0 8px 0'
            }}>
              {searchTerm ? 'No rooms found' : 'No rooms yet'}
            </h3>
            <p style={{ color: '#6b7280', margin: '0 0 24px 0' }}>
              {searchTerm 
                ? `No rooms match "${searchTerm}". Try a different search term.`
                : 'Get started by adding your first room to the system.'
              }
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                style={{
                  color: '#3b82f6',
                  background: 'none',
                  border: 'none',
                  fontWeight: '500',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
                onMouseOver={(e) => e.target.style.color = '#2563eb'}
                onMouseOut={(e) => e.target.style.color = '#3b82f6'}
              >
                Clear search
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}