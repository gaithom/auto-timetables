/* global globalThis */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Users, Plus, Trash2, Edit2, Save, X, GraduationCap, Hash } from "lucide-react";
import { useTimetable } from "../../context/TimetableContext";

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
      size: Number.parseInt(formData.size, 10),
      program: formData.program,
      year: Number.parseInt(formData.year, 10) || 1,
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
          {editingCohort ? "Edit Cohort" : "Add New Cohort"}
        </h3>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="cohortName">Cohort Name</label>
            <input
              type="text"
              id="cohortName"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="e.g., CS Year 1"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cohortSize">Size</label>
            <input
              type="number"
              id="cohortSize"
              value={formData.size}
              onChange={(e) => setFormData(prev => ({ ...prev, size: e.target.value }))}
              placeholder="e.g., 30"
              min="1"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cohortProgram">Program</label>
            <input
              type="text"
              id="cohortProgram"
              value={formData.program}
              onChange={(e) => setFormData(prev => ({ ...prev, program: e.target.value }))}
              placeholder="e.g., Computer Science"
            />
          </div>

          <div className="form-group">
            <label htmlFor="cohortYear">Year</label>
            <input
              type="number"
              id="cohortYear"
              value={formData.year}
              onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
              placeholder="e.g., 1"
              min="1"
              max="5"
            />
          </div>

          <div className="form-group">
            <label htmlFor="cohortSemester">Semester</label>
            <select
              id="cohortSemester"
              value={formData.semester}
              onChange={(e) => setFormData(prev => ({ ...prev, semester: e.target.value }))}
            >
              <option value="">Select semester</option>
              <option value="semester 1">semester 1</option>
              <option value="semester 2">semester 2</option>
              <option value="semester 3">semester 3</option>
            </select>
          </div>
        </div>

        <div className="form-actions">
          {editingCohort && onCancel && (
            <button className="btn btn-secondary" onClick={onCancel}>
              <X style={{ width: '16px', height: '16px' }} />
              Cancel
            </button>
          )}
          <button className="btn btn-primary" onClick={handleSubmit}>
            <Save style={{ width: '16px', height: '16px' }} />
            {editingCohort ? "Update Cohort" : "Save Cohort"}
          </button>
        </div>
      </div>
    </div>
  );
}

function CohortCard({ cohort, onEdit, onDelete }) {


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
    }}>
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
            aria-label="Edit cohort"
          >
            <Edit2 size={20} />
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
            aria-label="Delete cohort"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      {(cohort.year || cohort.semester) && (
        <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #2d5a27' }}>
          <div style={{ display: 'flex', gap: '16px' }}>
            {cohort.year && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', color: '#4b5563' }}>
                <span>Year:</span>
                <span style={{ fontWeight: '500' }}>{cohort.year}</span>
              </div>
            )}
            {cohort.semester && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', color: '#4b5563' }}>
                <span>Semester:</span>
                <span style={{ fontWeight: '500' }}>{cohort.semester}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function CohortsPage() {
  const { cohorts, addCohort, updateCohort, removeCohort } = useTimetable();
  const [editingCohort, setEditingCohort] = useState(null);

  const handleSaveCohort = (cohort) => {
    if (editingCohort) {
      updateCohort(cohort.id, cohort);
      setEditingCohort(null);
      alert('Cohort updated successfully!');
    } else {
      addCohort(cohort);
      alert('Cohort added successfully!');
    }
  };

  const handleEditCohort = (cohort) => {
    setEditingCohort(cohort);
  };

  const handleDeleteCohort = (id) => {
    if (globalThis.confirm("Are you sure you want to delete this cohort?")) {
      removeCohort(id);
      alert('Cohort deleted successfully!');
    }
  };

  const handleCancelEdit = () => {
    setEditingCohort(null);
  };

  const totalStudents = cohorts.reduce((sum, cohort) => sum + cohort.size, 0);
  const averageSize = cohorts.length > 0 ? Math.round(totalStudents / cohorts.length) : 0;

  return (
    <div className="page active">
      <h1>Cohort Management</h1>
      
      {/* Statistics Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        <div className="stat-card">
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#4caf50', marginBottom: '4px' }}>
            {cohorts.length}
          </div>
          <div style={{ fontSize: '14px', color: '#a0a0a0' }}>Total Cohorts</div>
        </div>
        <div className="stat-card">
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#4caf50', marginBottom: '4px' }}>
            {totalStudents}
          </div>
          <div style={{ fontSize: '14px', color: '#a0a0a0' }}>Total Students</div>
        </div>
        <div className="stat-card">
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#4caf50', marginBottom: '4px' }}>
            {averageSize}
          </div>
          <div style={{ fontSize: '14px', color: '#a0a0a0' }}>Average Size</div>
        </div>
      </div>

      <CohortForm 
        onSave={handleSaveCohort}
        editingCohort={editingCohort}
        onCancel={editingCohort ? handleCancelEdit : null}
      />

      <div className="form-container">
        <h2>Cohort List</h2>
        
        {cohorts.length === 0 ? (
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
              <Users style={{ width: '32px', height: '32px', color: '#4caf50' }} />
            </div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '500',
              color: '#e0e0e0',
              marginBottom: '8px'
            }}>
              No cohorts added yet
            </h3>
            <p style={{ margin: 0 }}>
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

CohortForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  editingCohort: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    size: PropTypes.number,
    program: PropTypes.string,
    year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    semester: PropTypes.string,
  }),
  onCancel: PropTypes.func,
};

CohortCard.propTypes = {
  cohort: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    program: PropTypes.string,
    year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    semester: PropTypes.string,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};