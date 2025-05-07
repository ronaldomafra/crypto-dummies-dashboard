
import { API_BASE_URL } from "./constants";

interface ApiOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
  requiresAuth?: boolean;
}

interface ApiSuccessResponse<T> {
  status: "success";
  data: T;
}

interface ApiErrorResponse {
  status: "error";
  message: string;
}

type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

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
    const responseData = await response.json() as ApiResponse<T>;

    if (!response.ok || responseData.status === "error") {
      throw {
        status: response.status,
        message: responseData.status === "error" 
          ? responseData.message 
          : "Falha na requisição API",
        data: responseData,
      };
    }

    return { response: responseData.data, status: response.status };
  } catch (error) {
    console.error("Erro na requisição API:", error);
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
