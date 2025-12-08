// Testimonials carousel với framer-motion, auto-scroll và pause on hover
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (!isPaused) {
            const interval = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % testimonials.length);
            }, 5000); // Auto-scroll every 5 seconds

            return () => clearInterval(interval);
        }
    }, [isPaused]);

    const renderStars = (rating) => {
        return (
            <div className="flex gap-1 mb-4">
                {[...Array(rating)].map((_, i) => (
                    <svg
                        key={i}
                        className="w-5 h-5 text-yellow-500"
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
        <Section className="overflow-hidden" id="testimonials">
            <div className="container relative z-2">
                <Heading
                    tag="Feedback"
                    title="Khách hàng nói gì về ReVeo?"
                />

                <div
                    className="relative max-w-4xl mx-auto"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.5 }}
                            className="relative p-8 md:p-12 bg-n-7 border border-n-6 rounded-3xl"
                        >
                            {/* Quote icon */}
                            <div className="absolute top-8 right-8 text-6xl text-n-4 opacity-20">"</div>

                            <div className="flex flex-col md:flex-row items-start gap-6">
                                {/* Avatar */}
                                <img
                                    src={testimonials[currentIndex].avatar}
                                    alt={testimonials[currentIndex].name}
                                    className="w-20 h-20 rounded-full border-2 border-purple-500"
                                />

                                {/* Content */}
                                <div className="flex-1">
                                    {renderStars(testimonials[currentIndex].rating)}

                                    <p className="body-1 text-n-1 mb-6 italic">
                                        "{testimonials[currentIndex].feedback}"
                                    </p>

                                    <div>
                                        <h6 className="h6 mb-1">{testimonials[currentIndex].name}</h6>
                                        <p className="body-2 text-n-3">
                                            {testimonials[currentIndex].role} • {testimonials[currentIndex].company}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation dots */}
                    <div className="flex justify-center gap-2 mt-8">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all ${index === currentIndex
                                        ? "bg-purple-500 w-8"
                                        : "bg-n-4 hover:bg-n-3"
                                    }`}
                                aria-label={`Go to testimonial ${index + 1}`}
                            />
                        ))}
                    </div>

                    {/* Pause indicator */}
                    {isPaused && (
                        <div className="absolute top-4 right-4 text-xs text-n-4 bg-n-7 px-3 py-1 rounded-full border border-n-6">
                            Paused
                        </div>
                    )}
                </div>
            </div>
        </Section>
    );
};

export default Testimonials;
