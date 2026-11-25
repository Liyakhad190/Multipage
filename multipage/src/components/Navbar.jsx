import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  Search, 
  Bell, 
  Plus, 
  GraduationCap, 
  X
} from 'lucide-react';
import { useStudents } from '../context/StudentContext';

export default function Navbar({ onToggleSidebar, onOpenAddModal }) {
  const { searchQuery, setSearchQuery, stats } = useStudents();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate('/students');
  };

  const notifications = [
    {
      id: 1,
      title: 'Spring 2026 Registration Open',
      desc: 'Course enrollment is active across all academic departments.',
      time: '15m ago',
      color: 'text-[#2D4A3F]'
    },
    {
      id: 2,
      title: "Dean's Honor List Published",
      desc: 'Top academic achievers list updated.',
      time: '2h ago',
      color: 'text-[#7B2137]'
    },
    {
      id: 3,
      title: 'Tuition Fee Notice',
      desc: `${stats.feesPending} students have pending tuition fees.`,
      time: '1d ago',
      color: 'text-[#A85B63]'
    }
  ];

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-[#E6DFD7] bg-[#FAF8F5]/95 px-4 backdrop-blur transition-all md:px-6">
      {/* Left: Mobile Toggle + Brand */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation menu"
          className="flex h-10 w-10 items-center justify-center rounded-xl text-[#4D0C1E] hover:bg-[#E6DFD7]/60 lg:hidden focus:outline-none focus:ring-2 focus:ring-[#7B2137]"
        >
          <Menu className="h-5 w-5" />
        </button>

        <Link to="/" className="flex items-center gap-2.5 font-bold text-[#4D0C1E] group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4D0C1E] text-white shadow-md shadow-[#4D0C1E]/20 group-hover:bg-[#7B2137] transition-colors">
            <GraduationCap className="h-6 w-6 text-[#FAF8F5]" />
          </div>
          <div className="hidden sm:block">
            <span className="text-lg font-black tracking-tight text-[#4D0C1E]">
              Student Management
            </span>
          </div>
        </Link>
      </div>

      {/* Middle: Global Search */}
      <div className="hidden md:flex flex-1 max-w-md mx-6">
        <form onSubmit={handleSearchSubmit} className="relative w-full">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#A85B63]">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => {
              if (window.location.pathname !== '/students') {
                navigate('/students');
              }
            }}
            placeholder="Search student, roll number, or department..."
            className="w-full rounded-xl border border-[#E6DFD7] bg-white py-2 pl-10 pr-12 text-sm text-[#4D0C1E] placeholder-[#A85B63]/70 focus:border-[#7B2137] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7B2137]/20 transition-all shadow-2xs"
          />
          {searchQuery ? (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#A85B63] hover:text-[#4D0C1E]"
            >
              <X className="h-4 w-4" />
            </button>
          ) : (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <kbd className="hidden sm:inline-block rounded border border-[#E6DFD7] bg-[#FAF8F5] px-1.5 py-0.5 text-[10px] font-bold text-[#A85B63]">
                ⌘K
              </kbd>
            </div>
          )}
        </form>
      </div>

      {/* Right: CTA button + Notifications + Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Primary CTA: Rich Crimson (#7B2137) */}
        <button
          type="button"
          onClick={onOpenAddModal}
          className="inline-flex items-center gap-1.5 rounded-xl bg-[#7B2137] px-3.5 py-2 text-xs sm:text-sm font-bold text-white shadow-sm shadow-[#7B2137]/20 hover:bg-[#67192C] active:scale-95 transition-all"
        >
          <Plus className="h-4 w-4 text-[#FAF8F5]" />
          <span className="hidden sm:inline">Add Student</span>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            aria-label="View notifications"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl text-[#4D0C1E] hover:bg-[#E6DFD7]/60 transition-colors focus:outline-none focus:ring-2 focus:ring-[#7B2137]"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7B2137] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7B2137]"></span>
            </span>
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border border-[#E6DFD7] bg-[#FAF8F5] p-3 shadow-xl ring-1 ring-black/5 z-50">
              <div className="flex items-center justify-between pb-3 border-b border-[#E6DFD7] px-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#4D0C1E] text-sm">Notifications</span>
                  <span className="rounded-full bg-[#7B2137] text-white px-2 py-0.5 text-[10px] font-bold">
                    3 new
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setNotificationsOpen(false)}
                  className="text-xs text-[#A85B63] hover:text-[#4D0C1E]"
                >
                  Mark all read
                </button>
              </div>

              <div className="divide-y divide-[#E6DFD7]/60 max-h-72 overflow-y-auto">
                {notifications.map((item) => (
                  <div key={item.id} className="py-2.5 px-2 hover:bg-white rounded-lg transition-colors">
                    <p className={`text-xs font-bold ${item.color}`}>{item.title}</p>
                    <p className="text-xs text-[#4D0C1E]/80 mt-0.5">{item.desc}</p>
                    <span className="text-[10px] text-[#A85B63] mt-1 inline-block">{item.time}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-[#E6DFD7] text-center">
                <Link
                  to="/students"
                  onClick={() => setNotificationsOpen(false)}
                  className="text-xs font-bold text-[#7B2137] hover:text-[#4D0C1E]"
                >
                  View all system activities →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Separator */}
        <div className="hidden sm:block h-6 w-px bg-[#E6DFD7]" />

        {/* Admin Profile */}
        <div className="flex items-center gap-2.5 pl-1">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
              alt="Admin Profile"
              className="h-9 w-9 rounded-full ring-2 ring-[#7B2137]/30 object-cover"
            />
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-[#2D4A3F] ring-2 ring-[#FAF8F5]"></span>
          </div>
          <div className="hidden lg:block text-left">
            <p className="text-xs font-bold text-[#4D0C1E] leading-tight">Dean's Office</p>
            <p className="text-[11px] text-[#A85B63] font-semibold">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
}
