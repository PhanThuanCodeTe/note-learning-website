import { toast } from 'react-toastify'; // Giả sử bạn sử dụng react-toastify

interface NotificationOptions {
  autoClose?: number;
  position?: 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left';
  hideProgressBar?: boolean;
}

const defaultOptions: NotificationOptions = {
  autoClose: 3000,
  position: 'top-right',
  hideProgressBar: false,
};

class NotificationService {
  /**
   * Hiển thị thông báo thành công
   */
  success(message: string, options?: NotificationOptions) {
    toast.success(message, { ...defaultOptions, ...options });
  }

  /**
   * Hiển thị thông báo lỗi
   */
  error(message: string, options?: NotificationOptions) {
    toast.error(message, { ...defaultOptions, ...options });
  }

  /**
   * Hiển thị thông báo cảnh báo
   */
  warning(message: string, options?: NotificationOptions) {
    toast.warning(message, { ...defaultOptions, ...options });
  }

  /**
   * Hiển thị thông báo thông tin
   */
  info(message: string, options?: NotificationOptions) {
    toast.info(message, { ...defaultOptions, ...options });
  }

  /**
   * Xử lý hiển thị thông báo từ API response
   */
  handleApiResponse(success: boolean, message: string) {
    if (success) {
      this.success(message);
    } else {
      this.error(message);
    }
  }
}

// Singleton instance
const notificationService = new NotificationService();
export default notificationService;