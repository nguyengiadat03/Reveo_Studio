// Benefits với 3D tilt perspective hover effect
import { useRef, useEffect } from "react";
import gsap from "gsap";
import Arrow from "../assets/svg/Arrow";
import ClipPath from "../assets/svg/ClipPath";
import { benefits } from "../constants";
import { GradientLight } from "./design/Benefits";
import Heading from "./Heading";
import Section from "./Section";
import { curve } from "../assets";

const Benefits = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    // Initial stagger animation
    gsap.fromTo(
      cardsRef.current,
      {
        y: 60,
        opacity: 0,
        rotateX: -15,
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      }
    );
  }, []);

  const handleMouseMove = (e, index) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10; // Max 10 degrees
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 1000,
      duration: 0.3,
      ease: "power2.out",
    });

    // Animate inner elements with parallax
    const icon = card.querySelector(".benefit-icon");
    const arrow = card.querySelector(".benefit-arrow");

    if (icon) {
      gsap.to(icon, {
        x: ((x - centerX) / centerX) * 15,
        y: ((y - centerY) / centerY) * 15,
        duration: 0.3,
        ease: "power2.out",
      });
    }

    if (arrow) {
      gsap.to(arrow, {
        x: ((x - centerX) / centerX) * 20,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleMouseEnter = (index) => {
    const card = cardsRef.current[index];
    if (!card) return;

    gsap.to(card, {
      scale: 1.05,
      z: 50,
      duration: 0.4,
      ease: "power2.out",
    });

    // Glow effect
    const glow = card.querySelector(".benefit-glow");
    if (glow) {
      gsap.to(glow, {
        opacity: 0.3,
        duration: 0.3,
      });
    }
  };

  const handleMouseLeave = (index) => {
    const card = cardsRef.current[index];
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      z: 0,
      duration: 0.5,
      ease: "power2.out",
    });

    // Reset parallax elements
    const icon = card.querySelector(".benefit-icon");
    const arrow = card.querySelector(".benefit-arrow");

    if (icon) {
      gsap.to(icon, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    }

    if (arrow) {
      gsap.to(arrow, {
        x: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    }

    // Glow effect
    const glow = card.querySelector(".benefit-glow");
    if (glow) {
      gsap.to(glow, {
        opacity: 0,
        duration: 0.3,
      });
    }
  };

  return (
    <Section id="templates">
      <div className="container relative z-2">
        <Heading
          className="md:max-w-md lg:max-w-2xl"
          title={
            <>
              Tạo Video Bán Hàng Nhanh Hơn Với{" "}
              <span className="inline-block relative font-semibold">
                ReVeo Studio
                <img
                  src={curve}
                  className="absolute top-full left-0 w-full xl:-mt-2 pointer-events-none select-none"
                  width={624}
                  height={28}
                  alt="Curve"
                />
              </span>
            </>
          }
        />

        <div
          className="flex flex-wrap gap-10 mb-10"
          style={{ perspective: "1500px" }}
        >
          {benefits.map((benefit, index) => (
            <div
              ref={(el) => (cardsRef.current[index] = el)}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              className="block relative p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[24rem] cursor-pointer"
              style={{
                backgroundImage: `url(${benefit.backgroundUrl})`,
                transformStyle: "preserve-3d",
              }}
              key={benefit.id}
            >
              {/* Glow effect */}
              <div className="benefit-glow absolute inset-0 bg-gradient-to-br from-purple-500/30 via-blue-500/30 to-cyan-500/30 rounded-[2rem] opacity-0 blur-xl pointer-events-none" />

              <div className="relative z-2 flex flex-col min-h-[22rem] p-[2.4rem] pointer-events-none">
                <h5 className="h5 mb-5">{benefit.title}</h5>
                <p className="body-2 mb-6 text-n-3">{benefit.text}</p>
                <div className="flex items-center mt-auto">
                  <img
                    src={benefit.iconUrl}
                    width={48}
                    height={48}
                    alt={benefit.title}
                    className="benefit-icon"
                    style={{ transform: "translateZ(30px)" }}
                  />

                  <div className="benefit-arrow ml-auto flex items-center gap-2">
                    <p className="font-code text-xs font-bold text-n-1 uppercase tracking-wider">
                      Tìm hiểu thêm
                    </p>
                    <Arrow />
                  </div>
                </div>
              </div>

              {benefit.light && <GradientLight />}

              <div
                className="absolute inset-0.5 bg-n-8"
                style={{ clipPath: "url(#benefits)" }}
              >
                <div className="absolute inset-0 opacity-0 transition-opacity hover:opacity-10">
                  {benefit.imageUrl && (
                    <img
                      src={benefit.imageUrl}
                      width={380}
                      height={362}
                      alt={benefit.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>

              <ClipPath />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Benefits;
