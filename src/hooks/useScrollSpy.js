// useScrollSpy hook - Track active section với IntersectionObserver và fallback scroll listener
import { useState, useEffect, useRef } from 'react';

const useScrollSpy = (sectionIds = [], options = {}) => {
    const {
        rootMargin = '-20% 0px -35% 0px', // Top 20%, bottom 35% trigger zone
        threshold = 0,
        offset = 80 // Header height offset
    } = options;

    const [activeId, setActiveId] = useState('');
    const [progress, setProgress] = useState(0);
    const observerRef = useRef(null);
    const sectionsRef = useRef({});

    useEffect(() => {
        // Check IntersectionObserver support
        const hasIOSupport = 'IntersectionObserver' in window;

        if (hasIOSupport) {
            // IntersectionObserver implementation
            const observerCallback = (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute('id') || entry.target.getAttribute('data-scroll-id');
                        if (id) {
                            setActiveId(id);

                            // Calculate progress within section
                            const rect = entry.target.getBoundingClientRect();
                            const sectionHeight = rect.height;
                            const viewportHeight = window.innerHeight;
                            const sectionTop = rect.top;
                            const visibleHeight = Math.min(viewportHeight - sectionTop, sectionHeight);
                            const sectionProgress = Math.max(0, Math.min(1, visibleHeight / sectionHeight));
                            setProgress(sectionProgress);
                        }
                    }
                });
            };

            observerRef.current = new IntersectionObserver(observerCallback, {
                rootMargin,
                threshold
            });

            // Observe all sections
            sectionIds.forEach((id) => {
                const element = document.getElementById(id) || document.querySelector(`[data-scroll-id="${id}"]`);
                if (element) {
                    sectionsRef.current[id] = element;
                    observerRef.current.observe(element);
                }
            });

            return () => {
                if (observerRef.current) {
                    observerRef.current.disconnect();
                }
            };
        } else {
            // Fallback: throttled scroll listener
            let ticking = false;

            const handleScroll = () => {
                if (!ticking) {
                    window.requestAnimationFrame(() => {
                        const scrollPosition = window.scrollY + offset;

                        // Find active section
                        let currentId = '';
                        let currentProgress = 0;

                        sectionIds.forEach((id) => {
                            const element = document.getElementById(id) || document.querySelector(`[data-scroll-id="${id}"]`);
                            if (element) {
                                const rect = element.getBoundingClientRect();
                                const elementTop = rect.top + window.scrollY;
                                const elementBottom = elementTop + rect.height;

                                if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
                                    currentId = id;
                                    const sectionScroll = scrollPosition - elementTop;
                                    currentProgress = Math.max(0, Math.min(1, sectionScroll / rect.height));
                                }
                            }
                        });

                        if (currentId) {
                            setActiveId(currentId);
                            setProgress(currentProgress);
                        }

                        ticking = false;
                    });

                    ticking = true;
                }
            };

            window.addEventListener('scroll', handleScroll, { passive: true });
            handleScroll(); // Initial check

            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }
    }, [sectionIds, rootMargin, threshold, offset]);

    return { activeId, progress };
};

export default useScrollSpy;
