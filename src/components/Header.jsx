// Header component - Fixed mobile menu visibility, ScrollSpy integration, responsive optimization
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

import { reveo } from '../assets';
import { navigation } from '../constants';
import Button from './Button';
import useScrollDirection from '../hooks/useScrollDirection';
import useLockBodyScroll from '../hooks/useLockBodyScroll';
import useSmoothHashNavigation from '../hooks/useSmoothHashNavigation';

const Header = ({ activeId = '' }) => {
  const [openNavigation, setOpenNavigation] = useState(false);
  const scrollDirection = useScrollDirection();
  const { scrollToSection } = useSmoothHashNavigation({ offset: 80 });

  const circleRefs = useRef([]);
  const tlRefs = useRef([]);
  const activeTweenRefs = useRef([]);
  const logoImgRef = useRef(null);
  const logoTweenRef = useRef(null);
  const hamburgerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navItemsRef = useRef(null);
  const logoRef = useRef(null);
  const headerRef = useRef(null);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ease = 'power3.out';

  // Lock body scroll when mobile menu is open
  useLockBodyScroll(openNavigation);

  // GSAP hide-on-scroll animation
  useEffect(() => {
    if (!headerRef.current || prefersReducedMotion) return;

    if (scrollDirection === 'down') {
      gsap.to(headerRef.current, {
        y: '-100%',
        duration: 0.3,
        ease: 'power2.inOut'
      });
    } else {
      gsap.to(headerRef.current, {
        y: '0%',
        duration: 0.3,
        ease: 'power2.inOut'
      });
    }
  }, [scrollDirection, prefersReducedMotion]);

  // Layout and animation setup for pill hover effects
  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach((circle, index) => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`
        });

        const label = pill.querySelector('.pill-label');
        const hoverLabel = pill.querySelector('.pill-label-hover');

        if (label) gsap.set(label, { y: 0 });
        if (hoverLabel) gsap.set(hoverLabel, { y: h + 12, opacity: 0 });

        tlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });

        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: 'auto' }, 0);

        if (label) {
          tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: 'auto' }, 0);
        }

        if (hoverLabel) {
          gsap.set(hoverLabel, { y: Math.ceil(h + 100), opacity: 0 });
          tl.to(hoverLabel, { y: 0, opacity: 1, duration: 2, ease, overwrite: 'auto' }, 0);
        }

        tlRefs.current[index] = tl;
      });
    };

    layout();

    const onResize = () => layout();
    window.addEventListener('resize', onResize);

    if (document.fonts) {
      document.fonts.ready.then(layout).catch(() => { });
    }

    // Initial load animation
    const logo = logoRef.current;
    const navItems = navItemsRef.current;

    if (logo && !prefersReducedMotion) {
      gsap.set(logo, { scale: 0 });
      gsap.to(logo, { scale: 1, duration: 0.6, ease });
    }

    if (navItems && !prefersReducedMotion) {
      gsap.set(navItems, { width: 0, overflow: 'hidden' });
      gsap.to(navItems, { width: 'auto', duration: 0.6, ease, delay: 0.2 });
    }

    return () => window.removeEventListener('resize', onResize);
  }, [navigation, ease, prefersReducedMotion]);

  const handleEnter = (i) => {
    if (prefersReducedMotion) return;
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.3,
      ease,
      overwrite: 'auto'
    });
  };

  const handleLeave = (i) => {
    if (prefersReducedMotion) return;
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, {
      duration: 0.2,
      ease,
      overwrite: 'auto'
    });
  };

  const handleLogoEnter = () => {
    if (prefersReducedMotion) return;
    const img = logoImgRef.current;
    if (!img) return;
    logoTweenRef.current?.kill();
    gsap.set(img, { rotate: 0 });
    logoTweenRef.current = gsap.to(img, {
      rotate: 360,
      duration: 0.6,
      ease,
      overwrite: 'auto'
    });
  };

  const toggleNavigation = () => {
    const newState = !openNavigation;
    setOpenNavigation(newState);

    const hamburger = hamburgerRef.current;
    const menu = mobileMenuRef.current;

    if (hamburger) {
      const lines = hamburger.querySelectorAll('.hamburger-line');
      if (newState) {
        gsap.to(lines[0], { rotation: 45, y: 3, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3, ease });
      } else {
        gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease });
      }
    }

    if (menu) {
      if (newState) {
        gsap.set(menu, { display: 'block', visibility: 'visible' });
        gsap.fromTo(
          menu,
          { opacity: 0, y: -20, scaleY: 0.95 },
          {
            opacity: 1,
            y: 0,
            scaleY: 1,
            duration: 0.3,
            ease,
            transformOrigin: 'top center'
          }
        );
      } else {
        gsap.to(menu, {
          opacity: 0,
          y: -20,
          scaleY: 0.95,
          duration: 0.2,
          ease,
          transformOrigin: 'top center',
          onComplete: () => {
            gsap.set(menu, { display: 'none', visibility: 'hidden' });
          }
        });
      }
    }
  };

  const handleClick = () => {
    if (!openNavigation) return;
    setOpenNavigation(false);

    const menu = mobileMenuRef.current;
    const hamburger = hamburgerRef.current;

    if (hamburger) {
      const lines = hamburger.querySelectorAll('.hamburger-line');
      gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease });
      gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease });
    }

    if (menu) {
      gsap.to(menu, {
        opacity: 0,
        y: -20,
        scaleY: 0.95,
        duration: 0.2,
        ease,
        onComplete: () => {
          gsap.set(menu, { display: 'none', visibility: 'hidden' });
        }
      });
    }
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 w-full z-[9999]"
      style={{
        '--base': '#fff',
        '--pill-bg': '#1a1a2e',
        '--hover-text': '#1a1a2e',
        '--pill-text': '#fff'
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-3 sm:py-4">
        <nav
          className="flex items-center justify-between"
          role="navigation"
          aria-label="Main navigation"
        >
          {/* Logo + Brand Name */}
          <a
            href="#hero"
            aria-label="ReVeo Studio Home"
            onMouseEnter={handleLogoEnter}
            ref={logoRef}
            className="flex items-center gap-2 sm:gap-3 z-10"
          >
            <div
              className="rounded-full p-1.5 sm:p-2 inline-flex items-center justify-center overflow-hidden bg-white shadow-lg flex-shrink-0"
              style={{
                width: 'clamp(40px, 10vw, 56px)',
                height: 'clamp(40px, 10vw, 56px)'
              }}
            >
              <img
                src={reveo}
                alt="ReVeo Studio"
                ref={logoImgRef}
                className="w-full h-full object-cover block"
              />
            </div>
            <span className="text-white text-base sm:text-lg md:text-xl font-bold tracking-tight">
              ReVeo
            </span>
          </a>

          {/* Desktop Navigation */}
          <div
            ref={navItemsRef}
            className="relative items-center rounded-full hidden lg:flex ml-4 bg-white shadow-lg"
            style={{
              height: 'clamp(48px, 5vw, 64px)'
            }}
          >
            <ul
              role="menubar"
              className="list-none flex items-stretch m-0 p-[3px] h-full gap-2"
            >
              {navigation.map((item, i) => {
                // Extract section ID from URL hash
                const sectionId = item.url.replace('#', '');
                const isActive = activeId === sectionId;

                return (
                  <li key={item.id} role="none" className="flex h-full">
                    <a
                      role="menuitem"
                      href={item.url}
                      className="relative overflow-hidden inline-flex items-center justify-center h-full no-underline rounded-full box-border font-semibold text-sm lg:text-[15px] leading-[1] uppercase tracking-[0.2px] whitespace-nowrap cursor-pointer px-4 lg:px-5"
                      style={{
                        background: 'var(--pill-bg)',
                        color: 'var(--pill-text)'
                      }}
                      aria-label={item.title}
                      aria-current={isActive ? 'page' : undefined}
                      onMouseEnter={() => handleEnter(i)}
                      onMouseLeave={() => handleLeave(i)}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(sectionId);
                        handleClick();
                      }}
                    >
                      {/* Hover circle */}
                      <span
                        className="absolute left-1/2 bottom-0 rounded-full z-[1] block pointer-events-none"
                        style={{
                          background: 'var(--base)',
                          willChange: 'transform'
                        }}
                        aria-hidden="true"
                        ref={el => {
                          circleRefs.current[i] = el;
                        }}
                      />

                      {/* Label stack */}
                      <span className="relative inline-block leading-[1] z-[2]">
                        <span
                          className="pill-label relative z-[2] inline-block leading-[1]"
                          style={{ willChange: 'transform' }}
                        >
                          {item.title}
                        </span>
                        <span
                          className="pill-label-hover absolute left-0 top-0 z-[3] inline-block"
                          style={{
                            color: 'var(--hover-text)',
                            willChange: 'transform, opacity'
                          }}
                          aria-hidden="true"
                        >
                          {item.title}
                        </span>
                      </span>

                      {/* Active indicator */}
                      {isActive && (
                        <span
                          className="absolute left-1/2 -bottom-[6px] -translate-x-1/2 w-3 h-3 rounded-full z-[4]"
                          style={{ background: 'var(--base)' }}
                          aria-hidden="true"
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* CTA Button */}
          <Button className="hidden lg:flex" href="#pricing">
            Tạo Video ngay
          </Button>

          {/* Mobile Hamburger - ALWAYS VISIBLE on mobile */}
          <button
            ref={hamburgerRef}
            onClick={toggleNavigation}
            aria-label={openNavigation ? 'Close menu' : 'Open menu'}
            aria-expanded={openNavigation}
            className="lg:hidden rounded-full border-0 flex flex-col items-center justify-center gap-1 cursor-pointer p-0 relative bg-white shadow-lg z-[10000]"
            style={{
              width: '48px',
              height: '48px',
              minWidth: '48px',
              minHeight: '48px'
            }}
          >
            <span
              className="hamburger-line w-5 h-0.5 rounded origin-center transition-transform"
              style={{ background: 'var(--pill-bg)' }}
            />
            <span
              className="hamburger-line w-5 h-0.5 rounded origin-center transition-transform"
              style={{ background: 'var(--pill-bg)' }}
            />
          </button>
        </nav>
      </div>

      {/* Mobile Menu - FIXED positioning để luôn hiển thị */}
      <div
        ref={mobileMenuRef}
        className="lg:hidden fixed left-0 right-0 top-[72px] mx-4 rounded-3xl shadow-2xl origin-top"
        style={{
          background: 'var(--base)',
          zIndex: 9998,
          display: 'none',
          visibility: 'hidden',
          maxHeight: 'calc(100vh - 88px)',
          overflowY: 'auto'
        }}
        aria-hidden={!openNavigation}
      >
        <ul className="list-none m-0 p-2 flex flex-col gap-1">
          {navigation.map(item => {
            const sectionId = item.url.replace('#', '');
            const isActive = activeId === sectionId;

            return (
              <li key={item.id}>
                <a
                  href={item.url}
                  className="block py-3 px-4 text-base font-semibold rounded-3xl transition-all duration-200 uppercase tracking-wide"
                  style={{
                    background: isActive ? 'var(--base)' : 'var(--pill-bg)',
                    color: isActive ? 'var(--hover-text)' : 'var(--pill-text)',
                    minHeight: '48px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(sectionId);
                    handleClick();
                  }}
                  onTouchStart={(e) => {
                    e.currentTarget.style.background = 'var(--base)';
                    e.currentTarget.style.color = 'var(--hover-text)';
                  }}
                  onTouchEnd={(e) => {
                    if (!isActive) {
                      setTimeout(() => {
                        e.currentTarget.style.background = 'var(--pill-bg)';
                        e.currentTarget.style.color = 'var(--pill-text)';
                      }, 150);
                    }
                  }}
                >
                  {item.title}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
};

export default Header;
