// Contact Page - thay thế Use Case section với form liên hệ đầy đủ
import { useState } from "react";
import Section from "./Section";
import Heading from "./Heading";
import Button from "./Button";
import { socials } from "../constants";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        phone: "",
        message: ""
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Vui lòng nhập họ tên";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Vui lòng nhập email";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Email không hợp lệ";
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Vui lòng nhập số điện thoại";
        } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ""))) {
            newErrors.phone = "Số điện thoại không hợp lệ";
        }

        if (!formData.message.trim()) {
            newErrors.message = "Vui lòng nhập nội dung";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        // Mock API call - client side only
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            console.log("Form submitted:", formData);
            console.log("Response:", response);

            // Reset form on success
            setFormData({
                name: "",
                email: "",
                company: "",
                phone: "",
                message: ""
            });

            alert("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong vòng 24h.");
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Có lỗi xảy ra. Vui lòng thử lại sau.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Section className="overflow-hidden" id="contact">
            <div className="container relative z-2">
                <Heading
                    tag="Liên hệ"
                    title="Hãy để chúng tôi hỗ trợ bạn"
                />

                <div className="grid md:grid-cols-2 gap-10 mb-10">
                    {/* Contact Form */}
                    <div className="relative p-8 bg-n-7 border border-n-6 rounded-3xl">
                        <h4 className="h4 mb-6">Gửi tin nhắn cho chúng tôi</h4>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-code font-bold mb-2">
                                    Họ và tên <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 bg-n-6 border ${errors.name ? "border-red-500" : "border-n-5"
                                        } rounded-lg focus:outline-none focus:border-purple-500 transition-colors`}
                                    placeholder="Nguyễn Văn A"
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-code font-bold mb-2">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 bg-n-6 border ${errors.email ? "border-red-500" : "border-n-5"
                                        } rounded-lg focus:outline-none focus:border-purple-500 transition-colors`}
                                    placeholder="email@example.com"
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                                )}
                            </div>

                            {/* Company */}
                            <div>
                                <label htmlFor="company" className="block text-sm font-code font-bold mb-2">
                                    Công ty / Shop
                                </label>
                                <input
                                    type="text"
                                    id="company"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-n-6 border border-n-5 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                                    placeholder="Tên công ty hoặc shop của bạn"
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label htmlFor="phone" className="block text-sm font-code font-bold mb-2">
                                    Số điện thoại <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 bg-n-6 border ${errors.phone ? "border-red-500" : "border-n-5"
                                        } rounded-lg focus:outline-none focus:border-purple-500 transition-colors`}
                                    placeholder="0912345678"
                                />
                                {errors.phone && (
                                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                                )}
                            </div>

                            {/* Message */}
                            <div>
                                <label htmlFor="message" className="block text-sm font-code font-bold mb-2">
                                    Nội dung <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={5}
                                    className={`w-full px-4 py-3 bg-n-6 border ${errors.message ? "border-red-500" : "border-n-5"
                                        } rounded-lg focus:outline-none focus:border-purple-500 transition-colors resize-none`}
                                    placeholder="Bạn cần hỗ trợ gì từ ReVeo?"
                                />
                                {errors.message && (
                                    <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                                )}
                            </div>

                            <Button type="submit" className="w-full" disabled={isSubmitting}>
                                {isSubmitting ? "Đang gửi..." : "Gửi tin nhắn"}
                            </Button>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-8">
                        {/* Company Info */}
                        <div className="relative p-8 bg-n-7 border border-n-6 rounded-3xl">
                            <h5 className="h5 mb-6">Thông tin liên hệ</h5>

                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 flex items-center justify-center bg-purple-500/10 rounded-lg">
                                        <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-code font-bold text-sm mb-1">Địa chỉ</p>
                                        <p className="body-2 text-n-3">123 Nguyễn Huệ, Quận 1, TP.HCM</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 flex items-center justify-center bg-purple-500/10 rounded-lg">
                                        <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-code font-bold text-sm mb-1">Email</p>
                                        <p className="body-2 text-n-3">support@reveo.art</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 flex items-center justify-center bg-purple-500/10 rounded-lg">
                                        <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-code font-bold text-sm mb-1">Hotline</p>
                                        <p className="body-2 text-n-3">1900 1234</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 flex items-center justify-center bg-purple-500/10 rounded-lg">
                                        <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-code font-bold text-sm mb-1">Giờ làm việc</p>
                                        <p className="body-2 text-n-3">Thứ 2 - Thứ 6: 9:00 - 18:00</p>
                                        <p className="body-2 text-n-3">Thứ 7: 9:00 - 12:00</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="relative p-8 bg-n-7 border border-n-6 rounded-3xl">
                            <h5 className="h5 mb-6">Kết nối với chúng tôi</h5>
                            <div className="flex gap-4">
                                {socials.map((social) => (
                                    <a
                                        key={social.id}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 flex items-center justify-center bg-n-6 hover:bg-purple-500/20 border border-n-5 hover:border-purple-500 rounded-lg transition-all"
                                        aria-label={social.title}
                                    >
                                        <img src={social.iconUrl} width={20} height={20} alt={social.title} />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Google Maps */}
                        <div className="relative p-8 bg-n-7 border border-n-6 rounded-3xl">
                            <h5 className="h5 mb-6">Vị trí</h5>
                            <div className="aspect-video bg-n-6 rounded-lg overflow-hidden">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.070959691163!2d105.94609017393276!3d20.989792489118447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135af49ade7965b%3A0xd8981fa885de47d5!2zMjQgxJDGsOG7nW5nIFNhbiBIw7QsIEtpw6p1IEvhu7UsIEdpYSBMw6JtLCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1765266808968!5m2!1svi!2s"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Vị trí văn phòng Rocket Global"
                                    className="w-full h-full"
                                ></iframe>
                            </div>
                            <p className="text-n-4 text-xs mt-4 text-center">
                                📍 Bạn có thể kéo thả và zoom bản đồ để xem chi tiết
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default Contact;
