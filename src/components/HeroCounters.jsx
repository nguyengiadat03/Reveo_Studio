// Animated counter component với IntersectionObserver và count-up animation
import { useState, useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import Section from "./Section";

const counters = [
    {
        id: "0",
        value: 500000,
        suffix: "+",
        label: "Videos Created",
        subLabel: "Video đã tạo"
    },
    {
        id: "1",
        value: 98,
        suffix: "%",
        label: "Customer Retention",
        subLabel: "Khách hàng quay lại"
    },
    {
        id: "2",
        value: 10000,
        suffix: "+",
        label: "Brands Trust Us",
        subLabel: "Thương hiệu tin dùng"
    },
    {
        id: "3",
        value: 95,
        suffix: "%",
        label: "Time Saved",
        subLabel: "Tiết kiệm thời gian"
    }
];

const AnimatedCounter = ({ value, suffix }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
        damping: 60,
        stiffness: 100
    });
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        if (isInView) {
            motionValue.set(value);
        }
    }, [isInView, value, motionValue]);

    useEffect(() => {
        const unsubscribe = springValue.on("change", (latest) => {
            setDisplayValue(Math.floor(latest));
        });
        return unsubscribe;
    }, [springValue]);

    const formatNumber = (num) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + "M";
        } else if (num >= 1000) {
            return (num / 1000).toFixed(0) + "K";
        }
        return num.toString();
    };

    return (
        <span ref={ref} className="tabular-nums">
            {formatNumber(displayValue)}
            {suffix}
        </span>
    );
};

const HeroCounters = () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    return (
        <Section className="pt-0 -mt-[5.25rem]" crosses crossesOffset="lg:translate-y-[5.25rem]">
            <div className="container relative z-2">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10"
                >
                    {counters.map((counter, index) => (
                        <motion.div
                            key={counter.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{
                                duration: prefersReducedMotion ? 0 : 0.6,
                                delay: prefersReducedMotion ? 0 : index * 0.1
                            }}
                            className="relative p-6 md:p-8 bg-n-7 border border-n-6 rounded-2xl hover:border-purple-500/50 transition-colors"
                        >
                            <div className="relative z-2">
                                <div
                                    className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-br from-purple-500 to-blue-500 bg-clip-text text-transparent mb-2"
                                    aria-live={prefersReducedMotion ? "off" : "polite"}
                                >
                                    <AnimatedCounter value={counter.value} suffix={counter.suffix} />
                                </div>
                                <p className="text-xs md:text-sm font-code font-bold text-n-1 uppercase tracking-wider mb-1">
                                    {counter.label}
                                </p>
                                <p className="text-xs text-n-3">{counter.subLabel}</p>
                            </div>

                            {/* Gradient glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-2xl opacity-0 hover:opacity-100 transition-opacity pointer-events-none"></div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </Section>
    );
};

export default HeroCounters;
