// src/config/api.js
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
const AUTH_TOKEN = import.meta.env.VITE_AUTH_TOKEN || null;

console.log("the base url afer lanuch the",   import.meta.env.MODE);
console.log('API Base URL:', API_BASE_URL)

// Generic API call function
export const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(AUTH_TOKEN && { 'Authorization': `Bearer ${AUTH_TOKEN}` }),
        ...options.headers
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Network error - please check your internet connection and backend server status');
  }
};

// Specific API functions
export const attendanceAPI = {
  getAttendanceRecords: () => apiCall('/attendance'),
  addAttendanceRecord: (data) => apiCall('/attendance', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  updateAttendanceRecord: (id, data) => apiCall(`/attendance/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  deleteAttendanceRecord: (id) => apiCall(`/attendance/${id}`, {
    method: 'DELETE'
  })
};

export default apiCall;
