// frontend/note-website/app/common/utils/apiClient.ts
import { getCookie } from './cookieUtils';

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  response: T;
}

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  params?: Record<string, string>;
}

class ApiClient {
  private baseUrl: string;

  constructor() {
    // Fix for potential undefined API_URL
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  }

  /**
   * Thực hiện một HTTP request đến backend
   */
  private async request<T>(endpoint: string, options: ApiOptions = {}): Promise<ApiResponse<T>> {
    const { method = 'GET', headers = {}, body, params } = options;
    
    // Xây dựng URL với query params (nếu có)
    let url = `${this.baseUrl}${endpoint}`;
    if (params) {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        queryParams.append(key, value);
      });
      url = `${url}?${queryParams.toString()}`;
    }
    
    console.log(`Making ${method} request to: ${url}`);
    
    // Get access token from cookies if available
    const accessToken = getCookie('accessToken');
    
    // Xây dựng request options
    const requestOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      credentials: 'include', // Để gửi cookies nếu cần (authentication)
    };
    
    // Add authorization header if token exists and not already provided
    if (accessToken && !headers['Authorization']) {
      requestOptions.headers = {
        ...requestOptions.headers,
        'Authorization': `Bearer ${accessToken}`,
      };
    }
    
    // Thêm body nếu không phải GET request
    if (method !== 'GET' && body) {
      requestOptions.body = JSON.stringify(body);
    }
    
    try {
      // Add timeout to the fetch request
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout')), 15000);
      });
      
      const fetchPromise = fetch(url, requestOptions);
      const response = await Promise.race([fetchPromise, timeoutPromise]) as Response;
      
      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.error('Non-JSON response received:', contentType);
        return {
          success: false,
          message: 'Invalid response format from server',
          response: null as unknown as T
        };
      }
      
      const data: ApiResponse<T> = await response.json();
      
      // Check for HTTP error codes
      if (!response.ok) {
        console.error('HTTP error:', response.status, response.statusText);
        return {
          success: false,
          message: data.message || `HTTP error: ${response.status} ${response.statusText}`,
          response: null as unknown as T
        };
      }
      
      // Return the data
      return data;
      
    } catch (error: any) {
      // Log the error for debugging
      console.error('API request failed:', error.message);
      
      // Return formatted error response
      return {
        success: false,
        message: error.message || 'Something went wrong',
        response: null as unknown as T
      };
    }
  }
  
  /**
   * Gọi API với endpoint cụ thể
   */
  async endpoint<T>(endpoint: string, options: ApiOptions = {}): Promise<ApiResponse<T>> {
    // Replace dynamic params trong endpoint (if any)
    let finalEndpoint = endpoint;
    if (options.params) {
      Object.entries(options.params).forEach(([key, value]) => {
        finalEndpoint = finalEndpoint.replace(`:${key}`, value);
      });
    }
    
    return this.request<T>(finalEndpoint, options);
  }
  
  // Các helper methods
  async get<T>(endpoint: string, params?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.endpoint<T>(endpoint, { method: 'GET', params });
  }
  
  async post<T>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    return this.endpoint<T>(endpoint, { method: 'POST', body });
  }
  
  async put<T>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    return this.endpoint<T>(endpoint, { method: 'PUT', body });
  }
  
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.endpoint<T>(endpoint, { method: 'DELETE' });
  }
  
  // Method for handling file uploads
  async uploadFile<T>(endpoint: string, formData: FormData): Promise<ApiResponse<T>> {
    // Get access token from cookies if available
    const accessToken = getCookie('accessToken');
    
    const headers: Record<string, string> = {};
    
    // Add authorization header if token exists
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }
    
    return this.endpoint<T>(endpoint, {
      method: 'POST',
      headers,
      body: formData
    });
  }
}

// Singleton instance
const apiClient = new ApiClient();
export default apiClient;