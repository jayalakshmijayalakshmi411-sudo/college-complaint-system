import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { notificationAPI } from '../services/api';
import { 
  Menu, 
  X, 
  LogOut, 
  Bell, 
  ShieldCheck, 
  PlusCircle, 
  ListOrdered, 
  LayoutDashboard, 
  User,
  Sparkles
} from 'lucide-react';

export const Navbar = () => {
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (isAuthenticated && !isAdmin) {
      fetchUnreadCount();
      const interval = setInterval(fetchUnreadCount, 30000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, isAdmin, location.pathname]);

  const fetchUnreadCount = async () => {
    try {
      const res = await notificationAPI.getUnreadCount();
      setUnreadCount(res.data?.count || 0);
    } catch (err) {
      console.error('Error fetching unread notifications:', err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const navLinkClass = (path) =>
    `px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
      isActive(path)
        ? 'bg-blue-50 text-blue-600 font-semibold shadow-sm'
        : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
    }`;

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold font-display tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                Campus<span className="text-blue-600">Resolve</span>
              </span>
              <span className="text-[10px] -mt-1 font-semibold uppercase tracking-wider text-slate-400">
                Complaint Hub
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {!isAuthenticated ? (
              <>
                <Link to="/" className={navLinkClass('/')}>
                  Home
                </Link>
                <div className="h-4 w-[1px] bg-slate-200 mx-2" />
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm shadow-blue-600/30 transition-all hover:shadow hover:-translate-y-0.5"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <>
                {isAdmin ? (
                  <>
                    <Link to="/admin/dashboard" className={navLinkClass('/admin/dashboard')}>
                      <LayoutDashboard className="w-4 h-4" />
                      Admin Dashboard
                    </Link>
                    <Link to="/admin/complaints" className={navLinkClass('/admin/complaints')}>
                      <ListOrdered className="w-4 h-4" />
                      Manage Complaints
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/dashboard" className={navLinkClass('/dashboard')}>
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </Link>
                    <Link to="/complaints" className={navLinkClass('/complaints')}>
                      <ListOrdered className="w-4 h-4" />
                      My Complaints
                    </Link>
                    <Link
                      to="/complaints/new"
                      className="px-3.5 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center gap-1.5 shadow-sm shadow-blue-600/20"
                    >
                      <PlusCircle className="w-4 h-4" />
                      New Complaint
                    </Link>
                    <Link
                      to="/notifications"
                      className={`relative p-2 rounded-lg transition-colors ${
                        isActive('/notifications')
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                      }`}
                      title="Notifications"
                    >
                      <Bell className="w-5 h-5" />
                      {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[11px] font-bold rounded-full h-5 min-w-[20px] px-1 flex items-center justify-center ring-2 ring-white animate-pulse">
                          {unreadCount > 9 ? '9+' : unreadCount}
                        </span>
                      )}
                    </Link>
                  </>
                )}

                <div className="h-5 w-[1px] bg-slate-200 mx-2" />

                {/* User Info & Role Badge */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-slate-100/80 px-3 py-1.5 rounded-full border border-slate-200/60">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
                      {user?.name?.charAt(0).toUpperCase() || <User className="w-3.5 h-3.5" />}
                    </div>
                    <span className="text-xs font-semibold text-slate-700 max-w-[120px] truncate">
                      {user?.name}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                        isAdmin
                          ? 'bg-purple-100 text-purple-700 border border-purple-200'
                          : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                      }`}
                    >
                      {isAdmin ? 'Admin' : 'Student'}
                    </span>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {isAuthenticated && !isAdmin && (
              <Link to="/notifications" className="relative p-2 text-slate-600">
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 bg-rose-500 text-white text-[10px] font-bold rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </Link>
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-slate-100"
              aria-label="Toggle Navigation Menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top duration-200">
          {!isAuthenticated ? (
            <div className="space-y-2 pt-2">
              <Link
                to="/"
                className="block px-3 py-2 rounded-lg text-slate-700 font-medium hover:bg-slate-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/login"
                className="block px-3 py-2 rounded-lg text-slate-700 font-medium hover:bg-slate-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="block px-3 py-2 rounded-lg bg-blue-600 text-white font-medium text-center shadow-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          ) : (
            <div className="space-y-1.5 pt-2">
              <div className="px-3 py-2 bg-slate-50 rounded-lg flex items-center justify-between mb-3 border border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800 leading-none">{user?.name}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{user?.email}</p>
                  </div>
                </div>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                    isAdmin ? 'bg-purple-100 text-purple-700' : 'bg-emerald-100 text-emerald-700'
                  }`}
                >
                  {isAdmin ? 'Admin' : 'Student'}
                </span>
              </div>

              {isAdmin ? (
                <>
                  <Link
                    to="/admin/dashboard"
                    className="block px-3 py-2.5 rounded-lg text-slate-700 font-medium hover:bg-blue-50 hover:text-blue-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                  <Link
                    to="/admin/complaints"
                    className="block px-3 py-2.5 rounded-lg text-slate-700 font-medium hover:bg-blue-50 hover:text-blue-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Manage Complaints
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/dashboard"
                    className="block px-3 py-2.5 rounded-lg text-slate-700 font-medium hover:bg-blue-50 hover:text-blue-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/complaints"
                    className="block px-3 py-2.5 rounded-lg text-slate-700 font-medium hover:bg-blue-50 hover:text-blue-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Complaints
                  </Link>
                  <Link
                    to="/complaints/new"
                    className="block px-3 py-2.5 rounded-lg bg-blue-600 text-white font-medium text-center shadow-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    + Submit New Complaint
                  </Link>
                  <Link
                    to="/notifications"
                    className="block px-3 py-2.5 rounded-lg text-slate-700 font-medium hover:bg-blue-50 hover:text-blue-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Notifications {unreadCount > 0 && `(${unreadCount})`}
                  </Link>
                </>
              )}

              <button
                onClick={handleLogout}
                className="w-full mt-4 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-rose-600 bg-rose-50 hover:bg-rose-100 font-medium text-sm transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
