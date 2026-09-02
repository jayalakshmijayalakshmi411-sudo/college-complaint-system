import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { complaintAPI, adminAPI } from '../../services/api';
import StatusBadge from '../../components/StatusBadge';
import PriorityBadge from '../../components/PriorityBadge';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Building,
  User,
  Mail,
  Sparkles,
  Bot,
  AlertCircle,
  CheckCircle2,
  Send,
  Check,
  Paperclip,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';

const DEPARTMENTS = [
  'IT & Network Support',
  'Maintenance & Civil',
  'Electrical & Plumbing',
  'Hostel Administration',
  'Housekeeping & Sanitation',
  'Transportation Cell',
  'Academic Facilities',
  'Security Office',
];

const PRIORITIES = ['Low', 'Medium', 'High', 'Critical'];
const STATUSES = ['Submitted', 'Under Review', 'Assigned', 'In Progress', 'Resolved', 'Closed'];

export const AdminComplaintDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [complaint, setComplaint] = useState(null);
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Form states
  const [status, setStatus] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [priority, setPriority] = useState('');
  const [department, setDepartment] = useState('');
  const [resolutionDetails, setResolutionDetails] = useState('');

  useEffect(() => {
    fetchComplaint();
  }, [id]);

  const fetchComplaint = async () => {
    try {
      setLoading(true);
      setError('');
      const [compRes, updateRes] = await Promise.all([
        complaintAPI.getComplaintById(id),
        complaintAPI.getComplaintUpdates(id).catch(() => ({ data: { updates: [] } })),
      ]);

      const data = compRes.data?.complaint;
      setComplaint(data);
      setUpdates(updateRes.data?.updates || []);

      // Pre-fill form state
      if (data) {
        setStatus(data.status || 'Submitted');
        setPriority(data.priority || 'Medium');
        setDepartment(data.assignedDepartment || DEPARTMENTS[0]);
        setResolutionDetails(data.resolutionDetails || '');
      }
    } catch (err) {
      console.error('Error fetching admin complaint details:', err);
      setError('Could not load complaint details.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    setError('');
    setSuccessMsg('');

    try {
      await adminAPI.updateStatus(id, {
        status,
        message: statusMessage || `Status changed to ${status}`,
      });
      setSuccessMsg('Complaint status updated successfully!');
      setStatusMessage('');
      fetchComplaint();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update status.');
    } finally {
      setActionLoading(false);
    }
  };

  const handlePriorityUpdate = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    setError('');
    setSuccessMsg('');

    try {
      await adminAPI.updatePriority(id, { priority });
      setSuccessMsg(`Priority updated to ${priority}!`);
      fetchComplaint();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update priority.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleAssignDepartment = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    setError('');
    setSuccessMsg('');

    try {
      await adminAPI.assignComplaint(id, { assignedDepartment: department });
      setSuccessMsg(`Complaint assigned to ${department}!`);
      fetchComplaint();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to assign department.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleResolveComplaint = async (e) => {
    e.preventDefault();
    if (!resolutionDetails.trim()) {
      return setError('Please provide resolution details before resolving.');
    }

    setActionLoading(true);
    setError('');
    setSuccessMsg('');

    try {
      await adminAPI.resolveComplaint(id, { resolutionDetails });
      setSuccessMsg('Complaint marked as Resolved with details sent to student!');
      fetchComplaint();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resolve complaint.');
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-3 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm font-medium text-slate-500">Loading complaint triage panel...</p>
        </div>
      </div>
    );
  }

  if (error && !complaint) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-7 h-7" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 font-display mb-2">Complaint Not Found</h2>
        <p className="text-slate-500 text-sm mb-6">{error}</p>
        <Link
          to="/admin/complaints"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600 text-white rounded-xl text-sm font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Complaints Management
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back button */}
      <button
        onClick={() => navigate('/admin/complaints')}
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Complaints Console</span>
      </button>

      {/* Alerts */}
      {error && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {successMsg && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm mb-8">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-4">
          <div className="space-y-2 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-full">
                Category: {complaint.category}
              </span>
              <StatusBadge status={complaint.status} />
              <PriorityBadge priority={complaint.priority} />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 leading-snug">
              {complaint.title}
            </h1>
          </div>
        </div>

        {/* Student & Location Meta */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-xs text-slate-600">
          <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
            <User className="w-4 h-4 text-purple-600" />
            <div className="truncate">
              <span className="font-bold text-slate-800 block">{complaint.studentId?.name || 'Student'}</span>
              <span className="text-slate-400">{complaint.studentId?.email}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
            <MapPin className="w-4 h-4 text-purple-600" />
            <div>
              <span className="font-bold text-slate-800 block">Location</span>
              <span className="text-slate-500">{complaint.location}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
            <Calendar className="w-4 h-4 text-purple-600" />
            <div>
              <span className="font-bold text-slate-800 block">Submitted At</span>
              <span className="text-slate-500">
                {new Date(complaint.createdAt).toLocaleDateString('en-US', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Complaint Details & Updates */}
        <div className="lg:col-span-2 space-y-8">
          {/* AI Intelligence Card */}
          <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-7 shadow-xl shadow-purple-950/20 relative overflow-hidden">
            <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-48 h-48 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-400/20 text-purple-200 text-xs font-semibold mb-4 border border-purple-400/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Automated Analysis</span>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-purple-200 block mb-1">
                    Suggested Category Classification
                  </span>
                  <span className="inline-block px-3 py-1 rounded-xl bg-white/10 text-white text-xs font-semibold backdrop-blur-sm border border-white/10">
                    {complaint.aiCategory || complaint.category}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-purple-200 block mb-1">
                    AI Executive Summary
                  </span>
                  <p className="text-xs text-purple-100 leading-relaxed bg-white/5 p-3.5 rounded-xl border border-white/10">
                    {complaint.aiSummary || 'AI analysis complete for this grievance.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Full Description */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-sm">
            <h2 className="text-base font-bold font-display text-slate-900 mb-3">
              Original Complaint Narrative
            </h2>
            <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">
              {complaint.description}
            </p>

            {/* Attached media */}
            {complaint.attachment?.url && (
              <div className="mt-6 pt-5 border-t border-slate-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                  <Paperclip className="w-3.5 h-3.5" /> Attached Media
                </h3>
                <div className="rounded-2xl overflow-hidden border border-slate-200 max-w-md bg-slate-50">
                  <img
                    src={complaint.attachment.url}
                    alt="Attachment"
                    className="w-full h-auto max-h-72 object-cover"
                  />
                  <div className="p-3 bg-white flex items-center justify-between">
                    <span className="text-xs text-slate-500">Image file</span>
                    <a
                      href={complaint.attachment.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-purple-600 hover:underline flex items-center gap-1"
                    >
                      Open full <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Audit History Log */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-sm">
            <h2 className="text-base font-bold font-display text-slate-900 mb-4">
              Audit & Activity Log
            </h2>

            {updates.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No activity recorded yet.</p>
            ) : (
              <div className="space-y-3">
                {updates.map((update, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/70 text-xs">
                    <div className="flex justify-between font-semibold text-slate-700 mb-1">
                      <span>{update.adminId?.name || 'Administrator'}</span>
                      <span className="text-slate-400">
                        {new Date(update.createdAt).toLocaleDateString('en-US', {
                          dateStyle: 'short',
                          timeStyle: 'short',
                        })}
                      </span>
                    </div>
                    <p className="text-slate-800">{update.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Admin Actions Triage Controls */}
        <div className="space-y-6">
          {/* Action 1: Assign Department */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-2">
              <Building className="w-4 h-4 text-purple-600" />
              1. Department Allocation
            </h3>
            <form onSubmit={handleAssignDepartment} className="space-y-3">
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                disabled={actionLoading}
                className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl text-xs shadow transition-all disabled:opacity-50"
              >
                Assign & Dispatch
              </button>
            </form>
          </div>

          {/* Action 2: Update Priority */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              2. Priority Level
            </h3>
            <form onSubmit={handlePriorityUpdate} className="space-y-3">
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {PRIORITIES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                disabled={actionLoading}
                className="w-full py-2 bg-slate-800 hover:bg-slate-900 text-white font-semibold rounded-xl text-xs shadow transition-all disabled:opacity-50"
              >
                Update Priority
              </button>
            </form>
          </div>

          {/* Action 3: Status Progression & Remark */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-purple-600" />
              3. Update Status
            </h3>
            <form onSubmit={handleStatusUpdate} className="space-y-3">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>

              <textarea
                rows={2}
                value={statusMessage}
                onChange={(e) => setStatusMessage(e.target.value)}
                placeholder="Optional remark or audit note for student..."
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              <button
                type="submit"
                disabled={actionLoading}
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs shadow transition-all disabled:opacity-50"
              >
                Save Status Update
              </button>
            </form>
          </div>

          {/* Action 4: Resolve & Close Ticket */}
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-3xl p-6 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-900 mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              4. Final Resolution
            </h3>
            <p className="text-[11px] text-emerald-700 mb-3">
              Provide solution details. Marking as resolved notifies the student.
            </p>

            <form onSubmit={handleResolveComplaint} className="space-y-3">
              <textarea
                required
                rows={3}
                value={resolutionDetails}
                onChange={(e) => setResolutionDetails(e.target.value)}
                placeholder="Describe resolution taken (e.g. replaced router, repaired valve)..."
                className="w-full p-2.5 bg-white border border-emerald-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="submit"
                disabled={actionLoading}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-md shadow-emerald-600/20 transition-all disabled:opacity-50 flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                Resolve Ticket
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminComplaintDetails;
