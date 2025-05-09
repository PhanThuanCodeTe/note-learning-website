import { useEffect, useState } from 'react';

interface ApiResponse {
  success: boolean;
  message: string;
  response?: any;
}

interface MessageProps {
  apiResponse?: ApiResponse;
  message?: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  onClose?: () => void;
}

const Message = ({ apiResponse, message, type, duration = 3000, onClose }: MessageProps) => {
  const [isVisible, setIsVisible] = useState(true);
  
  // Determine message type based on API response or prop
  let messageType = type;
  let messageText = message;
  
  if (apiResponse) {
    messageType = apiResponse.success ? 'success' : 'error';
    messageText = apiResponse.message;
  }
  
  if (!messageType) {
    messageType = 'info';
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible || !messageText) return null;

  const bgColor = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  }[messageType];

  return (
    <div className={`fixed top-4 right-4 p-4 rounded-lg text-white ${bgColor} shadow-lg z-50`}>
      {messageText}
    </div>
  );
};

export default Message;