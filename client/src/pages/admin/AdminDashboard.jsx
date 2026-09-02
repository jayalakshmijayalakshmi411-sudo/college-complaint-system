import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminAPI, dashboardAPI } from '../../services/api';
import ComplaintCard from '../../components/ComplaintCard';
import {
  FileText,
  Clock,
  AlertTriangle,
  CheckCircle2,
  ListOrdered,
  Building,
  Sparkles,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Activity,
} from 'lucide-react';

export const AdminDashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    submitted: 0,
    underReview: 0,
    inProgress: 0,
    assigned: 0,
    resolved: 0,
    critical: 0,
  });
  const [recentComplaints, setRecentComplaints] = useState([]);
  const [categoryBreakdown, setCategoryBreakdown] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAdminDashboard();
  }, []);

  const fetchAdminDashboard = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await dashboardAPI.getAdminDashboard().catch(() => null);

      if (res?.data?.stats) {
        setStats(res.data.stats);
        setCategoryBreakdown(res.data.categoryBreakdown || []);
        setRecentComplaints(res.data.recentComplaints || []);
      } else {
        // Fallback: use adminAPI.getDashboardStats and adminAPI.getAllComplaints
        const [statsRes, compRes] = await Promise.all([
          adminAPI.getDashboardStats(),
          adminAPI.getAllComplaints({ sortBy: '-createdAt' }),
        ]);
        setStats(statsRes.data?.stats || {});
        setRecentComplaints((compRes.data?.complaints || []).slice(0, 5));
      }
    } catch (err) {
      console.error('Error fetching admin dashboard data:', err);
      setError('Failed to fetch administrator statistics.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-3 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm font-medium text-slate-500">Loading admin operations center...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Admin Command Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-slate-950/20 mb-8 relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold mb-3 border border-purple-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Executive Administration Console</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display tracking-tight">
              Facility Triage & Oversight
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-xl">
              Monitor campus-wide incident volume, AI recommendations, priority queues, and department allocations.
            </p>
          </div>

          <Link
            to="/admin/complaints"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-2xl shadow-lg shadow-purple-600/30 transition-all hover:scale-105 shrink-0"
          >
            <ListOrdered className="w-5 h-5" />
            <span>Manage All Tickets</span>
          </Link>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Primary KPI Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Total Tickets
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            {stats.total}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Campus wide</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-500 block mb-1">
            Submitted
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 font-display">
            {stats.submitted}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Awaiting triage</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-500 block mb-1">
            Under Review
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 font-display">
            {stats.underReview}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Investigating</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-500 block mb-1">
            In Progress
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-cyan-600 font-display">
            {stats.inProgress}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Active repairs</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-500 block mb-1">
            Resolved
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-display">
            {stats.resolved}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Closed & fixed</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-rose-200 shadow-sm bg-rose-50/30">
          <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 block mb-1">
            Critical Issues
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-rose-600 font-display">
            {stats.critical}
          </div>
          <span className="text-[11px] text-rose-600 font-semibold mt-1 block">Requires priority</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Category Distribution Bar */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm">
          <h2 className="text-base font-bold font-display text-slate-900 mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-purple-600" />
            Category Volume
          </h2>

          {categoryBreakdown.length === 0 ? (
            <p className="text-xs text-slate-400 italic">No breakdown data available yet.</p>
          ) : (
            <div className="space-y-3">
              {categoryBreakdown.map((item) => {
                const percentage = stats.total > 0 ? Math.round((item.count / stats.total) * 100) : 0;
                return (
                  <div key={item._id}>
                    <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                      <span>{item._id || 'Other'}</span>
                      <span>{item.count} ({percentage}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-purple-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Quick Triage Actions */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold font-display text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              Incoming Complaints Needing Action
            </h2>
            <Link
              to="/admin/complaints"
              className="text-xs font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1"
            >
              View Full Queue <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentComplaints.length === 0 ? (
            <p className="text-xs text-slate-400 italic">No recent complaints to display.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recentComplaints.slice(0, 4).map((comp) => (
                <ComplaintCard key={comp._id} complaint={comp} isAdmin={true} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
