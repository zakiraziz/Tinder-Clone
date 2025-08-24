import { useState, useEffect } from 'react';

interface MatchButtonsProps {
  onLike: () => void;
  onPass: () => void;
  onSuperLike?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  likeCount?: number;
  showCounts?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function MatchButtons({
  onLike,
  onPass,
  onSuperLike,
  disabled = false,
  isLoading = false,
  likeCount = 0,
  showCounts = false,
  size = 'md'
}: MatchButtonsProps) {
  const [isLiking, setIsLiking] = useState(false);
  const [isPassing, setIsPassing] = useState(false);

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20'
  };

  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  const handleLike = async () => {
    if (disabled || isLoading) return;
    
    setIsLiking(true);
    try {
      await onLike();
    } finally {
      setTimeout(() => setIsLiking(false), 300);
    }
  };

  const handlePass = async () => {
    if (disabled || isLoading) return;
    
    setIsPassing(true);
    try {
      await onPass();
    } finally {
      setTimeout(() => setIsPassing(false), 300);
    }
  };

  const handleSuperLike = async () => {
    if (disabled || isLoading || !onSuperLike) return;
    
    try {
      await onSuperLike();
    } catch (error) {
      console.error('Super like error:', error);
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (disabled || isLoading) return;
      
      switch (event.key) {
        case 'ArrowLeft':
        case 'a':
          handlePass();
          break;
        case 'ArrowRight':
        case 'd':
          handleLike();
          break;
        case ' ':
        case 'w':
          if (onSuperLike) handleSuperLike();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [disabled, isLoading, onLike, onPass, onSuperLike]);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Like counter */}
      {showCounts && (
        <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
          {likeCount} likes today
        </div>
      )}

      <div className="flex items-center justify-center gap-6 md:gap-8">
        {/* Pass Button */}
        <button
          onClick={handlePass}
          disabled={disabled || isLoading}
          className={`
            ${sizeClasses[size]} 
            bg-white dark:bg-gray-800 
            rounded-full shadow-lg 
            transition-all duration-200 
            flex items-center justify-center 
            border-2 border-gray-300 dark:border-gray-600 
            hover:border-red-500 dark:hover:border-red-500
            disabled:opacity-50 disabled:cursor-not-allowed
            disabled:hover:border-gray-300 dark:disabled:hover:border-gray-600
            ${isPassing ? 'scale-90' : 'hover:scale-105'}
            group
          `}
          aria-label="Pass"
        >
          <svg
            className={`${iconSizes[size]} text-red-500 transition-transform ${
              isPassing ? 'rotate-90' : 'group-hover:rotate-12'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* Super Like Button (if provided) */}
        {onSuperLike && (
          <button
            onClick={handleSuperLike}
            disabled={disabled || isLoading}
            className={`
              ${sizeClasses[size]} 
              bg-gradient-to-r from-blue-500 to-purple-600
              rounded-full shadow-lg 
              transition-all duration-200 
              flex items-center justify-center 
              border-2 border-blue-400
              hover:from-blue-600 hover:to-purple-700
              disabled:opacity-50 disabled:cursor-not-allowed
              hover:scale-105
              group
            `}
            aria-label="Super Like"
          >
            <svg
              className={`${iconSizes[size]} text-white animate-pulse group-hover:animate-none`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}

        {/* Like Button */}
        <button
          onClick={handleLike}
          disabled={disabled || isLoading}
          className={`
            ${sizeClasses[size]} 
            bg-white dark:bg-gray-800 
            rounded-full shadow-lg 
            transition-all duration-200 
            flex items-center justify-center 
            border-2 border-gray-300 dark:border-gray-600 
            hover:border-green-500 dark:hover:border-green-500
            disabled:opacity-50 disabled:cursor-not-allowed
            disabled:hover:border-gray-300 dark:disabled:hover:border-gray-600
            ${isLiking ? 'scale-90' : 'hover:scale-105'}
            group
          `}
          aria-label="Like"
        >
          <svg
            className={`${iconSizes[size]} text-green-500 transition-transform ${
              isLiking ? 'scale-125' : 'group-hover:scale-110'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="mt-4">
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Keyboard hints */}
      <div className="text-xs text-gray-500 dark:text-gray-500 mt-2 text-center">
        <p>Press ← or A to pass, → or D to like{onSuperLike && ', SPACE or W to super like'}</p>
      </div>
    </div>
  );
}
