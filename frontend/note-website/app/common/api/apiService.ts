import axios from 'axios';

// Định nghĩa kiểu dữ liệu cho response API
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
}

// Tạo instance axios với cấu hình mặc định
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Hàm xử lý lỗi chung
const handleError = (error: any): ApiResponse => {
  if (error.response) {
    return {
      success: false,
      message: error.response.data.message || 'Có lỗi xảy ra',
      data: null,
    };
  }
  return {
    success: false,
    message: 'Không thể kết nối đến server',
    data: null,
  };
};

// Các hàm gọi API cơ bản
export const apiService = {
  get: async <T>(url: string, params?: any): Promise<ApiResponse<T>> => {
    try {
      const response = await api.get(url, { params });
      return {
        success: true,
        message: 'Thành công',
        data: response.data,
      };
    } catch (error) {
      return handleError(error);
    }
  },

  post: async <T>(url: string, data?: any): Promise<ApiResponse<T>> => {
    try {
      const response = await api.post(url, data);
      return {
        success: true,
        message: 'Thành công',
        data: response.data,
      };
    } catch (error) {
      return handleError(error);
    }
  },

  put: async <T>(url: string, data?: any): Promise<ApiResponse<T>> => {
    try {
      const response = await api.put(url, data);
      return {
        success: true,
        message: 'Thành công',
        data: response.data,
      };
    } catch (error) {
      return handleError(error);
    }
  },

  delete: async <T>(url: string): Promise<ApiResponse<T>> => {
    try {
      const response = await api.delete(url);
      return {
        success: true,
        message: 'Thành công',
        data: response.data,
      };
    } catch (error) {
      return handleError(error);
    }
  },
}; 