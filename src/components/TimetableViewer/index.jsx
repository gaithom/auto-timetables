import React, { useState } from "react";
import { Printer, Download, Filter, Grid, List, ArrowLeft } from "lucide-react";

const TimetableViewer = ({ onBack }) => {
  const [viewMode, setViewMode] = useState('grid');
  const [filters, setFilters] = useState({
    program: 'All Programs',
    year: 'All Years'
  });

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    // Export functionality
  };

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Timetable Viewer</h1>
            <p className="text-gray-600">View and manage class schedules</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={onBack}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Back to Dashboard
            </button>
            <button 
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50"
            >
              <Printer size={16} />
              Print
            </button>
            <button 
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50"
            >
              <Download size={16} />
              Export
            </button>
          </div>
        </div>

        {/* Filters and View Controls */}
        <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter size={16} />
                <span className="text-sm font-medium">Filters:</span>
              </div>
              <select 
                value={filters.program}
                onChange={(e) => handleFilterChange('program', e.target.value)}
                className="px-3 py-1 border rounded-md text-sm"
              >
                <option>All Programs</option>
                <option>Computer Science</option>
                <option>Business Administration</option>
              </select>
              <select 
                value={filters.year}
                onChange={(e) => handleFilterChange('year', e.target.value)}
                className="px-3 py-1 border rounded-md text-sm"
              >
                <option>All Years</option>
                <option>Year 1</option>
                <option>Year 2</option>
              </select>
            </div>
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1 px-3 py-1 rounded-md text-sm transition-colors ${
                  viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Grid size={14} />
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-1 px-3 py-1 rounded-md text-sm transition-colors ${
                  viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                <List size={14} />
                List
              </button>
            </div>
          </div>
        </div>

        {/* Timetable content will go here */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-gray-600">Timetable content will be displayed here in {viewMode} view.</p>
        </div>
      </div>
    </div>
  );
};

export default TimetableViewer;
