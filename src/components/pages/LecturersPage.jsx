import React, { useState } from "react";
import { User, Clock, BookOpen, Plus, Trash2, Edit2, Save, X } from "lucide-react";

// Mock context for demonstration
const mockLecturers = [
  {
    id: 1,
    name: "Dr. Jane Smith",
    courses: ["Mathematics", "Calculus"],
    availability: {
      monday: ["08:00-09:00", "09:00-10:00"],
      tuesday: ["10:00-11:00", "11:00-12:00"],
      wednesday: [],
      thursday: ["14:00-15:00", "15:00-16:00"],
      friday: ["08:00-09:00", "13:00-14:00"]
    }
  },
  {
    id: 2,
    name: "Prof. John Davis",
    courses: ["Physics", "Advanced Physics"],
    availability: {
      monday: ["10:00-11:00", "11:00-12:00"],
      tuesday: ["08:00-09:00", "09:00-10:00"],
      wednesday: ["14:00-15:00", "15:00-16:00"],
      thursday: [],
      friday: ["10:00-11:00", "11:00-12:00"]
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
    <div className="form-container">
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
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
        <h3 style={{
          fontSize: '20px',
          fontWeight: '600',
          color: '#e0e0e0',
          margin: 0
        }}>
          {editingLecturer ? "Edit Lecturer" : "Add New Lecturer"}
        </h3>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <div className="form-grid">
          <div className="form-group">
            <label>Lecturer Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="e.g., Dr. Jane Doe"
              required
            />
          </div>

          <div className="form-group">
            <label>Courses Taught (comma-separated)</label>
            <input
              type="text"
              value={formData.courses}
              onChange={(e) => setFormData(prev => ({ ...prev, courses: e.target.value }))}
              placeholder="CS101, CS102"
            />
          </div>
        </div>

        <div>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: '#e0e0e0',
            marginBottom: '16px'
          }}>
            Availability Schedule
          </label>
          <div style={{
            backgroundColor: '#1a1a1a',
            borderRadius: '8px',
            padding: '16px',
            border: '1px solid #333'
          }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{
                      textAlign: 'left',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#a0a0a0',
                      padding: '8px 12px'
                    }}>Time</th>
                    {dayLabels.map(day => (
                      <th key={day} style={{
                        textAlign: 'center',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#a0a0a0',
                        padding: '8px 12px'
                      }}>
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timeSlots.map(timeSlot => (
                    <tr key={timeSlot} style={{ borderTop: '1px solid #333' }}>
                      <td style={{
                        fontSize: '14px',
                        color: '#e0e0e0',
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
                              accentColor: '#4caf50'
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

        <div className="form-actions">
          {editingLecturer && onCancel && (
            <button
              onClick={onCancel}
              className="btn btn-secondary"
            >
              <X style={{ width: '16px', height: '16px' }} />
              Cancel
            </button>
          )}
          <button
            onClick={handleSubmit}
            className="btn btn-primary"
          >
            <Save style={{ width: '16px', height: '16px' }} />
            {editingLecturer ? "Update Lecturer" : "Save Lecturer"}
          </button>
        </div>
      </div>
    </div>
  );
}

function LecturerCard({ lecturer, onEdit, onDelete }) {
  const totalSlots = Object.values(lecturer.availability).flat().length;
  
  return (
    <div className="data-card">
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            background: 'linear-gradient(135deg, #2d5a27 0%, #3a7a33 100%)',
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
              color: '#e0e0e0',
              margin: '0 0 4px 0'
            }}>
              {lecturer.name}
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', color: '#a0a0a0' }}>
                <BookOpen style={{ width: '16px', height: '16px' }} />
                <span>{lecturer.courses.length > 0 ? lecturer.courses.join(", ") : "No courses assigned"}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', color: '#a0a0a0' }}>
                <Clock style={{ width: '16px', height: '16px' }} />
                <span>{totalSlots} time slots available</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="action-buttons">
          <button
            onClick={() => onEdit(lecturer)}
            className="icon-btn"
            title="Edit lecturer"
          >
            <Edit2 style={{ width: '16px', height: '16px' }} />
          </button>
          <button
            onClick={() => onDelete(lecturer.id)}
            className="icon-btn"
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
          color: '#c0c0c0',
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
                color: '#a0a0a0',
                marginBottom: '4px'
              }}>
                {dayLabels[index]}
              </div>
              <div style={{
                fontSize: '12px',
                color: '#a0a0a0',
                marginBottom: '4px'
              }}>
                {lecturer.availability[day].length} slots
              </div>
              <div style={{
                width: '100%',
                height: '8px',
                backgroundColor: '#333',
                borderRadius: '9999px',
                marginTop: '4px'
              }}>
                <div
                  style={{
                    height: '100%',
                    background: 'linear-gradient(90deg, #2d5a27 0%, #3a7a33 100%)',
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

  // Statistics
  const totalLecturers = lecturers.length;
  const totalCourses = lecturers.reduce((sum, lecturer) => sum + lecturer.courses.length, 0);
  const avgAvailability = lecturers.length > 0 
    ? Math.round(lecturers.reduce((sum, lecturer) => sum + Object.values(lecturer.availability).flat().length, 0) / lecturers.length) 
    : 0;

  return (
    <div className="page active">
      <h1>Lecturer Management</h1>
      
      {/* Statistics Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        <div className="stat-card">
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#4caf50', marginBottom: '4px' }}>
            {totalLecturers}
          </div>
          <div style={{ fontSize: '14px', color: '#a0a0a0' }}>Total Lecturers</div>
        </div>
        <div className="stat-card">
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#4caf50', marginBottom: '4px' }}>
            {totalCourses}
          </div>
          <div style={{ fontSize: '14px', color: '#a0a0a0' }}>Total Courses</div>
        </div>
        <div className="stat-card">
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#4caf50', marginBottom: '4px' }}>
            {avgAvailability}
          </div>
          <div style={{ fontSize: '14px', color: '#a0a0a0' }}>Avg. Availability</div>
        </div>
      </div>

      <LecturerForm 
        onSave={handleSaveLecturer}
        editingLecturer={editingLecturer}
        onCancel={editingLecturer ? handleCancelEdit : null}
      />

      <div className="form-container">
        <h2>Lecturer List</h2>
        
        {lecturers.length === 0 ? (
          <div style={{
            padding: '48px',
            textAlign: 'center',
            color: '#a0a0a0'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              backgroundColor: '#2d5a27',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto'
            }}>
              <User style={{ width: '32px', height: '32px', color: '#4caf50' }} />
            </div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '500',
              color: '#e0e0e0',
              marginBottom: '8px'
            }}>
              No lecturers added yet
            </h3>
            <p style={{ margin: 0 }}>
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