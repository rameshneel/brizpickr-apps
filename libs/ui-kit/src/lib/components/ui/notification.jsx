import React, { useState, useEffect } from 'react';
import { cn } from './utils';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';

const Notification = React.forwardRef(
  (
    {
      className,
      variant = 'default',
      title,
      message,
      duration = 5000,
      onClose,
      showCloseButton = true,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(true);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
      // Initial animation
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 10);

      if (duration > 0) {
        const timer = setTimeout(() => {
          handleClose();
        }, duration);

        return () => clearTimeout(timer);
      }
    }, [duration]);

    const handleClose = () => {
      setIsAnimating(true);
      setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, 200);
    };

    const variants = {
      default: {
        icon: Info,
        styles: 'bg-background border-border shadow-lg',
      },
      success: {
        icon: CheckCircle,
        styles: 'bg-green-50 border-green-200 text-green-800 shadow-lg',
      },
      error: {
        icon: AlertCircle,
        styles: 'bg-red-50 border-red-200 text-red-800 shadow-lg',
      },
      warning: {
        icon: AlertTriangle,
        styles: 'bg-yellow-50 border-yellow-200 text-yellow-800 shadow-lg',
      },
      info: {
        icon: Info,
        styles: 'bg-blue-50 border-blue-200 text-blue-800 shadow-lg',
      },
    };

    const { icon: Icon, styles } = variants[variant];

    if (!isVisible) return null;

    return (
      <div
        ref={ref}
        className={cn(
          'relative w-full rounded-lg border p-4 transition-all duration-200',
          styles,
          isAnimating
            ? 'translate-x-full opacity-0'
            : 'translate-x-0 opacity-100',
          className
        )}
        {...props}
      >
        <div className="flex items-start space-x-3">
          <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            {title && (
              <h4 className="text-sm font-medium leading-5">{title}</h4>
            )}
            {message && (
              <p className="mt-1 text-sm leading-5 opacity-90">{message}</p>
            )}
          </div>
          {showCloseButton && (
            <button
              onClick={handleClose}
              className="ml-3 flex-shrink-0 rounded-md p-1 opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all hover:bg-accent hover:text-accent-foreground"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          )}
        </div>
      </div>
    );
  }
);
Notification.displayName = 'Notification';

// Notification Container for managing multiple notifications
const NotificationContainer = React.forwardRef(
  ({ className, children, position = 'top-right', ...props }, ref) => {
    const positions = {
      'top-left': 'top-4 left-4',
      'top-right': 'top-4 right-4',
      'bottom-left': 'bottom-4 left-4',
      'bottom-right': 'bottom-4 right-4',
      'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
      'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'fixed z-50 flex flex-col space-y-2 max-w-sm',
          positions[position],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
NotificationContainer.displayName = 'NotificationContainer';

// Hook for managing notifications
const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = notification => {
    const id = Date.now().toString();
    const newNotification = { id, ...notification };
    setNotifications(prev => [...prev, newNotification]);
    return id;
  };

  const removeNotification = id => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAll,
  };
};

export { Notification, NotificationContainer, useNotifications };
