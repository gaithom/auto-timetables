import React, { useState } from "react";
import { Plus, GraduationCap, Edit2, Trash2, Power, Save, X } from "lucide-react";

// Enhanced ProgramForm component with dark theme
function ProgramForm({ isOpen, onClose, program = null, onSave }) {
  const [formData, setFormData] = useState({
    name: program?.name || '',
    code: program?.code || '',
    department: program?.department || '',
    duration: program?.duration || '',
    status: program?.status || 'Active'
  });

  // Update form data when program prop changes
  React.useEffect(() => {
    if (program) {
      setFormData({
        name: program.name || '',
        code: program.code || '',
        department: program.department || '',
        duration: program.duration || '',
        status: program.status || 'Active'
      });
    } else {
      setFormData({
        name: '',
        code: '',
        department: '',
        duration: '',
        status: 'Active'
      });
    }
  }, [program]);

  const handleSubmit = () => {
    if (!formData.name.trim() || !formData.code.trim() || !formData.department.trim() || !formData.duration.trim()) {
      alert('Please fill in all fields');
      return;
    }

    const programData = {
      ...formData,
      name: formData.name.trim(),
      code: formData.code.trim(),
      department: formData.department.trim(),
      duration: formData.duration.trim(),
      id: program ? program.id : Date.now(),
      courses: program ? program.courses : []
    };
    
    // Call the save function passed from parent
    onSave(programData, !!program);
    
    // Reset form and close
    setFormData({ name: '', code: '', department: '', duration: '', status: 'Active' });
    onClose();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen) return null;
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50
    }}>
      <div className="form-container" style={{ width: '400px', maxWidth: '90vw' }}>
        <h3 style={{ 
          fontSize: '20px', 
          fontWeight: '600', 
          marginBottom: '24px', 
          color: '#e0e0e0',
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
            <GraduationCap style={{ width: '20px', height: '20px', color: '#4caf50' }} />
          </div>
          {program ? 'Edit Program' : 'Add New Program'}
        </h3>
        
        <div className="form-group">
          <label>Program Name *</label>
          <input 
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Computer Science"
            required
          />
        </div>

        <div className="form-group">
          <label>Program Code *</label>
          <input 
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            placeholder="e.g., CS"
            required
          />
        </div>

        <div className="form-group">
          <label>Department *</label>
          <input 
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="e.g., School of Computing"
            required
          />
        </div>

        <div className="form-group">
          <label>Duration *</label>
          <input 
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="e.g., 8 semesters"
            required
          />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select 
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="form-actions">
          <button 
            type="button"
            onClick={onClose}
            className="btn btn-secondary"
          >
            <X style={{ width: '16px', height: '16px' }} />
            Cancel
          </button>
          <button 
            type="button"
            onClick={handleSubmit}
            className="btn btn-primary"
          >
            <Save style={{ width: '16px', height: '16px' }} />
            {program ? 'Update Program' : 'Add Program'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProgramsPage() {
  // Mock data for demonstration
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

  const [showForm, setShowForm] = useState(false);
  const [editingProgram, setEditingProgram] = useState(null);

  // Mock functions
  const addProgram = (programData) => {
    setPrograms(prev => [...prev, { ...programData, id: Date.now() }]);
  };

  const updateProgram = (programData) => {
    setPrograms(prev => prev.map(p => p.id === programData.id ? programData : p));
  };

  const toggleProgramStatus = (id) => {
    setPrograms(prev => prev.map(p => 
      p.id === id 
        ? { ...p, status: p.status === 'Active' ? 'Inactive' : 'Active' }
        : p
    ));
  };

  const removeProgram = (id) => {
    if (window.confirm('Are you sure you want to delete this program? This action cannot be undone.')) {
      setPrograms(prev => prev.filter(p => p.id !== id));
    }
  };

  // Handle saving program (add or update)
  const handleSaveProgram = (programData, isUpdate) => {
    if (isUpdate) {
      updateProgram(programData);
    } else {
      addProgram(programData);
    }
  };

  // Handle opening edit form
  const handleEdit = (program) => {
    setEditingProgram(program);
    setShowForm(true);
  };

  // Handle closing form
  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProgram(null);
  };

  // Statistics
  const activePrograms = programs.filter(p => p.status === 'Active').length;
  const inactivePrograms = programs.filter(p => p.status === 'Inactive').length;

  return (
    <div className="page active">
      <h1>Program Management</h1>
      
      {/* Statistics Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        <div className="stat-card">
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#4caf50', marginBottom: '4px' }}>
            {programs.length}
          </div>
          <div style={{ fontSize: '14px', color: '#a0a0a0' }}>Total Programs</div>
        </div>
        <div className="stat-card">
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#4caf50', marginBottom: '4px' }}>
            {activePrograms}
          </div>
          <div style={{ fontSize: '14px', color: '#a0a0a0' }}>Active Programs</div>
        </div>
        <div className="stat-card">
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#4caf50', marginBottom: '4px' }}>
            {inactivePrograms}
          </div>
          <div style={{ fontSize: '14px', color: '#a0a0a0' }}>Inactive Programs</div>
        </div>
      </div>

      {/* Add Program Button */}
      <div style={{ marginBottom: '24px' }}>
        <button 
          onClick={() => setShowForm(true)}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Plus style={{ width: '16px', height: '16px' }} />
          Add Program
        </button>
      </div>

      {/* Programs List */}
      <div className="form-container">
        <h2>Program List</h2>
        
        {programs.length === 0 ? (
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
              <GraduationCap style={{ width: '32px', height: '32px', color: '#4caf50' }} />
            </div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '500',
              color: '#e0e0e0',
              marginBottom: '8px'
            }}>
              No programs added yet
            </h3>
            <p style={{ margin: 0 }}>
              Add your first program using the button above to get started.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {programs.map((program) => (
              <div key={program.id} className="data-card">
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
                      <GraduationCap style={{ width: '24px', height: '24px', color: 'white' }} />
                    </div>
                    <div>
                      <h3 style={{
                        fontSize: '18px',
                        fontWeight: '600',
                        color: '#e0e0e0',
                        margin: '0 0 4px 0'
                      }}>
                        {program.name}
                      </h3>
                      <p style={{ color: '#a0a0a0', marginBottom: '8px' }}>Code: {program.code}</p>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#a0a0a0' }}>
                        <span><strong>Department:</strong> {program.department}</span>
                        <span>•</span>
                        <span><strong>Duration:</strong> {program.duration}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="action-buttons">
                    <button
                      onClick={() => handleEdit(program)}
                      className="icon-btn"
                      title="Edit program"
                    >
                      <Edit2 style={{ width: '16px', height: '16px' }} />
                    </button>
                    <button
                      onClick={() => removeProgram(program.id)}
                      className="icon-btn"
                      title="Delete program"
                    >
                      <Trash2 style={{ width: '16px', height: '16px' }} />
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{
                    padding: '4px 12px',
                    borderRadius: '12px',
                    backgroundColor: program.status === 'Active' ? 'rgba(76, 175, 80, 0.2)' : 'rgba(120, 120, 120, 0.2)',
                    color: program.status === 'Active' ? '#4caf50' : '#a0a0a0',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    {program.status}
                  </div>
                  
                  <button 
                    onClick={() => toggleProgramStatus(program.id)}
                    className="btn btn-secondary"
                    style={{ 
                      padding: '6px 12px',
                      fontSize: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Power style={{ width: '14px', height: '14px' }} />
                    {program.status === 'Active' ? 'Deactivate' : 'Activate'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ProgramForm 
        isOpen={showForm} 
        onClose={handleCloseForm}
        program={editingProgram}
        onSave={handleSaveProgram}
      />
    </div>
  );
}                                                                                 