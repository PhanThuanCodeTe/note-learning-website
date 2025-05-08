import { useEffect, useState } from 'react';

interface MessageProps {
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
  onClose?: () => void;
}

const Message = ({ message, type, duration = 3000, onClose }: MessageProps) => {
  const [isVisible, setIsVisible] = useState(true);

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
      {message}
    </div>
  );
};

export default Message; 