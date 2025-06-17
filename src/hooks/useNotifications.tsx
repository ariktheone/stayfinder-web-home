
import { useState, useCallback } from "react";
import { Notification, NotificationType } from "@/components/NotificationSystem";

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((
    type: NotificationType,
    title: string,
    message?: string,
    options?: {
      duration?: number;
      action?: {
        label: string;
        onClick: () => void;
      };
    }
  ) => {
    const id = Date.now().toString();
    const notification: Notification = {
      id,
      type,
      title,
      message,
      duration: options?.duration ?? (type === "error" ? 0 : 5000), // Errors stay until dismissed
      action: options?.action,
    };

    setNotifications(prev => [...prev, notification]);
    return id;
  }, []);

  const dismissNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  // Convenience methods
  const success = useCallback((title: string, message?: string, options?: any) => 
    addNotification("success", title, message, options), [addNotification]);
  
  const error = useCallback((title: string, message?: string, options?: any) => 
    addNotification("error", title, message, options), [addNotification]);
  
  const info = useCallback((title: string, message?: string, options?: any) => 
    addNotification("info", title, message, options), [addNotification]);
  
  const warning = useCallback((title: string, message?: string, options?: any) => 
    addNotification("warning", title, message, options), [addNotification]);

  return {
    notifications,
    addNotification,
    dismissNotification,
    clearAll,
    success,
    error,
    info,
    warning,
  };
};
