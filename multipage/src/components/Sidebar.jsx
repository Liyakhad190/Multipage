import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Info, 
  X, 
  CalendarDays,
  RotateCcw,
  GraduationCap
} from 'lucide-react';
import { useStudents } from '../context/StudentContext';

export default function Sidebar({ isOpen, onClose }) {
  const { stats, resetToSampleData } = useStudents();

  const navLinks = [
    { name: 'Dashboard',           to: '/',         icon: LayoutDashboard, badge: null       },
    { name: 'Students Directory',  to: '/students', icon: Users,           badge: stats.total },
    { name: 'About System',        to: '/about',    icon: Info,            badge: 'v2.4'     }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          role="presentation"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-[#4D0C1E]/50 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar — Cream (#E6DFD7) background */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 flex flex-col justify-between
          border-r border-[#D8CFCE] bg-[#E6DFD7]
          transition-transform duration-300 ease-in-out shadow-xl
          lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* ── Top ── */}
        <div>
          {/* Brand header */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-[#D8CFCE]">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#7B2137] shadow-md">
                <GraduationCap className="h-5 w-5 text-[#FAF8F5]" />
              </div>
              <div>
                <h2 className="text-sm font-black text-[#4D0C1E] leading-none tracking-tight">Student Management</h2>
                <span className="text-[10px] text-[#A85B63] font-semibold">Academic Registry</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close navigation menu"
              className="lg:hidden rounded-lg p-1.5 text-[#A85B63] hover:bg-[#D8CFCE] hover:text-[#4D0C1E]"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation links */}
          <div className="p-4 space-y-1">
            <p className="px-3 mb-2 text-[11px] font-bold uppercase tracking-wider text-[#A85B63]">
              Navigation
            </p>

            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  onClick={() => { if (window.innerWidth < 1024) onClose(); }}
                  className={({ isActive }) =>
                    `group flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-[#7B2137] text-white shadow-md'
                        : 'text-[#4D0C1E] hover:bg-[#D8CFCE]/70 hover:text-[#7B2137]'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-3">
                        <Icon
                          className={`h-4 w-4 transition-colors ${
                            isActive ? 'text-white' : 'text-[#A85B63] group-hover:text-[#7B2137]'
                          }`}
                        />
                        <span className={isActive ? 'font-bold' : 'font-semibold'}>{link.name}</span>
                      </div>

                      {link.badge !== null && (
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : 'bg-[#D8CFCE] text-[#4D0C1E] group-hover:bg-[#A85B63]/20 group-hover:text-[#7B2137]'
                          }`}
                        >
                          {link.badge}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>

          {/* Quick Metrics Card */}
          <div className="mx-4 mt-2 p-3.5 rounded-2xl bg-white/60 border border-[#D8CFCE]">
            <div className="flex items-center justify-between text-xs text-[#4D0C1E] font-bold mb-2">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5 text-[#7B2137]" />
                Current Term
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#2D4A3F] text-[#FAF8F5] font-bold">
                Active
              </span>
            </div>
            <p className="text-xs text-[#4D0C1E] font-semibold">Spring Semester 2026</p>
            <div className="mt-2.5 pt-2 border-t border-[#D8CFCE] flex items-center justify-between text-[11px] text-[#4D0C1E]/70">
              <span>Enrolled Students:</span>
              <span className="font-black text-[#4D0C1E]">{stats.total}</span>
            </div>
            <div className="mt-1 flex items-center justify-between text-[11px] text-[#4D0C1E]/70">
              <span>Avg GPA:</span>
              <span className="font-black text-[#4D0C1E]">{stats.avgGpa} / 4.0</span>
            </div>
          </div>
        </div>

        {/* ── Bottom ── */}
        <div className="p-4 border-t border-[#D8CFCE] space-y-3">
          <button
            type="button"
            onClick={resetToSampleData}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-[#D8CFCE] bg-white px-3 py-2 text-xs font-semibold text-[#4D0C1E] hover:bg-[#D8CFCE]/60 transition-colors shadow-sm"
          >
            <RotateCcw className="h-3.5 w-3.5 text-[#A85B63]" />
            <span>Reset Demo Records</span>
          </button>

          <div className="flex items-center justify-between text-[11px] px-1">
            <span className="flex items-center gap-1.5 text-[#2D4A3F] font-bold">
              <span className="h-2 w-2 rounded-full bg-[#2D4A3F]"></span>
              System Online
            </span>
            <span className="text-[#A85B63] font-medium">React 19</span>
          </div>
        </div>
      </aside>
    </>
  );
}
