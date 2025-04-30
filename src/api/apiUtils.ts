
import { API_BASE_URL } from "./constants";

interface ApiOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
  requiresAuth?: boolean;
}

/**
 * Makes an API request with the specified options
 */
export const apiRequest = async (
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
      throw new Error("Authentication required");
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
    const data = await response.json();

    if (!response.ok) {
      throw {
        status: response.status,
        message: data.message || data.error || "API request failed",
        data,
      };
    }

    return { data, status: response.status };
  } catch (error) {
    console.error("API request error:", error);
    throw error;
  }
};

/**
 * Helper functions for common API operations
 */
export const api = {
  get: (endpoint: string, requiresAuth = false) =>
    apiRequest(endpoint, { requiresAuth }),
    
  post: (endpoint: string, body: any, requiresAuth = false) =>
    apiRequest(endpoint, { method: "POST", body, requiresAuth }),
    
  put: (endpoint: string, body: any, requiresAuth = false) =>
    apiRequest(endpoint, { method: "PUT", body, requiresAuth }),
    
  delete: (endpoint: string, requiresAuth = false) =>
    apiRequest(endpoint, { method: "DELETE", requiresAuth }),
};
