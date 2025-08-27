import React from "react";
import { 
  BookOpen, 
  Users, 
  DoorOpen,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Clock,
  Plus,
  UserPlus,
  Settings
} from "lucide-react";

export default function EnhancedDashboard({ onNavigateToTimetable }) {
  return (
    <div className="page active">
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1>Dashboard</h1>
        <p>Welcome to Timetable Forge - Manage your academic scheduling</p>
        
        <button 
          onClick={onNavigateToTimetable}
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
              <div className="stat-number">12</div>
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
              <div className="stat-number">148</div>
              <div className="stat-description">Currently scheduled courses</div>
            </div>
            <div className="stat-icon">
              <Calendar size={28} color="#4caf50" />
            </div>
          </div>
        </div>

        {/* Teaching Staff Card */}
        <div className="stat-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Users size={20} color="#4caf50" />
              </div>
              <h3>Teaching Staff</h3>
              <div className="stat-number">32</div>
              <div className="stat-description">Available lecturers</div>
            </div>
            <div className="stat-icon">
              <Users size={28} color="#4caf50" />
            </div>
          </div>
        </div>

        {/* Lecture Rooms Card */}
        <div className="stat-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <DoorOpen size={20} color="#4caf50" />
              </div>
              <h3>Lecture Rooms</h3>
              <div className="stat-number">18</div>
              <div className="stat-description">Available facilities</div>
            </div>
            <div className="stat-icon">
              <DoorOpen size={28} color="#4caf50" />
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
            {/* Activity 1 */}
            <div className="activity-item">
              <div className="activity-icon success">
                <CheckCircle size={16} color="#4caf50" />
              </div>
              <div>
                <div className="activity-title">Computer Science timetable generated successfully</div>
                <div className="activity-time">2 minutes ago</div>
              </div>
            </div>

            {/* Activity 2 */}
            <div className="activity-item">
              <div className="activity-icon warning">
                <AlertTriangle size={16} color="#ff9800" />
              </div>
              <div>
                <div className="activity-title">Scheduling conflict detected in Business Administration</div>
                <div className="activity-time">15 minutes ago</div>
              </div>
            </div>

            {/* Activity 3 */}
            <div className="activity-item">
              <div className="activity-icon info">
                <Clock size={16} color="#4caf50" />
              </div>
              <div>
                <div className="activity-title">New lecturer Dr. Smith added to system</div>
                <div className="activity-time">1 hour ago</div>
              </div>
            </div>

            {/* Activity 4 */}
            <div className="activity-item">
              <div className="activity-icon success">
                <CheckCircle size={16} color="#4caf50" />
              </div>
              <div>
                <div className="activity-title">Room allocation updated for Engineering program</div>
                <div className="activity-time">2 hours ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2>Quick Actions</h2>
        <p>Common tasks and shortcuts</p>
        
        <div className="quick-actions-grid">
          {/* Add Program */}
          <button className="quick-action-btn">
            <div className="quick-action-icon">
              <Plus size={24} color="#4caf50" />
            </div>
            <h3>Add Program</h3>
          </button>

          {/* Manage Lecturers */}
          <button className="quick-action-btn">
            <div className="quick-action-icon">
              <UserPlus size={24} color="#4caf50" />
            </div>
            <h3>Manage Lecturers</h3>
          </button>

          {/* Configure Rooms */}
          <button className="quick-action-btn">
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