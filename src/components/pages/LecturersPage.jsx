import React, { useState } from "react";
import { User, Clock, BookOpen, Plus, Trash2, Edit2, Save, X } from "lucide-react";

// Mock context for demonstration
const mockLecturers = [
  {
    id: 1,
    name: "Dr. Jane Doe",
    courses: ["CS101", "CS102"],
    availability: {
      monday: ["08:00-09:00", "10:00-11:00", "14:00-15:00"],
      tuesday: ["09:00-10:00", "11:00-12:00"],
      wednesday: ["08:00-09:00", "13:00-14:00", "15:00-16:00"],
      thursday: ["10:00-11:00", "12:00-13:00"],
      friday: ["09:00-10:00", "14:00-15:00"]
    }
  },
  {
    id: 2,
    name: "Mr. John Smith",
    courses: ["CS201", "CS102"],
    availability: {
      monday: ["09:00-10:00", "11:00-12:00"],
      tuesday: ["08:00-09:00", "14:00-15:00"],
      wednesday: ["10:00-11:00", "12:00-13:00"],
      thursday: ["09:00-10:00", "15:00-16:00"],
      friday: ["08:00-09:00", "11:00-12:00"]
    }
  }
];

const timeSlots = [
  "08:00-09:00", "09:00-10:00", "10:00-11:00", "11:00-12:00",
  "12:00-13:00", "13:00-14:00", "14:00-15:00", "15:00-16:00"
];

const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];
const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri"];

