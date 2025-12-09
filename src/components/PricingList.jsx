// PricingList với GSAP hover effects và design nổi bật
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { check } from "../assets";
import { pricing } from "../constants";
import Button from "./Button";

const PricingList = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    // Initial animation khi component mount
    gsap.fromTo(
      cardsRef.current,
      {
        y: 50,
        opacity: 0,
        scale: 0.95,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      }
    );
  }, []);

  const handleMouseEnter = (index) => {
    const card = cardsRef.current[index];
    if (!card) return;

    gsap.to(card, {
      y: -12,
      scale: 1.02,
      duration: 0.4,
      ease: "power2.out",
    });

    // Animate border glow
    const border = card.querySelector(".pricing-border");
    if (border) {
      gsap.to(border, {
        opacity: 1,
        duration: 0.3,
      });
    }

    // Animate badge
    const badge = card.querySelector(".pricing-badge");
    if (badge) {
      gsap.to(badge, {
        scale: 1.1,
        duration: 0.3,
        ease: "back.out(1.7)",
      });
    }
  };

  const handleMouseLeave = (index) => {
    const card = cardsRef.current[index];
    if (!card) return;

    gsap.to(card, {
      y: 0,
      scale: 1,
      duration: 0.4,
      ease: "power2.out",
    });

    // Animate border glow
    const border = card.querySelector(".pricing-border");
    if (border) {
      gsap.to(border, {
        opacity: 0,
        duration: 0.3,
      });
    }

    // Animate badge
    const badge = card.querySelector(".pricing-badge");
    if (badge) {
      gsap.to(badge, {
        scale: 1,
        duration: 0.3,
      });
    }
  };

  return (
    <div className="flex gap-6 max-lg:flex-wrap justify-center pt-12">
      {pricing.map((plan, i) => (
        <div
          key={plan.id}
          ref={(el) => (cardsRef.current[i] = el)}
          onMouseEnter={() => handleMouseEnter(i)}
          onMouseLeave={() => handleMouseLeave(i)}
          className={`
            relative w-full lg:w-[280px] xl:w-[300px]
            ${plan.popular ? "lg:-mt-4 lg:mb-4" : ""}
            transition-all duration-300
          `}
          style={{ zIndex: plan.popular ? 10 : 1 }}
        >
          {/* Badge - positioned above card */}
          {plan.badge && (
            <div
              className={`
                pricing-badge absolute -top-4 left-1/2 -translate-x-1/2
                px-4 py-1.5 rounded-full text-[10px] font-bold tracking-wider
                ${plan.popular
                  ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                  : plan.badge === "FREE TRIAL"
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                    : "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                }
                shadow-lg z-30 whitespace-nowrap
              `}
            >
              {plan.badge}
            </div>
          )}

          {/* Glow border effect */}
          <div
            className={`
              pricing-border absolute inset-0 rounded-3xl opacity-0
              ${plan.popular
                ? "bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500"
                : "bg-gradient-to-br from-n-4 to-n-6"
              }
              blur-xl
            `}
          />

          {/* Card content */}
          <div
            className={`
              relative h-full px-6 bg-n-8 rounded-3xl
              ${plan.badge ? "pt-10 pb-8" : "py-8"}
              ${plan.popular
                ? "border-2 border-purple-500 shadow-2xl shadow-purple-500/20"
                : "border border-n-6"
              }
            `}
          >
            {/* Plan title */}
            <h4
              className={`
                text-2xl font-bold mb-2
                ${plan.popular
                  ? "bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
                  : "text-n-1"
                }
              `}
            >
              {plan.title}
            </h4>

            {/* Description */}
            <p className="text-sm text-n-3 mb-6 min-h-[40px]">
              {plan.description}
            </p>

            {/* Price */}
            <div className="mb-6">
              {plan.price ? (
                <div className="flex items-end gap-2">
                  <div
                    className={`
                      text-5xl font-bold leading-none
                      ${plan.popular
                        ? "bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
                        : "text-n-1"
                      }
                    `}
                  >
                    {plan.price === "0" ? "FREE" : plan.price}
                  </div>
                  {plan.price !== "0" && (
                    <div className="text-sm text-n-3 mb-2">₫/tháng</div>
                  )}
                </div>
              ) : (
                <div className="text-3xl font-bold text-n-1">Liên hệ</div>
              )}
              {plan.priceNote && (
                <p className="text-xs text-green-400 mt-2 font-semibold">
                  ✨ {plan.priceNote}
                </p>
              )}
            </div>

            {/* CTA Button */}
            <Button
              className={`
                w-full mb-6
                ${plan.popular ? "animate-pulse" : ""}
              `}
              href={plan.price ? "/signup" : "mailto:info@reveo.art"}
              white={!plan.premium}
            >
              {plan.price === "0"
                ? "Dùng thử miễn phí"
                : plan.price
                  ? "Bắt đầu ngay"
                  : "Liên hệ tư vấn"}
            </Button>

            {/* Features list */}
            <ul className="space-y-3">
              {plan.features.map((feature, j) => (
                <li
                  key={`plan-${i}-feature-${j}`}
                  className="flex items-start gap-3 text-sm"
                >
                  <img
                    src={check}
                    alt="Check"
                    width={20}
                    height={20}
                    className={`
                      flex-shrink-0 mt-0.5
                      ${plan.popular ? "filter brightness-125" : ""}
                    `}
                  />
                  <span
                    className={`
                      ${plan.popular ? "text-n-1 font-medium" : "text-n-3"}
                    `}
                  >
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {/* Popular plan extra decoration */}
            {plan.popular && (
              <>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-500/20 to-transparent rounded-full blur-3xl pointer-events-none" />
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PricingList;
