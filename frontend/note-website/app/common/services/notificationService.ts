import { toast } from 'react-toastify';

const defaultOptions = {
  autoClose: 3000,
  position: 'top-right' as const,
  hideProgressBar: false,
};

export const notificationService = {
  success: (message: string) => toast.success(message, defaultOptions),
  error: (message: string) => toast.error(message, defaultOptions),
  warning: (message: string) => toast.warning(message, defaultOptions),
  info: (message: string) => toast.info(message, defaultOptions),
  
  // Helper method để xử lý API response
  handleApiResponse: (success: boolean, message: string) => {
    if (success) {
      toast.success(message, defaultOptions);
    } else {
      toast.error(message, defaultOptions);
    }
  }
};

export default notificationService;