function LecturerForm({ onSave, editingLecturer = null, onCancel = null }) {
  const [formData, setFormData] = useState({
    name: editingLecturer?.name || "",
    courses: editingLecturer?.courses?.join(", ") || "",
    availability: editingLecturer?.availability || days.reduce((acc, day) => ({ ...acc, [day]: [] }), {})
  });

  const handleAvailabilityChange = (day, timeSlot, checked) => {
    setFormData(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: checked
          ? [...prev.availability[day], timeSlot]
          : prev.availability[day].filter(slot => slot !== timeSlot)
      }
    }));
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!formData.name.trim()) {
      alert('Please enter a lecturer name');
      return;
    }
    
    const lecturer = {
      id: editingLecturer?.id || Date.now(),
      name: formData.name,
      courses: formData.courses.split(",").map(c => c.trim()).filter(c => c),
      availability: formData.availability
    };
    
    onSave(lecturer);
    
    if (!editingLecturer) {
      setFormData({
        name: "",
        courses: "",
        availability: days.reduce((acc, day) => ({ ...acc, [day]: [] }), {})
      });
    }
  };

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      border: '1px solid #e5e7eb',
      padding: '24px',
      marginBottom: '32px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <div style={{
          width: '40px',
          height: '40px',
          backgroundColor: '#dbeafe',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Plus style={{ width: '20px', height: '20px', color: '#2563eb' }} />
        </div>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '600',
          color: '#111827',
          margin: 0
        }}>
          {editingLecturer ? "Edit Lecturer" : "Add New Lecturer"}
        </h3>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '8px'
            }}>
              Lecturer Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out'
              }}
              placeholder="e.g., Dr. Jane Doe"
              onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6';
                e.target.style.boxShadow = '0 0 0 3px rgb(59 130 246 / 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d1d5db';
                e.target.style.boxShadow = 'none';
              }}
              required
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
              Courses Taught (comma-separated)
            </label>
            <input
              type="text"
              value={formData.courses}
              onChange={(e) => setFormData(prev => ({ ...prev, courses: e.target.value }))}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out'
              }}
              placeholder="CS101, CS102"
              onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6';
                e.target.style.boxShadow = '0 0 0 3px rgb(59 130 246 / 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d1d5db';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
        </div>

        <div>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '16px'
          }}>
            Availability Schedule
          </label>
          <div style={{
            backgroundColor: '#f9fafb',
            borderRadius: '8px',
            padding: '16px'
          }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{
                      textAlign: 'left',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#6b7280',
                      padding: '8px 12px'
                    }}>Time</th>
                    {dayLabels.map(day => (
                      <th key={day} style={{
                        textAlign: 'center',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#6b7280',
                        padding: '8px 12px'
                      }}>
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timeSlots.map(timeSlot => (
                    <tr key={timeSlot} style={{ borderTop: '1px solid #e5e7eb' }}>
                      <td style={{
                        fontSize: '14px',
                        color: '#374151',
                        padding: '8px 12px',
                        fontWeight: '500'
                      }}>
                        {timeSlot}
                      </td>
                      {days.map(day => (
                        <td key={day} style={{ textAlign: 'center', padding: '8px 12px' }}>
                          <input
                            type="checkbox"
                            checked={formData.availability[day].includes(timeSlot)}
                            onChange={(e) => handleAvailabilityChange(day, timeSlot, e.target.checked)}
                            style={{
                              width: '16px',
                              height: '16px',
                              accentColor: '#3b82f6'
                            }}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
          <button
            onClick={handleSubmit}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'background-color 0.15s ease-in-out'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
          >
            <Save style={{ width: '16px', height: '16px' }} />
            {editingLecturer ? "Update Lecturer" : "Save Lecturer"}
          </button>
          {editingLecturer && onCancel && (
            <button
              onClick={onCancel}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                backgroundColor: '#f3f4f6',
                color: '#374151',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'background-color 0.15s ease-in-out'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#e5e7eb'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#f3f4f6'}
            >
              <X style={{ width: '16px', height: '16px' }} />
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function LecturerCard({ lecturer, onEdit, onDelete }) {
  const totalSlots = Object.values(lecturer.availability).flat().length;
  
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      border: '1px solid #e5e7eb',
      padding: '24px',
      transition: 'box-shadow 0.15s ease-in-out',
      ':hover': {
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
      }
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.boxShadow = '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)';
    }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <User style={{ width: '24px', height: '24px', color: 'white' }} />
          </div>
          <div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#111827',
              margin: '0 0 4px 0'
            }}>
              {lecturer.name}
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', color: '#6b7280' }}>
                <BookOpen style={{ width: '16px', height: '16px' }} />
                <span>{lecturer.courses.length > 0 ? lecturer.courses.join(", ") : "No courses assigned"}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', color: '#6b7280' }}>
                <Clock style={{ width: '16px', height: '16px' }} />
                <span>{totalSlots} time slots available</span>
              </div>
            </div>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => onEdit(lecturer)}
            style={{
              padding: '8px',
              backgroundColor: 'transparent',
              border: 'none',
              borderRadius: '8px',
              color: '#6b7280',
              cursor: 'pointer',
              transition: 'all 0.15s ease-in-out'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#eff6ff';
              e.target.style.color = '#3b82f6';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#6b7280';
            }}
            title="Edit lecturer"
          >
            <Edit2 style={{ width: '16px', height: '16px' }} />
          </button>
          <button
            onClick={() => onDelete(lecturer.id)}
            style={{
              padding: '8px',
              backgroundColor: 'transparent',
              border: 'none',
              borderRadius: '8px',
              color: '#6b7280',
              cursor: 'pointer',
              transition: 'all 0.15s ease-in-out'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#fef2f2';
              e.target.style.color = '#dc2626';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#6b7280';
            }}
            title="Delete lecturer"
          >
            <Trash2 style={{ width: '16px', height: '16px' }} />
          </button>
        </div>
      </div>

      <div style={{ marginTop: '16px' }}>
        <h4 style={{
          fontSize: '14px',
          fontWeight: '500',
          color: '#374151',
          marginBottom: '12px'
        }}>
          Weekly Schedule
        </h4>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '8px'
        }}>
          {days.map((day, index) => (
            <div key={day} style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '12px',
                fontWeight: '500',
                color: '#6b7280',
                marginBottom: '4px'
              }}>
                {dayLabels[index]}
              </div>
              <div style={{
                fontSize: '12px',
                color: '#9ca3af',
                marginBottom: '4px'
              }}>
                {lecturer.availability[day].length} slots
              </div>
              <div style={{
                width: '100%',
                height: '8px',
                backgroundColor: '#e5e7eb',
                borderRadius: '9999px',
                marginTop: '4px'
              }}>
                <div
                  style={{
                    height: '100%',
                    background: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)',
                    borderRadius: '9999px',
                    transition: 'all 0.3s ease',
                    width: `${(lecturer.availability[day].length / timeSlots.length) * 100}%`
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function LecturersPage() {
  const [lecturers, setLecturers] = useState(mockLecturers);
  const [editingLecturer, setEditingLecturer] = useState(null);

  const handleSaveLecturer = (lecturer) => {
    if (editingLecturer) {
      setLecturers(prev => prev.map(l => l.id === lecturer.id ? lecturer : l));
      setEditingLecturer(null);
      alert('Lecturer updated successfully!');
    } else {
      setLecturers(prev => [...prev, lecturer]);
      alert('Lecturer added successfully!');
    }
  };

  const handleEditLecturer = (lecturer) => {
    setEditingLecturer(lecturer);
  };

  const handleDeleteLecturer = (id) => {
    if (window.confirm("Are you sure you want to delete this lecturer?")) {
      setLecturers(prev => prev.filter(l => l.id !== id));
    }
  };

  const handleCancelEdit = () => {
    setEditingLecturer(null);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      padding: '24px'
    }}>
      <div style={{ maxWidth: '1792px', margin: '0 auto' }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{
            fontSize: '30px',
            fontWeight: '700',
            color: '#111827',
            marginBottom: '8px'
          }}>
            Lecturers Management
          </h1>
          <p style={{ color: '#6b7280', margin: 0 }}>
            Manage lecturer information, courses, and availability schedules
          </p>
        </div>

        <LecturerForm 
          onSave={handleSaveLecturer}
          editingLecturer={editingLecturer}
          onCancel={editingLecturer ? handleCancelEdit : null}
        />

        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#111827',
              margin: 0
            }}>
              Current Lecturers ({lecturers.length})
            </h2>
          </div>
        </div>

        {lecturers.length === 0 ? (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
            border: '1px solid #e5e7eb',
            padding: '48px',
            textAlign: 'center'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              backgroundColor: '#f3f4f6',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto'
            }}>
              <User style={{ width: '32px', height: '32px', color: '#9ca3af' }} />
            </div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '500',
              color: '#111827',
              marginBottom: '8px'
            }}>
              No lecturers added yet
            </h3>
            <p style={{ color: '#6b7280', margin: 0 }}>
              Add your first lecturer using the form above to get started.
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
            gap: '24px'
          }}>
            {lecturers.map(lecturer => (
              <LecturerCard
                key={lecturer.id}
                lecturer={lecturer}
                onEdit={handleEditLecturer}
                onDelete={handleDeleteLecturer}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}