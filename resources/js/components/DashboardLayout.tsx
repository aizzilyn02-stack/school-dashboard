import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { edit as editProfile } from '@/routes/profile';
import { logout } from '@/routes';
import {
  GraduationCap,
  Search,
  X,
  Menu,
  ChevronDown,
  LayoutDashboard,
  Users,
  TrendingDown,
  School,
  UserCheck,
  Building2,
  Settings,
} from 'lucide-react';

interface SchoolYearOption {
  id: number;
  year: string;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeSection: string;
  onSectionChange: (section: string) => void;
  selectedYear: string;
  onYearChange: (year: string) => void;
  selectedGrade: string;
  onGradeChange: (grade: string) => void;
  schoolYears: SchoolYearOption[];
}

const gradeOptions = ['All Grades', 'Kindergarten', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6'];

const menuItems = [
  { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
  { id: 'enrollment', label: 'Enrollment Analytics', icon: Users },
  { id: 'dropout', label: 'Dropout & Repeaters', icon: TrendingDown },
  { id: 'classrooms', label: 'Classroom Analysis', icon: School },
  { id: 'teachers', label: 'Teacher Deployment', icon: UserCheck },
  { id: 'facilities', label: 'Facilities Management', icon: Building2 },
  { id: 'data-management', label: 'Data Management', icon: Settings },
];

export function DashboardLayout({
  children,
  activeSection,
  onSectionChange,
  selectedYear,
  onYearChange,
  selectedGrade,
  onGradeChange,
  schoolYears,
}: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200 bg-white/95 text-slate-900 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-[1720px] flex-col justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="rounded-2xl p-2 text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br from-sky-600 to-blue-600 text-white shadow-lg">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">DILADILA ELEMENTARY SCHOOL</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Data-driven education insights</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-3 rounded-3xl border border-slate-200 bg-white px-3 py-2 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <Search className="h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search dashboard"
                  className="w-64 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 dark:text-slate-200 dark:placeholder:text-slate-500"
                />
              </div>

              <select
                value={selectedYear}
                onChange={(event) => onYearChange(event.target.value)}
                className="rounded-3xl border px-4 py-2 text-sm outline-none transition border-slate-200 bg-white text-slate-900"
              >
                <option value="">All Years</option>
                {schoolYears.map((yearObj) => (
                  <option key={yearObj.id} value={yearObj.year}>
                    {yearObj.year}
                  </option>
                ))}
              </select>

              <select
                value={selectedGrade}
                onChange={(event) => onGradeChange(event.target.value)}
                className="rounded-3xl border px-4 py-2 text-sm outline-none transition border-slate-200 bg-white text-slate-900"
              >
                {gradeOptions.map((grade) => (
                  <option key={grade} value={grade}>
                    {grade}
                  </option>
                ))}
              </select>


              {/* Dark mode removed: toggle hidden */}

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 rounded-3xl border border-slate-200 bg-white px-3 py-2 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-pink-500 text-white">A</div>
                  <ChevronDown className="h-4 w-4" />
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
                    <div className="space-y-2 p-4 border-b dark:border-slate-800">
                      <p className="text-sm font-semibold">Admin User</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">admin@school.edu</p>
                    </div>
                    <Link href={editProfile()} className="w-full block px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-100">Profile</Link>
                    <Link href="/settings" className="w-full block px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-100">Settings</Link>
                    <button
                      type="button"
                      onClick={() => router.post(logout.url())}
                      className="w-full rounded-b-3xl px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <aside
        className={`fixed top-20 bottom-0 z-40 w-72 overflow-hidden border-r bg-white transition-transform duration-300 dark:border-slate-800 dark:bg-slate-950 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full overflow-y-auto p-4">
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSectionChange(item.id)}
                  className={`flex w-full items-center gap-3 rounded-3xl px-4 py-3 text-left text-sm font-medium transition ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-lg dark:bg-slate-700'
                      : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      <main className={`pt-24 transition-all duration-300 ${isSidebarOpen ? 'ml-72' : 'ml-0'}`}>
        <div className="mx-auto min-h-[calc(100vh-6rem)] max-w-[1720px] px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}
