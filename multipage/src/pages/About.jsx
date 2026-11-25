import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  UserPlus, 
  Users, 
  UserCheck, 
  LayoutDashboard, 
  BookOpen, 
  Building2, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Search,
  Sparkles,
  Clock,
  Database,
  BarChart3,
  SlidersHorizontal,
  FileText,
  TrendingUp,
  FolderKanban
} from 'lucide-react';

export default function About() {
  // Section B: System Capabilities (Implemented features only)
  const systemCapabilities = [
    {
      title: 'Student Registration',
      subtitle: 'Enrollment & Onboarding',
      icon: UserPlus,
      iconBg: 'bg-[#7B2137]/10 text-[#7B2137]',
      points: [
        'Register new students with full profile details',
        'Maintain student contact and guardian information',
        'Manage student enrollment status and term details'
      ]
    },
    {
      title: 'Student Directory',
      subtitle: 'Central Registry & Search',
      icon: Users,
      iconBg: 'bg-[#4D0C1E]/10 text-[#4D0C1E]',
      points: [
        'View all registered students in card or table format',
        'Search students by name, roll number, or department',
        'Filter and organize student records by status and major'
      ]
    },
    {
      title: 'Student Profiles',
      subtitle: 'Individual Academic Records',
      icon: UserCheck,
      iconBg: 'bg-[#2D4A3F]/10 text-[#2D4A3F]',
      points: [
        'View individual student demographic and contact data',
        'Access enrolled coursework and semester grades',
        'View relevant records, fee statuses, and activities'
      ]
    },
    {
      title: 'Dashboard Overview',
      subtitle: 'Executive Summary & Metrics',
      icon: LayoutDashboard,
      iconBg: 'bg-[#7B2137]/10 text-[#7B2137]',
      points: [
        'View key student metrics and cumulative statistics',
        'Monitor active enrollment, average GPA, and attendance',
        'Get an instant high-level overview of institution records'
      ]
    },
    {
      title: 'Academic Management',
      subtitle: 'Performance & Progress Tracking',
      icon: BookOpen,
      iconBg: 'bg-[#A85B63]/10 text-[#A85B63]',
      points: [
        'Manage student academic standings and GPAs',
        'Monitor course grades and term attendance levels',
        'Organize semester records and dean honor roll recognitions'
      ]
    },
    {
      title: 'Department Management',
      subtitle: 'Multi-Department Oversight',
      icon: Building2,
      iconBg: 'bg-[#4D0C1E]/10 text-[#4D0C1E]',
      points: [
        'Organize students across distinct academic departments',
        'View department-wise enrollment statistics and ratios',
        'Filter records by Engineering, Business, Data Science, and more'
      ]
    }
  ];

  // Section C: How the System Helps
  const benefits = [
    {
      title: 'Centralized Student Information',
      desc: 'All student profiles, contact details, emergency guardians, and enrollment statuses reside in a single verified registry.',
      icon: Database
    },
    {
      title: 'Faster Student Record Management',
      desc: 'Quickly create, update, and manage student files with structured validation and instant record updating.',
      icon: Clock
    },
    {
      title: 'Organized Academic Information',
      desc: 'Easily track semester progression, course lists, grade reports, and cumulative performance benchmarks in one structured interface.',
      icon: FolderKanban
    },
    {
      title: 'Easy Student Search and Access',
      desc: 'Locate any student file instantly using real-time search across roll numbers, names, and academic departments.',
      icon: Search
    },
    {
      title: 'Improved Administrative Efficiency',
      desc: 'Eliminate paperwork fragmentation with seamless directory switching between visual card grids and dense data tables.',
      icon: TrendingUp
    },
    {
      title: 'Better Visibility of Student Records',
      desc: 'Gain instant insight into total active enrollments, attendance averages, pending fee clearance, and department distributions.',
      icon: BarChart3
    }
  ];

  // Section D: User Experience Steps
  const workflowSteps = [
    {
      step: '01',
      title: 'Access the Dashboard',
      desc: 'Log in to view high-level institutional statistics, attendance rates, average GPA, and enrollment distribution.'
    },
    {
      step: '02',
      title: 'Register New Students',
      desc: 'Use the quick enrollment workflow to capture student personal details, roll number, department, and contact data.'
    },
    {
      step: '03',
      title: 'Browse Student Directory',
      desc: 'Navigate the complete directory with flexible grid or table layouts suited for administrative auditing.'
    },
    {
      step: '04',
      title: 'Search & Filter Records',
      desc: 'Locate specific students or filter by academic department, active standing, or fee clearance status.'
    },
    {
      step: '05',
      title: 'View & Manage Student Profiles',
      desc: 'Open individual student records to inspect enrolled courses, update information, or print verified transcripts.'
    },
    {
      step: '06',
      title: 'Monitor Academic Information',
      desc: 'Continuously assess student progress, honor roll achievements, and term registrations across departments.'
    }
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      {/* ========================================================= */}
      {/* SECTION A: INTRODUCTION                                  */}
      {/* ========================================================= */}
      <div className="rounded-3xl border border-[#E6DFD7] bg-[#FAF8F5] p-6 sm:p-10 shadow-xs">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white border border-[#E6DFD7] px-3.5 py-1 text-xs font-bold text-[#7B2137] mb-4 shadow-2xs">
            <GraduationCap className="h-4 w-4 text-[#7B2137]" />
            <span>Academic Administration Platform</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-[#4D0C1E] tracking-tight">
            Student Management
          </h1>

          <p className="mt-2 text-base sm:text-lg font-bold text-[#7B2137]">
            A smarter way to manage student information and academic activities.
          </p>

          <p className="mt-4 text-xs sm:text-sm text-[#4D0C1E]/80 leading-relaxed font-medium">
            Student Management is an institutional application engineered for university registrars, academic department heads, and educational coordinators. The system streamlines student registration, unifies student profiles into a centralized directory, tracks semester coursework and academic performance, and provides actionable administrative visibility into institutional operations.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              to="/students"
              className="inline-flex items-center gap-2 rounded-xl bg-[#7B2137] px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-[#7B2137]/20 hover:bg-[#67192C] transition-colors"
            >
              <span>Explore Students Directory</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-xl border border-[#E6DFD7] bg-white px-4 py-2.5 text-xs sm:text-sm font-bold text-[#4D0C1E] hover:bg-[#E6DFD7]/40 transition-colors"
            >
              <span>View Dashboard</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* SECTION B: SYSTEM CAPABILITIES                            */}
      {/* ========================================================= */}
      <div className="space-y-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#7B2137] uppercase tracking-wider mb-1">
            <Sparkles className="h-4 w-4" />
            <span>Core Functionalities</span>
          </div>
          <h2 className="text-2xl font-black text-[#4D0C1E]">
            System Capabilities
          </h2>
          <p className="text-xs text-[#A85B63] font-medium">
            Essential tools available to manage student lifecycle and academic records
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {systemCapabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.title}
                className="rounded-3xl border border-[#E6DFD7] bg-white p-6 shadow-xs hover:border-[#A85B63] hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${cap.iconBg}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-bold text-[#A85B63] uppercase tracking-wider bg-[#FAF8F5] px-2.5 py-1 rounded-full border border-[#E6DFD7]">
                      {cap.subtitle}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-[#4D0C1E]">
                    {cap.title}
                  </h3>

                  <ul className="mt-3 space-y-2 text-xs text-[#4D0C1E]/80 font-medium">
                    {cap.points.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#2D4A3F] shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================= */}
      {/* SECTION C: HOW THE SYSTEM HELPS                           */}
      {/* ========================================================= */}
      <div className="rounded-3xl border border-[#E6DFD7] bg-white p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#7B2137] uppercase tracking-wider mb-1">
            <ShieldCheck className="h-4 w-4" />
            <span>Administrative Value</span>
          </div>
          <h2 className="text-2xl font-black text-[#4D0C1E]">
            How the System Helps
          </h2>
          <p className="text-xs text-[#A85B63] font-medium">
            Measurable advantages for institutions, faculty coordinators, and registrars
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.title}
                className="rounded-2xl border border-[#E6DFD7] bg-[#FAF8F5] p-5 shadow-2xs hover:bg-white hover:border-[#A85B63] transition-all"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2D4A3F]/10 text-[#2D4A3F] mb-3">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold text-[#4D0C1E] mb-1.5">
                  {b.title}
                </h3>
                <p className="text-xs text-[#4D0C1E]/75 leading-relaxed font-medium">
                  {b.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================= */}
      {/* SECTION D: USER EXPERIENCE (STEP-BY-STEP WORKFLOW)         */}
      {/* ========================================================= */}
      <div className="rounded-3xl border border-[#E6DFD7] bg-[#FAF8F5] p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#7B2137] uppercase tracking-wider mb-1">
            <SlidersHorizontal className="h-4 w-4" />
            <span>Operational Workflow</span>
          </div>
          <h2 className="text-2xl font-black text-[#4D0C1E]">
            User Experience
          </h2>
          <p className="text-xs text-[#A85B63] font-medium">
            Main activities administrators can perform across the system
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {workflowSteps.map((step) => (
            <div
              key={step.step}
              className="rounded-2xl border border-[#E6DFD7] bg-white p-5 shadow-2xs hover:border-[#7B2137] transition-all flex flex-col justify-between"
            >
              <div>
                <span className="inline-block text-xs font-black text-[#7B2137] bg-[#7B2137]/10 px-2.5 py-1 rounded-lg mb-3">
                  Step {step.step}
                </span>
                <h3 className="text-sm font-bold text-[#4D0C1E] mb-1.5">
                  {step.title}
                </h3>
                <p className="text-xs text-[#4D0C1E]/75 leading-relaxed font-medium">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================= */}
      {/* SECTION E: SYSTEM INFORMATION                             */}
      {/* ========================================================= */}
      <div className="rounded-3xl border border-[#E6DFD7] bg-white p-6 sm:p-8 shadow-xs">
        <div className="mb-5">
          <h2 className="text-xl font-black text-[#4D0C1E]">
            System Information
          </h2>
          <p className="text-xs text-[#A85B63] font-medium">
            Essential application metadata
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-[#E6DFD7] bg-[#FAF8F5] p-4">
            <p className="text-[10px] font-bold text-[#A85B63] uppercase tracking-wider">
              Application Name
            </p>
            <p className="mt-1 text-sm font-black text-[#4D0C1E]">
              Student Management
            </p>
          </div>

          <div className="rounded-2xl border border-[#E6DFD7] bg-[#FAF8F5] p-4">
            <p className="text-[10px] font-bold text-[#A85B63] uppercase tracking-wider">
              Application Category
            </p>
            <p className="mt-1 text-sm font-black text-[#4D0C1E]">
              Academic Administration
            </p>
          </div>

          <div className="rounded-2xl border border-[#E6DFD7] bg-[#FAF8F5] p-4">
            <p className="text-[10px] font-bold text-[#A85B63] uppercase tracking-wider">
              Version
            </p>
            <p className="mt-1 text-sm font-black text-[#4D0C1E]">
              2.4.0
            </p>
          </div>

          <div className="rounded-2xl border border-[#AEC5B9] bg-[#EBF2EE] p-4">
            <p className="text-[10px] font-bold text-[#2D4A3F] uppercase tracking-wider">
              Current Status
            </p>
            <p className="mt-1 text-sm font-black text-[#2D4A3F] flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#2D4A3F] animate-pulse"></span>
              System Online / Active
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
