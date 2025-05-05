"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize,
  SkipBack,
  SkipForward,
  Settings,
  Video
} from 'lucide-react';

interface VideoShowcaseProps {
  title: string;
  description: string;
  videoSrc: string;
  posterSrc?: string;
}

const VideoShowcase: React.FC<VideoShowcaseProps> = ({ 
  title, 
  description, 
  videoSrc, 
  posterSrc 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false);
  const [showVolume, setShowVolume] = useState(false);
  const [posterError, setPosterError] = useState(false);
  const [videoError, setVideoError] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const hideControlsTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Format time from seconds to MM:SS
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Toggle play/pause
  const togglePlay = () => {
    if (!videoRef.current || videoError) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(err => {
        console.error("Error playing video:", err);
        setVideoError(true);
      });
      setHasStartedPlaying(true);
    }
    setIsPlaying(!isPlaying);
  };
  
  // Skip forward/backward
  const skipTime = (seconds: number) => {
    if (!videoRef.current || videoError) return;
    videoRef.current.currentTime += seconds;
  };
  
  // Update progress bar
  const updateProgress = () => {
    if (!videoRef.current) return;
    const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setProgress(currentProgress);
    setCurrentTime(videoRef.current.currentTime);
  };
  
  // Set video time on progress bar click
  const setVideoTime = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !videoRef.current || videoError) return;
    
    const rect = progressBarRef.current.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pos * videoRef.current.duration;
  };
  
  // Toggle mute
  const toggleMute = () => {
    if (!videoRef.current || videoError) return;
    
    if (isMuted) {
      videoRef.current.volume = volume;
      setIsMuted(false);
    } else {
      videoRef.current.volume = 0;
      setIsMuted(true);
    }
  };
  
  // Change volume
  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    if (!videoRef.current || videoError) return;
    
    videoRef.current.volume = newVolume;
    setVolume(newVolume);
    
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };
  
  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };
  
  // Handle video error
  const handleVideoError = () => {
    setVideoError(true);
    console.error("Video failed to load:", videoSrc);
  };
  
  // Handle poster error
  const handlePosterError = () => {
    setPosterError(true);
    console.error("Poster image failed to load:", posterSrc);
  };
  
  // Auto-hide controls when video is playing
  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true);
      
      if (hideControlsTimerRef.current) {
        clearTimeout(hideControlsTimerRef.current);
      }
      
      if (isPlaying) {
        hideControlsTimerRef.current = setTimeout(() => {
          setShowControls(false);
        }, 3000);
      }
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', () => {
        if (isPlaying) setShowControls(false);
      });
      container.addEventListener('mouseenter', () => {
        setShowControls(true);
      });
    }
    
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', () => {});
        container.removeEventListener('mouseenter', () => {});
      }
      
      if (hideControlsTimerRef.current) {
        clearTimeout(hideControlsTimerRef.current);
      }
    };
  }, [isPlaying]);
  
  // Set duration when video metadata is loaded
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };
    
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    
    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);
  
  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);
  
  // Video ended event handler
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
      video.currentTime = 0;
    };
    
    video.addEventListener('ended', handleEnded);
    
    return () => {
      video.removeEventListener('ended', handleEnded);
    };
  }, []);
  
  // Generate a placeholder for when the poster is not available
  const renderPlaceholder = () => (
    <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex flex-col items-center justify-center p-6">
      <Video className="w-20 h-20 text-blue-500 mb-4" />
      <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{title}</h3>
      <p className="text-slate-300 text-center max-w-md">{description}</p>
    </div>
  );
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div 
        ref={containerRef} 
        className="relative rounded-xl overflow-hidden bg-black shadow-2xl aspect-video"
      >
        {/* Video element */}
        {!videoError ? (
          <video 
            ref={videoRef}
            className="w-full h-full object-contain"
            poster={posterSrc}
            onTimeUpdate={updateProgress}
            onClick={togglePlay}
            preload="metadata"
            onError={handleVideoError}
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          renderPlaceholder()
        )}
        
        {/* Play button overlay (shown when video isn't playing) */}
        {!isPlaying && !hasStartedPlaying && !videoError && (
          <div 
            className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
            onClick={togglePlay}
          >
            <motion.div 
              className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <Play size={36} className="text-white ml-1" />
            </motion.div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="text-xl font-bold mb-2">{title}</h3>
              <p className="text-sm text-white/80">{description}</p>
            </div>
          </div>
        )}
        
        {/* Video controls */}
        <AnimatePresence>
          {((showControls || !isPlaying) && hasStartedPlaying && !videoError) && (
            <motion.div 
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              {/* Progress bar */}
              <div 
                ref={progressBarRef}
                className="h-1.5 w-full bg-white/30 rounded-full mb-4 relative cursor-pointer"
                onClick={setVideoTime}
              >
                <div 
                  className="h-full bg-blue-600 rounded-full relative"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-blue-600 rounded-full transform translate-x-1/2"></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Play/Pause button */}
                  <button 
                    className="text-white focus:outline-none"
                    onClick={togglePlay}
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                  </button>
                  
                  {/* Skip backward button */}
                  <button 
                    className="text-white focus:outline-none hidden sm:block"
                    onClick={() => skipTime(-10)}
                    aria-label="Skip backward 10 seconds"
                  >
                    <SkipBack size={18} />
                  </button>
                  
                  {/* Skip forward button */}
                  <button 
                    className="text-white focus:outline-none hidden sm:block"
                    onClick={() => skipTime(10)}
                    aria-label="Skip forward 10 seconds"
                  >
                    <SkipForward size={18} />
                  </button>
                  
                  {/* Volume control */}
                  <div 
                    className="relative flex items-center"
                    onMouseEnter={() => setShowVolume(true)}
                    onMouseLeave={() => setShowVolume(false)}
                  >
                    <button 
                      className="text-white focus:outline-none"
                      onClick={toggleMute}
                      aria-label={isMuted ? "Unmute" : "Mute"}
                    >
                      {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>
                    
                    <AnimatePresence>
                      {showVolume && (
                        <motion.div 
                          className="absolute left-8 bottom-0 bg-black/80 px-2 py-1 rounded-md"
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: 100 }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={isMuted ? 0 : volume}
                            onChange={changeVolume}
                            className="w-full h-1 bg-white/30 rounded-full outline-none appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  {/* Time display */}
                  <div className="text-white text-xs">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  {/* Settings button */}
                  <button 
                    className="text-white focus:outline-none hidden sm:block"
                    aria-label="Settings"
                  >
                    <Settings size={18} />
                  </button>
                  
                  {/* Fullscreen button */}
                  <button 
                    className="text-white focus:outline-none"
                    onClick={toggleFullscreen}
                    aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                  >
                    {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Video error message */}
        {videoError && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-red-500/90 text-white text-sm">
            Video yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoShowcase; 