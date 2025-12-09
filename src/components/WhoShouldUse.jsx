// Section "Ai nên dùng ReVeo.art?" với 3D Card Flip & Perspective Effect
import { useRef, useEffect } from "react";
import gsap from "gsap";
import Section from "./Section";
import Heading from "./Heading";
import { check } from "../assets";

const targetAudiences = [
    {
        id: "0",
        title: "Seller TMĐT",
        description: "Bán hàng trên Shopee, TikTok Shop, Lazada cần video sản phẩm nhanh và chuyên nghiệp",
        icon: "🛍️",
        color: "from-purple-500 to-pink-500",
        features: ["Video nhanh", "Template TMĐT", "Export đa nền tảng"]
    },
    {
        id: "1",
        title: "Content Creator",
        description: "Tạo video review, unboxing, hoặc làm content cho brand với hiệu quả cao",
        icon: "🎬",
        color: "from-blue-500 to-cyan-500",
        features: ["Advanced Editor", "AI Voiceover", "Music Library"]
    },
    {
        id: "2",
        title: "Agency & Freelancer",
        description: "Nhận làm video cho nhiều khách hàng, cần workflow quản lý dự án và client review",
        icon: "💼",
        color: "from-green-500 to-emerald-500",
        features: ["Client Review", "Team Workspace", "Brand Library"]
    },
    {
        id: "3",
        title: "Team Marketing",
        description: "Đội nội bộ cần collaboration, brand library và tạo video hàng loạt cho campaigns",
        icon: "👥",
        color: "from-orange-500 to-red-500",
        features: ["Batch Creation", "Collaboration", "API Access"]
    }
];

const WhoShouldUse = () => {
    const cardsRef = useRef([]);

    useEffect(() => {
        // Initial animation - cards fly in from different directions
        gsap.fromTo(
            cardsRef.current,
            {
                opacity: 0,
                scale: 0.8,
                rotateY: -90,
                z: -200,
            },
            {
                opacity: 1,
                scale: 1,
                rotateY: 0,
                z: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "back.out(1.5)",
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

        // Stronger rotation for more dramatic effect
        const rotateX = ((y - centerY) / centerY) * -15;
        const rotateY = ((x - centerX) / centerX) * 15;

        gsap.to(card, {
            rotateX: rotateX,
            rotateY: rotateY,
            transformPerspective: 1000,
            duration: 0.3,
            ease: "power2.out",
        });

        // Parallax for inner content
        const content = card.querySelector(".card-content");
        if (content) {
            gsap.to(content, {
                x: ((x - centerX) / centerX) * 10,
                y: ((y - centerY) / centerY) * 10,
                duration: 0.3,
            });
        }

        // Glow follows mouse
        const glow = card.querySelector(".card-glow");
        if (glow) {
            gsap.to(glow, {
                x: x - centerX,
                y: y - centerY,
                opacity: 0.6,
                duration: 0.2,
            });
        }
    };

    const handleMouseEnter = (index) => {
        const card = cardsRef.current[index];
        if (!card) return;

        gsap.to(card, {
            scale: 1.08,
            z: 80,
            duration: 0.4,
            ease: "power2.out",
        });

        // Shine effect
        const shine = card.querySelector(".card-shine");
        if (shine) {
            gsap.fromTo(
                shine,
                { x: "-100%", opacity: 0 },
                { x: "100%", opacity: 0.5, duration: 0.6, ease: "power2.inOut" }
            );
        }

        // Icon bounce
        const icon = card.querySelector(".card-icon");
        if (icon) {
            gsap.to(icon, {
                scale: 1.2,
                rotation: 360,
                duration: 0.5,
                ease: "back.out(1.7)",
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
            duration: 0.6,
            ease: "power2.out",
        });

        // Reset parallax
        const content = card.querySelector(".card-content");
        if (content) {
            gsap.to(content, {
                x: 0,
                y: 0,
                duration: 0.6,
            });
        }

        // Reset glow
        const glow = card.querySelector(".card-glow");
        if (glow) {
            gsap.to(glow, {
                opacity: 0,
                duration: 0.3,
            });
        }

        // Reset icon
        const icon = card.querySelector(".card-icon");
        if (icon) {
            gsap.to(icon, {
                scale: 1,
                rotation: 0,
                duration: 0.5,
            });
        }
    };

    return (
        <Section className="pt-[4rem] -mt-[5.25rem]" crosses crossesOffset="lg:translate-y-[5.25rem]" customPaddings id="who-should-use">
            <div className="container relative z-2">
                <Heading
                    className="md:max-w-md lg:max-w-2xl text-center mx-auto"
                    title="Ai nên dùng ReVeo.art?"
                />

                <div
                    className="flex flex-wrap justify-center gap-8 mb-10"
                    style={{ perspective: "2000px" }}
                >
                    {targetAudiences.map((audience, index) => (
                        <div
                            key={audience.id}
                            ref={(el) => (cardsRef.current[index] = el)}
                            onMouseMove={(e) => handleMouseMove(e, index)}
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={() => handleMouseLeave(index)}
                            className="relative max-w-[280px] cursor-pointer"
                            style={{
                                transformStyle: "preserve-3d",
                            }}
                        >
                            {/* Card glow that follows mouse */}
                            <div className="card-glow absolute inset-0 rounded-2xl opacity-0 blur-2xl pointer-events-none z-0"
                                style={{
                                    background: `linear-gradient(135deg, ${audience.color.split(' ')[1]}, ${audience.color.split(' ')[3]})`,
                                }}
                            />

                            {/* Main card */}
                            <div className={`block relative p-0.5 bg-gradient-to-br ${audience.color} rounded-2xl overflow-hidden`}>
                                {/* Shine effect */}
                                <div className="card-shine absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none z-20" />

                                <div className="card-content relative bg-n-8 rounded-[15px] p-8 overflow-hidden">
                                    {/* Icon */}
                                    <div className="card-icon flex items-center justify-center w-16 h-16 mb-4 text-4xl bg-gradient-to-br from-n-7 to-n-6 rounded-xl shadow-lg"
                                        style={{ transform: "translateZ(40px)" }}
                                    >
                                        {audience.icon}
                                    </div>

                                    {/* Title */}
                                    <div className="flex items-start mb-4">
                                        <img src={check} width={20} height={20} alt="check" className="mt-1" />
                                        <h6 className="h6 ml-3">{audience.title}</h6>
                                    </div>

                                    {/* Description */}
                                    <p className="body-2 text-n-3 mb-4">{audience.description}</p>

                                    {/* Features */}
                                    <div className="space-y-2">
                                        {audience.features.map((feature, i) => (
                                            <div key={i} className="flex items-center gap-2 text-xs text-n-4">
                                                <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${audience.color}`} />
                                                <span>{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Background decoration */}
                                    <div className={`absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br ${audience.color} opacity-10 rounded-full blur-2xl pointer-events-none`} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
};

export default WhoShouldUse;
