import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { 
  Users, 
  GraduationCap, 
  TrendingUp, 
  Award, 
  ArrowRight, 
  BookOpen, 
  CheckCircle, 
  PlusCircle, 
  DollarSign, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useStudents } from '../context/StudentContext';

export default function Home() {
  const { students, stats } = useStudents();
  const { openAddModal } = useOutletContext() || {};

  const topStudents = [...students]
    .sort((a, b) => (Number(b.gpa) || 0) - (Number(a.gpa) || 0))
    .slice(0, 4);

  const recentStudents = [...students].slice(0, 5);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        // Forest Pine Green (#2D4A3F)
        return 'bg-[#EBF2EE] text-[#2D4A3F] border-[#AEC5B9]';
      case 'Graduated':
        return 'bg-[#FAF8F5] text-[#7B2137] border-[#DBC8CB]';
      case 'On Leave':
        // Dusty Rose / Mauve (#A85B63)
        return 'bg-[#F6EFF0] text-[#A85B63] border-[#DBC8CB]';
      case 'Suspended':
        // Deep Oxblood (#4D0C1E)
        return 'bg-[#FDF2F4] text-[#4D0C1E] border-[#E5B8C1]';
      default:
        return 'bg-[#FAF8F5] text-[#4D0C1E] border-[#E6DFD7]';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Welcome Banner: Deep Oxblood to Rich Crimson (#4D0C1E -> #7B2137) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#4D0C1E] via-[#631427] to-[#7B2137] p-6 sm:p-8 text-[#FAF8F5] shadow-xl border border-[#4D0C1E]">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur-md mb-3 border border-white/15">
            <Sparkles className="h-3.5 w-3.5 text-[#E6DFD7]" />
            <span className="text-[#FAF8F5]">Academic Registry Dashboard • Spring Term 2026</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
            Welcome to Student Management
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#E6DFD7]/90 max-w-xl leading-relaxed">
            Manage comprehensive student admissions, track semester performance, monitor attendance, and review department analytics with precision.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {/* Primary Action Button */}
            <button
              type="button"
              onClick={openAddModal}
              className="inline-flex items-center gap-2 rounded-xl bg-[#FAF8F5] px-4 py-2.5 text-sm font-bold text-[#7B2137] shadow-lg hover:bg-white active:scale-95 transition-all"
            >
              <PlusCircle className="h-4 w-4 text-[#7B2137]" />
              Enroll New Student
            </button>
            <Link
              to="/students"
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/20 px-4 py-2.5 text-sm font-semibold text-[#FAF8F5] backdrop-blur hover:bg-white/20 transition-all"
            >
              <span>Explore Directory</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Decorative lighting */}
        <div className="pointer-events-none absolute -right-12 -top-12 h-64 w-64 rounded-full bg-[#A85B63]/25 blur-3xl" />
        <div className="pointer-events-none absolute right-20 -bottom-12 h-64 w-64 rounded-full bg-black/30 blur-2xl" />
      </div>

      {/* KPI Stats Cards: Elevated #FAF8F5 cards with #E6DFD7 borders */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Total Students */}
        <div className="rounded-2xl border border-[#E6DFD7] bg-[#FAF8F5] p-5 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#A85B63] uppercase tracking-wider">
              Total Enrolled
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7B2137]/10 text-[#7B2137]">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#4D0C1E]">{stats.total}</span>
            {/* Forest Pine Green (#2D4A3F) for positive KPI */}
            <span className="text-xs font-bold text-[#2D4A3F] flex items-center bg-[#EBF2EE] px-1.5 py-0.5 rounded">
              <TrendingUp className="h-3.5 w-3.5 mr-0.5" /> +12%
            </span>
          </div>
          <p className="mt-1 text-xs text-[#4D0C1E]/70 font-medium">
            {stats.active} active students registered
          </p>
        </div>

        {/* Card 2: Average GPA */}
        <div className="rounded-2xl border border-[#E6DFD7] bg-[#FAF8F5] p-5 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#A85B63] uppercase tracking-wider">
              Average GPA
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4D0C1E]/10 text-[#4D0C1E]">
              <Award className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#4D0C1E]">{stats.avgGpa}</span>
            <span className="text-xs font-bold text-[#A85B63]">/ 4.00 Scale</span>
          </div>
          <p className="mt-1 text-xs text-[#4D0C1E]/70 font-medium">
            Honors benchmark at ≥ 3.50
          </p>
        </div>

        {/* Card 3: Attendance Rate (Forest Pine Green #2D4A3F) */}
        <div className="rounded-2xl border border-[#E6DFD7] bg-[#FAF8F5] p-5 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#A85B63] uppercase tracking-wider">
              Avg Attendance
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2D4A3F]/10 text-[#2D4A3F]">
              <CheckCircle className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#2D4A3F]">{stats.avgAttendance}%</span>
            <span className="text-xs font-bold text-[#2D4A3F]">Optimal</span>
          </div>
          <div className="mt-2 w-full bg-[#E6DFD7] rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-[#2D4A3F] h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${stats.avgAttendance}%` }}
            />
          </div>
        </div>

        {/* Card 4: Fee Status */}
        <div className="rounded-2xl border border-[#E6DFD7] bg-[#FAF8F5] p-5 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#A85B63] uppercase tracking-wider">
              Tuition Status
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7B2137]/10 text-[#7B2137]">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#4D0C1E]">{stats.feesPaid}</span>
            <span className="text-xs font-bold text-[#2D4A3F] bg-[#EBF2EE] px-1.5 py-0.5 rounded">
              Paid
            </span>
          </div>
          <p className="mt-1 text-xs text-[#A85B63] font-bold">
            {stats.feesPending} with dues pending
          </p>
        </div>
      </div>

      {/* Main Grid: Department Distribution + Dean's Honor Roll */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Department Distribution (Left 2 cols) */}
        <div className="lg:col-span-2 rounded-3xl border border-[#E6DFD7] bg-[#FAF8F5] p-6 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-black text-[#4D0C1E]">
                Department Distribution
              </h2>
              <p className="text-xs text-[#A85B63] font-medium">
                Enrollment breakdown by academic department
              </p>
            </div>
            <Link
              to="/students"
              className="text-xs font-bold text-[#7B2137] hover:text-[#4D0C1E] flex items-center gap-1"
            >
              View in Directory <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {stats.departments.map((dept, index) => (
              <div key={dept.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#4D0C1E]">{dept.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[#A85B63] font-semibold">{dept.count} students</span>
                    <span className="font-black text-[#4D0C1E]">{dept.percentage}%</span>
                  </div>
                </div>
                <div className="h-2.5 w-full rounded-full bg-[#E6DFD7] overflow-hidden">
                  {/* Primary Chart Bars: Rich Crimson (#7B2137) & Dusty Rose (#A85B63) */}
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      index % 2 === 0 ? 'bg-[#7B2137]' : 'bg-[#A85B63]'
                    }`}
                    style={{ width: `${dept.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Department Information Note */}
          <div className="mt-6 flex items-center gap-3 rounded-2xl bg-white p-4 border border-[#E6DFD7]">
            <BookOpen className="h-5 w-5 text-[#7B2137] shrink-0" />
            <div className="text-xs text-[#4D0C1E]/90">
              <span className="font-bold text-[#4D0C1E]">Comprehensive Academic Coverage:</span>{' '}
              Registrations span Computer Science, Electrical Engineering, Business, Mechanical, Data Science, and allied disciplines.
            </div>
          </div>
        </div>

        {/* Dean's Honor Roll */}
        <div className="rounded-3xl border border-[#E6DFD7] bg-[#FAF8F5] p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#4D0C1E] text-white">
                  <Award className="h-4 w-4 text-[#FAF8F5]" />
                </div>
                <h2 className="text-base font-black text-[#4D0C1E]">Dean's Honor Roll</h2>
              </div>
              <span className="rounded-full bg-[#FAF8F5] px-2 py-0.5 text-[10px] font-bold text-[#7B2137] border border-[#E6DFD7]">
                Top GPA
              </span>
            </div>
            <p className="text-xs text-[#A85B63] font-medium mb-4">
              Highest cumulative academic ratings this semester.
            </p>

            <div className="divide-y divide-[#E6DFD7]/60">
              {topStudents.map((student, index) => (
                <Link
                  key={student.id}
                  to={`/students/${student.id}`}
                  className="py-3 flex items-center justify-between group hover:bg-white rounded-xl px-2 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-black text-[#A85B63] w-4">#{index + 1}</span>
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="h-8 w-8 rounded-full object-cover ring-2 ring-[#E6DFD7]"
                    />
                    <div>
                      <p className="text-xs font-bold text-[#4D0C1E] group-hover:text-[#7B2137] transition-colors">
                        {student.name}
                      </p>
                      <p className="text-[11px] text-[#A85B63] font-medium">{student.department}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block rounded-md bg-[#EBF2EE] px-2 py-0.5 text-xs font-black text-[#2D4A3F] border border-[#AEC5B9]">
                      {student.gpa.toFixed(2)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-[#E6DFD7] text-center">
            <Link
              to="/students"
              className="text-xs font-bold text-[#7B2137] hover:text-[#4D0C1E] inline-flex items-center gap-1"
            >
              View Full Honor Roll <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Registrations Table */}
      <div className="rounded-3xl border border-[#E6DFD7] bg-[#FAF8F5] p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-base font-black text-[#4D0C1E]">
              Recent Registrations
            </h2>
            <p className="text-xs text-[#A85B63] font-medium">
              Latest student enrollments and academic records
            </p>
          </div>
          <Link
            to="/students"
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#E6DFD7] bg-white px-3.5 py-1.5 text-xs font-bold text-[#4D0C1E] hover:bg-[#E6DFD7]/40 transition-colors"
          >
            All Student Records
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[#E6DFD7] bg-white">
          <table className="w-full text-left border-collapse">
            <thead>
              {/* Table header fill: Warm Alabaster / Cream (#E6DFD7) */}
              <tr className="bg-[#E6DFD7] border-b border-[#D8CFCE] text-[11px] font-bold text-[#4D0C1E] uppercase tracking-wider">
                <th className="py-3.5 pl-4">Student</th>
                <th className="py-3.5">Roll ID</th>
                <th className="py-3.5">Department</th>
                <th className="py-3.5">Semester</th>
                <th className="py-3.5">GPA</th>
                <th className="py-3.5">Status</th>
                <th className="py-3.5 pr-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6DFD7]/60 text-xs">
              {recentStudents.map((student) => (
                <tr key={student.id} className="hover:bg-[#FAF8F5] transition-colors">
                  <td className="py-3 pl-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="h-8 w-8 rounded-full object-cover ring-1 ring-[#E6DFD7]"
                      />
                      <div>
                        <p className="font-bold text-[#4D0C1E]">{student.name}</p>
                        <p className="text-[11px] text-[#A85B63]">{student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 font-mono font-bold text-[#4D0C1E]">
                    {student.rollNumber}
                  </td>
                  <td className="py-3 text-[#4D0C1E] font-medium">
                    {student.department}
                  </td>
                  <td className="py-3 text-[#A85B63] font-medium">
                    {student.semester}
                  </td>
                  <td className="py-3">
                    <span className="font-black text-[#4D0C1E]">{student.gpa.toFixed(2)}</span>
                  </td>
                  <td className="py-3">
                    <span
                      className={`inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${getStatusBadge(
                        student.status
                      )}`}
                    >
                      {student.status}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-right">
                    <Link
                      to={`/students/${student.id}`}
                      className="inline-flex items-center gap-1 rounded-xl bg-[#FAF8F5] border border-[#E6DFD7] px-2.5 py-1 text-[11px] font-bold text-[#7B2137] hover:bg-[#7B2137] hover:text-white transition-colors"
                    >
                      Details
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
