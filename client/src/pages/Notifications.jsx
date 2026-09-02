import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { notificationAPI } from '../services/api';
import {
  Bell,
  CheckCheck,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
  Building,
  Check,
  AlertCircle,
} from 'lucide-react';

export const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await notificationAPI.getNotifications();
      setNotifications(res.data?.notifications || []);
    } catch (err) {
      console.error('Error fetching notifications:', err);
      setError('Failed to load notifications.');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await notificationAPI.markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  const markAllAsRead = async () => {
    const unread = notifications.filter((n) => !n.isRead);
    for (const notif of unread) {
      try {
        await notificationAPI.markAsRead(notif._id);
      } catch (err) {
        // ignore individual errors
      }
    }
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'submitted':
        return <CheckCircle2 className="w-5 h-5 text-blue-600" />;
      case 'status_updated':
        return <Clock className="w-5 h-5 text-amber-600" />;
      case 'assigned':
        return <Building className="w-5 h-5 text-purple-600" />;
      case 'resolved':
        return <Check className="w-5 h-5 text-emerald-600" />;
      default:
        return <Bell className="w-5 h-5 text-blue-600" />;
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-slate-900">
            Notifications
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time updates regarding your submitted complaints
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors self-start sm:self-auto"
          >
            <CheckCheck className="w-4 h-4" />
            <span>Mark All as Read ({unreadCount})</span>
          </button>
        )}
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div className="py-20 text-center">
          <div className="w-9 h-9 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm font-medium text-slate-500">Loading notifications...</p>
        </div>
      ) : notifications.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
            <Bell className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 font-display mb-1">
            No Notifications Yet
          </h3>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">
            You will receive updates here whenever the administration reviews or updates your complaints.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((item) => {
            const complaintId = item.complaintId?._id || item.complaintId;
            return (
              <div
                key={item._id}
                className={`p-5 rounded-2xl border transition-all flex items-start gap-4 ${
                  item.isRead
                    ? 'bg-white border-slate-200/80 text-slate-700'
                    : 'bg-blue-50/60 border-blue-200 shadow-sm text-slate-900'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    item.isRead ? 'bg-slate-100' : 'bg-white shadow-sm'
                  }`}
                >
                  {getNotificationIcon(item.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="text-sm font-bold text-slate-900 truncate">{item.title}</h3>
                    <span className="text-[11px] text-slate-400 whitespace-nowrap">
                      {new Date(item.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-3">{item.message}</p>

                  <div className="flex items-center gap-3">
                    {complaintId && (
                      <Link
                        to={`/complaints/${complaintId}`}
                        className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group"
                      >
                        <span>View Ticket</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    )}

                    {!item.isRead && (
                      <button
                        onClick={(e) => handleMarkAsRead(item._id, e)}
                        className="text-xs text-slate-400 hover:text-slate-600 font-medium"
                      >
                        Mark as read
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Notifications;
