// CompanyLogos với infinite scroll - chỉ hiển thị Rocket Global logo
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { rocket } from "../assets";

const CompanyLogos = ({ className }) => {
  const trackRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Duplicate logos để tạo infinite loop
    const logos = track.querySelectorAll('.company-logo');
    const logoWidth = logos[0]?.offsetWidth || 0;
    const gap = 48; // gap-12 = 48px
    const totalWidth = (logoWidth + gap) * 6; // 6 logos

    // Clone logos để tạo seamless loop
    const clone = track.innerHTML;
    track.innerHTML = clone + clone;

    // GSAP infinite scroll animation
    animationRef.current = gsap.to(track, {
      x: -totalWidth,
      duration: 20, // 20s cho 6 logos
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % totalWidth)
      }
    });

    // Pause on hover
    const container = track.parentElement;

    const handleMouseEnter = () => {
      gsap.to(animationRef.current, {
        timeScale: 0,
        duration: 0.5,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(animationRef.current, {
        timeScale: 1,
        duration: 0.5,
        ease: "power2.in"
      });
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, []);

  return (
    <div className={className}>
      <h5 className="tagline mb-6 text-center text-n-1/50">
        Thuộc Hệ Sinh Thái Rocket Global
      </h5>

      <div className="relative">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-n-8 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-n-8 to-transparent z-10 pointer-events-none" />

        {/* Scrolling track */}
        <div className="overflow-hidden py-4">
          <div
            ref={trackRef}
            className="flex items-center gap-12 will-change-transform"
          >
            {/* 6 logos */}
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="company-logo flex-shrink-0 flex items-center justify-center h-16 px-8"
              >
                <img
                  src={rocket}
                  alt="Rocket Global"
                  className="h-10 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyLogos;
