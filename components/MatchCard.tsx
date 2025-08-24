import { UserProfile } from "@/app/profile/page";
import { calculateAge } from "@/lib/helpers/calculate-age";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Heart, MapPin, Star, Calendar, BookOpen } from "lucide-react";

interface MatchCardProps {
  user: UserProfile;
  isActive?: boolean;
  onSwipe?: (direction: 'left' | 'right') => void;
  showDetails?: boolean;
}

export default function MatchCard({ 
  user, 
  isActive = true, 
  onSwipe,
  showDetails = false 
}: MatchCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showFullBio, setShowFullBio] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });
  const [isSwiping, setIsSwiping] = useState(false);

  const MAX_BIO_LENGTH = 120;
  const truncatedBio = user.bio && user.bio.length > MAX_BIO_LENGTH 
    ? user.bio.substring(0, MAX_BIO_LENGTH) + '...' 
    : user.bio;

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    setStartPosition({ x: clientX, y: clientY });
    setCurrentPosition({ x: clientX, y: clientY });
    setIsSwiping(true);
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isSwiping) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    setCurrentPosition({ x: clientX, y: clientY });
  };

  const handleTouchEnd = () => {
    if (!isSwiping) return;
    
    const deltaX = currentPosition.x - startPosition.x;
    const deltaY = currentPosition.y - startPosition.y;
    
    // Minimum swipe distance threshold
    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
      onSwipe?.(deltaX > 0 ? 'right' : 'left');
    }
    
    setIsSwiping(false);
    setCurrentPosition({ x: 0, y: 0 });
  };

  // Calculate swipe transform for visual feedback
  const swipeTransform = isSwiping 
    ? `translateX(${currentPosition.x - startPosition.x}px) rotate(${(currentPosition.x - startPosition.x) * 0.1}deg)`
    : '';

  // Add keyboard navigation
  useEffect(() => {
    if (!isActive || !onSwipe) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          onSwipe('left');
          break;
        case 'ArrowRight':
          onSwipe('right');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isActive, onSwipe]);

  const commonInterests = user.interests?.slice(0, 4) || [];

  return (
    <div className="relative w-full max-w-sm mx-auto">
      <div 
        className={`
          card-swipe aspect-[3/4] overflow-hidden rounded-2xl 
          shadow-2xl transform transition-transform duration-300
          ${isActive ? 'cursor-grab active:cursor-grabbing' : ''}
          ${!isActive ? 'opacity-60' : ''}
        `}
        style={{ transform: swipeTransform }}
        onMouseDown={isActive ? handleTouchStart : undefined}
        onMouseMove={isActive ? handleTouchMove : undefined}
        onMouseUp={isActive ? handleTouchEnd : undefined}
        onMouseLeave={isActive ? handleTouchEnd : undefined}
        onTouchStart={isActive ? handleTouchStart : undefined}
        onTouchMove={isActive ? handleTouchMove : undefined}
        onTouchEnd={isActive ? handleTouchEnd : undefined}
      >
        <div className="relative w-full h-full">
          {/* Main Image */}
          <Image
            src={user.avatar_url}
            alt={user.full_name}
            fill
            className={`object-cover transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            priority
            onLoad={() => setImageLoaded(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Loading skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse" />
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

          {/* Verified badge */}
          {user.is_verified && (
            <div className="absolute top-4 right-4 bg-blue-500 rounded-full p-2 shadow-lg">
              <Star className="w-4 h-4 text-white fill-current" />
            </div>
          )}

          {/* Online status */}
          {user.is_online && (
            <div className="absolute top-4 left-4">
              <div className="bg-green-500 rounded-full p-1.5 shadow-lg">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
            </div>
          )}
          {/* Content overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="flex items-end justify-between mb-4">
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-1">
                  {user.full_name}, {calculateAge(user.birthdate)}
                </h2>
                
                {/* Location and distance */}
                <div className="flex items-center gap-2 text-sm opacity-90 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>@{user.username}</span>
                  {user.distance && (
                    <>
                      <span className="mx-1">•</span>
                      <span>{user.distance}km away</span>
                    </>
                  )}
                </div>

                {/* Bio with expand functionality */}
                {user.bio && (
                  <div className="mb-3">
                    <p className="text-sm leading-relaxed">
                      {showFullBio ? user.bio : truncatedBio}
                      {user.bio.length > MAX_BIO_LENGTH && (
                        <button
                          onClick={() => setShowFullBio(!showFullBio)}
                          className="ml-1 text-blue-300 hover:text-blue-200 font-medium"
                        >
                          {showFullBio ? 'Show less' : 'Read more'}
                        </button>
                      )}
                    </p>
                  </div>
                )}

                {/* Interests tags */}
                {commonInterests.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {commonInterests.map((interest, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                )}

                {/* Additional details */}
                {showDetails && user.additional_info && (
                  <div className="space-y-2 text-xs">
                    {user.occupation && (
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-3 h-3" />
                        <span>{user.occupation}</span>
                      </div>
                    )}
                    {user.education && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        <span>{user.education}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Like percentage if available */}
              {user.match_percentage && (
                <div className="flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full p-3 ml-4">
                  <Heart className="w-5 h-5 text-red-400 fill-current mr-1" />
                  <span className="text-lg font-bold">{user.match_percentage}%</span>
                </div>
              )}
            </div>

            {/* Swipe hints */}
            {isActive && onSwipe && (
              <div className="flex items-center justify-between text-xs opacity-60">
                <span className="text-red-300">← Swipe to pass</span>
                <span className="text-green-300">Swipe to like →</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Swipe direction indicator */}
      {isSwiping && (
        <div 
          className={`absolute inset-0 rounded-2xl border-4 ${
            currentPosition.x - startPosition.x > 0 
              ? 'border-green-400 bg-green-400/10' 
              : 'border-red-400 bg-red-400/10'
          } pointer-events-none transition-opacity duration-200`}
          style={{ opacity: Math.min(Math.abs(currentPosition.x - startPosition.x) / 100, 0.3) }}
        />
      )}
    </div>
  );
}
