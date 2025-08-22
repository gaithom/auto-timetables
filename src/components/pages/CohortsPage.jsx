import React, { useState } from "react";
import { Users, Plus, Trash2, Edit2, Save, X, GraduationCap, Hash } from "lucide-react";

// Mock context for demonstration
const mockCohorts = [
  
];

function CohortForm({ onSave, editingCohort = null, onCancel = null }) {
  const [formData, setFormData] = useState({
    name: editingCohort?.name || "",
    size: editingCohort?.size || "",
    program: editingCohort?.program || "",
    year: editingCohort?.year || "",
    semester: editingCohort?.semester || ""
  });

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!formData.name.trim()) {
      alert('Please enter a cohort name');
      return;
    }
    if (!formData.size || formData.size <= 0) {
      alert('Please enter a valid cohort size');
      return;
    }
    
    const cohort = {
      id: editingCohort?.id || Date.now(),
      name: formData.name,
      size: parseInt(formData.size),
      program: formData.program,
      year: parseInt(formData.year) || 1,
      semester: formData.semester
    };
    
    onSave(cohort);
    
    if (!editingCohort) {
      setFormData({
        name: "",
        size: "",
        program: "",
        year: "",
        semester: ""
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
          backgroundColor: '#dcfce7',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Plus style={{ width: '20px', height: '20px', color: '#16a34a' }} />
        </div>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '600',
          color: '#111827',
          margin: 0
        }}>
          {editingCohort ? "Edit Cohort" : "Add New Cohort"}
        </h3>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '24px' }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '8px'
            }}>
              Cohort Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              style={{
                width: '90%',
                padding: '12px 16px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out'
              }}
              placeholder="e.g., CS Year 1"
              onFocus={(e) => {
                e.target.style.borderColor = '#16a34a';
                e.target.style.boxShadow = '0 0 0 3px rgb(22 163 74 / 0.1)';
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
              Cohort Size
            </label>
            <input
              type="number"
              value={formData.size}
              onChange={(e) => setFormData(prev => ({ ...prev, size: e.target.value }))}
              style={{
                width: '90%',
                padding: '12px 16px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out'
              }}
              placeholder="e.g., 30"
              min="1"
              onFocus={(e) => {
                e.target.style.borderColor = '#16a34a';
                e.target.style.boxShadow = '0 0 0 3px rgb(22 163 74 / 0.1)';
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
              Program
            </label>
            <input
              type="text"
              value={formData.program}
              onChange={(e) => setFormData(prev => ({ ...prev, program: e.target.value }))}
              style={{
                width: '90%',
                padding: '12px 16px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out'
              }}
              placeholder="e.g., Computer Science"
              onFocus={(e) => {
                e.target.style.borderColor = '#16a34a';
                e.target.style.boxShadow = '0 0 0 3px rgb(22 163 74 / 0.1)';
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
              Academic Year
            </label>
            <input
              type="number"
              value={formData.year}
              onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
              style={{
                width: '90%',
                padding: '12px 16px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out'
              }}
              placeholder="e.g., 1"
              min="1"
              max="4"
              onFocus={(e) => {
                e.target.style.borderColor = '#16a34a';
                e.target.style.boxShadow = '0 0 0 3px rgb(22 163 74 / 0.1)';
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
              Semester
            </label>
            <select
              value={formData.semester}
              onChange={(e) => setFormData(prev => ({ ...prev, semester: e.target.value }))}
              style={{
                width: '90%',
                padding: '12px 16px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                backgroundColor: 'white',
                transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#16a34a';
                e.target.style.boxShadow = '0 0 0 3px rgb(22 163 74 / 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d1d5db';
                e.target.style.boxShadow = 'none';
              }}
            >
              <option value="">Select semester</option>
              <option value="Year 1">Year 1</option>
              <option value="Year 2">Year 2</option>
              <option value="Year 3">Year 3</option>
              <option value="Year 4">Year 4</option>
            </select>
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
              backgroundColor: '#16a34a',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'background-color 0.15s ease-in-out'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#15803d'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#16a34a'}
          >
            <Save style={{ width: '16px', height: '16px' }} />
            {editingCohort ? "Update Cohort" : "Save Cohort"}
          </button>
          {editingCohort && onCancel && (
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

function CohortCard({ cohort, onEdit, onDelete }) {
  const getSizeColor = (size) => {
    if (size >= 40) return '#dc2626';
    if (size >= 30) return '#ea580c';
    if (size >= 20) return '#16a34a';
    return '#2563eb';
  };

  const getSizeLabel = (size) => {
    if (size >= 40) return 'Large';
    if (size >= 30) return 'Medium';
    if (size >= 20) return 'Small';
    return 'Mini';
  };

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      border: '1px solid #e5e7eb',
      padding: '24px',
      transition: 'box-shadow 0.15s ease-in-out',
      position: 'relative',
      overflow: 'hidden'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.boxShadow = '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)';
    }}
    >
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100px',
        height: '100px',
        background: 'linear-gradient(135deg, rgba(22, 163, 74, 0.05) 0%, rgba(34, 197, 94, 0.1) 100%)',
        borderRadius: '50%',
        transform: 'translate(30px, -30px)'
      }} />

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            background: 'linear-gradient(135deg, #16a34a 0%, #22c55e 100%)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Users style={{ width: '24px', height: '24px', color: 'white' }} />
          </div>
          <div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#111827',
              margin: '0 0 4px 0'
            }}>
              {cohort.name}
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', color: '#6b7280' }}>
                <Hash style={{ width: '16px', height: '16px' }} />
                <span>{cohort.size} students</span>
              </div>
              {cohort.program && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', color: '#6b7280' }}>
                  <GraduationCap style={{ width: '16px', height: '16px' }} />
                  <span>{cohort.program}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => onEdit(cohort)}
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
              e.target.style.backgroundColor = '#f0fdf4';
              e.target.style.color = '#16a34a';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#6b7280';
            }}
            title="Edit cohort"
          >
            <Edit2 style={{ width: '16px', height: '16px' }} />
          </button>
          <button
            onClick={() => onDelete(cohort.id)}
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
            title="Delete cohort"
          >
            <Trash2 style={{ width: '16px', height: '16px' }} />
          </button>
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>
            Cohort Size
          </span>
          <div style={{
            padding: '4px 12px',
            borderRadius: '12px',
            backgroundColor: `${getSizeColor(cohort.size)}15`,
            color: getSizeColor(cohort.size),
            fontSize: '12px',
            fontWeight: '600'
          }}>
            {getSizeLabel(cohort.size)}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{
            flex: 1,
            height: '8px',
            backgroundColor: '#f3f4f6',
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              backgroundColor: getSizeColor(cohort.size),
              width: `${Math.min((cohort.size / 50) * 100, 100)}%`,
              transition: 'width 0.3s ease',
              borderRadius: '4px'
            }} />
          </div>
          <span style={{ fontSize: '14px', fontWeight: '600', color: getSizeColor(cohort.size), minWidth: '30px' }}>
            {cohort.size}
          </span>
        </div>

        {(cohort.year || cohort.semester) && (
          <div style={{ display: 'flex', gap: '12px', fontSize: '13px', color: '#6b7280' }}>
            {cohort.year && (
              <span>Year {cohort.year}</span>
            )}
            {cohort.semester && (
              <span>• {cohort.semester}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function CohortsPage() {
  const [cohorts, setCohorts] = useState(mockCohorts);
  const [editingCohort, setEditingCohort] = useState(null);

  const handleSaveCohort = (cohort) => {
    if (editingCohort) {
      setCohorts(prev => prev.map(c => c.id === cohort.id ? cohort : c));
      setEditingCohort(null);
      alert('Cohort updated successfully!');
    } else {
      setCohorts(prev => [...prev, cohort]);
      alert('Cohort added successfully!');
    }
  };

  const handleEditCohort = (cohort) => {
    setEditingCohort(cohort);
  };

  const handleDeleteCohort = (id) => {
    if (window.confirm("Are you sure you want to delete this cohort?")) {
      setCohorts(prev => prev.filter(c => c.id !== id));
      alert('Cohort deleted successfully!');
    }
  };

  const handleCancelEdit = () => {
    setEditingCohort(null);
  };

  const totalStudents = cohorts.reduce((sum, cohort) => sum + cohort.size, 0);
  const averageSize = cohorts.length > 0 ? Math.round(totalStudents / cohorts.length) : 0;

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
            Cohorts Management
          </h1>
          <p style={{ color: '#6b7280', margin: 0 }}>
            Manage student cohorts, sizes, and academic information
          </p>
        </div>

        {/* Statistics Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#16a34a', marginBottom: '4px' }}>
              {cohorts.length}
            </div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>Total Cohorts</div>
          </div>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#2563eb', marginBottom: '4px' }}>
              {totalStudents}
            </div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>Total Students</div>
          </div>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#ea580c', marginBottom: '4px' }}>
              {averageSize}
            </div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>Average Size</div>
          </div>
        </div>

        <CohortForm 
          onSave={handleSaveCohort}
          editingCohort={editingCohort}
          onCancel={editingCohort ? handleCancelEdit : null}
        />

        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#111827',
              margin: 0
            }}>
              Current Cohorts ({cohorts.length})
            </h2>
          </div>
        </div>

        {cohorts.length === 0 ? (
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
              <Users style={{ width: '32px', height: '32px', color: '#9ca3af' }} />
            </div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '500',
              color: '#111827',
              marginBottom: '8px'
            }}>
              No cohorts added yet
            </h3>
            <p style={{ color: '#6b7280', margin: 0 }}>
              Add your first cohort using the form above to get started.
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '24px'
          }}>
            {cohorts.map(cohort => (
              <CohortCard
                key={cohort.id}
                cohort={cohort}
                onEdit={handleEditCohort}
                onDelete={handleDeleteCohort}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}