import { API_BASE_URL, API_ENDPOINTS } from "./constants";

interface ApiOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
  requiresAuth?: boolean;
}

// Response interfaces based on the API documentation
interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
  timestamp: string;
  total?: number;
}

interface ApiErrorResponse {
  success: false;
  error: string;
  message: string;
  statusCode: number;
  timestamp: string;
  path?: string;
}

type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

// Auth response interfaces
export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

/**
 * Makes an API request with the specified options
 */
export const apiRequest = async <T>(
  endpoint: string,
  options: ApiOptions = {}
) => {
  const {
    method = "GET",
    headers = {},
    body = null,
    requiresAuth = false,
  } = options;

  // Prepare request headers
  const requestHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...headers,
  };

  // Add authorization token if required
  if (requiresAuth) {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Autenticação necessária");
    }
    requestHeaders["Authorization"] = `Bearer ${token}`;
  }

  // Prepare request options
  const requestOptions: RequestInit = {
    method,
    headers: requestHeaders,
  };

  // Add body if present
  if (body) {
    requestOptions.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(endpoint, requestOptions);
    
    // Handle rate limiting
    if (response.status === 429) {
      throw {
        status: 429,
        message: "Limite de requisições excedido. Tente novamente em alguns minutos.",
        data: null,
      };
    }

    const responseData = await response.json() as ApiResponse<T>;

    if (!response.ok || !responseData.success) {
      throw {
        status: response.status,
        message: responseData.success === false 
          ? responseData.message 
          : "Falha na requisição API",
        data: responseData,
      };
    }

    return { response: responseData.data, status: response.status };
  } catch (error: any) {
    console.error("Erro na requisição API:", error);
    
    // If it's a network error, provide a user-friendly message
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw {
        status: 0,
        message: "Erro de conexão. Verifique sua internet e tente novamente.",
        data: null,
      };
    }
    
    throw error;
  }
};

/**
 * Helper functions for common API operations
 */
export const api = {
  get: <T>(endpoint: string, requiresAuth = false) =>
    apiRequest<T>(endpoint, { requiresAuth }),
    
  post: <T>(endpoint: string, body: any, requiresAuth = false) =>
    apiRequest<T>(endpoint, { method: "POST", body, requiresAuth }),
    
  put: <T>(endpoint: string, body: any, requiresAuth = false) =>
    apiRequest<T>(endpoint, { method: "PUT", body, requiresAuth }),
    
  delete: <T>(endpoint: string, requiresAuth = false) =>
    apiRequest<T>(endpoint, { method: "DELETE", requiresAuth }),
};

/**
 * Authentication specific API calls
 */
export const authApi = {
  login: async (credentials: LoginRequest) => {
    return api.post<AuthResponse>(API_ENDPOINTS.auth.login, credentials);
  },

  register: async (userData: RegisterRequest) => {
    return api.post<AuthResponse>(API_ENDPOINTS.auth.register, userData);
  },

  refresh: async (refreshToken: string) => {
    return api.post<AuthResponse>(API_ENDPOINTS.auth.refresh, { refreshToken });
  },

  logout: async (refreshToken: string) => {
    return api.post<void>(API_ENDPOINTS.auth.logout, { refreshToken });
  },

  logoutAll: async () => {
    return api.post<void>(API_ENDPOINTS.auth.logoutAll, {}, true);
  },
};

/**
 * Health check API calls
 */
export const healthApi = {
  check: async () => {
    return api.get<{
      status: string;
      timestamp: string;
      uptime: number;
      version: string;
      environment: string;
      database: {
        status: string;
        responseTime: number;
      };
      memory: {
        used: number;
        total: number;
        percentage: number;
      };
    }>(API_ENDPOINTS.health.check);
  },

  metrics: async () => {
    return api.get<{
      timestamp: string;
      uptime: number;
      memory: any;
      cpu: any;
      version: string;
      platform: string;
      arch: string;
    }>(API_ENDPOINTS.health.metrics);
  },
};

/**
 * Test API calls
 */
export const testApi = {
  basic: async () => {
    return api.get<{
      message: string;
      version: string;
      environment: string;
    }>(API_ENDPOINTS.test.basic);
  },

  auth: async () => {
    return api.get<{
      message: string;
      user: {
        id: string;
        email: string;
      };
    }>(API_ENDPOINTS.test.auth, true);
  },

  users: async () => {
    return api.get<AuthUser[]>(API_ENDPOINTS.test.users, true);
  },
};
