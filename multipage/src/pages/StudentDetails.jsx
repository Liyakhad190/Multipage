import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Award, 
  ShieldCheck, 
  AlertCircle, 
  Edit3, 
  Trash2, 
  Printer, 
  User, 
  CheckCircle, 
  DollarSign, 
  ChevronRight, 
  Sparkles, 
  X 
} from 'lucide-react';
import { useStudents } from '../context/StudentContext';

export default function StudentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getStudentById, updateStudent, deleteStudent } = useStudents();

  const student = getStudentById(id);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editData, setEditData] = useState({});

  if (!student) {
    return (
      <div className="rounded-3xl border border-[#E6DFD7] bg-[#FAF8F5] p-12 text-center shadow-xs max-w-xl mx-auto my-12 animate-in fade-in">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#7B2137]/10 text-[#7B2137] mb-4">
          <AlertCircle className="h-8 w-8" />
        </div>
        <h2 className="text-xl font-black text-[#4D0C1E]">Student Record Not Found</h2>
        <p className="mt-2 text-xs sm:text-sm text-[#A85B63] font-medium">
          The requested student record with ID <strong className="text-[#4D0C1E]">"{id}"</strong> does not exist or may have been removed.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            to="/students"
            className="inline-flex items-center gap-2 rounded-xl bg-[#7B2137] px-4 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-[#67192C] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Students Directory
          </Link>
        </div>
      </div>
    );
  }

  const handleOpenEdit = () => {
    setEditData({ ...student });
    setIsEditOpen(true);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    updateStudent(student.id, {
      ...editData,
      gpa: parseFloat(editData.gpa) || 3.5,
      attendance: parseInt(editData.attendance, 10) || 85
    });
    setIsEditOpen(false);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${student.name}'s record?`)) {
      deleteStudent(student.id);
      navigate('/students');
    }
  };

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

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-[#A85B63] font-bold">
        <Link to="/" className="hover:text-[#7B2137]">Dashboard</Link>
        <ChevronRight className="h-3.5 w-3.5 text-[#A85B63]" />
        <Link to="/students" className="hover:text-[#7B2137]">Students</Link>
        <ChevronRight className="h-3.5 w-3.5 text-[#A85B63]" />
        <span className="text-[#4D0C1E] truncate max-w-xs">{student.name}</span>
      </nav>

      {/* Top Banner Card: Elevated #FFFFFF card with #E6DFD7 border */}
      <div className="rounded-3xl border border-[#E6DFD7] bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="relative">
              <img
                src={student.avatar}
                alt={student.name}
                className="h-24 w-24 rounded-3xl object-cover ring-4 ring-[#FAF8F5] shadow-md"
              />
              <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full bg-[#2D4A3F] ring-2 ring-white"></span>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                {/* Heading: Deep Oxblood (#4D0C1E) */}
                <h1 className="text-2xl sm:text-3xl font-black text-[#4D0C1E] tracking-tight">
                  {student.name}
                </h1>
                <span
                  className={`rounded-full border px-3 py-0.5 text-xs font-bold ${getStatusBadge(
                    student.status
                  )}`}
                >
                  {student.status}
                </span>
                <span className="rounded-full bg-[#EBF2EE] border border-[#AEC5B9] text-[#2D4A3F] px-2.5 py-0.5 text-xs font-bold">
                  Fee: {student.feeStatus || 'Paid'}
                </span>
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#A85B63]">
                <span className="font-mono font-bold text-[#4D0C1E]">
                  ID: {student.id}
                </span>
                <span>•</span>
                <span className="font-mono text-[#7B2137] font-bold">
                  Roll: {student.rollNumber}
                </span>
                <span>•</span>
                <span className="text-[#4D0C1E] font-bold">
                  {student.department}
                </span>
                <span>•</span>
                <span className="font-medium text-[#4D0C1E]/80">{student.semester}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-center">
            <Link
              to="/students"
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#E6DFD7] bg-[#FAF8F5] px-3.5 py-2 text-xs font-bold text-[#4D0C1E] hover:bg-[#E6DFD7]/50 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Link>

            {/* Primary Action: Rich Crimson (#7B2137) */}
            <button
              type="button"
              onClick={handleOpenEdit}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#7B2137] px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#67192C] active:scale-95 transition-all"
            >
              <Edit3 className="h-4 w-4" />
              <span>Edit Profile</span>
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#E6DFD7] bg-[#FAF8F5] px-3.5 py-2 text-xs font-bold text-[#4D0C1E] hover:bg-[#E6DFD7]/50 transition-colors"
              title="Print Record"
            >
              <Printer className="h-4 w-4" />
              <span className="hidden sm:inline">Print</span>
            </button>

            <button
              type="button"
              onClick={handleDelete}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#DBC8CB] bg-[#FAF8F5] px-3.5 py-2 text-xs font-bold text-[#7B2137] hover:bg-[#FDF2F4] transition-colors"
              title="Delete Record"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid: Academic Highlights & Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Personal, Contact & Family Details */}
        <div className="space-y-6">
          {/* Contact Information */}
          <div className="rounded-3xl border border-[#E6DFD7] bg-white p-6 shadow-xs">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#A85B63] mb-4 flex items-center gap-2">
              <User className="h-4 w-4 text-[#7B2137]" />
              Contact Information
            </h2>
            <div className="space-y-3.5 text-xs">
              <div>
                <p className="text-[#A85B63] font-medium">Institutional Email</p>
                <div className="mt-1 flex items-center gap-2 font-bold text-[#4D0C1E]">
                  <Mail className="h-3.5 w-3.5 text-[#7B2137]" />
                  <a href={`mailto:${student.email}`} className="hover:underline">
                    {student.email}
                  </a>
                </div>
              </div>

              <div>
                <p className="text-[#A85B63] font-medium">Phone Number</p>
                <div className="mt-1 flex items-center gap-2 font-bold text-[#4D0C1E]">
                  <Phone className="h-3.5 w-3.5 text-[#7B2137]" />
                  <span>{student.phone || 'Not provided'}</span>
                </div>
              </div>

              <div>
                <p className="text-[#A85B63] font-medium">Residential Address</p>
                <div className="mt-1 flex items-start gap-2 font-bold text-[#4D0C1E]">
                  <MapPin className="h-3.5 w-3.5 text-[#7B2137] shrink-0 mt-0.5" />
                  <span>{student.address || '742 Evergreen Terrace, Seattle, WA'}</span>
                </div>
              </div>

              <div>
                <p className="text-[#A85B63] font-medium">Admission Date</p>
                <div className="mt-1 flex items-center gap-2 font-bold text-[#4D0C1E]">
                  <Calendar className="h-3.5 w-3.5 text-[#7B2137]" />
                  <span>{student.admissionDate || '2023-08-15'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency & Guardian */}
          <div className="rounded-3xl border border-[#E6DFD7] bg-white p-6 shadow-xs">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#A85B63] mb-4 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#2D4A3F]" />
              Guardian & Emergency
            </h2>
            <div className="space-y-3.5 text-xs">
              <div>
                <p className="text-[#A85B63] font-medium">Guardian Name</p>
                <p className="mt-1 font-bold text-[#4D0C1E]">
                  {student.guardianName || 'Carlos Martinez (Parent)'}
                </p>
              </div>
              <div>
                <p className="text-[#A85B63] font-medium">Emergency Contact</p>
                <div className="mt-1 flex items-center gap-2 font-bold text-[#2D4A3F]">
                  <Phone className="h-3.5 w-3.5" />
                  <span>{student.guardianPhone || '+1 (555) 234-8900'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Extracurriculars */}
          <div className="rounded-3xl border border-[#E6DFD7] bg-white p-6 shadow-xs">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#A85B63] mb-4 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#7B2137]" />
              Clubs & Activities
            </h2>
            <div className="flex flex-wrap gap-2">
              {(student.activities || ['Coding Club', 'Peer Tutor']).map((act, index) => (
                <span
                  key={index}
                  className="rounded-xl bg-[#FAF8F5] border border-[#E6DFD7] text-[#4D0C1E] px-3 py-1 text-xs font-bold"
                >
                  {act}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Columns: Academic Analytics & Courses */}
        <div className="lg:col-span-2 space-y-6">
          {/* Key Metric Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* GPA Card */}
            <div className="rounded-3xl border border-[#E6DFD7] bg-[#FAF8F5] p-5 shadow-xs">
              <div className="flex items-center justify-between text-xs text-[#A85B63] font-bold mb-2">
                <span>Cumulative GPA</span>
                <Award className="h-4 w-4 text-[#7B2137]" />
              </div>
              <div className="text-3xl font-black text-[#4D0C1E]">
                {student.gpa.toFixed(2)}
              </div>
              <p className="mt-1 text-xs text-[#2D4A3F] font-bold">
                {student.gpa >= 3.5 ? "★ Dean's Honor Roll" : 'Good Standing'}
              </p>
            </div>

            {/* Attendance Card: Forest Pine Green (#2D4A3F) */}
            <div className="rounded-3xl border border-[#AEC5B9] bg-[#EBF2EE] p-5 shadow-xs">
              <div className="flex items-center justify-between text-xs text-[#2D4A3F] font-bold mb-2">
                <span>Attendance</span>
                <CheckCircle className="h-4 w-4 text-[#2D4A3F]" />
              </div>
              <div className="text-3xl font-black text-[#2D4A3F]">
                {student.attendance}%
              </div>
              <div className="mt-2 w-full bg-[#AEC5B9]/40 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-[#2D4A3F] h-1.5 rounded-full"
                  style={{ width: `${student.attendance}%` }}
                />
              </div>
            </div>

            {/* Financial Status */}
            <div className="rounded-3xl border border-[#E6DFD7] bg-[#FAF8F5] p-5 shadow-xs">
              <div className="flex items-center justify-between text-xs text-[#A85B63] font-bold mb-2">
                <span>Tuition Fees</span>
                <DollarSign className="h-4 w-4 text-[#7B2137]" />
              </div>
              <div className="text-2xl font-black text-[#4D0C1E]">
                {student.feeStatus || 'Paid'}
              </div>
              <p className="mt-1 text-xs text-[#2D4A3F] font-bold">
                Current Term Clearance
              </p>
            </div>
          </div>

          {/* Student Bio */}
          <div className="rounded-3xl border border-[#E6DFD7] bg-white p-6 shadow-xs">
            <h2 className="text-base font-black text-[#4D0C1E] mb-2">
              Academic Background & Research Focus
            </h2>
            <p className="text-xs sm:text-sm text-[#4D0C1E]/80 leading-relaxed font-medium">
              {student.bio ||
                'Active undergraduate student maintaining strong academic progress across core departmental coursework and research projects.'}
            </p>
          </div>

          {/* Registered Courses Table */}
          <div className="rounded-3xl border border-[#E6DFD7] bg-white p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-black text-[#4D0C1E]">
                  Registered Courses & Transcripts
                </h2>
                <p className="text-xs text-[#A85B63] font-medium">
                  Enrollment for {student.semester}
                </p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-xl bg-[#FAF8F5] border border-[#E6DFD7] text-[#4D0C1E]">
                {(student.courses || []).length} Courses
              </span>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-[#E6DFD7]">
              <table className="w-full text-left border-collapse">
                <thead>
                  {/* Table header fill: Warm Alabaster / Cream (#E6DFD7) */}
                  <tr className="bg-[#E6DFD7] border-b border-[#D8CFCE] text-[11px] font-bold text-[#4D0C1E] uppercase tracking-wider">
                    <th className="py-3 pl-3">Course Code</th>
                    <th className="py-3">Course Title</th>
                    <th className="py-3">Credits</th>
                    <th className="py-3 pr-3 text-right">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E6DFD7]/60 text-xs">
                  {(student.courses || [
                    { code: 'GEN101', name: 'Core Foundations', credits: 3, grade: 'A' },
                    { code: 'GEN102', name: 'Academic Writing & Research', credits: 3, grade: 'B+' }
                  ]).map((course, idx) => (
                    <tr key={idx} className="hover:bg-[#FAF8F5] transition-colors">
                      <td className="py-3 pl-3 font-mono font-bold text-[#7B2137]">
                        {course.code}
                      </td>
                      <td className="py-3 font-bold text-[#4D0C1E]">
                        {course.name}
                      </td>
                      <td className="py-3 text-[#A85B63] font-medium font-mono">
                        {course.credits} Credits
                      </td>
                      <td className="py-3 pr-3 text-right font-black text-[#4D0C1E]">
                        <span className="inline-block rounded-md bg-[#FAF8F5] border border-[#E6DFD7] px-2 py-0.5 text-xs text-[#4D0C1E]">
                          {course.grade}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* In-place Edit Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#4D0C1E]/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-xl rounded-3xl bg-[#FAF8F5] border border-[#E6DFD7] shadow-2xl my-8">
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#E6DFD7] bg-white rounded-t-3xl">
              <h3 className="text-base font-black text-[#4D0C1E]">
                Edit Record: {student.name}
              </h3>
              <button
                type="button"
                onClick={() => setIsEditOpen(false)}
                className="rounded-xl p-2 text-[#A85B63] hover:bg-[#E6DFD7]/50 hover:text-[#4D0C1E]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#4D0C1E] mb-1">Name</label>
                  <input
                    type="text"
                    value={editData.name || ''}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    required
                    className="w-full rounded-xl border border-[#E6DFD7] bg-white px-3 py-2 text-sm text-[#4D0C1E] focus:border-[#7B2137] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#4D0C1E] mb-1">Email</label>
                  <input
                    type="email"
                    value={editData.email || ''}
                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                    required
                    className="w-full rounded-xl border border-[#E6DFD7] bg-white px-3 py-2 text-sm text-[#4D0C1E] focus:border-[#7B2137] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#4D0C1E] mb-1">GPA</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="4"
                    value={editData.gpa || 3.5}
                    onChange={(e) => setEditData({ ...editData, gpa: e.target.value })}
                    className="w-full rounded-xl border border-[#E6DFD7] bg-white px-3 py-2 text-sm text-[#4D0C1E] focus:border-[#7B2137] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#4D0C1E] mb-1">Attendance (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={editData.attendance || 90}
                    onChange={(e) => setEditData({ ...editData, attendance: e.target.value })}
                    className="w-full rounded-xl border border-[#E6DFD7] bg-white px-3 py-2 text-sm text-[#4D0C1E] focus:border-[#7B2137] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#4D0C1E] mb-1">Status</label>
                  <select
                    value={editData.status || 'Active'}
                    onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                    className="w-full rounded-xl border border-[#E6DFD7] bg-white px-3 py-2 text-sm text-[#4D0C1E] focus:border-[#7B2137] focus:outline-none"
                  >
                    <option value="Active">Active</option>
                    <option value="On Leave">On Leave</option>
                    <option value="Graduated">Graduated</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#4D0C1E] mb-1">Fee Status</label>
                  <select
                    value={editData.feeStatus || 'Paid'}
                    onChange={(e) => setEditData({ ...editData, feeStatus: e.target.value })}
                    className="w-full rounded-xl border border-[#E6DFD7] bg-white px-3 py-2 text-sm text-[#4D0C1E] focus:border-[#7B2137] focus:outline-none"
                  >
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4D0C1E] mb-1">Bio / Notes</label>
                <textarea
                  rows="3"
                  value={editData.bio || ''}
                  onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                  className="w-full rounded-xl border border-[#E6DFD7] bg-white px-3 py-2 text-sm text-[#4D0C1E] focus:border-[#7B2137] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E6DFD7]">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="rounded-xl border border-[#E6DFD7] bg-white px-4 py-2 text-xs font-bold text-[#4D0C1E] hover:bg-[#E6DFD7]/40"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#7B2137] px-5 py-2 text-xs font-bold text-white hover:bg-[#67192C]"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
