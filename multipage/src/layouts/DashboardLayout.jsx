import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useStudents } from '../context/StudentContext';
import { 
  X, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  UserPlus
} from 'lucide-react';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const { toast, setToast, addStudent } = useStudents();

  // Form state for Add Student modal
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    rollNumber: '',
    department: 'Computer Science',
    semester: '1st Semester',
    gpa: '3.50',
    attendance: '90',
    status: 'Active',
    feeStatus: 'Paid',
    guardianName: '',
    guardianPhone: '',
    address: '',
    bio: ''
  });

  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Full name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Valid email is required';
    }
    if (!formData.rollNumber.trim()) errors.rollNumber = 'Roll number is required';
    if (!formData.department) errors.department = 'Department is required';
    if (formData.gpa && (isNaN(formData.gpa) || formData.gpa < 0 || formData.gpa > 4)) {
      errors.gpa = 'GPA must be between 0.00 and 4.00';
    }
    return errors;
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    addStudent({
      ...formData,
      gpa: parseFloat(formData.gpa) || 3.5,
      attendance: parseInt(formData.attendance, 10) || 90
    });

    // Reset and close
    setFormData({
      name: '',
      email: '',
      phone: '',
      rollNumber: '',
      department: 'Computer Science',
      semester: '1st Semester',
      gpa: '3.50',
      attendance: '90',
      status: 'Active',
      feeStatus: 'Paid',
      guardianName: '',
      guardianPhone: '',
      address: '',
      bio: ''
    });
    setFormErrors({});
    setAddModalOpen(false);
  };

  return (
    /* Canvas background: Warm Alabaster / Cream (#E6DFD7) */
    <div className="min-h-screen bg-[#E6DFD7] text-[#4D0C1E] flex flex-col font-sans">
      {/* Sidebar Navigation */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col lg:pl-64 min-w-0">
        {/* Top Navbar */}
        <Navbar 
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)} 
          onOpenAddModal={() => setAddModalOpen(true)}
        />

        {/* Floating Toast Notification */}
        {toast && (
          <div className={`fixed top-20 right-4 z-50 flex items-center gap-3 rounded-2xl border p-4 shadow-xl transition-all animate-in slide-in-from-top-4 duration-300 max-w-md ${
            toast.type === 'error'
              ? 'bg-[#FDF2F4] border-[#E5B8C1] text-[#4D0C1E]'
              : toast.type === 'info'
              ? 'bg-[#F6EFF0] border-[#DBC8CB] text-[#7B2137]'
              : 'bg-[#EBF2EE] border-[#AEC5B9] text-[#2D4A3F]'
          }`}>
            {toast.type === 'error' && (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4D0C1E] text-white shrink-0">
                <AlertCircle className="h-5 w-5" />
              </div>
            )}
            {toast.type === 'info' && (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#A85B63] text-white shrink-0">
                <Info className="h-5 w-5" />
              </div>
            )}
            {(!toast.type || toast.type === 'success') && (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2D4A3F] text-white shrink-0">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            )}
            <div className="flex-1 text-sm font-bold">
              {toast.message}
            </div>
            <button
              type="button"
              onClick={() => setToast(null)}
              className="rounded-lg p-1 text-[#4D0C1E]/50 hover:bg-black/5 hover:text-[#4D0C1E]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Outlet for active page */}
        <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          <Outlet context={{ openAddModal: () => setAddModalOpen(true) }} />
        </main>

        {/* Global Footer */}
        <footer className="border-t border-[#E6DFD7] bg-[#FAF8F5] py-4 px-6 text-center text-xs text-[#4D0C1E]/75">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl mx-auto">
            <p className="font-medium">© {new Date().getFullYear()} Student Management. All rights reserved.</p>
            <p className="flex items-center gap-1.5 text-[#A85B63] font-semibold">
              Built with React Router DOM, Tailwind CSS & Lucide Icons
            </p>
          </div>
        </footer>
      </div>

      {/* Add Student Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#4D0C1E]/60 backdrop-blur-sm overflow-y-auto">
          {/* Elevated Card: Warm Alabaster (#FAF8F5) with subtle border (#E6DFD7) */}
          <div className="relative w-full max-w-2xl rounded-3xl bg-[#FAF8F5] border border-[#E6DFD7] shadow-2xl my-8">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#E6DFD7] bg-white rounded-t-3xl">
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4D0C1E] text-white shadow-md">
                  <UserPlus className="h-5 w-5 text-[#FAF8F5]" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#4D0C1E] leading-tight">Enroll New Student</h3>
                  <p className="text-xs text-[#A85B63] font-semibold">Academic registration record</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setAddModalOpen(false)}
                className="rounded-xl p-2 text-[#A85B63] hover:bg-[#E6DFD7]/50 hover:text-[#4D0C1E]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleAddSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-[#4D0C1E] mb-1">
                    Full Name <span className="text-[#7B2137]">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Jonathan Taylor"
                    className={`w-full rounded-xl border bg-white px-3.5 py-2 text-sm text-[#4D0C1E] focus:outline-none focus:ring-2 ${
                      formErrors.name
                        ? 'border-[#7B2137] focus:ring-[#7B2137]/30'
                        : 'border-[#E6DFD7] focus:border-[#7B2137] focus:ring-[#7B2137]/20'
                    }`}
                  />
                  {formErrors.name && (
                    <p className="text-xs text-[#7B2137] font-semibold mt-1">{formErrors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-[#4D0C1E] mb-1">
                    Email Address <span className="text-[#7B2137]">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. j.taylor@university.edu"
                    className={`w-full rounded-xl border bg-white px-3.5 py-2 text-sm text-[#4D0C1E] focus:outline-none focus:ring-2 ${
                      formErrors.email
                        ? 'border-[#7B2137] focus:ring-[#7B2137]/30'
                        : 'border-[#E6DFD7] focus:border-[#7B2137] focus:ring-[#7B2137]/20'
                    }`}
                  />
                  {formErrors.email && (
                    <p className="text-xs text-[#7B2137] font-semibold mt-1">{formErrors.email}</p>
                  )}
                </div>

                {/* Roll Number */}
                <div>
                  <label className="block text-xs font-bold text-[#4D0C1E] mb-1">
                    Roll / Matriculation Number <span className="text-[#7B2137]">*</span>
                  </label>
                  <input
                    type="text"
                    name="rollNumber"
                    value={formData.rollNumber}
                    onChange={handleInputChange}
                    placeholder="e.g. CS-2025-108"
                    className={`w-full rounded-xl border bg-white px-3.5 py-2 text-sm text-[#4D0C1E] focus:outline-none focus:ring-2 ${
                      formErrors.rollNumber
                        ? 'border-[#7B2137] focus:ring-[#7B2137]/30'
                        : 'border-[#E6DFD7] focus:border-[#7B2137] focus:ring-[#7B2137]/20'
                    }`}
                  />
                  {formErrors.rollNumber && (
                    <p className="text-xs text-[#7B2137] font-semibold mt-1">{formErrors.rollNumber}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold text-[#4D0C1E] mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. +1 (555) 019-2834"
                    className="w-full rounded-xl border border-[#E6DFD7] bg-white px-3.5 py-2 text-sm text-[#4D0C1E] focus:border-[#7B2137] focus:outline-none focus:ring-2 focus:ring-[#7B2137]/20"
                  />
                </div>

                {/* Department */}
                <div>
                  <label className="block text-xs font-bold text-[#4D0C1E] mb-1">
                    Department / Major
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-[#E6DFD7] bg-white px-3.5 py-2 text-sm text-[#4D0C1E] focus:border-[#7B2137] focus:outline-none focus:ring-2 focus:ring-[#7B2137]/20"
                  >
                    <option value="Computer Science">Computer Science</option>
                    <option value="Electrical Engineering">Electrical Engineering</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                    <option value="Business Administration">Business Administration</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Biotechnology">Biotechnology</option>
                    <option value="Architecture">Architecture</option>
                  </select>
                </div>

                {/* Semester */}
                <div>
                  <label className="block text-xs font-bold text-[#4D0C1E] mb-1">
                    Current Semester
                  </label>
                  <select
                    name="semester"
                    value={formData.semester}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-[#E6DFD7] bg-white px-3.5 py-2 text-sm text-[#4D0C1E] focus:border-[#7B2137] focus:outline-none focus:ring-2 focus:ring-[#7B2137]/20"
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

                {/* Initial GPA */}
                <div>
                  <label className="block text-xs font-bold text-[#4D0C1E] mb-1">
                    Cumulative GPA (0.00 - 4.00)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="4"
                    name="gpa"
                    value={formData.gpa}
                    onChange={handleInputChange}
                    className={`w-full rounded-xl border bg-white px-3.5 py-2 text-sm text-[#4D0C1E] focus:outline-none focus:ring-2 ${
                      formErrors.gpa
                        ? 'border-[#7B2137] focus:ring-[#7B2137]/30'
                        : 'border-[#E6DFD7] focus:border-[#7B2137] focus:ring-[#7B2137]/20'
                    }`}
                  />
                  {formErrors.gpa && (
                    <p className="text-xs text-[#7B2137] font-semibold mt-1">{formErrors.gpa}</p>
                  )}
                </div>

                {/* Enrollment Status */}
                <div>
                  <label className="block text-xs font-bold text-[#4D0C1E] mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-[#E6DFD7] bg-white px-3.5 py-2 text-sm text-[#4D0C1E] focus:border-[#7B2137] focus:outline-none focus:ring-2 focus:ring-[#7B2137]/20"
                  >
                    <option value="Active">Active</option>
                    <option value="On Leave">On Leave</option>
                    <option value="Graduated">Graduated</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>

                {/* Fee Status */}
                <div>
                  <label className="block text-xs font-bold text-[#4D0C1E] mb-1">
                    Fee Status
                  </label>
                  <select
                    name="feeStatus"
                    value={formData.feeStatus}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-[#E6DFD7] bg-white px-3.5 py-2 text-sm text-[#4D0C1E] focus:border-[#7B2137] focus:outline-none focus:ring-2 focus:ring-[#7B2137]/20"
                  >
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </div>

                {/* Guardian Name */}
                <div>
                  <label className="block text-xs font-bold text-[#4D0C1E] mb-1">
                    Guardian Name
                  </label>
                  <input
                    type="text"
                    name="guardianName"
                    value={formData.guardianName}
                    onChange={handleInputChange}
                    placeholder="e.g. Martha Taylor"
                    className="w-full rounded-xl border border-[#E6DFD7] bg-white px-3.5 py-2 text-sm text-[#4D0C1E] focus:border-[#7B2137] focus:outline-none focus:ring-2 focus:ring-[#7B2137]/20"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-xs font-bold text-[#4D0C1E] mb-1">
                  Residential Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="e.g. 142 River Road, Portland, OR"
                  className="w-full rounded-xl border border-[#E6DFD7] bg-white px-3.5 py-2 text-sm text-[#4D0C1E] focus:border-[#7B2137] focus:outline-none focus:ring-2 focus:ring-[#7B2137]/20"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold text-[#4D0C1E] mb-1">
                  Academic Notes / Remarks
                </label>
                <textarea
                  name="bio"
                  rows="2"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Notes about academic specialization..."
                  className="w-full rounded-xl border border-[#E6DFD7] bg-white px-3.5 py-2 text-sm text-[#4D0C1E] focus:border-[#7B2137] focus:outline-none focus:ring-2 focus:ring-[#7B2137]/20"
                />
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E6DFD7]">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="rounded-xl border border-[#E6DFD7] bg-white px-4 py-2 text-sm font-semibold text-[#4D0C1E] hover:bg-[#E6DFD7]/50 transition-colors"
                >
                  Cancel
                </button>
                {/* Primary CTA button: Rich Crimson (#7B2137) */}
                <button
                  type="submit"
                  className="rounded-xl bg-[#7B2137] px-5 py-2 text-sm font-bold text-white shadow-md shadow-[#7B2137]/25 hover:bg-[#67192C] active:scale-95 transition-all"
                >
                  Save & Enroll Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
