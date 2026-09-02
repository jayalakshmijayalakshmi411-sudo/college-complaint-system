import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

export const complaintAPI = {
  createComplaint: (data) => api.post('/complaints', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  getComplaints: () => api.get('/complaints'),
  getComplaintById: (id) => api.get(`/complaints/${id}`),
  updateComplaint: (id, data) => api.put(`/complaints/${id}`, data),
  deleteComplaint: (id) => api.delete(`/complaints/${id}`),
  getComplaintUpdates: (id) => api.get(`/complaints/${id}/updates`),
  addComplaintUpdate: (id, data) => api.post(`/complaints/${id}/updates`, data),
};

export const adminAPI = {
  getAllComplaints: (filters) => api.get('/admin/complaints', { params: filters }),
  updateStatus: (id, data) => api.put(`/admin/complaints/${id}/status`, data),
  updatePriority: (id, data) => api.put(`/admin/complaints/${id}/priority`, data),
  assignComplaint: (id, data) => api.put(`/admin/complaints/${id}/assign`, data),
  resolveComplaint: (id, data) => api.put(`/admin/complaints/${id}/resolve`, data),
  getDashboardStats: () => api.get('/admin/dashboard/stats'),
};

export const dashboardAPI = {
  getStudentDashboard: () => api.get('/dashboard/student'),
  getAdminDashboard: () => api.get('/dashboard/admin'),
};

export const notificationAPI = {
  getNotifications: () => api.get('/notifications'),
  markAsRead: (id) => api.put(`/notifications/${id}/read`),
  getUnreadCount: () => api.get('/notifications/unread/count'),
};

export default api;
