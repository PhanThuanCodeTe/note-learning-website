/**
 * Interface chuẩn cho API Response
 */
export interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    response: T;
  }
  
  /**
   * Options cho API request
   */
  export interface ApiOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    headers?: Record<string, string>;
    body?: any;
    params?: Record<string, string>;
  }
  
  /**
   * Pagination params
   */
  export interface PaginationParams {
    page?: number;
    limit?: number;
    sort?: string;
    order?: 'asc' | 'desc';
  }
  
  /**
   * Pagination response
   */
  export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }