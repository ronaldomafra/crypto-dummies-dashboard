
// Base URL for API requests
export const API_BASE_URL = "https://tradingfordummies.site/api";

// API endpoints
export const API_ENDPOINTS = {
  // User endpoints
  users: {
    register: `${API_BASE_URL}/users/register`,
    login: `${API_BASE_URL}/users/login`,
    logout: `${API_BASE_URL}/users/logout`,
    getAll: `${API_BASE_URL}/users/get`,
    getById: (id: number | string) => `${API_BASE_URL}/users/get/${id}`,
    update: (id: number | string) => `${API_BASE_URL}/users/update/${id}`,
    delete: (id: number | string) => `${API_BASE_URL}/users/delete/${id}`,
  },
  
  // Exchange Provider endpoints
  exchangeProvider: {
    getAll: `${API_BASE_URL}/exchangeProvider/get`,
    getByKey: (key: number | string) => `${API_BASE_URL}/exchangeProvider/get/${key}`,
    add: `${API_BASE_URL}/exchangeProvider/add`,
    update: (key: number | string) => `${API_BASE_URL}/exchangeProvider/update/${key}`,
    delete: (key: number | string) => `${API_BASE_URL}/exchangeProvider/delete/${key}`,
  },
  
  // Exchange endpoints
  exchange: {
    getAll: `${API_BASE_URL}/exchange/get`,
    getById: (id: number | string) => `${API_BASE_URL}/exchange/get/${id}`,
    add: `${API_BASE_URL}/exchange/add`,
    update: (id: number | string) => `${API_BASE_URL}/exchange/update/${id}`,
    delete: (id: number | string) => `${API_BASE_URL}/exchange/delete/${id}`,
  },
  
  // Exchange Config endpoints
  exchangeConfig: {
    getAll: `${API_BASE_URL}/exchangeConfig/get`,
    getByExchangeId: (exchangeId: number | string) => `${API_BASE_URL}/exchangeConfig/get/${exchangeId}`,
    add: `${API_BASE_URL}/exchangeConfig/add`,
    update: (exchangeId: number | string) => `${API_BASE_URL}/exchangeConfig/update/${exchangeId}`,
    delete: (exchangeId: number | string) => `${API_BASE_URL}/exchangeConfig/delete/${exchangeId}`,
  },
};
