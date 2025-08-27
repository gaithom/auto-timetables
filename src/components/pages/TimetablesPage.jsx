import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Printer, Download, Filter, Grid, List, Calendar, FileText } from "lucide-react";
import { exportToExcel } from "../../utils/exportExcel";
import { exportToPDF } from "../../utils/exportPDF";

export default function TimetablesPage() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('grid');
  const [selectedProgram, setSelectedProgram] = useState('All Programs');
  const [selectedYear, setSelectedYear] = useState('All Years');

  const handleNavigateToDashboard = () => {
    navigate("/");
  };

  // Sample timetable data in the format expected by the export functions
  const timetableDataForExport = {
    Monday: {
      "8:00-9:00": [],
      "9:00-10:00": [
        {
          course: { code: "CS101", name: "Introduction to Computer Science" },
          cohort: { name: "CS Year 1" },
          lecturer: { name: "Dr. Sarah Johnson" },
          room: { name: "LH001" }
        }
      ],
      "10:00-11:00": [
        {
          course: { code: "CS101", name: "Introduction to Computer Science" },
          cohort: { name: "CS Year 1" },
          lecturer: { name: "Dr. Sarah Johnson" },
          room: { name: "LH001" }
        }
      ],
      "11:00-12:00": [
        {
          course: { code: "MATH201", name: "Advanced Mathematics" },
          cohort: { name: "CS Year 2" },
          lecturer: { name: "Prof. Michael Chen" },
          room: { name: "LH002" }
        }
      ],
      "12:00-13:00": [],
      "13:00-14:00": [],
      "14:00-15:00": [
        {
          course: { code: "CS201", name: "Data Structures and Algorithms" },
          cohort: { name: "CS Year 2" },
          lecturer: { name: "Dr. Sarah Johnson" },
          room: { name: "LH002" }
        }
      ],
      "15:00-16:00": [
        {
          course: { code: "CS201", name: "Data Structures and Algorithms" },
          cohort: { name: "CS Year 2" },
          lecturer: { name: "Dr. Sarah Johnson" },
          room: { name: "LH002" }
        }
      ],
      "16:00-17:00": []
    },
    Tuesday: {
      "8:00-9:00": [],
      "9:00-10:00": [],
      "10:00-11:00": [
        {
          course: { code: "CS301L", name: "Database Systems Lab" },
          cohort: { name: "CS Year 3" },
          lecturer: { name: "Prof. Michael Chen" },
          room: { name: "LAB201" }
        }
      ],
      "11:00-12:00": [
        {
          course: { code: "CS301L", name: "Database Systems Lab" },
          cohort: { name: "CS Year 3" },
          lecturer: { name: "Prof. Michael Chen" },
          room: { name: "LAB201" }
        }
      ],
      "12:00-13:00": [
        {
          course: { code: "CS301L", name: "Database Systems Lab" },
          cohort: { name: "CS Year 3" },
          lecturer: { name: "Prof. Michael Chen" },
          room: { name: "LAB201" }
        }
      ],
      "13:00-14:00": [],
      "14:00-15:00": [],
      "15:00-16:00": [],
      "16:00-17:00": []
    },
    Wednesday: {
      "8:00-9:00": [],
      "9:00-10:00": [],
      "10:00-11:00": [],
      "11:00-12:00": [
        {
          course: { code: "CS101", name: "Introduction to Computer Science" },
          cohort: { name: "CS Year 1" },
          lecturer: { name: "Dr. Sarah Johnson" },
          room: { name: "SR105" }
        }
      ],
      "12:00-13:00": [],
      "13:00-14:00": [],
      "14:00-15:00": [],
      "15:00-16:00": [],
      "16:00-17:00": []
    },
    Thursday: {
      "8:00-9:00": [],
      "9:00-10:00": [
        {
          course: { code: "CS201", name: "Data Structures and Algorithms" },
          cohort: { name: "CS Year 2" },
          lecturer: { name: "Prof. Michael Chen" },
          room: { name: "LH001" }
        }
      ],
      "10:00-11:00": [
        {
          course: { code: "CS201", name: "Data Structures and Algorithms" },
          cohort: { name: "CS Year 2" },
          lecturer: { name: "Prof. Michael Chen" },
          room: { name: "LH001" }
        }
      ],
      "11:00-12:00": [],
      "12:00-13:00": [],
      "13:00-14:00": [],
      "14:00-15:00": [],
      "15:00-16:00": [],
      "16:00-17:00": []
    },
    Friday: {
      "8:00-9:00": [],
      "9:00-10:00": [],
      "10:00-11:00": [],
      "11:00-12:00": [],
      "12:00-13:00": [],
      "13:00-14:00": [],
      "14:00-15:00": [
        {
          course: { code: "CS301L", name: "Database Systems Lab" },
          cohort: { name: "CS Year 3" },
          lecturer: { name: "Prof. Michael Chen" },
          room: { name: "LAB201" }
        }
      ],
      "15:00-16:00": [
        {
          course: { code: "CS301L", name: "Database Systems Lab" },
          cohort: { name: "CS Year 3" },
          lecturer: { name: "Prof. Michael Chen" },
          room: { name: "LAB201" }
        }
      ],
      "16:00-17:00": [
        {
          course: { code: "CS301L", name: "Database Systems Lab" },
          cohort: { name: "CS Year 3" },
          lecturer: { name: "Prof. Michael Chen" },
          room: { name: "LAB201" }
        }
      ]
    }
  };

  // Sample timetable data for display
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

  // Function to handle Excel export
  const handleExportToExcel = () => {
    exportToExcel(timetableDataForExport);
  };

  // Function to handle PDF export
  const handleExportToPDF = () => {
    exportToPDF(timetableDataForExport);
  };

  // Function to render the grid view
  const renderGridView = () => {
    return (
      <div style={{
        backgroundColor: '#1e1e1e',
        borderRadius: '8px',
        padding: '1.5rem',
        marginBottom: '2rem',
        overflowX: 'auto'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #333', padding: '0.8rem', textAlign: 'center', backgroundColor: '#2d5a27', color: 'white' }}>
                Time/Day
              </th>
              {days.map(day => (
                <th key={day} style={{ border: '1px solid #333', padding: '0.8rem', textAlign: 'center', backgroundColor: '#2d5a27', color: 'white' }}>
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((time, timeIndex) => (
              <tr key={time}>
                <td style={{ border: '1px solid #333', padding: '0.8rem', textAlign: 'center', fontWeight: 'bold', backgroundColor: '#2d5a27', color: 'white' }}>
                  {time}
                </td>
                {days.map(day => {
                  const dayClasses = timetableData[day] || [];
                  const classForTime = isClassAtTime(dayClasses, timeIndex);
                  
                  // Check if this is the starting hour of a class
                  const startingClass = classForTime && classForTime.start === 
                    (parseInt(time.split(':')[0]) + (time.includes('PM') && time.split(':')[0] !== '12' ? 12 : 0));
                  
                  return (
                    <td key={`${day}-${time}`} style={{ border: '1px solid #333', padding: '0.8rem', textAlign: 'center', backgroundColor: 'rgba(45, 90, 39, 0.1)', height: '80px', verticalAlign: 'top' }}>
                      {startingClass && (
                        <div
                          style={{ 
                            backgroundColor: `${classForTime.color}20`,
                            borderLeft: `4px solid ${classForTime.color}`,
                            padding: '0.5rem',
                            borderRadius: '4px',
                            fontSize: '0.9rem'
                          }}
                        >
                          <div style={{ fontWeight: 'bold', color: '#4caf50' }}>{classForTime.code}</div>
                          <div style={{ fontSize: '0.8rem', marginTop: '0.3rem', color: '#e0e0e0' }}>Room: {classForTime.room}</div>
                          <div style={{ fontSize: '0.8rem', marginTop: '0.3rem', color: '#e0e0e0' }}>{classForTime.lecturer}</div>
                          <div style={{ fontSize: '0.8rem', marginTop: '0.3rem', color: '#e0e0e0' }}>{classForTime.time}</div>
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
    );
  };

  // Function to render the list view
  const renderListView = () => {
    // Flatten the timetable data for list view
    const allClasses = [];
    days.forEach(day => {
      timetableData[day].forEach(classItem => {
        allClasses.push({
          ...classItem,
          day: day
        });
      });
    });

    // Sort by day and time
    const dayOrder = { Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5 };
    allClasses.sort((a, b) => {
      if (a.day !== b.day) {
        return dayOrder[a.day] - dayOrder[b.day];
      }
      return a.start - b.start;
    });

    return (
      <div style={{
        backgroundColor: '#1e1e1e',
        borderRadius: '8px',
        padding: '1.5rem',
        marginBottom: '2rem'
      }}>
        <h3 style={{ marginBottom: '1rem', color: '#e0e0e0' }}>Class Schedule List</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {allClasses.map((classItem, index) => (
            <div
              key={index}
              style={{
                padding: '1rem',
                borderRadius: '8px',
                backgroundColor: 'rgba(45, 90, 39, 0.1)',
                borderLeft: `4px solid ${classItem.color}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem'
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                  <div style={{ fontWeight: 'bold', color: '#4caf50', fontSize: '1.1rem' }}>
                    {classItem.code}
                  </div>
                  <div style={{ 
                    padding: '0.25rem 0.5rem', 
                    borderRadius: '4px', 
                    backgroundColor: '#2d5a27',
                    color: 'white',
                    fontSize: '0.8rem'
                  }}>
                    {classItem.day}
                  </div>
                </div>
                <div style={{ color: '#e0e0e0', marginBottom: '0.25rem' }}>{classItem.title}</div>
                <div style={{ color: '#a0a0a0', fontSize: '0.9rem' }}>{classItem.time}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: '#e0e0e0', marginBottom: '0.25rem' }}>{classItem.lecturer}</div>
                <div style={{ color: '#a0a0a0', fontSize: '0.9rem' }}>Room: {classItem.room}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* Back to Dashboard Button */}
      <div style={{ marginBottom: '1rem' }}>
        <button 
          onClick={handleNavigateToDashboard}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: '#2d5a27',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#3a7a33'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#2d5a27'}
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* Timetable Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px', color: '#e0e0e0' }}>
            <Calendar size={32} color="#4caf50" />
            Timetable Viewer
          </h1>
          <p style={{ color: '#a0a0a0' }}>View and manage class schedules</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: '#2d5a27',
              color: 'white',
              border: 'none',
              padding: '0.7rem 1.2rem',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#3a7a33'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#2d5a27'}
            onClick={() => alert('Print functionality would be implemented here')}
          >
            <Printer size={16} />
            Print
          </button>
          <button 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: '#2d5a27',
              color: 'white',
              border: 'none',
              padding: '0.7rem 1.2rem',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#3a7a33'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#2d5a27'}
            onClick={handleExportToExcel}
          >
            <Download size={16} />
            Export to Excel
          </button>
          <button 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: '#2d5a27',
              color: 'white',
              border: 'none',
              padding: '0.7rem 1.2rem',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#3a7a33'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#2d5a27'}
            onClick={handleExportToPDF}
          >
            <FileText size={16} />
            Export to PDF
          </button>
        </div>
      </div>

      {/* Filters and View Controls */}
      <div style={{
        backgroundColor: '#1e1e1e',
        borderRadius: '8px',
        padding: '1.5rem',
        marginBottom: '2rem',
        border: '1px solid #333',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Filter size={16} color="#a0a0a0" />
            <span style={{ fontSize: '14px', fontWeight: '500', color: '#e0e0e0' }}>Filters:</span>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <select 
              value={selectedProgram}
              onChange={(e) => setSelectedProgram(e.target.value)}
              style={{
                padding: '0.8rem',
                border: '1px solid #333',
                borderRadius: '4px',
                backgroundColor: '#121212',
                color: '#e0e0e0',
                fontSize: '14px',
                outline: 'none'
              }}
            >
              <option>All Programs</option>
              <option>Computer Science</option>
              <option>Business Administration</option>
            </select>
            <select 
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              style={{
                padding: '0.8rem',
                border: '1px solid #333',
                borderRadius: '4px',
                backgroundColor: '#121212',
                color: '#e0e0e0',
                fontSize: '14px',
                outline: 'none'
              }}
            >
              <option>All Years</option>
              <option>Year 1</option>
              <option>Year 2</option>
            </select>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#2d5a27', borderRadius: '8px', padding: '4px' }}>
          <button
            onClick={() => setViewMode('grid')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              background: viewMode === 'grid' ? '#4caf50' : 'transparent',
              border: 'none',
              color: viewMode === 'grid' ? 'white' : '#a0a0a0',
              cursor: 'pointer',
              borderRadius: '6px',
              fontSize: '0.9rem',
              transition: 'all 0.2s ease'
            }}
          >
            <Grid size={14} />
            Grid
          </button>
          <button
            onClick={() => setViewMode('list')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              background: viewMode === 'list' ? '#4caf50' : 'transparent',
              border: 'none',
              color: viewMode === 'list' ? 'white' : '#a0a0a0',
              cursor: 'pointer',
              borderRadius: '6px',
              fontSize: '0.9rem',
              transition: 'all 0.2s ease'
            }}
          >
            <List size={14} />
            List
          </button>
        </div>
      </div>

      {/* Render the appropriate view based on viewMode state */}
      {viewMode === 'grid' ? renderGridView() : renderListView()}

      {/* Timetable Legend */}
      <div style={{
        backgroundColor: '#1e1e1e',
        borderRadius: '8px',
        padding: '1.5rem',
        marginBottom: '2rem',
        border: '1px solid #333'
      }}>
        <h3 style={{ marginBottom: '16px', color: '#e0e0e0' }}>Legend</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#e0e0e0' }}>
            <div style={{ width: '16px', height: '16px', borderRadius: '4px', backgroundColor: '#3a7a33' }}></div>
            <span>Computer Science</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#e0e0e0' }}>
            <div style={{ width: '16px', height: '16px', borderRadius: '4px', backgroundColor: '#4caf50' }}></div>
            <span>Data Structures</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#e0e0a0' }}>
            <div style={{ width: '16px', height: '16px', borderRadius: '4px', backgroundColor: '#2d5a27' }}></div>
            <span>Database Systems</span>
          </div>
        </div>
      </div>
    </div>
  );
}