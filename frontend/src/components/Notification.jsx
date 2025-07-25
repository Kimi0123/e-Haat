import React, { useEffect, useState } from "react";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const Notification = ({
  type = "info",
  title,
  message,
  duration = 5000,
  onClose,
  isVisible = true,
}) => {
  const [isOpen, setIsOpen] = useState(isVisible);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsOpen(false);
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  const notificationStyles = {
    success: {
      icon: CheckCircleIcon,
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      textColor: "text-green-800",
      iconColor: "text-green-400",
    },
    error: {
      icon: XCircleIcon,
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      textColor: "text-red-800",
      iconColor: "text-red-400",
    },
    warning: {
      icon: ExclamationTriangleIcon,
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      textColor: "text-yellow-800",
      iconColor: "text-yellow-400",
    },
    info: {
      icon: InformationCircleIcon,
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-800",
      iconColor: "text-blue-400",
    },
  };

  const style = notificationStyles[type];
  const Icon = style.icon;

  if (!isOpen) return null;

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm w-full">
      <div
        className={`${style.bgColor} ${style.borderColor} border rounded-lg p-4 shadow-lg transform transition-all duration-300 ease-in-out`}
      >
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Icon className={`h-5 w-5 ${style.iconColor}`} />
          </div>
          <div className="ml-3 flex-1">
            {title && (
              <p className={`text-sm font-medium ${style.textColor}`}>
                {title}
              </p>
            )}
            {message && (
              <p className={`text-sm ${style.textColor} mt-1`}>{message}</p>
            )}
          </div>
          <div className="ml-4 flex-shrink-0">
            <button
              onClick={handleClose}
              className={`inline-flex ${style.textColor} hover:${
                style.textColor
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${
                type === "success"
                  ? "green"
                  : type === "error"
                  ? "red"
                  : type === "warning"
                  ? "yellow"
                  : "blue"
              }-500`}
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
