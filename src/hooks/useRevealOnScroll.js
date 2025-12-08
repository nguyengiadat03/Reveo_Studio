// useRevealOnScroll hook - Detect when element enters viewport với IntersectionObserver
import { useState, useEffect, useRef } from 'react';

const useRevealOnScroll = (options = {}) => {
    const {
        threshold = 0.1,
        rootMargin = '0px 0px -10% 0px',
        once = true,
        staggerDelay = 0
    } = options;

    const [isVisible, setIsVisible] = useState(false);
    const [progress, setProgress] = useState(0);
    const elementRef = useRef(null);
    const hasRevealed = useRef(false);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // If reduced motion, show immediately
        if (prefersReducedMotion) {
            setIsVisible(true);
            setProgress(1);
            return;
        }

        // Check IntersectionObserver support
        const hasIOSupport = 'IntersectionObserver' in window;

        if (hasIOSupport) {
            const observerCallback = (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (!hasRevealed.current || !once) {
                            setTimeout(() => {
                                setIsVisible(true);
                                setProgress(entry.intersectionRatio);
                            }, staggerDelay);

                            if (once) {
                                hasRevealed.current = true;
                            }
                        }
                    } else if (!once) {
                        setIsVisible(false);
                        setProgress(0);
                    }
                });
            };

            const observer = new IntersectionObserver(observerCallback, {
                threshold: Array.isArray(threshold) ? threshold : [threshold],
                rootMargin
            });

            observer.observe(element);

            return () => {
                observer.disconnect();
            };
        } else {
            // Fallback: throttled scroll listener
            let ticking = false;

            const checkVisibility = () => {
                if (!element) return;

                const rect = element.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                const elementTop = rect.top;
                const elementBottom = rect.bottom;

                const isInViewport = elementTop < windowHeight && elementBottom > 0;

                if (isInViewport && (!hasRevealed.current || !once)) {
                    setTimeout(() => {
                        setIsVisible(true);
                        const visibleHeight = Math.min(windowHeight - elementTop, rect.height);
                        setProgress(Math.max(0, Math.min(1, visibleHeight / rect.height)));
                    }, staggerDelay);

                    if (once) {
                        hasRevealed.current = true;
                    }
                } else if (!once && !isInViewport) {
                    setIsVisible(false);
                    setProgress(0);
                }
            };

            const handleScroll = () => {
                if (!ticking) {
                    window.requestAnimationFrame(() => {
                        checkVisibility();
                        ticking = false;
                    });
                    ticking = true;
                }
            };

            window.addEventListener('scroll', handleScroll, { passive: true });
            checkVisibility(); // Initial check

            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }
    }, [threshold, rootMargin, once, staggerDelay]);

    return { isVisible, progress, elementRef };
};

export default useRevealOnScroll;
