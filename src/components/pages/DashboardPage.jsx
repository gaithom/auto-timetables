import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { 
  BookOpen, 
  Users, 
  DoorOpen,
  Calendar,
  CheckCircle,
  Plus,
  UserPlus,
  Settings
} from "lucide-react";
import { useTimetable } from "../../context/TimetableContext";

export default function EnhancedDashboard() {
  const navigate = useNavigate();
  // Access timetable data from context
  const { programs, lecturers, rooms, timetable } = useTimetable();
  
  /**
   * Calculate and memoize dashboard statistics
   * This avoids recalculating on every render unless dependencies change
   */
  const stats = useMemo(() => {
    // Count total courses by summing courses across all programs
    const totalCourses = programs.reduce(
      (sum, program) => sum + (program.courses?.length || 0), 
      0
    );
    
    // Count total scheduled sessions from the timetable
    let scheduledSessions = 0;
    if (timetable) {
      // Iterate through each day in the timetable
      Object.values(timetable).forEach(day => {
        if (day && typeof day === 'object' && !Array.isArray(day)) {
          // Iterate through each time slot in the day
          Object.values(day).forEach(slot => {
            if (Array.isArray(slot)) {
              // Add the number of sessions in this time slot
              scheduledSessions += slot.length;
            }
          });
        }
      });
    }
    
    // Return the computed statistics
    return {
      totalPrograms: programs.length,      // Total number of academic programs
      totalCourses,                       // Total courses across all programs
      totalLecturers: lecturers.length,    // Total number of lecturers
      totalRooms: rooms.length,            // Total number of rooms
      scheduledSessions,                   // Total number of scheduled sessions
      // Calculate completion percentage (capped at 100%)
      // Using 100 as a baseline for 100% completion
      completionPercentage: Math.min(Math.round((scheduledSessions / 100) * 100), 100)
    };
  }, [programs, lecturers, rooms, timetable]);

  return (
    <div className="page active">
      {/* Page Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1>Dashboard</h1>
        <p>Welcome to Timetable Forge - Manage your academic scheduling</p>
        
        <button 
          onClick={() => navigate("/timetables")}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Calendar size={16} />
          View Timetable
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        {/* Total Programs Card */}
        <div className="stat-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <BookOpen size={20} color="#4caf50" />
              </div>
              <h3>Total Programs</h3>
              <div className="stat-number">{stats.totalPrograms}</div>
              <div className="stat-description">Active academic programs</div>
            </div>
            <div className="stat-icon">
              <BookOpen size={28} color="#4caf50" />
            </div>
          </div>
        </div>

        {/* Active Courses Card */}
        <div className="stat-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Calendar size={20} color="#4caf50" />
              </div>
              <h3>Active Courses</h3>
              <div className="stat-number">{stats.totalCourses}</div>
              <div className="stat-description">Total courses across all programs</div>
            </div>
            <div className="stat-icon">
              <Calendar size={28} color="#4caf50" />
            </div>
          </div>
        </div>
      </div>

      {/* System Status and Recent Activities */}
      <div className="dashboard-grid">
        {/* System Status Card */}
        <div className="form-container">
          <h2>System Status</h2>
          <p>Current scheduling system health</p>
          
          {/* Conflict Detection */}
          <div className="status-card success">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <CheckCircle size={20} color="#4caf50" />
                <div>
                  <h4>Conflict Detection</h4>
                  <div>All systems operational</div>
                </div>
              </div>
              <div className="status-badge active">
                Active
              </div>
            </div>
          </div>

          {/* Schedule Generator */}
          <div className="status-card info">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Calendar size={20} color="#4caf50" />
                <div>
                  <h4>Schedule Generator</h4>
                  <div>Ready for new assignments</div>
                </div>
              </div>
              <div className="status-badge ready">
                Ready
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activities Card */}
        <div className="form-container">
          <h2>Recent Activities</h2>
          <p>Latest system updates and notifications</p>
          
          <div className="activities-list">
            
          </div>
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          {/* Add New Program Button */}
          <button 
            className="btn primary" 
            onClick={() => navigate('/programs/add')}
            aria-label="Add a new academic program"
          >
            Add New Program
          </button>
          
          {/* Add Lecturer Button */}
          <button 
            className="btn secondary"
            onClick={() => navigate('/lecturers/add')}
            aria-label="Add a new lecturer"
          >
            Add Lecturer
          </button>
          
          {/* Add Room Button */}
          <button 
            className="btn secondary"
            onClick={() => navigate('/rooms/add')}
            aria-label="Add a new room"
          >
            Add Room
          </button>
          
          {/* Configure Rooms Button */}
          <button className="btn secondary quick-action-btn" onClick={() => navigate('/rooms/configure')}>
            <div className="quick-action-icon">
              <Settings size={24} color="#4caf50" />
            </div>
            <h3>Configure Rooms</h3>
          </button>
        </div>
      </div>
    </div>
  );
}
