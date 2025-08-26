import React, { useState } from "react";
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
  Settings,
  Filter,
  Grid,
  List,
  Printer,
  Download,
  ChevronLeft} from "lucide-react";

export default function EnhancedDashboard() {
  const [showTimetable, setShowTimetable] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  // eslint-disable-next-line no-empty-pattern
  const [] = useState(0);

  // Sample timetable data
  const timetableData = {
    Monday: [
      { 
        code: 'CS101', 
        title: 'Introduction to Computer Science', 
        lecturer: 'Dr. Sarah Johnson', 
        room: 'LH001', 
        time: '9:00 AM - 11:00 AM',
        color: '#3b82f6',
        start: 9, // hour start
        end: 11,   // hour end
        duration: 2 // hours duration
      },
      { 
        code: 'CS201', 
        title: 'Data Structures and Algorithms', 
        lecturer: 'Dr. Sarah Johnson', 
        room: 'LH002', 
        time: '2:00 PM - 4:00 PM',
        color: '#10b981',
        start: 14,
        end: 16,
        duration: 2
      }
    ],
    Tuesday: [
      { 
        code: 'CS301L', 
        title: 'Database Systems Lab', 
        lecturer: 'Prof. Michael Chen', 
        room: 'LAB201', 
        time: '10:00 AM - 1:00 PM',
        color: '#f59e0b',
        start: 10,
        end: 13,
        duration: 3
      }
    ],
    Wednesday: [
      { 
        code: 'CS101', 
        title: 'Introduction to Computer Science', 
        lecturer: 'Dr. Sarah Johnson', 
        room: 'SR105', 
        time: '11:00 AM - 12:00 PM',
        color: '#ef4444',
        start: 11,
        end: 12,
        duration: 1
      }
    ],
    Thursday: [
      { 
        code: 'CS201', 
        title: 'Data Structures and Algorithms', 
        lecturer: 'Prof. Michael Chen', 
        room: 'LH001', 
        time: '9:00 AM - 11:00 AM',
        color: '#8b5cf6',
        start: 9,
        end: 11,
        duration: 2
      }
    ],
    Friday: [
      { 
        code: 'CS301L', 
        title: 'Database Systems Lab', 
        lecturer: 'Prof. Michael Chen', 
        room: 'LAB201', 
        time: '2:00 PM - 5:00 PM',
        color: '#ec4899',
        start: 14,
        end: 17,
        duration: 3
      }
    ]
  };

  const timeSlots = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  
  // Function to check if a class occurs at a specific time
  const isClassAtTime = (dayClasses, timeIndex) => {
    const time = timeSlots[timeIndex];
    const hour = parseInt(time.split(':')[0]) + (time.includes('PM') && time.split(':')[0] !== '12' ? 12 : 0);
    
    return dayClasses.find(cls => {
      const classStartHour = cls.start;
      return hour >= classStartHour && hour < cls.end;
    });
  };

  if (showTimetable) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Timetable Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Timetable Viewer</h1>
              <p className="text-gray-600">View and manage class schedules</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button 
                onClick={() => setShowTimetable(false)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                <ChevronLeft size={16} />
                Back to Dashboard
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50">
                <Printer size={16} />
                Print
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50">
                <Download size={16} />
                Export
              </button>
            </div>
          </div>

          {/* Filters and View Controls */}
          <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter size={16} />
                  <span className="text-sm font-medium">Filters:</span>
                </div>
                <select className="px-3 py-2 border rounded-md text-sm">
                  <option>All Programs</option>
                  <option>Computer Science</option>
                  <option>Business Administration</option>
                </select>
                <select className="px-3 py-2 border rounded-md text-sm">
                  <option>All Years</option>
                  <option>Year 1</option>
                  <option>Year 2</option>
                </select>
              </div>
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm transition-colors ${
                    viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Grid size={14} />
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm transition-colors ${
                    viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <List size={14} />
                  List
                </button>
              </div>
            </div>
          </div>

          {/* Timetable Grid */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-4 font-medium text-gray-600 w-24">Time/Day</th>
                    {days.map(day => (
                      <th key={day} className="text-left p-4 font-medium text-gray-900">
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timeSlots.map((time, timeIndex) => (
                    <tr key={time} className="border-t">
                      <td className="p-4 text-sm font-medium text-gray-500 bg-gray-50">
                        {time}
                      </td>
                      {days.map(day => {
                        const dayClasses = timetableData[day] || [];
                        const classForTime = isClassAtTime(dayClasses, timeIndex);
                        
                        // Check if this is the starting hour of a class
                        const startingClass = classForTime && classForTime.start === 
                          (parseInt(time.split(':')[0]) + (time.includes('PM') && time.split(':')[0] !== '12' ? 12 : 0));
                        
                        return (
                          <td key={`${day}-${time}`} className="p-1 align-top h-16 border-r">
                            {startingClass && (
                              <div
                                className="p-3 rounded-lg text-sm shadow-sm h-full flex flex-col justify-between"
                                style={{ 
                                  backgroundColor: `${classForTime.color}15`,
                                  borderLeft: `4px solid ${classForTime.color}`,
                                  gridRow: `span ${classForTime.duration}`
                                }}
                              >
                                <div>
                                  <div className="font-semibold text-gray-900">{classForTime.code}</div>
                                  <div className="text-gray-700 text-xs mt-1 line-clamp-1">{classForTime.title}</div>
                                </div>
                                <div className="mt-2">
                                  <div className="flex items-center gap-1 text-xs text-gray-600">
                                    <Users size={10} />
                                    <span className="truncate">{classForTime.lecturer}</span>
                                  </div>
                                  <div className="flex items-center gap-1 text-xs text-gray-600">
                                    <DoorOpen size={10} />
                                    {classForTime.room}
                                  </div>
                                </div>
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Timetable Legend */}
          <div className="mt-6 bg-white rounded-lg p-4 shadow-sm">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Legend</h3>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-blue-100 border-l-4 border-l-blue-500"></div>
                <span className="text-sm text-gray-600">Computer Science</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-emerald-100 border-l-4 border-l-emerald-500"></div>
                <span className="text-sm text-gray-600">Data Structures</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-amber-100 border-l-4 border-l-amber-500"></div>
                <span className="text-sm text-gray-600">Database Systems</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-red-100 border-l-4 border-l-red-500"></div>
                <span className="text-sm text-gray-600">Intro to CS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Rest of the dashboard code remains the same...
  return (
    <div style={{ padding: '24px', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ 
          fontSize: '32px', 
          fontWeight: 'bold', 
          color: '#111827', 
          marginBottom: '8px',
          margin: 0
        }}>
          Dashboard
        </h1>
        <p style={{ 
          color: '#6b7280', 
          fontSize: '16px', 
          marginBottom: '24px',
          margin: '8px 0 24px 0'
        }}>
          Welcome to Timetable Forge - Manage your academic scheduling
        </p>
        
        <button 
          onClick={() => setShowTimetable(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 20px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#2563eb'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#3b82f6'}
        >
          <Calendar size={16} />
          Generate New Timetable
        </button>
      </div>

      {/* Statistics Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '24px', 
        marginBottom: '40px' 
      }}>
        {/* Total Programs Card */}
        <div style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          border: '1px solid #f3f4f6'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <BookOpen size={20} color="#6366f1" />
              </div>
              <h3 style={{ 
                fontSize: '16px', 
                fontWeight: '600', 
                color: '#6b7280',
                margin: '0 0 8px 0'
              }}>
                Total Programs
              </h3>
              <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#111827', marginBottom: '4px' }}>
                12
              </div>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>
                Active academic programs
              </div>
            </div>
            <div style={{
              padding: '16px',
              backgroundColor: '#eef2ff',
              borderRadius: '50%'
            }}>
              <BookOpen size={28} color="#6366f1" />
            </div>
          </div>
        </div>

        {/* Active Courses Card */}
        <div style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          border: '1px solid #f3f4f6'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Calendar size={20} color="#10b981" />
              </div>
              <h3 style={{ 
                fontSize: '16px', 
                fontWeight: '600', 
                color: '#6b7280',
                margin: '0 0 8px 0'
              }}>
                Active Courses
              </h3>
              <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#111827', marginBottom: '4px' }}>
                148
              </div>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>
                Currently scheduled courses
              </div>
            </div>
            <div style={{
              padding: '16px',
              backgroundColor: '#ecfdf5',
              borderRadius: '50%'
            }}>
              <Calendar size={28} color="#10b981" />
            </div>
          </div>
        </div>

        {/* Teaching Staff Card */}
        <div style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          border: '1px solid #f3f4f6'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Users size={20} color="#f59e0b" />
              </div>
              <h3 style={{ 
                fontSize: '16px', 
                fontWeight: '600', 
                color: '#6b7280',
                margin: '0 0 8px 0'
              }}>
                Teaching Staff
              </h3>
              <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#111827', marginBottom: '4px' }}>
                32
              </div>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>
                Available lecturers
              </div>
            </div>
            <div style={{
              padding: '16px',
              backgroundColor: '#fffbeb',
              borderRadius: '50%'
            }}>
              <Users size={28} color="#f59e0b" />
            </div>
          </div>
        </div>

        {/* Lecture Rooms Card */}
        <div style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          border: '1px solid #f3f4f6'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <DoorOpen size={20} color="#ef4444" />
              </div>
              <h3 style={{ 
                fontSize: '16px', 
                fontWeight: '600', 
                color: '#6b7280',
                margin: '0 0 8px 0'
              }}>
                Lecture Rooms
              </h3>
              <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#111827', marginBottom: '4px' }}>
                18
              </div>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>
                Available facilities
              </div>
            </div>
            <div style={{
              padding: '16px',
              backgroundColor: '#fef2f2',
              borderRadius: '50%'
            }}>
              <DoorOpen size={28} color="#ef4444" />
            </div>
          </div>
        </div>
      </div>

      {/* System Status and Recent Activities */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
        gap: '32px',
        marginBottom: '40px' 
      }}>
        {/* System Status Card */}
        <div style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          border: '1px solid #f3f4f6'
        }}>
          <h2 style={{ 
            fontSize: '20px', 
            fontWeight: 'bold', 
            color: '#111827',
            margin: '0 0 8px 0'
          }}>
            System Status
          </h2>
          <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '24px' }}>
            Current scheduling system health
          </div>
          
          {/* Conflict Detection */}
          <div style={{
            padding: '16px',
            backgroundColor: '#ecfdf5',
            borderRadius: '8px',
            borderLeft: '4px solid #10b981',
            marginBottom: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <CheckCircle size={20} color="#10b981" />
                <div>
                  <h4 style={{ 
                    fontSize: '16px', 
                    fontWeight: '600', 
                    color: '#111827',
                    margin: '0 0 4px 0'
                  }}>
                    Conflict Detection
                  </h4>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>
                    All systems operational
                  </div>
                </div>
              </div>
              <div style={{
                padding: '4px 12px',
                backgroundColor: '#dcfce7',
                color: '#166534',
                fontSize: '12px',
                fontWeight: '600',
                borderRadius: '20px'
              }}>
                Active
              </div>
            </div>
          </div>

          {/* Schedule Generator */}
          <div style={{
            padding: '16px',
            backgroundColor: '#eff6ff',
            borderRadius: '8px',
            borderLeft: '4px solid #3b82f6'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Calendar size={20} color="#3b82f6" />
                <div>
                  <h4 style={{ 
                    fontSize: '16px', 
                    fontWeight: '600', 
                    color: '#111827',
                    margin: '0 0 4px 0'
                  }}>
                    Schedule Generator
                  </h4>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>
                    Ready for new assignments
                  </div>
                </div>
              </div>
              <div style={{
                padding: '4px 12px',
                backgroundColor: '#dbeafe',
                color: '#1e40af',
                fontSize: '12px',
                fontWeight: '600',
                borderRadius: '20px'
              }}>
                Ready
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activities Card */}
        <div style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          border: '1px solid #f3f4f6'
        }}>
          <h2 style={{ 
            fontSize: '20px', 
            fontWeight: 'bold', 
            color: '#111827',
            margin: '0 0 8px 0'
          }}>
            Recent Activities
          </h2>
          <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '24px' }}>
            Latest system updates and notifications
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Activity 1 */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{
                padding: '8px',
                backgroundColor: '#ecfdf5',
                borderRadius: '50%',
                minWidth: '32px'
              }}>
                <CheckCircle size={16} color="#10b981" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ 
                  fontSize: '14px', 
                  fontWeight: '500', 
                  color: '#111827',
                  marginBottom: '4px'
                }}>
                  Computer Science timetable generated successfully
                </div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>
                  2 minutes ago
                </div>
              </div>
            </div>

            {/* Activity 2 */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{
                padding: '8px',
                backgroundColor: '#fffbeb',
                borderRadius: '50%',
                minWidth: '32px'
              }}>
                <AlertTriangle size={16} color="#f59e0b" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ 
                  fontSize: '14px', 
                  fontWeight: '500', 
                  color: '#111827',
                  marginBottom: '4px'
                }}>
                  Scheduling conflict detected in Business Administration
                </div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>
                  15 minutes ago
                </div>
              </div>
            </div>

            {/* Activity 3 */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{
                padding: '8px',
                backgroundColor: '#eff6ff',
                borderRadius: '50%',
                minWidth: '32px'
              }}>
                <Clock size={16} color="#3b82f6" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ 
                  fontSize: '14px', 
                  fontWeight: '500', 
                  color: '#111827',
                  marginBottom: '4px'
                }}>
                  New lecturer Dr. Smith added to system
                </div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>
                  1 hour ago
                </div>
              </div>
            </div>

            {/* Activity 4 */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{
                padding: '8px',
                backgroundColor: '#ecfdf5',
                borderRadius: '50%',
                minWidth: '32px'
              }}>
                <CheckCircle size={16} color="#10b981" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ 
                  fontSize: '14px', 
                  fontWeight: '500', 
                  color: '#111827',
                  marginBottom: '4px'
                }}>
                  Room allocation updated for Engineering program
                </div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>
                  2 hours ago
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 style={{ 
          fontSize: '20px', 
          fontWeight: 'bold', 
          color: '#111827',
          margin: '0 0 8px 0'
        }}>
          Quick Actions
        </h2>
        <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '24px' }}>
          Common tasks and shortcuts
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '24px' 
        }}>
          {/* Add Program */}
          <button style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '32px 24px',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            border: '1px solid #f3f4f6',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
          }}>
            <div style={{
              padding: '16px',
              backgroundColor: '#f3f4f6',
              borderRadius: '50%',
              marginBottom: '16px'
            }}>
              <Plus size={24} color="#6b7280" />
            </div>
            <h3 style={{ 
              fontSize: '16px', 
              fontWeight: '500', 
              color: '#111827',
              margin: 0
            }}>
              Add Program
            </h3>
          </button>

          {/* Manage Lecturers */}
          <button style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '32px 24px',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            border: '1px solid #f3f4f6',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
          }}>
            <div style={{
              padding: '16px',
              backgroundColor: '#f3f4f6',
              borderRadius: '50%',
              marginBottom: '16px'
            }}>
              <UserPlus size={24} color="#6b7280" />
            </div>
            <h3 style={{ 
              fontSize: '16px', 
              fontWeight: '500', 
              color: '#111827',
              margin: 0
            }}>
              Manage Lecturers
            </h3>
          </button>

          {/* Configure Rooms */}
          <button style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '32px 24px',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            border: '1px solid #f3f4f6',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
          }}>
            <div style={{
              padding: '16px',
              backgroundColor: '#f3f4f6',
              borderRadius: '50%',
              marginBottom: '16px'
            }}>
              <Settings size={24} color="#6b7280" />
            </div>
            <h3 style={{ 
              fontSize: '16px', 
              fontWeight: '500', 
              color: '#111827',
              margin: 0
            }}>
              Configure Rooms
            </h3>
          </button>
        </div>
      </div>
    </div>
  );
}