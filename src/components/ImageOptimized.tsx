
import { useState } from "react";
import { cn } from "@/lib/utils";
import LoadingSpinner from "./LoadingSpinner";

interface ImageOptimizedProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

const ImageOptimized = ({ 
  src, 
  alt, 
  className, 
  fallbackSrc = '/placeholder.svg',
  priority = false,
  onLoad,
  onError 
}: ImageOptimizedProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  const handleLoad = () => {
    setLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    if (currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setError(false);
    } else {
      setError(true);
      setLoading(false);
    }
    onError?.();
  };

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <LoadingSpinner size="sm" />
        </div>
      )}
      
      <img
        src={currentSrc}
        alt={alt}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-300",
          loading ? "opacity-0" : "opacity-100",
          error ? "opacity-50" : "",
          className
        )}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
      />
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center text-gray-500 text-sm">
            <div className="w-12 h-12 mx-auto mb-2 bg-gray-200 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            Image unavailable
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageOptimized;
