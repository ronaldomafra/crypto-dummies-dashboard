
// Base URLs for API requests based on environment
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
export const API_BASE_URL = isDevelopment 
  ? "http://localhost:3000/api" 
  : "https://tradingfordummies.site/api";

// API endpoints following the Trading AI System documentation
export const API_ENDPOINTS = {
  // Root endpoint
  root: `${API_BASE_URL}`,
  
  // Authentication endpoints
  auth: {
    register: `${API_BASE_URL}/auth/register`,
    login: `${API_BASE_URL}/auth/login`,
    refresh: `${API_BASE_URL}/auth/refresh`,
    logout: `${API_BASE_URL}/auth/logout`,
    logoutAll: `${API_BASE_URL}/auth/logout-all`,
  },
  
  // Health check endpoints
  health: {
    check: `${API_BASE_URL}/health`,
    metrics: `${API_BASE_URL}/health/metrics`,
  },
  
  // Test endpoints
  test: {
    basic: `${API_BASE_URL}/test`,
    auth: `${API_BASE_URL}/test/auth`,
    users: `${API_BASE_URL}/test/users`,
    validation: `${API_BASE_URL}/test/validation`,
    rateLimit: `${API_BASE_URL}/test/rate-limit`,
  },
  
  // Legacy endpoints (mantidos para compatibilidade)
  users: {
    register: `${API_BASE_URL}/auth/register`,
    login: `${API_BASE_URL}/auth/login`,
    logout: `${API_BASE_URL}/auth/logout`,
    getAll: `${API_BASE_URL}/test/users`,
    getById: (id: number | string) => `${API_BASE_URL}/users/get/${id}`,
    update: (id: number | string) => `${API_BASE_URL}/users/update/${id}`,
    delete: (id: number | string) => `${API_BASE_URL}/users/delete/${id}`,
  },
};
