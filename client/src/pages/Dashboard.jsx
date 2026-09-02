import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { dashboardAPI, complaintAPI } from '../services/api';
import ComplaintCard from '../components/ComplaintCard';
import {
  FileText,
  Clock,
  CheckCircle,
  PlusCircle,
  AlertCircle,
  ArrowRight,
  TrendingUp,
  Sparkles,
} from 'lucide-react';

export const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    resolved: 0,
    submitted: 0,
  });
  const [recentComplaints, setRecentComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const res = await dashboardAPI.getStudentDashboard();
      if (res.data?.stats) {
        setStats(res.data.stats);
        setRecentComplaints(res.data.recentComplaints || []);
      }
    } catch (err) {
      console.error('Error loading dashboard stats:', err);
      // Fallback: fetch directly from complaintAPI
      try {
        const compRes = await complaintAPI.getComplaints();
        const complaints = compRes.data?.complaints || [];
        const total = complaints.length;
        const resolved = complaints.filter(
          (c) => c.status === 'Resolved' || c.status === 'Closed'
        ).length;
        const active = total - resolved;
        const submitted = complaints.filter((c) => c.status === 'Submitted').length;

        setStats({ total, active, resolved, submitted });
        setRecentComplaints(complaints.slice(0, 4));
      } catch (fallbackErr) {
        setError('Failed to load dashboard metrics. Please refresh.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm font-medium text-slate-500">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-blue-600/10 mb-8 relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold mb-3 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Student Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display tracking-tight">
              Hello, {user?.name || 'Student'} 👋
            </h1>
            <p className="text-blue-100 text-sm mt-1 max-w-xl">
              Track your submitted facility grievances or file a new complaint with instant AI
              categorization.
            </p>
          </div>

          <Link
            to="/complaints/new"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-blue-700 hover:bg-blue-50 font-bold rounded-2xl shadow-lg transition-all hover:scale-105 shrink-0"
          >
            <PlusCircle className="w-5 h-5 text-blue-600" />
            <span>Submit Complaint</span>
          </Link>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 text-amber-600" />
          <span>{error}</span>
        </div>
      )}

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Total Complaints
            </span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-display">{stats.total}</div>
          <p className="text-xs text-slate-500 mt-1">All time registered tickets</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Active / In Progress
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-amber-600 font-display">{stats.active}</div>
          <p className="text-xs text-slate-500 mt-1">Under review or work in progress</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Resolved Tickets
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-emerald-600 font-display">
            {stats.resolved}
          </div>
          <p className="text-xs text-slate-500 mt-1">Successfully addressed</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Resolution Rate
            </span>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-purple-600 font-display">
            {stats.total > 0 ? Math.round((stats.resolved / stats.total) * 100) : 100}%
          </div>
          <p className="text-xs text-slate-500 mt-1">Resolution efficiency</p>
        </div>
      </div>

      {/* Recent Complaints Section */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 font-display">Recent Complaints</h2>
            <p className="text-xs text-slate-500">Your most recently reported issues</p>
          </div>
          <Link
            to="/complaints"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {recentComplaints.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
              <FileText className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-display mb-1">
              No Complaints Filed Yet
            </h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6">
              Have an issue with campus Wi-Fi, classroom equipment, or hostel facilities? Let us
              know!
            </p>
            <Link
              to="/complaints/new"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-md transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              File Your First Complaint
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {recentComplaints.map((complaint) => (
              <ComplaintCard key={complaint._id} complaint={complaint} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
