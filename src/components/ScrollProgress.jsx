// ScrollProgress component - Thin progress bar showing scroll progress
import { useState, useEffect } from 'react';

const ScrollProgress = ({ type = 'global', sectionId = null }) => {
    const [progress, setProgress] = useState(0);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    useEffect(() => {
        let ticking = false;

        const calculateProgress = () => {
            if (type === 'global') {
                // Global page scroll progress
                const windowHeight = window.innerHeight;
                const documentHeight = document.documentElement.scrollHeight;
                const scrollTop = window.scrollY;
                const scrollableHeight = documentHeight - windowHeight;
                const scrollProgress = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0;
                setProgress(Math.min(100, Math.max(0, scrollProgress)));
            } else if (type === 'section' && sectionId) {
                // Section-specific progress
                const element = document.getElementById(sectionId);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    const elementTop = rect.top + window.scrollY;
                    const elementHeight = rect.height;
                    const scrollTop = window.scrollY;
                    const viewportHeight = window.innerHeight;

                    // Progress within section
                    const sectionStart = elementTop;
                    const sectionEnd = elementTop + elementHeight;
                    const viewportTop = scrollTop;
                    const viewportBottom = scrollTop + viewportHeight;

                    if (viewportTop >= sectionStart && viewportTop <= sectionEnd) {
                        const sectionProgress = ((viewportTop - sectionStart) / elementHeight) * 100;
                        setProgress(Math.min(100, Math.max(0, sectionProgress)));
                    }
                }
            }
        };

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    calculateProgress();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        calculateProgress(); // Initial calculation

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [type, sectionId]);

    return (
        <div
            className="fixed top-0 left-0 right-0 z-[10001] h-1 bg-transparent pointer-events-none"
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin="0"
            aria-valuemax="100"
            aria-label="Page scroll progress"
        >
            <div
                className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 shadow-lg"
                style={{
                    width: `${progress}%`,
                    transition: prefersReducedMotion ? 'none' : 'width 0.1s ease-out'
                }}
            />
        </div>
    );
};

export default ScrollProgress;
