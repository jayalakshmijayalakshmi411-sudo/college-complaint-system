import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { complaintAPI } from '../services/api';
import StatusBadge from '../components/StatusBadge';
import PriorityBadge from '../components/PriorityBadge';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Building,
  Bot,
  Sparkles,
  CheckCircle2,
  Clock,
  FileText,
  AlertCircle,
  Paperclip,
  Check,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';

const STATUS_STAGES = [
  'Submitted',
  'Under Review',
  'Assigned',
  'In Progress',
  'Resolved',
  'Closed',
];

export const ComplaintDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(null);
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchComplaintDetails();
  }, [id]);

  const fetchComplaintDetails = async () => {
    try {
      setLoading(true);
      setError('');
      const [resComp, resUpdates] = await Promise.all([
        complaintAPI.getComplaintById(id),
        complaintAPI.getComplaintUpdates(id).catch(() => ({ data: { updates: [] } })),
      ]);

      setComplaint(resComp.data?.complaint);
      setUpdates(resUpdates.data?.updates || []);
    } catch (err) {
      console.error('Error fetching complaint details:', err);
      setError(err.response?.data?.message || 'Failed to load complaint details.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm font-medium text-slate-500">Loading complaint details...</p>
        </div>
      </div>
    );
  }

  if (error || !complaint) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-7 h-7" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 font-display mb-2">Complaint Not Found</h2>
        <p className="text-slate-500 text-sm mb-6">{error || 'Could not retrieve ticket.'}</p>
        <Link
          to="/complaints"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to My Complaints
        </Link>
      </div>
    );
  }

  const currentStageIndex = STATUS_STAGES.indexOf(complaint.status);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back</span>
      </button>

      {/* Main Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm mb-8">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-full">
                {complaint.category}
              </span>
              <StatusBadge status={complaint.status} />
              {complaint.priority && <PriorityBadge priority={complaint.priority} />}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 leading-snug">
              {complaint.title}
            </h1>
          </div>
        </div>

        {/* Metadata Row */}
        <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-500 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span>Submitted {new Date(complaint.createdAt).toLocaleDateString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-slate-400" />
            <span>{complaint.location}</span>
          </div>
          {complaint.assignedDepartment && (
            <div className="flex items-center gap-1.5 text-indigo-600 font-semibold">
              <Building className="w-4 h-4" />
              <span>Assigned: {complaint.assignedDepartment}</span>
            </div>
          )}
        </div>
      </div>

      {/* Status Progress Stepper */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm mb-8">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-6">
          Lifecycle Progression
        </h2>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden sm:block absolute top-1/2 left-0 right-0 h-1 bg-slate-100 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-2 sm:grid-cols-6 gap-4 relative z-10">
            {STATUS_STAGES.map((stage, idx) => {
              const isCompleted = currentStageIndex >= idx;
              const isCurrent = complaint.status === stage;

              return (
                <div key={stage} className="flex flex-col items-center text-center">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold mb-2 transition-all ${
                      isCurrent
                        ? 'bg-blue-600 text-white ring-4 ring-blue-100 scale-110 shadow-md'
                        : isCompleted
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {isCompleted ? <Check className="w-4 h-4" /> : idx + 1}
                  </div>
                  <span
                    className={`text-xs font-medium ${
                      isCurrent
                        ? 'font-bold text-blue-600'
                        : isCompleted
                        ? 'text-slate-800'
                        : 'text-slate-400'
                    }`}
                  >
                    {stage}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Details & Updates */}
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-sm">
            <h2 className="text-base font-bold font-display text-slate-900 mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              Full Description
            </h2>
            <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">
              {complaint.description}
            </p>

            {/* Attachment preview if exists */}
            {complaint.attachment?.url && (
              <div className="mt-6 pt-5 border-t border-slate-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                  <Paperclip className="w-3.5 h-3.5" /> Attached Media
                </h3>
                <div className="rounded-2xl overflow-hidden border border-slate-200 max-w-md bg-slate-50">
                  <img
                    src={complaint.attachment.url}
                    alt="Complaint attachment"
                    className="w-full h-auto max-h-72 object-cover"
                  />
                  <div className="p-3 bg-white flex items-center justify-between">
                    <span className="text-xs text-slate-500 truncate">Image attachment</span>
                    <a
                      href={complaint.attachment.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
                    >
                      Open full <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Resolution Details Card if resolved */}
          {complaint.resolutionDetails && (
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-3xl p-6 sm:p-7 shadow-sm">
              <div className="flex items-center gap-2 text-emerald-800 font-bold font-display text-base mb-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Official Resolution Details</span>
              </div>
              <p className="text-emerald-950 text-sm leading-relaxed whitespace-pre-line">
                {complaint.resolutionDetails}
              </p>
            </div>
          )}

          {/* Activity / Admin Updates Timeline */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-sm">
            <h2 className="text-base font-bold font-display text-slate-900 mb-5 flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              Activity & Admin Updates
            </h2>

            {updates.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No admin remarks recorded yet.</p>
            ) : (
              <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                {updates.map((update, idx) => (
                  <div key={idx} className="relative pl-7 group">
                    <div className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-blue-500 ring-4 ring-white" />
                    <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/70">
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                        <span className="font-semibold text-slate-700">
                          {update.adminId?.name || 'Administrator'}
                        </span>
                        <span>{new Date(update.createdAt).toLocaleDateString('en-US', { dateStyle: 'short', timeStyle: 'short' })}</span>
                      </div>
                      <p className="text-sm text-slate-800">{update.message}</p>
                      {update.previousStatus && update.newStatus && (
                        <div className="mt-2 text-[11px] text-slate-500">
                          Status shifted: <span className="font-medium">{update.previousStatus}</span> → <span className="font-medium text-blue-600">{update.newStatus}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right 1 Col: AI Analysis & Facility Info */}
        <div className="space-y-6">
          {/* AI Intelligence Card */}
          <div className="bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 text-white rounded-3xl p-6 shadow-xl shadow-indigo-900/10 relative overflow-hidden">
            <div className="absolute right-0 top-0 translate-x-6 -translate-y-6 w-32 h-32 bg-blue-500/20 rounded-full blur-xl pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-4 border border-blue-400/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Insight</span>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    AI Suggested Category
                  </span>
                  <span className="inline-block px-3 py-1 rounded-xl bg-white/10 text-white text-xs font-semibold backdrop-blur-sm border border-white/10">
                    {complaint.aiCategory || complaint.category}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    AI Executive Summary
                  </span>
                  <p className="text-xs text-blue-100 leading-relaxed bg-white/5 p-3 rounded-xl border border-white/5">
                    {complaint.aiSummary || 'AI analysis complete for this ticket.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Help Card */}
          <div className="bg-slate-100/80 rounded-3xl p-6 border border-slate-200 text-xs text-slate-600 space-y-2">
            <p className="font-bold text-slate-800 uppercase tracking-wider">Need Immediate Assistance?</p>
            <p>
              For critical life safety emergencies or urgent electrical hazards, please contact campus security immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetails;
