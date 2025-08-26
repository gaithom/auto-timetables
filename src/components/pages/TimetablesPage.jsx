import React, { useState } from "react";
import { Printer, Download, Filter, Grid, List, ChevronLeft } from "lucide-react";

export default function TimetablePage({ onBack }) {
  const [viewMode, setViewMode] = useState('grid');

  // Sample timetable data
  const timetableData = {
    Monday: [
      { 
        code: 'CS101', 
        title: 'Introduction to Computer Science', 
        lecturer: 'Dr. Sarah Johnson', 
        room: 'LH001', 
        time: '9:00 AM - 11:00 AM',
        color: '#3a7a33',
        start: 9,
        end: 11,
        duration: 2
      },
      { 
        code: 'CS201', 
        title: 'Data Structures and Algorithms', 
        lecturer: 'Dr. Sarah Johnson', 
        room: 'LH002', 
        time: '2:00 PM - 4:00 PM',
        color: '#4caf50',
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
        color: '#2d5a27',
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
        color: '#3a7a33',
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
        color: '#4caf50',
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
        color: '#2d5a27',
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

  return (
    <div className="page active">
      {/* Timetable Header */}
      <div className="dashboard-header">
        <div>
          <h1>Timetable Viewer</h1>
          <p>View and manage class schedules</p>
        </div>
        <div className="export-buttons">
          <button 
            onClick={onBack}
            className="btn btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <ChevronLeft size={16} />
            Back to Dashboard
          </button>
          <button className="export-btn" onClick={() => alert('Print functionality would be implemented here')}>
            <Printer size={16} />
            Print
          </button>
          <button className="export-btn" onClick={() => alert('Export functionality would be implemented here')}>
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Filters and View Controls */}
      <div className="form-container">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Filter size={16} />
            <span style={{ fontSize: '14px', fontWeight: '500', color: '#e0e0e0' }}>Filters:</span>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <select className="form-group select-filter">
              <option>All Programs</option>
              <option>Computer Science</option>
              <option>Business Administration</option>
            </select>
            <select className="form-group select-filter">
              <option>All Years</option>
              <option>Year 1</option>
              <option>Year 2</option>
            </select>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#2d5a27', borderRadius: '8px', padding: '4px' }}>
          <button
            onClick={() => setViewMode('grid')}
            className={`view-toggle ${viewMode === 'grid' ? 'active' : ''}`}
          >
            <Grid size={14} />
            Grid
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`view-toggle ${viewMode === 'list' ? 'active' : ''}`}
          >
            <List size={14} />
            List
          </button>
        </div>
      </div>

      {/* Timetable Grid */}
      <div className="timetable-container">
        <table className="timetable-grid">
          <thead>
            <tr>
              <th>Time/Day</th>
              {days.map(day => (
                <th key={day}>
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((time, timeIndex) => (
              <tr key={time}>
                <td style={{ fontWeight: 'bold', backgroundColor: '#2d5a27', color: 'white' }}>
                  {time}
                </td>
                {days.map(day => {
                  const dayClasses = timetableData[day] || [];
                  const classForTime = isClassAtTime(dayClasses, timeIndex);
                  
                  // Check if this is the starting hour of a class
                  const startingClass = classForTime && classForTime.start === 
                    (parseInt(time.split(':')[0]) + (time.includes('PM') && time.split(':')[0] !== '12' ? 12 : 0));
                  
                  return (
                    <td key={`${day}-${time}`}>
                      {startingClass && (
                        <div
                          className="time-slot"
                          style={{ 
                            backgroundColor: `${classForTime.color}20`,
                            borderLeft: `4px solid ${classForTime.color}`
                          }}
                        >
                          <div className="course">{classForTime.code}</div>
                          <div className="room">Room: {classForTime.room}</div>
                          <div className="lecturer">{classForTime.lecturer}</div>
                          <div className="time">{classForTime.time}</div>
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

      {/* Timetable Legend */}
      <div className="form-container">
        <h3 style={{ marginBottom: '16px', color: '#e0e0e0' }}>Legend</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#3a7a33' }}></div>
            <span>Computer Science</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#4caf50' }}></div>
            <span>Data Structures</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#2d5a27' }}></div>
            <span>Database Systems</span>
          </div>
        </div>
      </div>
    </div>
  );
}