import React, { useState } from "react";
import { Plus, GraduationCap } from "lucide-react";

// Enhanced ProgramForm component with full functionality
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
    console.log('Submit button clicked with data:', formData); // Debug log
    
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

    console.log('Saving program:', programData); // Debug log
    
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
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '24px',
        width: '400px',
        maxWidth: '90vw'
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
          {program ? 'Edit Program' : 'Add New Program'}
        </h3>
        
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}>
            Program Name *
          </label>
          <input 
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Computer Science"
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              fontSize: '14px',
              boxSizing: 'border-box'
            }}
            required
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}>
            Program Code *
          </label>
          <input 
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            placeholder="e.g., CS"
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              fontSize: '14px',
              boxSizing: 'border-box'
            }}
            required
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}>
            Department *
          </label>
          <input 
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="e.g., School of Computing"
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              fontSize: '14px',
              boxSizing: 'border-box'
            }}
            required
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}>
            Duration *
          </label>
          <input 
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="e.g., 8 semesters"
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              fontSize: '14px',
              boxSizing: 'border-box'
            }}
            required
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}>
            Status
          </label>
          <select 
            name="status"
            value={formData.status}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              fontSize: '14px',
              boxSizing: 'border-box'
            }}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          <button 
            type="button"
            onClick={onClose}
            style={{
              padding: '8px 16px',
              color: '#6b7280',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              background: 'white',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Cancel
          </button>
          <button 
            type="button"
            onClick={handleSubmit}
            style={{
              padding: '8px 16px',
              background: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
          >
            {program ? 'Update Program' : 'Add Program'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProgramsPage() {
  // In your actual implementation, replace this with:
  // const { programs, addProgram, updateProgram, removeProgram } = useTimetable();
  
  // Mock data for demonstration - replace with your actual context data
  const [programs, setPrograms] = useState([
   
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingProgram, setEditingProgram] = useState(null);

  // Mock functions - replace these with your actual TimetableContext functions
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

  return (
    <div style={{ background: 'white', minHeight: '100vh', margin: '-24px', padding: '24px' }}>
      {/* Header */}
      <div className="mb-6">
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1f2937', marginBottom: '8px' }}>Programs</h1>
        <p style={{ color: '#6b7280', marginBottom: '16px' }}>Manage academic programs and degrees</p>
        
        {/* Add Program Button */}
        <button 
          onClick={() => setShowForm(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            border: '1px solid #d1d5db',
            color: '#374151',
            padding: '6px 12px',
            borderRadius: '6px',
            fontSize: '14px',
            background: 'white',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
        >
          <Plus size={16} />
          Add Program
        </button>
      </div>

      {/* Programs List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {programs.map((program) => (
          <div key={program.id} style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <div style={{ marginTop: '4px' }}>
                <GraduationCap style={{ width: '20px', height: '20px', color: '#9ca3af' }} />
              </div>
              
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '4px' }}>
                  {program.name}
                </h2>
                <p style={{ color: '#6b7280', marginBottom: '8px' }}>Code: {program.code}</p>
                
                <p style={{ color: '#6b7280', marginBottom: '8px' }}>{program.status}</p>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#6b7280', marginBottom: '4px' }}>
                  <GraduationCap style={{ width: '16px', height: '16px' }} />
                  <span><strong>Department:</strong> {program.department}</span>
                </div>
                <p style={{ color: '#6b7280', marginBottom: '16px' }}>
                  <strong>Duration:</strong> {program.duration}
                </p>
                
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    onClick={() => handleEdit(program)}
                    style={{
                      padding: '6px 12px',
                      fontSize: '14px',
                      color: '#6b7280',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      background: 'white',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                  >
                    ✏️ Edit
                  </button>
                  
                  {program.status === 'Active' ? (
                    <button 
                      onClick={() => toggleProgramStatus(program.id)}
                      style={{
                        padding: '6px 12px',
                        fontSize: '14px',
                        background: '#dc2626',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#b91c1c'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#dc2626'}
                    >
                      Deactivate
                    </button>
                  ) : (
                    <button 
                      onClick={() => toggleProgramStatus(program.id)}
                      style={{
                        padding: '6px 12px',
                        fontSize: '14px',
                        background: '#2563eb',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
                    >
                      Activate
                    </button>
                  )}
                  
                  <button 
                    onClick={() => removeProgram(program.id)}
                    style={{
                      padding: '6px 12px',
                      fontSize: '14px',
                      background: '#dc2626',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s ease',
                      marginLeft: '4px'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#b91c1c'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#dc2626'}
                  >
                    Delete
                  </button>
                </div>
              </div>
              
              <div style={{ marginTop: '16px' }}>
                <GraduationCap style={{ width: '20px', height: '20px', color: '#9ca3af' }} />
              </div>
            </div>
          </div>
        ))}
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