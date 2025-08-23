import { UserProfile } from "@/app/profile/page";
import { useEffect, useState } from "react";

interface MatchNotificationProps {
  match: UserProfile;
  onClose: () => void;
  onStartChat: () => void;
}

export default function MatchNotification({
  match,
  onClose,
  onStartChat,
}: MatchNotificationProps) {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  function handleClose() {
    setIsVisible(false);
    setTimeout(onClose, 300);
  }

  function handleStartChat() {
    onStartChat();
    handleClose();
  }

  return (
    <div
      className={`fixed top-4 right-4 z-50 transition-all duration-300 ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 max-w-sm">
        <div className="flex items-start space-x-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
            <img
              src={match.avatar_url}
              alt={match.full_name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                It's a Match! 🎉
              </h3>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
    
