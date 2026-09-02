import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Sparkles,
  CheckCircle2,
  Clock,
  Shield,
  Bot,
  ArrowRight,
  Building2,
  Wifi,
  Laptop,
  GraduationCap,
  Bus,
  Sparkle,
  Layers,
  ChevronRight,
} from 'lucide-react';

export const Home = () => {
  const { isAuthenticated, isAdmin } = useAuth();

  const categories = [
    { name: 'Classroom', icon: GraduationCap, color: 'bg-blue-50 text-blue-600' },
    { name: 'Laboratory', icon: Laptop, color: 'bg-purple-50 text-purple-600' },
    { name: 'Hostel', icon: Building2, color: 'bg-amber-50 text-amber-600' },
    { name: 'Wi-Fi & Network', icon: Wifi, color: 'bg-emerald-50 text-emerald-600' },
    { name: 'Transportation', icon: Bus, color: 'bg-rose-50 text-rose-600' },
    { name: 'Cleanliness', icon: Sparkle, color: 'bg-teal-50 text-teal-600' },
    { name: 'Infrastructure', icon: Layers, color: 'bg-indigo-50 text-indigo-600' },
  ];

  const workflow = [
    {
      step: '01',
      title: 'Submit Complaint',
      desc: 'Students report campus issues with photos, descriptions, and exact locations in seconds.',
    },
    {
      step: '02',
      title: 'AI Auto-Classification',
      desc: 'Smart AI analyzes the problem, categorizes it, and creates an instant executive summary.',
    },
    {
      step: '03',
      title: 'Admin Triage & Assign',
      desc: 'Administrators set priority levels and dispatch tickets to dedicated campus departments.',
    },
    {
      step: '04',
      title: 'Real-time Resolution',
      desc: 'Students receive instant in-app notifications at every stage through final resolution.',
    },
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-blue-50/70 via-slate-50 to-white">
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200/80 text-blue-700 text-xs font-semibold mb-6 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI-Powered Campus Grievance System</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight font-display leading-[1.15]">
              Smarter, Faster <span className="gradient-text">Campus Issue</span> Resolution
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed">
              Empowering students and administrators with intelligent automated categorization,
              priority triage, and real-time transparent complaint tracking.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              {isAuthenticated ? (
                <Link
                  to={isAdmin ? '/admin/dashboard' : '/dashboard'}
                  className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  Go to {isAdmin ? 'Admin Dashboard' : 'Student Dashboard'}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2"
                  >
                    Register as Student
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/login"
                    className="w-full sm:w-auto px-8 py-3.5 bg-white hover:bg-slate-100 text-slate-800 font-semibold rounded-xl border border-slate-200 shadow-sm transition-all hover:border-slate-300 flex items-center justify-center"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>

            {/* Quick trust metrics */}
            <div className="mt-12 pt-8 border-t border-slate-200/60 grid grid-cols-3 gap-4 max-w-xl mx-auto">
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">100%</p>
                <p className="text-xs text-slate-500 font-medium">Digital Tracking</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-blue-600 font-display">AI</p>
                <p className="text-xs text-slate-500 font-medium">Auto-Categorized</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-emerald-600 font-display">&lt;24h</p>
                <p className="text-xs text-slate-500 font-medium">Target Triage</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-16 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
              Features
            </h2>
            <h3 className="text-3xl font-bold text-slate-900 font-display">
              Engineered for Modern Campus Facilities
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 rounded-2xl p-7 border border-slate-200/80 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-5">
                <Bot className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2 font-display">
                AI Categorization & Summaries
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Automatically scans ticket descriptions to recommend the precise facility category
                and condenses long text into concise action items for staff.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-7 border border-slate-200/80 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-5">
                <Clock className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2 font-display">
                End-to-End Status Tracking
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Clear 6-stage lifecycle from Submitted to Closed with full timestamps, priority
                indicators, and assigned department badges.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-7 border border-slate-200/80 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-5">
                <Shield className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2 font-display">
                Role-Based Administration
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Dedicated admin workbench to assign priorities, transfer tickets between
                departments, publish resolution logs, and notify students.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
              Coverage
            </h2>
            <h3 className="text-3xl font-bold text-slate-900 font-display">
              Supported Facility Categories
            </h3>
            <p className="text-slate-600 text-sm mt-2">
              Submit and track complaints across any campus facility
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm flex items-center gap-3.5 hover:border-blue-300 transition-colors"
                >
                  <div className={`w-10 h-10 rounded-lg ${cat.color} flex items-center justify-center shrink-0`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-semibold text-slate-800">{cat.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it Works Workflow */}
      <section className="py-16 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
              Workflow
            </h2>
            <h3 className="text-3xl font-bold text-slate-900 font-display">
              How The System Works
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workflow.map((item, index) => (
              <div key={index} className="relative group">
                <div className="text-4xl font-extrabold text-blue-100 font-display mb-3 group-hover:text-blue-200 transition-colors">
                  {item.step}
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2 font-display">
                  {item.title}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-slate-900 text-slate-400 py-10 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-400" />
            <span className="text-white font-bold font-display">CampusResolve</span>
          </div>
          <p className="text-xs text-slate-500">
            College Complaint Management System &copy; {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
