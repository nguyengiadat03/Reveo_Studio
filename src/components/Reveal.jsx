// Reveal component - Wrapper để reveal elements on scroll với animations
import { Children, cloneElement, isValidElement } from 'react';
import useRevealOnScroll from '../hooks/useRevealOnScroll';

const animationVariants = {
    fade: {
        initial: { opacity: 0 },
        animate: { opacity: 1 }
    },
    'slide-up': {
        initial: { opacity: 0, transform: 'translateY(var(--distance, 30px))' },
        animate: { opacity: 1, transform: 'translateY(0)' }
    },
    'slide-down': {
        initial: { opacity: 0, transform: 'translateY(calc(-1 * var(--distance, 30px)))' },
        animate: { opacity: 1, transform: 'translateY(0)' }
    },
    'slide-left': {
        initial: { opacity: 0, transform: 'translateX(var(--distance, 30px))' },
        animate: { opacity: 1, transform: 'translateX(0)' }
    },
    'slide-right': {
        initial: { opacity: 0, transform: 'translateX(calc(-1 * var(--distance, 30px)))' },
        animate: { opacity: 1, transform: 'translateX(0)' }
    },
    scale: {
        initial: { opacity: 0, transform: 'scale(0.9)' },
        animate: { opacity: 1, transform: 'scale(1)' }
    },
    'zoom-in': {
        initial: { opacity: 0, transform: 'scale(0.8)' },
        animate: { opacity: 1, transform: 'scale(1)' }
    },
    'zoom-out': {
        initial: { opacity: 0, transform: 'scale(1.1)' },
        animate: { opacity: 1, transform: 'scale(1)' }
    }
};

const Reveal = ({
    children,
    animation = 'fade',
    duration = 600,
    delay = 0,
    distance = 30,
    staggerChildren = false,
    staggerDelay = 100,
    once = true,
    threshold = 0.1,
    rootMargin = '0px 0px -10% 0px',
    className = '',
    as: Component = 'div',
    ...props
}) => {
    const { isVisible, elementRef } = useRevealOnScroll({
        threshold,
        rootMargin,
        once,
        staggerDelay: delay
    });

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const variant = animationVariants[animation] || animationVariants.fade;

    // Get styles based on visibility
    const getStyles = (isRevealed, childDelay = 0) => {
        const baseStyles = {
            '--distance': `${distance}px`,
            transition: prefersReducedMotion
                ? 'none'
                : `opacity ${duration}ms ease-out ${childDelay}ms, transform ${duration}ms ease-out ${childDelay}ms`,
            willChange: isRevealed ? 'auto' : 'opacity, transform'
        };

        if (prefersReducedMotion || isRevealed) {
            return {
                ...baseStyles,
                ...variant.animate
            };
        }

        return {
            ...baseStyles,
            ...variant.initial
        };
    };

    // Handle stagger children
    const renderChildren = () => {
        if (!staggerChildren) {
            return children;
        }

        const childrenArray = Children.toArray(children);

        return childrenArray.map((child, index) => {
            if (!isValidElement(child)) return child;

            const childDelay = delay + (index * staggerDelay);
            const childStyles = getStyles(isVisible, childDelay);

            return cloneElement(child, {
                ...child.props,
                style: {
                    ...childStyles,
                    ...child.props.style
                }
            });
        });
    };

    return (
        <Component
            ref={elementRef}
            className={className}
            style={staggerChildren ? {} : getStyles(isVisible, delay)}
            {...props}
        >
            {renderChildren()}
        </Component>
    );
};

export default Reveal;
