import { useEffect } from 'react';

export function Toast({ message, type = 'success', duration = 3000, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500',
  };

  return (
    <div className={`fixed bottom-6 right-6 px-4 py-2 rounded text-white shadow-lg z-[9999] ${colors[type]}`}>
      {message}
    </div>
  );
}
