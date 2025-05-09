import { useEffect, useState } from 'react';

interface ApiResponse {
  success: boolean;
  message: string;
  response?: any;
}

interface MessageProps {
  apiResponse: ApiResponse;
  duration?: number;
  onClose?: () => void;
  customMessage?: string; // Optional custom message to override API message
}

const Message = ({ apiResponse, duration = 3000, onClose, customMessage }: MessageProps) => {
  const [isVisible, setIsVisible] = useState(true);
  
  // Determine message type based on API response success flag
  const type = apiResponse.success ? 'success' : 'error';
  
  // Use custom message if provided, otherwise use API message
  const messageText = customMessage || apiResponse.message;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  const bgColor = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  }[type];

  return (
    <div className={`fixed top-4 right-4 p-4 rounded-lg text-white ${bgColor} shadow-lg z-50`}>
      {messageText}
    </div>
  );
};

export default Message;