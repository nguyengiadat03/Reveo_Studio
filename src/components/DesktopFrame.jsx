// DesktopFrame component - Desktop PC mockup với monitor và video player
import { useState, useRef, useEffect } from 'react';

const DesktopFrame = ({
    videoSrc,
    posterSrc,
    alt = 'Video demo',
    className = ''
}) => {
    const [isPlaying, setIsPlaying] = useState(true);
    const [showPauseIcon, setShowPauseIcon] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const videoRef = useRef(null);
    const frameRef = useRef(null);
    const hideIconTimeoutRef = useRef(null);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (frameRef.current) {
            observer.observe(frameRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (isInView && videoRef.current && !prefersReducedMotion) {
            videoRef.current.play().catch(() => {
                setIsPlaying(false);
            });
        }
    }, [isInView, prefersReducedMotion]);

    const handleVideoClick = () => {
        if (!videoRef.current) return;

        if (hideIconTimeoutRef.current) {
            clearTimeout(hideIconTimeoutRef.current);
        }

        if (isPlaying) {
            videoRef.current.pause();
            setIsPlaying(false);
            setShowPauseIcon(true);
        } else {
            videoRef.current.play();
            setIsPlaying(true);
            setShowPauseIcon(true);

            hideIconTimeoutRef.current = setTimeout(() => {
                setShowPauseIcon(false);
            }, 1000);
        }
    };

    useEffect(() => {
        return () => {
            if (hideIconTimeoutRef.current) {
                clearTimeout(hideIconTimeoutRef.current);
            }
        };
    }, []);

    return (
        <div
            ref={frameRef}
            className={`relative ${className}`}
        >
            <div className="relative mx-auto" style={{ maxWidth: '720px' }}>
                <div className="relative">
                    <div className="relative bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-t-2xl p-3 shadow-2xl">
                        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-700 rounded-full border border-gray-600"></div>

                        <div className="relative bg-black rounded-xl overflow-hidden aspect-[16/10]">
                            <div className="absolute inset-0">
                                {isInView ? (
                                    <video
                                        ref={videoRef}
                                        className="w-full h-full object-cover cursor-pointer"
                                        playsInline
                                        muted
                                        loop
                                        autoPlay={!prefersReducedMotion}
                                        preload="metadata"
                                        poster={posterSrc}
                                        aria-label={alt}
                                        onClick={handleVideoClick}
                                    >
                                        <source src={videoSrc} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                ) : (
                                    <img
                                        src={posterSrc}
                                        alt={alt}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                )}
                            </div>

                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-black/5 pointer-events-none"></div>

                            {showPauseIcon && (
                                <div
                                    className={`absolute inset-0 flex items-center justify-center pointer-events-none z-20 transition-opacity duration-300 ${showPauseIcon ? 'opacity-100' : 'opacity-0'
                                        }`}
                                >
                                    <div className="w-20 h-20 bg-black/35 rounded-full flex items-center justify-center backdrop-blur-sm">
                                        {isPlaying ? (
                                            <svg className="w-10 h-10 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        ) : (
                                            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                                            </svg>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="relative flex justify-center">
                        <div className="w-16 h-8 bg-gradient-to-b from-gray-800 to-gray-900"></div>
                    </div>

                    <div className="flex justify-center">
                        <div className="w-32 h-3 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-b-lg shadow-lg"></div>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-t-2xl pointer-events-none"></div>
                </div>
            </div>
        </div>
    );
};

export default DesktopFrame;
