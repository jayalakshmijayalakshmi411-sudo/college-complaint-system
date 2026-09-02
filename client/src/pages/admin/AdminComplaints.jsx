import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminAPI } from '../../services/api';
import StatusBadge from '../../components/StatusBadge';
import PriorityBadge from '../../components/PriorityBadge';
import {
  Search,
  Filter,
  ArrowUpDown,
  RefreshCw,
  AlertCircle,
  FileQuestion,
  ChevronRight,
  User,
  Calendar,
  Building,
  MapPin,
} from 'lucide-react';

const CATEGORIES = [
  'All Categories',
  'Classroom',
  'Laboratory',
  'Hostel',
  'Wi-Fi',
  'Infrastructure',
  'Transportation',
  'Cleanliness',
  'Other',
];

const STATUSES = [
  'All Statuses',
  'Submitted',
  'Under Review',
  'Assigned',
  'In Progress',
  'Resolved',
  'Closed',
];

const PRIORITIES = ['All Priorities', 'Critical', 'High', 'Medium', 'Low'];

export const AdminComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [selectedPriority, setSelectedPriority] = useState('All Priorities');
  const [sortBy, setSortBy] = useState('-createdAt');

  useEffect(() => {
    fetchComplaints();
  }, [selectedCategory, selectedStatus, selectedPriority, sortBy]);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      setError('');

      const filters = {};
      if (selectedCategory !== 'All Categories') filters.category = selectedCategory;
      if (selectedStatus !== 'All Statuses') filters.status = selectedStatus;
      if (selectedPriority !== 'All Priorities') filters.priority = selectedPriority;
      if (search) filters.search = search;
      if (sortBy) filters.sortBy = sortBy;

      const res = await adminAPI.getAllComplaints(filters);
      setComplaints(res.data?.complaints || []);
    } catch (err) {
      console.error('Error fetching admin complaints:', err);
      setError('Failed to load tickets. Please check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchComplaints();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-slate-900">
            Complaint Management Console
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Review, prioritize, assign, and resolve campus facility tickets
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm mb-8 space-y-4">
        <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Search */}
          <div className="relative lg:col-span-2">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search keyword or student..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-colors"
            />
          </div>

          {/* Category */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Priority */}
          <div>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
            >
              {PRIORITIES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        </form>

        <div className="flex flex-wrap items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500 gap-2">
          <div>
            Found <span className="font-bold text-slate-800">{complaints.length}</span> tickets
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent font-semibold text-purple-600 focus:outline-none cursor-pointer"
              >
                <option value="-createdAt">Newest First</option>
                <option value="createdAt">Oldest First</option>
              </select>
            </div>
            <button
              onClick={fetchComplaints}
              className="font-semibold text-slate-600 hover:text-purple-600 flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Refresh
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div className="py-20 text-center">
          <div className="w-9 h-9 border-3 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm font-medium text-slate-500">Loading complaints registry...</p>
        </div>
      ) : complaints.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
            <FileQuestion className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 font-display mb-1">
            No Complaints Found
          </h3>
          <p className="text-sm text-slate-500 max-w-sm mx-auto mb-4">
            No complaints currently match the selected criteria.
          </p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedCategory('All Categories');
              setSelectedStatus('All Statuses');
              setSelectedPriority('All Priorities');
            }}
            className="px-4 py-2 text-xs font-semibold text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {complaints.map((item) => (
            <Link
              key={item._id}
              to={`/admin/complaints/${item._id}`}
              className="block bg-white rounded-2xl border border-slate-200/80 p-5 hover:border-purple-300 hover:shadow-md transition-all group"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 bg-slate-100 text-slate-700 text-xs font-semibold rounded-full">
                      {item.category}
                    </span>
                    <StatusBadge status={item.status} />
                    <PriorityBadge priority={item.priority} />
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-purple-600 transition-colors mb-1 truncate">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2 mb-3">
                    {item.aiSummary || item.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      {item.studentId?.name || 'Anonymous Student'} ({item.studentId?.email || 'N/A'})
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {item.location}
                    </span>
                    {item.assignedDepartment && (
                      <span className="flex items-center gap-1 text-purple-600 font-semibold">
                        <Building className="w-3.5 h-3.5" />
                        {item.assignedDepartment}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex lg:flex-col items-center lg:items-end justify-between border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-100 shrink-0">
                  <span className="text-[11px] text-slate-400">
                    {new Date(item.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-semibold text-purple-600 group-hover:translate-x-0.5 transition-transform mt-2">
                    <span>Manage Triage</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminComplaints;
