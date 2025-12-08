// Custom hook để detect scroll direction với GSAP-compatible logic
import { useState, useEffect } from "react";

const useScrollDirection = () => {
    const [scrollDirection, setScrollDirection] = useState("up");
    const [prevScrollY, setPrevScrollY] = useState(0);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (prefersReducedMotion) {
            return; // Don't hide header if user prefers reduced motion
        }

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > prevScrollY && currentScrollY > 150) {
                // Scrolling down & past threshold
                setScrollDirection("down");
            } else if (currentScrollY < prevScrollY) {
                // Scrolling up
                setScrollDirection("up");
            }

            setPrevScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [prevScrollY]);

    return scrollDirection;
};

export default useScrollDirection;
