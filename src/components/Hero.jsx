// Hero section - Compact optimized cho laptop
import { useRef } from "react";
import { ScrollParallax } from "react-just-parallax";
import Typewriter from "typewriter-effect";

import { curve, heroBackground } from "../assets";
import { heroIcons } from "../constants";
import Button from "./Button";
import CompanyLogos from "./CompanyLogos";
import DesktopFrame from "./DesktopFrame";
import { BackgroundCircles, BottomLine, Gradient } from "./design/Hero";
import Notification from "./Notification";
import Section from "./Section";

const HERO_VIDEO = "https://fhjyzsseoozpmvsgkwep.supabase.co/storage/v1/object/public/ReVeo_Image-Video/hero-section-2.mp4";
const HERO_POSTER = "https://fhjyzsseoozpmvsgkwep.supabase.co/storage/v1/object/public/ReVeo_Image-Video/hero-section-2.mp4";

const Hero = () => {
    const parallaxRef = useRef(null);

    return (
        <Section
            className="pt-[8rem] -mt-[5.25rem]"
            crosses
            crossesOffset="lg:translate-y-[5.25rem]"
            customPaddings
            id="hero"
        >
            <div ref={parallaxRef} className="container relative max-w-7xl">
                {/* Brand heading - Compact */}
                <div className="relative z-10 text-center mb-4 md:mb-6">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-2">
                        <span className="inline-block bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 bg-clip-text text-transparent drop-shadow-2xl">
                            ReVeo Studio
                        </span>
                    </h2>

                    <div className="flex items-center justify-center gap-1.5 mb-1.5">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '450ms' }}></div>
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '600ms' }}></div>
                    </div>

                    <p className="text-xs md:text-sm text-n-3 font-medium tracking-wide">
                        Thuộc Hệ Sinh Thái <span className="text-purple-500 font-semibold">Rocket Global</span>
                    </p>
                </div>

                {/* Two-column layout */}
                <div className="relative z-1 grid lg:grid-cols-2 gap-6 lg:gap-10 items-center mb-8 md:mb-12">
                    <div className="text-center lg:text-left">
                        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-3 leading-tight">
                            Từ Ảnh Sản Phẩm → Video Bán Hàng
                            <br />
                            <span className="inline-block bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                                <Typewriter
                                    options={{
                                        strings: ["Video Shopee", "Video TikTok Shop", "Video Review", "Video Quảng Cáo", "Video Flash Sale"],
                                        autoStart: true,
                                        loop: true,
                                    }}
                                />
                            </span>
                        </h1>

                        <p className="text-xs md:text-sm leading-relaxed mb-3 text-n-2">
                            Tạo video bán hàng chuyên nghiệp bằng AI trong vài phút. Không cần biết dựng video.{" "}
                            <span className="inline-block relative font-semibold">
                                ReVeo Studio
                                <img src={curve} className="absolute top-full left-0 w-full xl:-mt-2 pointer-events-none select-none" width={624} height={28} alt="Curve" />
                            </span>
                            {" "}– Nền tảng AI Video cho TMĐT Việt Nam.
                        </p>

                        <div className="flex flex-col sm:flex-row flex-wrap items-center lg:items-start justify-center lg:justify-start gap-1.5 mb-4">
                            <div className="flex items-center gap-1 px-2.5 py-1 bg-n-7 border border-n-6 rounded-full shadow-sm hover:border-purple-500/50 transition-colors">
                                <svg className="w-3.5 h-3.5 text-purple-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                                <span className="text-[10px] font-code font-semibold text-n-1 whitespace-nowrap">AI tự động dựng kịch bản & voice</span>
                            </div>

                            <div className="flex items-center gap-1 px-2.5 py-1 bg-n-7 border border-n-6 rounded-full shadow-sm hover:border-purple-500/50 transition-colors">
                                <svg className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                <span className="text-[10px] font-code font-semibold text-n-1 whitespace-nowrap">Tiết kiệm 95% thời gian sản xuất</span>
                            </div>

                            <div className="flex items-center gap-1 px-2.5 py-1 bg-n-7 border border-n-6 rounded-full shadow-sm hover:border-purple-500/50 transition-colors">
                                <svg className="w-3.5 h-3.5 text-cyan-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                                <span className="text-[10px] font-code font-semibold text-n-1 whitespace-nowrap">Chuẩn tỉ lệ TikTok, Shopee, Lazada</span>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2.5 justify-center lg:justify-start">
                            <Button href="#pricing" white className="text-xs py-2">Tạo Video Miễn Phí</Button>
                            <Button href="#how-to-use" className="text-xs py-2">Xem Demo</Button>
                        </div>
                    </div>

                    <div className="relative order-first lg:order-last flex justify-center lg:justify-end">
                        <div className="w-full max-w-[360px] sm:max-w-[420px] md:max-w-[480px] lg:max-w-[520px]">
                            <DesktopFrame videoSrc={HERO_VIDEO} posterSrc={HERO_POSTER} alt="AI-generated product video demo" className="transform hover:scale-[1.02] transition-transform duration-500" />

                            <ScrollParallax isAbsolutelyPositioned>
                                <Notification className="hidden xl:flex absolute -right-[4rem] top-[8rem] w-[14rem]" title="Video đã tạo" />
                            </ScrollParallax>
                        </div>
                    </div>
                </div>

                <CompanyLogos className="hidden relative z-10 mt-12 lg:block" />
            </div>

            <BackgroundCircles />

            <div className="absolute -top-[54%] left-1/2 w-[234%] -translate-x-1/2 md:-top-[46%] md:w-[138%] lg:-top-[104%]">
                <img src={heroBackground} className="w-full pointer-events-none select-none" width={1440} height={1800} alt="hero" />
            </div>

            <ScrollParallax>
                <ul className="hidden absolute -left-[5.5rem] bottom-[7.5rem] px-1 py-1 bg-n-9/40 backdrop-blur border border-n-1/10 rounded-2xl xl:flex">
                    {heroIcons.map((icon, index) => (
                        <li className="p-5" key={index}>
                            <img src={icon} width={24} height={25} alt={`Icon ${index}`} />
                        </li>
                    ))}
                </ul>
            </ScrollParallax>

            <ScrollParallax>
                <Notification className="hidden absolute -left-[5.5rem] bottom-[11rem] w-[18rem] xl:flex" title="Kịch bản AI" />
            </ScrollParallax>

            <Gradient />
            <BottomLine />
        </Section>
    );
};

export default Hero;
