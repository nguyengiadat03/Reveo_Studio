// useSmoothHashNavigation hook - Smooth scroll to hash và update URL without spam history
import { useEffect } from 'react';

const useSmoothHashNavigation = (options = {}) => {
    const {
        offset = 80, // Header height
        behavior = 'smooth',
        updateHash = true
    } = options;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scrollBehavior = prefersReducedMotion ? 'auto' : behavior;

    useEffect(() => {
        // Handle initial hash on page load
        const handleInitialHash = () => {
            const hash = window.location.hash;
            if (hash) {
                const id = hash.replace('#', '');
                const element = document.getElementById(id);
                if (element) {
                    setTimeout(() => {
                        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                        const offsetPosition = elementPosition - offset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: scrollBehavior
                        });
                    }, 100); // Small delay to ensure page is loaded
                }
            }
        };

        handleInitialHash();

        // Handle hash changes (browser back/forward)
        const handleHashChange = () => {
            const hash = window.location.hash;
            if (hash) {
                const id = hash.replace('#', '');
                const element = document.getElementById(id);
                if (element) {
                    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                    const offsetPosition = elementPosition - offset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: scrollBehavior
                    });
                }
            }
        };

        window.addEventListener('hashchange', handleHashChange);

        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, [offset, scrollBehavior]);

    // Function to scroll to section and update hash
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: scrollBehavior
            });

            // Update hash without adding to history
            if (updateHash) {
                const newHash = `#${sectionId}`;
                if (window.location.hash !== newHash) {
                    window.history.replaceState(null, '', newHash);
                }
            }
        }
    };

    // Function to update hash when scrolling (called from ScrollSpy)
    const updateHashOnScroll = (sectionId) => {
        if (updateHash && sectionId) {
            const newHash = `#${sectionId}`;
            if (window.location.hash !== newHash) {
                window.history.replaceState(null, '', newHash);
            }
        }
    };

    return { scrollToSection, updateHashOnScroll };
};

export default useSmoothHashNavigation;
