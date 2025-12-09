// Testimonials infinite scroll carousel - chạy liên tục từ trái sang phải
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Section from "./Section";
import Heading from "./Heading";

const testimonials = [
    {
        id: "0",
        name: "Nguyễn Thị Mai",
        role: "Seller Shopee",
        company: "Mai's Beauty Store",
        rating: 5,
        feedback: "ReVeo giúp mình tạo video sản phẩm chỉ trong 5 phút. Từ khi dùng, tỷ lệ chuyển đổi tăng 40%. Quá tuyệt vời!",
        avatar: "https://ui-avatars.com/api/?name=Nguyen+Thi+Mai&background=8B5CF6&color=fff&size=80"
    },
    {
        id: "1",
        name: "Trần Văn Hùng",
        role: "Content Creator",
        company: "Tech Review VN",
        rating: 5,
        feedback: "AI voiceover tiếng Việt nghe rất tự nhiên. Mình làm review điện thoại giờ nhanh gấp 3 lần so với trước.",
        avatar: "https://ui-avatars.com/api/?name=Tran+Van+Hung&background=3B82F6&color=fff&size=80"
    },
    {
        id: "2",
        name: "Lê Minh Tuấn",
        role: "Founder",
        company: "Digital Marketing Agency",
        rating: 5,
        feedback: "Team mình làm video cho 20+ client mỗi tháng. Workspace và client review feature của ReVeo giúp quản lý dễ dàng hơn rất nhiều.",
        avatar: "https://ui-avatars.com/api/?name=Le+Minh+Tuan&background=10B981&color=fff&size=80"
    },
    {
        id: "3",
        name: "Phạm Thu Hà",
        role: "Marketing Manager",
        company: "Fashion Brand",
        rating: 5,
        feedback: "Batch creation tuyệt vời! Upload 100 sản phẩm, chọn template, 30 phút sau có 100 video. Tiết kiệm cả tuần làm việc.",
        avatar: "https://ui-avatars.com/api/?name=Pham+Thu+Ha&background=F59E0B&color=fff&size=80"
    },
    {
        id: "4",
        name: "Hoàng Đức Anh",
        role: "Freelancer",
        company: "Video Editor",
        rating: 5,
        feedback: "Advanced Editor đủ mạnh để làm video chuyên nghiệp, nhưng vẫn nhanh hơn Premiere nhiều. Giá lại rẻ hơn Adobe.",
        avatar: "https://ui-avatars.com/api/?name=Hoang+Duc+Anh&background=EF4444&color=fff&size=80"
    },
    {
        id: "5",
        name: "Vũ Thị Lan",
        role: "TikTok Shop Seller",
        company: "Lan's Home Decor",
        rating: 5,
        feedback: "Template cho TikTok Shop rất chuẩn, video lên trending liên tục. Doanh số tăng 3 lần sau 2 tháng dùng ReVeo.",
        avatar: "https://ui-avatars.com/api/?name=Vu+Thi+Lan&background=8B5CF6&color=fff&size=80"
    }
];

const TestimonialCard = ({ testimonial }) => {
    const renderStars = (rating) => {
        return (
            <div className="flex gap-1 mb-3">
                {[...Array(rating)].map((_, i) => (
                    <svg
                        key={i}
                        className="w-4 h-4 text-yellow-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
            </div>
        );
    };

    return (
        <div className="testimonial-card flex-shrink-0 w-[350px] md:w-[400px] mx-3">
            <div className="relative p-6 md:p-8 bg-n-7 border border-n-6 rounded-2xl h-full hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
                {/* Quote icon */}
                <div className="absolute top-4 right-4 text-4xl text-n-4 opacity-20 select-none pointer-events-none">
                    "
                </div>

                {/* Avatar */}
                <div className="flex items-center gap-4 mb-4">
                    <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full border-2 border-purple-500 shadow-lg"
                    />
                    <div>
                        <h6 className="font-semibold text-base text-n-1 mb-1">
                            {testimonial.name}
                        </h6>
                        <p className="text-xs text-n-3">
                            {testimonial.role}
                        </p>
                    </div>
                </div>

                {/* Stars */}
                {renderStars(testimonial.rating)}

                {/* Feedback */}
                <p className="text-sm text-n-2 leading-relaxed italic mb-3">
                    "{testimonial.feedback}"
                </p>

                {/* Company */}
                <p className="text-xs text-purple-400 font-semibold">
                    {testimonial.company}
                </p>
            </div>
        </div>
    );
};

const Testimonials = () => {
    const trackRef = useRef(null);
    const animationRef = useRef(null);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        // Duplicate testimonials để tạo infinite loop
        const cards = track.querySelectorAll('.testimonial-card');
        const cardWidth = cards[0]?.offsetWidth || 0;
        const gap = 24; // mx-3 = 12px * 2
        const totalWidth = (cardWidth + gap) * testimonials.length;

        // Clone cards để tạo seamless loop
        const clone = track.innerHTML;
        track.innerHTML = clone + clone;

        // GSAP infinite scroll animation
        animationRef.current = gsap.to(track, {
            x: -totalWidth,
            duration: testimonials.length * 5, // 5s per testimonial
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
        <Section className="overflow-hidden" id="testimonials">
            <div className="container relative z-2">
                <Heading
                    tag="Feedback"
                    title="Khách hàng nói gì về ReVeo?"
                />

                <div className="relative">
                    {/* Gradient overlays */}
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-n-8 to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-n-8 to-transparent z-10 pointer-events-none" />

                    {/* Scrolling track */}
                    <div className="overflow-hidden py-4">
                        <div
                            ref={trackRef}
                            className="flex will-change-transform"
                        >
                            {testimonials.map((testimonial) => (
                                <TestimonialCard
                                    key={testimonial.id}
                                    testimonial={testimonial}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Instruction */}
                    <div className="text-center mt-6">
                        <p className="text-xs text-n-4 flex items-center justify-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                            </svg>
                            Hover để tạm dừng
                        </p>
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default Testimonials;
