import { useState, useCallback, useEffect } from 'react';
import apiClient from '../utils/apiClient';
import notificationService from '../services/notificationService';
import { ApiResponse } from '../types/api'; // Giả sử bạn có file định nghĩa types

/**
 * Hook tổng quát cho việc gọi API và xử lý loading, error, data
 */
export function useApi<T, P = any>(
  apiFunction: (params: P) => Promise<ApiResponse<T>>,
  showNotifications = true,
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(
    async (params: P): Promise<T | null> => {
      try {
        setLoading(true);
        setError(null);

        const result = await apiFunction(params);

        if (result.success) {
          setData(result.response);
          if (showNotifications) {
            notificationService.success(result.message);
          }
          return result.response;
        } else {
          setError(result.message);
          if (showNotifications) {
            notificationService.error(result.message);
          }
          return null;
        }
      } catch (err: any) {
        const errorMessage = err.message || 'Đã xảy ra lỗi không xác định';
        setError(errorMessage);
        if (showNotifications) {
          notificationService.error(errorMessage);
        }
        return null;
      } finally {
        setLoading(false);
      }
    },
    [apiFunction, showNotifications]
  );

  return { data, loading, error, execute };
}

/**
 * Hook để lấy dữ liệu từ API
 */
export function useFetch<T>(endpoint: string, initialFetch = true) {
  const apiCall = useCallback(
    (params: void) => apiClient.get<T>(endpoint),
    [endpoint]
  );

  const { data, loading, error, execute } = useApi<T, void>(apiCall, false);

  const refetch = useCallback(() => {
    return execute(undefined as void);
  }, [execute]);

  // Tự động fetch data khi component mount nếu initialFetch = true
  useEffect(() => {
    if (initialFetch) {
      refetch();
    }
  }, [initialFetch, refetch]);

  return { data, loading, error, refetch };
}

/**
 * Hook để tạo mới dữ liệu qua API
 */
export function useCreate<T, P>(endpoint: string) {
  const apiCall = useCallback(
    (data: P) => apiClient.post<T>(endpoint, data),
    [endpoint]
  );

  return useApi<T, P>(apiCall);
}

/**
 * Hook để cập nhật dữ liệu qua API
 */
export function useUpdate<T, P>(endpoint: string) {
  const apiCall = useCallback(
    (data: P) => apiClient.put<T>(endpoint, data),
    [endpoint]
  );

  return useApi<T, P>(apiCall);
}

/**
 * Hook để xóa dữ liệu qua API
 */
export function useDelete<T>(endpoint: string) {
  const apiCall = useCallback(
    (params: void) => apiClient.delete<T>(endpoint),
    [endpoint]
  );

  return useApi<T, void>(apiCall);
}