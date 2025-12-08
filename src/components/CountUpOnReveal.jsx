// CountUpOnReveal component - Counter với count-up animation khi reveal
import { useState, useEffect } from 'react';
import useRevealOnScroll from '../hooks/useRevealOnScroll';

const CountUpOnReveal = ({
    start = 0,
    end,
    duration = 2000,
    suffix = '',
    prefix = '',
    decimals = 0,
    separator = ',',
    className = '',
    ...props
}) => {
    const [count, setCount] = useState(start);
    const { isVisible, elementRef } = useRevealOnScroll({
        threshold: 0.3,
        once: true
    });

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    useEffect(() => {
        if (!isVisible) return;

        // If reduced motion, show final value immediately
        if (prefersReducedMotion) {
            setCount(end);
            return;
        }

        const startTime = Date.now();
        const startValue = start;
        const endValue = end;
        const range = endValue - startValue;

        const animate = () => {
            const now = Date.now();
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (easeOutExpo)
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

            const currentValue = startValue + (range * easeProgress);
            setCount(currentValue);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setCount(endValue);
            }
        };

        requestAnimationFrame(animate);
    }, [isVisible, start, end, duration, prefersReducedMotion]);

    const formatNumber = (num) => {
        const fixed = num.toFixed(decimals);
        const parts = fixed.split('.');

        // Add thousand separators
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);

        return parts.join('.');
    };

    const formatDisplay = (num) => {
        // Format large numbers (K, M, B)
        if (num >= 1000000000) {
            return `${(num / 1000000000).toFixed(1)}B`;
        } else if (num >= 1000000) {
            return `${(num / 1000000).toFixed(1)}M`;
        } else if (num >= 1000) {
            return `${(num / 1000).toFixed(decimals)}K`;
        }
        return formatNumber(num);
    };

    return (
        <span
            ref={elementRef}
            className={className}
            {...props}
        >
            {prefix}{formatDisplay(count)}{suffix}
        </span>
    );
};

export default CountUpOnReveal;
