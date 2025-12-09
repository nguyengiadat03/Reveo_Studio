// Example: Responsive Header Component using CSS Variables
// This demonstrates how to use the responsive design system

import { useState, useEffect } from 'react';
import './responsive-vars.css'; // Import CSS variables

const ResponsiveHeaderExample = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Handle scroll to add shadow/background
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    const navItems = [
        { id: 1, label: 'Templates', href: '#templates' },
        { id: 2, label: 'Features', href: '#features' },
        { id: 3, label: 'Pricing', href: '#pricing' },
        { id: 4, label: 'Guide', href: '#guide' },
        { id: 5, label: 'Contact', href: '#contact' },
    ];

    return (
        <>
            {/* Header using CSS variables */}
            <header
                className={`
          fixed top-0 left-0 right-0
          transition-all duration-300
          ${isScrolled ? 'shadow-md bg-white' : 'bg-white/95 backdrop-blur-sm'}
        `}
                style={{
                    height: 'var(--nav-height)',
                    zIndex: 'var(--z-sticky)',
                }}
            >
                <div className="container-responsive h-full">
                    <nav className="flex items-center justify-between h-full">

                        {/* Logo */}
                        <a
                            href="#home"
                            className="flex items-center gap-2 z-10"
                            aria-label="Home"
                        >
                            <div
                                className="rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center"
                                style={{
                                    width: 'var(--logo-size)',
                                    height: 'var(--logo-size)',
                                    padding: 'var(--logo-padding)',
                                }}
                            >
                                <span className="text-white font-bold text-sm">R</span>
                            </div>
                            <span
                                className="font-bold text-gray-900"
                                style={{ fontSize: 'var(--font-size-lg)' }}
                            >
                                ReVeo
                            </span>
                        </a>

                        {/* Desktop Navigation */}
                        <div
                            className="hidden lg:flex items-center bg-gray-900 rounded-full shadow-lg"
                            style={{
                                height: 'calc(var(--nav-height) - 16px)',
                                gap: 'var(--nav-item-gap)',
                                padding: '0 var(--space-2)',
                            }}
                        >
                            {navItems.map((item) => (
                                <a
                                    key={item.id}
                                    href={item.href}
                                    className="
                    px-4 py-2 rounded-full
                    text-white font-semibold uppercase
                    hover:bg-white hover:text-gray-900
                    transition-all duration-200
                  "
                                    style={{
                                        fontSize: 'var(--nav-item-font-size)',
                                        minHeight: 'var(--nav-item-height)',
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>

                        {/* CTA Button (Desktop) */}
                        <button
                            className="
                hidden lg:flex items-center justify-center
                bg-gradient-to-r from-blue-500 to-purple-600
                text-white font-semibold rounded-lg
                hover:shadow-lg hover:scale-105
                transition-all duration-200
              "
                            style={{
                                minHeight: 'var(--btn-height-md)',
                                paddingLeft: 'var(--btn-px-lg)',
                                paddingRight: 'var(--btn-px-lg)',
                                fontSize: 'var(--btn-font-size)',
                            }}
                        >
                            Get Started
                        </button>

                        {/* Mobile Hamburger */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="
                lg:hidden flex flex-col items-center justify-center
                bg-gray-900 rounded-full
                transition-all duration-200
              "
                            style={{
                                width: 'var(--hamburger-size)',
                                height: 'var(--hamburger-size)',
                                gap: '4px',
                            }}
                            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={isMenuOpen}
                        >
                            <span
                                className={`
                  bg-white rounded-full transition-all duration-300
                  ${isMenuOpen ? 'rotate-45 translate-y-[6px]' : ''}
                `}
                                style={{
                                    width: 'var(--hamburger-line-width)',
                                    height: 'var(--hamburger-line-height)',
                                }}
                            />
                            <span
                                className={`
                  bg-white rounded-full transition-all duration-300
                  ${isMenuOpen ? '-rotate-45 -translate-y-[6px]' : ''}
                `}
                                style={{
                                    width: 'var(--hamburger-line-width)',
                                    height: 'var(--hamburger-line-height)',
                                }}
                            />
                        </button>

                    </nav>
                </div>
            </header>

            {/* Mobile Menu */}
            <div
                className={`
          lg:hidden fixed inset-0
          transition-all duration-300
          ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
        `}
                style={{
                    zIndex: 'var(--z-modal)',
                    paddingTop: 'calc(var(--nav-height) + 16px)',
                }}
            >
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    onClick={() => setIsMenuOpen(false)}
                />

                {/* Menu Content */}
                <div
                    className={`
            relative bg-white rounded-3xl mx-4 shadow-2xl
            transform transition-all duration-300
            ${isMenuOpen ? 'translate-y-0 scale-100' : '-translate-y-4 scale-95'}
          `}
                    style={{
                        padding: 'var(--space-4)',
                        maxHeight: 'calc(100vh - var(--nav-height) - 32px)',
                        overflowY: 'auto',
                    }}
                >
                    <nav className="flex flex-col" style={{ gap: 'var(--space-2)' }}>
                        {navItems.map((item) => (
                            <a
                                key={item.id}
                                href={item.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="
                  block px-4 py-3 rounded-2xl
                  bg-gray-900 text-white
                  font-semibold uppercase text-center
                  hover:bg-gray-800
                  transition-colors duration-200
                "
                                style={{
                                    fontSize: 'var(--font-size-sm)',
                                    minHeight: 'var(--touch-target-min)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                {item.label}
                            </a>
                        ))}

                        {/* Mobile CTA */}
                        <button
                            className="
                mt-4 px-6 py-3 rounded-lg
                bg-gradient-to-r from-blue-500 to-purple-600
                text-white font-bold text-center
                hover:shadow-lg
                transition-all duration-200
              "
                            style={{
                                minHeight: 'var(--btn-height-lg)',
                                fontSize: 'var(--font-size-base)',
                            }}
                        >
                            Get Started
                        </button>
                    </nav>
                </div>
            </div>

            {/* Spacer to prevent content from going under fixed header */}
            <div style={{ height: 'var(--nav-height)' }} />
        </>
    );
};

export default ResponsiveHeaderExample;

/**
 * USAGE NOTES:
 * 
 * 1. Import the responsive-vars.css file in your main CSS/index.css:
 *    @import './styles/responsive-vars.css';
 * 
 * 2. All sizing uses CSS variables that automatically adapt:
 *    - Mobile: --nav-height = 48px, --logo-size = 32px
 *    - Tablet: --nav-height = 56px, --logo-size = 40px
 *    - Desktop: --nav-height = 64px, --logo-size = 44px
 * 
 * 3. Touch targets automatically meet 44px minimum via --touch-target-min
 * 
 * 4. Spacing uses the consistent scale: --space-1 through --space-32
 * 
 * 5. All transitions respect prefers-reduced-motion (defined in vars.css)
 * 
 * 6. Component is fully accessible:
 *    - Semantic HTML (header, nav)
 *    - ARIA labels (aria-label, aria-expanded)
 *    - Keyboard navigable
 *    - Focus states visible
 * 
 * 7. Mobile menu locks body scroll when open
 * 
 * 8. Responsive breakpoints handled by Tailwind classes (lg:hidden, lg:flex)
 */
