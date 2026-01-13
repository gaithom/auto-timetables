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

  // Statistics cards data
  const statCards = [
    {
      title: 'Total Programs',
      value: stats.totalPrograms,
      icon: <BookOpen />,
      color: 'var(--secondary)'
    },
    {
      title: 'Total Courses',
      value: stats.totalCourses,
      icon: <BookOpen />,
      color: 'var(--success)'
    },
    {
      title: 'Total Lecturers',
      value: stats.totalLecturers,
      icon: <Users />,
      color: 'var(--warning)'
    },
    {
      title: 'Total Rooms',
      value: stats.totalRooms,
      icon: <DoorOpen />,
      color: 'var(--info)'
    }
  ];

  return (
    <div className="page active" style={{ 
      padding: '1rem',
      maxWidth: '1400px',
      margin: '0 auto',
      width: '100%',
      boxSizing: 'border-box',
      '@media (min-width: 768px)': {
        padding: '2rem',
      },
    }}>
      {/* Page Header */}
      <div className="card" style={{ 
        marginBottom: '2rem',
        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.6) 0%, rgba(15, 23, 42, 0.8) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <h1 style={{ 
              margin: 0, 
              color: 'var(--text-primary)',
              fontSize: '1.75rem',
              fontWeight: 700,
              letterSpacing: '-0.025em',
              marginBottom: '0.5rem'
            }}>
              Dashboard
            </h1>
            <p style={{ 
              margin: 0, 
              color: 'var(--text-secondary)',
              fontSize: '1rem',
              maxWidth: '600px',
              lineHeight: '1.6'
            }}>
              Welcome to Timetable Forge - Manage your academic scheduling and optimize your institution's timetable
            </p>
          </div>
          <button 
            onClick={() => navigate("/timetables")}
            className="btn btn-primary"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              padding: '0.6rem 1.25rem',
              fontSize: '0.95rem',
              borderRadius: '8px',
              transition: 'all 0.2s ease',
              minWidth: '160px',
              justifyContent: 'center'
            }}
          >
            <Calendar size={18} />
            View Timetable
          </button>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', 
        gap: '1rem', 
        marginBottom: '1.5rem',
        '@media (max-width: 768px)': {
          gridTemplateColumns: '1fr',
          gap: '0.75rem',
        },
      }}>
        {statCards.map((stat, index) => (
          <div 
            className="card" 
            key={index} 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1.25rem',
              position: 'relative',
              overflow: 'hidden',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.6) 0%, rgba(15, 23, 42, 0.8) 100%)',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              padding: '1.25rem',
              borderRadius: '12px'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
            }}
          >
            <div style={{ 
              width: '56px', 
              height: '56px', 
              borderRadius: '12px',
              background: `${stat.color}15`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              border: `1px solid ${stat.color}20`,
              boxShadow: `0 0 0 4px ${stat.color}10`,
              transition: 'all 0.3s ease'
            }}>
              {React.cloneElement(stat.icon, { 
                size: 24,
                style: { color: stat.color }
              })}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ 
                fontSize: '0.875rem', 
                color: 'var(--text-secondary)',
                marginBottom: '0.25rem',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {stat.title}
              </div>
              <div style={{ 
                fontSize: '1.5rem', 
                fontWeight: '700',
                color: 'var(--text-primary)',
                lineHeight: '1.2',
                letterSpacing: '-0.02em'
              }}>
                {stat.value}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions Section */}
      <div className="card" style={{ 
        marginBottom: '2rem',
        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.6) 0%, rgba(15, 23, 42, 0.8) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <div style={{ marginTop: '2rem' }}>
          <h2 style={{ 
            fontSize: '1.25rem', 
            fontWeight: '600', 
            marginBottom: '1.25rem',
            color: 'var(--text-primary)',
            '@media (min-width: 768px)': {
              fontSize: '1.5rem',
              marginBottom: '1.5rem',
            },
          }}>
            Quick Actions
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: '1rem',
            marginTop: '1rem',
            '@media (max-width: 640px)': {
              gridTemplateColumns: '1fr 1fr',
            },
            '@media (max-width: 480px)': {
              gridTemplateColumns: '1fr',
            },
          }}>
            {/* Add New Program Button */}
            <button 
              className="quick-action-btn"
              onClick={() => {
                navigate('/programs');
                // Close sidebar on mobile after navigation
                if (window.innerWidth <= 768) {
                  document.querySelector('.mobile-menu-button')?.click();
                }
              }}
              aria-label="Go to Programs to add a new program"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.25rem 1rem',
                background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.6) 0%, rgba(15, 23, 42, 0.8) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                minHeight: '140px',
                position: 'relative',
                overflow: 'hidden',
                '@media (min-width: 768px)': {
                  padding: '1.75rem 1.5rem',
                  minHeight: '160px',
                },
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.2)';
                e.currentTarget.style.borderColor = 'var(--secondary)';
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(30, 41, 59, 0.6) 0%, rgba(15, 23, 42, 0.8) 100%)';
              }}
            >
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '14px',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
                border: '1px solid rgba(59, 130, 246, 0.2)',
                boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.05)',
                '@media (min-width: 768px)': {
                  width: '60px',
                  height: '60px',
                  borderRadius: '16px',
                  marginBottom: '1.25rem',
                },
              }}>
                <Plus size={28} color="var(--secondary)" />
              </div>
              <h3 style={{ 
                margin: 0, 
                color: 'var(--text-primary)', 
                fontSize: '1rem',
                fontWeight: 600,
                textAlign: 'center',
                lineHeight: '1.4',
                '@media (min-width: 768px)': {
                  fontSize: '1.1rem',
                },
              }}>
                Add New Program
              </h3>
            </button>
            
            {/* Add Lecturer Button */}
            <button 
              className="quick-action-btn"
              onClick={() => {
                navigate('/lecturers');
                // Close sidebar on mobile after navigation
                if (window.innerWidth <= 768) {
                  document.querySelector('.mobile-menu-button')?.click();
                }
              }}
              aria-label="Go to Lecturers to add a new lecturer"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.25rem 1rem',
                background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.6) 0%, rgba(15, 23, 42, 0.8) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                minHeight: '140px',
                position: 'relative',
                overflow: 'hidden',
                '@media (min-width: 768px)': {
                  padding: '1.75rem 1.5rem',
                  minHeight: '160px',
                },
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.2)';
                e.currentTarget.style.borderColor = 'var(--secondary)';
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(30, 41, 59, 0.6) 0%, rgba(15, 23, 42, 0.8) 100%)';
              }}
            >
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '14px',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                boxShadow: '0 0 0 4px rgba(16, 185, 129, 0.05)',
                '@media (min-width: 768px)': {
                  width: '60px',
                  height: '60px',
                  borderRadius: '16px',
                  marginBottom: '1.25rem',
                },
              }}>
                <UserPlus size={28} color="#10b981" />
              </div>
              <h3 style={{ 
                margin: 0, 
                color: 'var(--text-primary)', 
                fontSize: '1rem',
                fontWeight: 600,
                textAlign: 'center',
                lineHeight: '1.4',
                '@media (min-width: 768px)': {
                  fontSize: '1.1rem',
                },
              }}>
                Add Lecturer
              </h3>
            </button>
            
            {/* Add Room Button */}
            <button 
              className="quick-action-btn"
              onClick={() => {
                navigate('/rooms');
                // Close sidebar on mobile after navigation
                if (window.innerWidth <= 768) {
                  document.querySelector('.mobile-menu-button')?.click();
                }
              }}
              aria-label="Go to Rooms to add a new room"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.25rem 1rem',
                background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.6) 0%, rgba(15, 23, 42, 0.8) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                minHeight: '140px',
                position: 'relative',
                overflow: 'hidden',
                '@media (min-width: 768px)': {
                  padding: '1.75rem 1.5rem',
                  minHeight: '160px',
                },
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.2)';
                e.currentTarget.style.borderColor = 'var(--secondary)';
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(30, 41, 59, 0.6) 0%, rgba(15, 23, 42, 0.8) 100%)';
              }}
            >
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '14px',
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
                border: '1px solid rgba(245, 158, 11, 0.2)',
                boxShadow: '0 0 0 4px rgba(245, 158, 11, 0.05)',
                '@media (min-width: 768px)': {
                  width: '60px',
                  height: '60px',
                  borderRadius: '16px',
                  marginBottom: '1.25rem',
                },
              }}>
                <DoorOpen size={28} color="#f59e0b" />
              </div>
              <h3 style={{ 
                margin: 0, 
                color: 'var(--text-primary)', 
                fontSize: '1rem',
                fontWeight: 600,
                textAlign: 'center',
                lineHeight: '1.4',
                '@media (min-width: 768px)': {
                  fontSize: '1.1rem',
                },
              }}>
                Add Room
              </h3>
            </button>
            
            {/* Manage Rooms Button */}
            <button 
              className="quick-action-btn"
              onClick={() => {
                navigate('/rooms');
                // Close sidebar on mobile after navigation
                if (window.innerWidth <= 768) {
                  document.querySelector('.mobile-menu-button')?.click();
                }
              }}
              aria-label="Manage rooms and room settings"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.25rem 1rem',
                background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.6) 0%, rgba(15, 23, 42, 0.8) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                minHeight: '140px',
                position: 'relative',
                overflow: 'hidden',
                '@media (min-width: 768px)': {
                  padding: '1.75rem 1.5rem',
                  minHeight: '160px',
                },
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.2)';
                e.currentTarget.style.borderColor = 'var(--secondary)';
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(30, 41, 59, 0.6) 0%, rgba(15, 23, 42, 0.8) 100%)';
              }}
            >
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '14px',
                backgroundColor: 'rgba(139, 92, 246, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
                border: '1px solid rgba(139, 92, 246, 0.2)',
                boxShadow: '0 0 0 4px rgba(139, 92, 246, 0.05)',
                '@media (min-width: 768px)': {
                  width: '60px',
                  height: '60px',
                  borderRadius: '16px',
                  marginBottom: '1.25rem',
                },
              }}>
                <Settings size={28} color="#8b5cf6" />
              </div>
              <h3 style={{ 
                margin: 0, 
                color: 'var(--text-primary)', 
                fontSize: '1rem',
                fontWeight: 600,
                textAlign: 'center',
                lineHeight: '1.4',
                '@media (min-width: 768px)': {
                  fontSize: '1.1rem',
                },
              }}>
                Manage Rooms
              </h3>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
