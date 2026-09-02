import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { complaintAPI } from '../services/api';
import ComplaintCard from '../components/ComplaintCard';
import {
  Search,
  Filter,
  PlusCircle,
  FileQuestion,
  RefreshCw,
  AlertCircle,
  SlidersHorizontal,
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

export const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await complaintAPI.getComplaints();
      setComplaints(res.data?.complaints || []);
    } catch (err) {
      console.error('Error fetching complaints:', err);
      setError('Failed to load your complaints. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const filteredComplaints = complaints
    .filter((complaint) => {
      const matchesSearch =
        complaint.title?.toLowerCase().includes(search.toLowerCase()) ||
        complaint.description?.toLowerCase().includes(search.toLowerCase()) ||
        complaint.location?.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All Categories' || complaint.category === selectedCategory;

      const matchesStatus =
        selectedStatus === 'All Statuses' || complaint.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-slate-900">
            My Complaints
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Track and monitor the status of all your reported campus grievances
          </p>
        </div>

        <Link
          to="/complaints/new"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-md shadow-blue-600/20 transition-all hover:shadow hover:-translate-y-0.5 self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Complaint</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm mb-8 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Input */}
          <div className="relative lg:col-span-2">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, description, or location..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
            />
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
            >
              {STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Status Pills / Active Filters summary */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
          <div>
            Showing <span className="font-bold text-slate-800">{filteredComplaints.length}</span> of{' '}
            <span className="font-bold text-slate-800">{complaints.length}</span> complaints
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Sort:</span>
            <button
              onClick={() => setSortBy(sortBy === 'newest' ? 'oldest' : 'newest')}
              className="font-semibold text-blue-600 hover:text-blue-700 capitalize flex items-center gap-1"
            >
              {sortBy}
            </button>
          </div>
        </div>
      </div>

      {/* Error display */}
      {error && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
          <button
            onClick={fetchComplaints}
            className="text-xs font-bold underline flex items-center gap-1"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Retry
          </button>
        </div>
      )}

      {/* Complaints Grid */}
      {loading ? (
        <div className="py-20 text-center">
          <div className="w-9 h-9 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm font-medium text-slate-500">Loading complaints list...</p>
        </div>
      ) : filteredComplaints.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
            <FileQuestion className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 font-display mb-1">
            No Matching Complaints Found
          </h3>
          <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6">
            {complaints.length === 0
              ? "You haven't submitted any complaints yet."
              : 'No complaints match your current search and filter criteria.'}
          </p>
          {complaints.length > 0 ? (
            <button
              onClick={() => {
                setSearch('');
                setSelectedCategory('All Categories');
                setSelectedStatus('All Statuses');
              }}
              className="px-4 py-2 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
            >
              Reset Filters
            </button>
          ) : (
            <Link
              to="/complaints/new"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-md transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              Submit a Complaint
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredComplaints.map((complaint) => (
            <ComplaintCard key={complaint._id} complaint={complaint} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Complaints;
