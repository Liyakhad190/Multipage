import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Users, 
  ArrowLeft, 
  FileQuestion
} from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[75vh] flex items-center justify-center p-4">
      <div className="w-full max-w-lg rounded-3xl border border-[#E6DFD7] bg-[#FAF8F5] p-8 sm:p-12 text-center shadow-lg">
        {/* Visual 404 badge: Rich Crimson (#7B2137) */}
        <div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-[#7B2137]/10 text-[#7B2137] shadow-inner border border-[#E6DFD7]">
          <FileQuestion className="h-12 w-12" />
          <span className="absolute -top-2 -right-2 rounded-full bg-[#7B2137] px-2.5 py-0.5 text-xs font-black text-white shadow-sm">
            404
          </span>
        </div>

        {/* Primary heading: Deep Oxblood (#4D0C1E) */}
        <h1 className="text-3xl font-black tracking-tight text-[#4D0C1E] sm:text-4xl">
          Page Not Found
        </h1>
        <p className="mt-3 text-sm text-[#A85B63] font-medium leading-relaxed max-w-sm mx-auto">
          The academic page or student record you are looking for doesn't exist, may have been relocated, or the URL contains an error.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-[#E6DFD7] bg-white px-4 py-2.5 text-xs sm:text-sm font-bold text-[#4D0C1E] hover:bg-[#E6DFD7]/40 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Go Back</span>
          </button>

          {/* Primary CTA: Rich Crimson (#7B2137) */}
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#7B2137] px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-[#7B2137]/20 hover:bg-[#67192C] transition-colors"
          >
            <Home className="h-4 w-4" />
            <span>Dashboard Home</span>
          </Link>

          <Link
            to="/students"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-white border border-[#E6DFD7] px-4 py-2.5 text-xs sm:text-sm font-bold text-[#4D0C1E] hover:bg-[#E6DFD7]/40 transition-colors"
          >
            <Users className="h-4 w-4" />
            <span>Students Directory</span>
          </Link>
        </div>

        {/* Helpful links */}
        <div className="mt-8 pt-6 border-t border-[#E6DFD7] text-xs text-[#A85B63] font-medium">
          <span>Need help finding a record? </span>
          <Link to="/about" className="font-bold text-[#7B2137] hover:underline">
            Read System Documentation
          </Link>
        </div>
      </div>
    </div>
  );
}
