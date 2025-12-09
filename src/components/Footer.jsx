// Professional Footer với quick links, contact info, newsletter signup, và legal links
import { useState } from "react";
import { socials } from "../constants";
import { reveo } from "../assets";

const footerLinks = {
  products: [
    { title: "Templates", url: "#templates" },
    { title: "AI Video Creator", url: "#features" },
    { title: "Batch Creation", url: "#features" },
    { title: "Advanced Editor", url: "#features" }
  ],
  resources: [
    { title: "Pricing", url: "#pricing" },
    { title: "Documentation", url: "#docs" },
    { title: "Blog", url: "#blog" },
    { title: "Use Cases", url: "#how-to-use" }
  ],
  company: [
    { title: "About Us", url: "#about" },
    { title: "Contact", url: "#contact" },
    { title: "Careers", url: "#careers" },
    { title: "Partners", url: "#partners" }
  ],
  legal: [
    { title: "Terms of Service", url: "#terms" },
    { title: "Privacy Policy", url: "#privacy" },
    { title: "Cookie Policy", url: "#cookies" },
    { title: "GDPR", url: "#gdpr" }
  ]
};

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Vui lòng nhập email hợp lệ");
      return;
    }

    setIsSubmitting(true);

    try {
      // Mock API call
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      console.log("Newsletter signup:", email);
      alert("Cảm ơn bạn đã đăng ký nhận tin!");
      setEmail("");
    } catch (error) {
      console.error("Newsletter error:", error);
      alert("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-n-8 border-t border-n-6" role="contentinfo">
      <div className="container py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <a href="#hero" className="flex items-center gap-3 mb-4">
              <img
                src={reveo}
                alt="ReVeo Studio"
                className="h-10 w-10 object-contain"
              />
              <span className="text-white text-xl font-bold tracking-tight">
                ReVeo
              </span>
            </a>
            <p className="text-n-3 text-sm mb-6">
              Nền tảng AI tạo video bán hàng chuyên nghiệp cho TMĐT Việt Nam.
            </p>

            {/* Newsletter Signup */}
            <div className="mb-6">
              <h4 className="text-sm font-code font-bold text-n-1 mb-3">
                Nhận tin mới nhất
              </h4>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email của bạn"
                  className="flex-1 px-3 py-2 bg-n-7 border border-n-6 rounded-lg text-sm focus:outline-none focus:border-purple-500 transition-colors"
                  aria-label="Email address for newsletter"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white text-sm font-semibold rounded-lg transition-colors disabled:opacity-50"
                  aria-label="Subscribe to newsletter"
                >
                  {isSubmitting ? "..." : "Đăng ký"}
                </button>
              </form>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-sm font-code font-bold text-n-1 mb-3">
                Kết nối với chúng tôi
              </h4>
              <div className="flex gap-3">
                {socials.map((social) => (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex items-center justify-center w-10 h-10 bg-n-7 hover:bg-purple-500/20 border border-n-6 hover:border-purple-500 rounded-lg transition-all"
                    aria-label={`Follow us on ${social.title}`}
                  >
                    <img
                      src={social.iconUrl}
                      alt={social.title}
                      width={18}
                      height={18}
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-sm font-code font-bold text-n-1 mb-4">
              Sản phẩm
            </h4>
            <ul className="space-y-2">
              {footerLinks.products.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    className="text-sm text-n-3 hover:text-purple-500 transition-colors"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-code font-bold text-n-1 mb-4">
              Tài nguyên
            </h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    className="text-sm text-n-3 hover:text-purple-500 transition-colors"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-code font-bold text-n-1 mb-4">
              Công ty
            </h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    className="text-sm text-n-3 hover:text-purple-500 transition-colors"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-code font-bold text-n-1 mb-4">
              Liên hệ
            </h4>
            <ul className="space-y-3 text-sm text-n-3">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Biệt thự SH24-67, Dãy San Hô 24, Vinhomes Ocean Park 2</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>0975.064.766</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>rocketglobal.ai@gmail.com</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <div>T2-T6: 8:30 - 18:00</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-n-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-n-4 text-center md:text-left">
              <span className="font-semibold">©</span>{" "}
              <span className="text-purple-500 font-medium">ReVeo Studio</span>{" "}
              {new Date().getFullYear()}. All rights reserved.
            </p>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-4">
              {footerLinks.legal.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="text-xs text-n-4 hover:text-purple-500 transition-colors"
                >
                  {link.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;