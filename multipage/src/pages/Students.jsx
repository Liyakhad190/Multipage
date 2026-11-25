import React, { useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Plus, 
  Eye, 
  Edit2, 
  Trash2, 
  Mail, 
  Phone, 
  X, 
  AlertTriangle,
  ArrowUpDown
} from 'lucide-react';
import { useStudents } from '../context/StudentContext';

export default function Students() {
  const { 
    filteredStudents, 
    students, 
    searchQuery, 
    setSearchQuery, 
    departmentFilter, 
    setDepartmentFilter,
    statusFilter,
    setStatusFilter,
    deleteStudent,
    updateStudent
  } = useStudents();

  const { openAddModal } = useOutletContext() || {};

  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('name-asc');
  
  const [deleteCandidate, setDeleteCandidate] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const departments = ['All', 'Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Business Administration', 'Data Science'];
  const statuses = ['All', 'Active', 'On Leave', 'Graduated', 'Suspended'];

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
    if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
    if (sortBy === 'gpa-desc') return (Number(b.gpa) || 0) - (Number(a.gpa) || 0);
    if (sortBy === 'gpa-asc') return (Number(a.gpa) || 0) - (Number(b.gpa) || 0);
    if (sortBy === 'roll') return a.rollNumber.localeCompare(b.rollNumber);
    return 0;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-[#EBF2EE] text-[#2D4A3F] border-[#AEC5B9]';
      case 'Graduated':
        return 'bg-[#FAF8F5] text-[#7B2137] border-[#DBC8CB]';
      case 'On Leave':
        return 'bg-[#F6EFF0] text-[#A85B63] border-[#DBC8CB]';
      case 'Suspended':
        return 'bg-[#FDF2F4] text-[#4D0C1E] border-[#E5B8C1]';
      default:
        return 'bg-[#FAF8F5] text-[#4D0C1E] border-[#E6DFD7]';
    }
  };

  const handleOpenEdit = (student) => {
    setEditingStudent(student);
    setEditFormData({ ...student });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editingStudent) return;
    updateStudent(editingStudent.id, {
      ...editFormData,
      gpa: parseFloat(editFormData.gpa) || 3.5,
      attendance: parseInt(editFormData.attendance, 10) || 85
    });
    setEditingStudent(null);
  };

  const confirmDelete = () => {
    if (deleteCandidate) {
      deleteStudent(deleteCandidate.id);
      setDeleteCandidate(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          {/* Primary heading: Deep Oxblood (#4D0C1E) */}
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#4D0C1E]">
            Students Directory
          </h1>
          <p className="text-xs sm:text-sm text-[#A85B63] font-medium">
            Search, filter, update, and manage enrollment files across departments.
          </p>
        </div>
        {/* Primary CTA: Rich Crimson (#7B2137) */}
        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center gap-2 rounded-xl bg-[#7B2137] px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-[#7B2137]/20 hover:bg-[#67192C] active:scale-95 transition-all self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Enroll Student</span>
        </button>
      </div>

      {/* Filter and Control Bar: Elevated #FAF8F5 card with #E6DFD7 border */}
      <div className="rounded-3xl border border-[#E6DFD7] bg-[#FAF8F5] p-5 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1 max-w-lg">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#A85B63]">
              <Search className="h-4 w-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, roll number, or department..."
              className="w-full rounded-xl border border-[#E6DFD7] bg-white py-2 pl-10 pr-10 text-sm text-[#4D0C1E] placeholder-[#A85B63]/70 focus:border-[#7B2137] focus:outline-none focus:ring-2 focus:ring-[#7B2137]/20 transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#A85B63] hover:text-[#4D0C1E]"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Controls: Sort & View Toggle */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="flex items-center gap-1.5 text-xs text-[#4D0C1E] bg-white border border-[#E6DFD7] rounded-xl px-2.5 py-1.5 shadow-2xs">
              <ArrowUpDown className="h-3.5 w-3.5 text-[#A85B63]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent font-bold text-[#4D0C1E] focus:outline-none cursor-pointer"
              >
                <option value="name-asc">Name (A → Z)</option>
                <option value="name-desc">Name (Z → A)</option>
                <option value="gpa-desc">Highest GPA</option>
                <option value="gpa-asc">Lowest GPA</option>
                <option value="roll">Roll Number</option>
              </select>
            </div>

            <div className="flex items-center rounded-xl border border-[#E6DFD7] bg-white p-1 shadow-2xs">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'grid'
                    ? 'bg-[#7B2137] text-white shadow-xs'
                    : 'text-[#A85B63] hover:text-[#4D0C1E]'
                }`}
                title="Grid View"
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'table'
                    ? 'bg-[#7B2137] text-white shadow-xs'
                    : 'text-[#A85B63] hover:text-[#4D0C1E]'
                }`}
                title="Table View"
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between pt-3 border-t border-[#E6DFD7] text-xs">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[#A85B63] font-bold mr-1 flex items-center gap-1">
              <Filter className="h-3 w-3" /> Dept:
            </span>
            {departments.map((dept) => (
              <button
                key={dept}
                type="button"
                onClick={() => setDepartmentFilter(dept)}
                className={`rounded-xl px-3 py-1 font-bold transition-all ${
                  departmentFilter === dept
                    ? 'bg-[#7B2137] text-white shadow-xs'
                    : 'bg-white border border-[#E6DFD7] text-[#4D0C1E] hover:bg-[#E6DFD7]/50'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-[#A85B63] font-bold">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-[#E6DFD7] bg-white px-2.5 py-1 text-xs font-bold text-[#4D0C1E] focus:outline-none focus:border-[#7B2137] cursor-pointer"
            >
              {statuses.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Header Count */}
      <div className="flex items-center justify-between text-xs text-[#A85B63] px-1 font-semibold">
        <span>
          Showing <strong className="text-[#4D0C1E]">{sortedStudents.length}</strong> of{' '}
          <strong className="text-[#4D0C1E]">{students.length}</strong> students
        </span>
        {(searchQuery || departmentFilter !== 'All' || statusFilter !== 'All') && (
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setDepartmentFilter('All');
              setStatusFilter('All');
            }}
            className="text-[#7B2137] hover:text-[#4D0C1E] font-bold underline cursor-pointer"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Grid or Table View */}
      {sortedStudents.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-[#A85B63]/40 bg-[#FAF8F5] p-12 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#7B2137]/10 text-[#7B2137] mb-3">
            <Search className="h-7 w-7" />
          </div>
          <h3 className="text-base font-black text-[#4D0C1E]">No matching students</h3>
          <p className="mt-1 text-xs text-[#A85B63] max-w-sm mx-auto font-medium">
            No records matched "{searchQuery}". Try adjusting your keywords or department filter.
          </p>
          <div className="mt-5 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setDepartmentFilter('All');
                setStatusFilter('All');
              }}
              className="rounded-xl border border-[#E6DFD7] bg-white px-4 py-2 text-xs font-bold text-[#4D0C1E] hover:bg-[#E6DFD7]/40"
            >
              Reset Filters
            </button>
            <button
              type="button"
              onClick={openAddModal}
              className="rounded-xl bg-[#7B2137] px-4 py-2 text-xs font-bold text-white hover:bg-[#67192C]"
            >
              Enroll New Student
            </button>
          </div>
        </div>
      ) : viewMode === 'grid' ? (
        /* GRID VIEW: Clean White Cards (#FFFFFF) with #E6DFD7 borders */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {sortedStudents.map((student) => (
            <div
              key={student.id}
              className="group rounded-3xl border border-[#E6DFD7] bg-white p-5 shadow-xs hover:shadow-md hover:border-[#A85B63] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="h-12 w-12 rounded-2xl object-cover ring-2 ring-[#E6DFD7]"
                    />
                    <div>
                      <Link
                        to={`/students/${student.id}`}
                        className="font-bold text-[#4D0C1E] hover:text-[#7B2137] transition-colors line-clamp-1 text-sm"
                      >
                        {student.name}
                      </Link>
                      <p className="text-xs font-mono font-bold text-[#A85B63]">{student.rollNumber}</p>
                    </div>
                  </div>
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${getStatusBadge(
                      student.status
                    )}`}
                  >
                    {student.status}
                  </span>
                </div>

                <div className="space-y-2 mb-4 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[#A85B63] font-medium">Department:</span>
                    <span className="font-bold text-[#4D0C1E]">{student.department}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#A85B63] font-medium">Semester:</span>
                    <span className="font-semibold text-[#4D0C1E]/80">{student.semester}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#A85B63] font-medium">GPA Score:</span>
                    <span className="font-black text-[#2D4A3F] bg-[#EBF2EE] px-2 py-0.5 rounded-md border border-[#AEC5B9]">
                      {student.gpa.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#A85B63] font-medium">Attendance:</span>
                    <span className="text-[#2D4A3F] font-bold">{student.attendance}%</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E6DFD7] text-[11px] text-[#A85B63] space-y-1">
                  <div className="flex items-center gap-2 truncate">
                    <Mail className="h-3 w-3 text-[#A85B63] shrink-0" />
                    <span className="truncate text-[#4D0C1E]/80 font-medium">{student.email}</span>
                  </div>
                  {student.phone && (
                    <div className="flex items-center gap-2 truncate">
                      <Phone className="h-3 w-3 text-[#A85B63] shrink-0" />
                      <span className="text-[#4D0C1E]/80 font-medium">{student.phone}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="mt-4 pt-3 border-t border-[#E6DFD7] flex items-center justify-between">
                <Link
                  to={`/students/${student.id}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#7B2137] hover:text-[#4D0C1E]"
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>View Profile</span>
                </Link>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(student)}
                    aria-label={`Edit ${student.name}`}
                    className="p-1.5 rounded-xl text-[#A85B63] hover:bg-[#FAF8F5] hover:text-[#4D0C1E] transition-colors"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteCandidate(student)}
                    aria-label={`Delete ${student.name}`}
                    className="p-1.5 rounded-xl text-[#A85B63] hover:bg-[#FDF2F4] hover:text-[#7B2137] transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* TABLE VIEW: Table header fill: Warm Alabaster / Cream (#E6DFD7) */
        <div className="rounded-3xl border border-[#E6DFD7] bg-white shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#E6DFD7] border-b border-[#D8CFCE] text-[11px] font-bold text-[#4D0C1E] uppercase tracking-wider">
                  <th className="py-3.5 pl-4">Student</th>
                  <th className="py-3.5">Roll Number</th>
                  <th className="py-3.5">Department</th>
                  <th className="py-3.5">Semester</th>
                  <th className="py-3.5">GPA</th>
                  <th className="py-3.5">Attendance</th>
                  <th className="py-3.5">Status</th>
                  <th className="py-3.5 pr-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6DFD7]/60 text-xs">
                {sortedStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-[#FAF8F5] transition-colors">
                    <td className="py-3.5 pl-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={student.avatar}
                          alt={student.name}
                          className="h-9 w-9 rounded-full object-cover ring-1 ring-[#E6DFD7]"
                        />
                        <div>
                          <Link
                            to={`/students/${student.id}`}
                            className="font-bold text-[#4D0C1E] hover:text-[#7B2137] transition-colors"
                          >
                            {student.name}
                          </Link>
                          <p className="text-[11px] text-[#A85B63]">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 font-mono font-bold text-[#4D0C1E]">
                      {student.rollNumber}
                    </td>
                    <td className="py-3.5 font-bold text-[#4D0C1E]">
                      {student.department}
                    </td>
                    <td className="py-3.5 text-[#A85B63] font-medium">
                      {student.semester}
                    </td>
                    <td className="py-3.5">
                      <span className="font-black text-[#2D4A3F] bg-[#EBF2EE] px-2 py-0.5 rounded-md border border-[#AEC5B9]">
                        {student.gpa.toFixed(2)}
                      </span>
                    </td>
                    <td className="py-3.5 font-bold text-[#2D4A3F]">
                      {student.attendance}%
                    </td>
                    <td className="py-3.5">
                      <span
                        className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${getStatusBadge(
                          student.status
                        )}`}
                      >
                        {student.status}
                      </span>
                    </td>
                    <td className="py-3.5 pr-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          to={`/students/${student.id}`}
                          className="p-1.5 rounded-lg text-[#7B2137] hover:bg-[#FAF8F5] transition-colors"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(student)}
                          className="p-1.5 rounded-lg text-[#A85B63] hover:bg-[#FAF8F5] hover:text-[#4D0C1E] transition-colors"
                          title="Edit Student"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteCandidate(student)}
                          className="p-1.5 rounded-lg text-[#A85B63] hover:bg-[#FDF2F4] hover:text-[#7B2137] transition-colors"
                          title="Delete Student"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {editingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#4D0C1E]/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-xl rounded-3xl bg-[#FAF8F5] border border-[#E6DFD7] shadow-2xl my-8">
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#E6DFD7] bg-white rounded-t-3xl">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#7B2137] text-white">
                  <Edit2 className="h-4 w-4 text-[#FAF8F5]" />
                </div>
                <div>
                  <h3 className="text-base font-black text-[#4D0C1E]">
                    Edit Student: {editingStudent.name}
                  </h3>
                  <p className="text-xs text-[#A85B63] font-semibold">Update records</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditingStudent(null)}
                className="rounded-xl p-2 text-[#A85B63] hover:bg-[#E6DFD7]/50 hover:text-[#4D0C1E]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#4D0C1E] mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={editFormData.name || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                    required
                    className="w-full rounded-xl border border-[#E6DFD7] bg-white px-3.5 py-2 text-sm text-[#4D0C1E] focus:border-[#7B2137] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#4D0C1E] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={editFormData.email || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                    required
                    className="w-full rounded-xl border border-[#E6DFD7] bg-white px-3.5 py-2 text-sm text-[#4D0C1E] focus:border-[#7B2137] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#4D0C1E] mb-1">
                    Department
                  </label>
                  <select
                    value={editFormData.department || 'Computer Science'}
                    onChange={(e) => setEditFormData({ ...editFormData, department: e.target.value })}
                    className="w-full rounded-xl border border-[#E6DFD7] bg-white px-3.5 py-2 text-sm text-[#4D0C1E] focus:border-[#7B2137] focus:outline-none"
                  >
                    <option value="Computer Science">Computer Science</option>
                    <option value="Electrical Engineering">Electrical Engineering</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                    <option value="Business Administration">Business Administration</option>
                    <option value="Data Science">Data Science</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#4D0C1E] mb-1">
                    Semester
                  </label>
                  <select
                    value={editFormData.semester || '1st Semester'}
                    onChange={(e) => setEditFormData({ ...editFormData, semester: e.target.value })}
                    className="w-full rounded-xl border border-[#E6DFD7] bg-white px-3.5 py-2 text-sm text-[#4D0C1E] focus:border-[#7B2137] focus:outline-none"
                  >
                    <option value="1st Semester">1st Semester</option>
                    <option value="2nd Semester">2nd Semester</option>
                    <option value="3rd Semester">3rd Semester</option>
                    <option value="4th Semester">4th Semester</option>
                    <option value="5th Semester">5th Semester</option>
                    <option value="6th Semester">6th Semester</option>
                    <option value="7th Semester">7th Semester</option>
                    <option value="8th Semester">8th Semester</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#4D0C1E] mb-1">
                    Cumulative GPA
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="4"
                    value={editFormData.gpa || 3.5}
                    onChange={(e) => setEditFormData({ ...editFormData, gpa: e.target.value })}
                    className="w-full rounded-xl border border-[#E6DFD7] bg-white px-3.5 py-2 text-sm text-[#4D0C1E] focus:border-[#7B2137] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#4D0C1E] mb-1">
                    Status
                  </label>
                  <select
                    value={editFormData.status || 'Active'}
                    onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
                    className="w-full rounded-xl border border-[#E6DFD7] bg-white px-3.5 py-2 text-sm text-[#4D0C1E] focus:border-[#7B2137] focus:outline-none"
                  >
                    <option value="Active">Active</option>
                    <option value="On Leave">On Leave</option>
                    <option value="Graduated">Graduated</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4D0C1E] mb-1">
                  Residential Address
                </label>
                <input
                  type="text"
                  value={editFormData.address || ''}
                  onChange={(e) => setEditFormData({ ...editFormData, address: e.target.value })}
                  className="w-full rounded-xl border border-[#E6DFD7] bg-white px-3.5 py-2 text-sm text-[#4D0C1E] focus:border-[#7B2137] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E6DFD7]">
                <button
                  type="button"
                  onClick={() => setEditingStudent(null)}
                  className="rounded-xl border border-[#E6DFD7] bg-white px-4 py-2 text-sm font-bold text-[#4D0C1E] hover:bg-[#E6DFD7]/40"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#7B2137] px-5 py-2 text-sm font-bold text-white hover:bg-[#67192C]"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#4D0C1E]/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-3xl bg-[#FAF8F5] border border-[#E6DFD7] p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7B2137] text-white">
                <AlertTriangle className="h-5 w-5 text-[#FAF8F5]" />
              </div>
              <div>
                <h3 className="text-base font-black text-[#4D0C1E]">Confirm Deletion</h3>
                <p className="text-xs text-[#A85B63] font-semibold">Irreversible action</p>
              </div>
            </div>

            <p className="text-xs text-[#4D0C1E]/90 leading-relaxed font-medium">
              Are you sure you want to remove student{' '}
              <strong className="text-[#4D0C1E] font-black">"{deleteCandidate.name}"</strong> (
              {deleteCandidate.rollNumber}) from the registry?
            </p>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteCandidate(null)}
                className="rounded-xl border border-[#E6DFD7] bg-white px-4 py-2 text-xs font-bold text-[#4D0C1E] hover:bg-[#E6DFD7]/40"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="rounded-xl bg-[#7B2137] px-4 py-2 text-xs font-bold text-white hover:bg-[#67192C] active:scale-95"
              >
                Delete Student
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
