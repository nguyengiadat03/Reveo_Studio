// Custom hook để lock/unlock body scroll khi mobile menu mở
import { useEffect } from 'react';

const useLockBodyScroll = (isLocked) => {
    useEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).overflow;
        const originalPaddingRight = window.getComputedStyle(document.body).paddingRight;

        if (isLocked) {
            // Prevent scroll bar jump
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        } else {
            document.body.style.overflow = originalStyle;
            document.body.style.paddingRight = originalPaddingRight;
        }

        // Cleanup on unmount
        return () => {
            document.body.style.overflow = originalStyle;
            document.body.style.paddingRight = originalPaddingRight;
        };
    }, [isLocked]);
};

export default useLockBodyScroll;
