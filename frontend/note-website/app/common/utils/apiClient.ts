// src/utils/apiClient.ts

interface ApiResponse<T = any> {
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
      this.baseUrl = process.env.API_URL || '';
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
      
      // Xây dựng request options
      const requestOptions: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        credentials: 'include', // Để gửi cookies nếu cần (authentication)
      };
      
      // Thêm body nếu không phải GET request
      if (method !== 'GET' && body) {
        requestOptions.body = JSON.stringify(body);
      }
      
      try {
        const response = await fetch(url, requestOptions);
        const data: ApiResponse<T> = await response.json();
        
        // Kiểm tra nếu API không thành công, throw error để xử lý ở catch
        if (!data.success) {
          throw new Error(data.message || 'API request failed');
        }
        
        return data;
      } catch (error: any) {
        // Xử lý lỗi và trả về response với success = false
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
  }
  
  // Singleton instance
  const apiClient = new ApiClient();
  export default apiClient;