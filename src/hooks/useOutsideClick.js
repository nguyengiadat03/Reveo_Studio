// useOutsideClick hook - Detect clicks outside element to close panel
import { useEffect } from 'react';

const useOutsideClick = (ref, handler, enabled = true) => {
    useEffect(() => {
        if (!enabled) return;

        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                handler();
            }
        };

        const handleEscapeKey = (event) => {
            if (event.key === 'Escape') {
                handler();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);
        document.addEventListener('keydown', handleEscapeKey);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [ref, handler, enabled]);
};

export default useOutsideClick;
