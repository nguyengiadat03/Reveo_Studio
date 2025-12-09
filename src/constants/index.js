import {
  benefitIcon1,
  benefitIcon2,
  benefitIcon3,
  benefitIcon4,
  benefitImage2,
  chromecast,
  disc02,
  discord,
  discordBlack,
  facebook,
  figma,
  file02,
  framer,
  homeSmile,
  instagram,
  notification2,
  notification3,
  notification4,
  notion,
  photoshop,
  plusSquare,
  protopie,
  raindrop,
  recording01,
  recording03,
  reveo,
  roadmap1,
  roadmap2,
  roadmap3,
  roadmap4,
  searchMd,
  slack,
  sliders04,
  telegram,
  twitter,
} from "../assets";

import { links } from "../config";

export const navigation = [
  {
    id: "0",
    title: "Templates",
    url: "#templates",
  },
  {
    id: "1",
    title: "Tính năng",
    url: "#features",
  },
  {
    id: "2",
    title: "Bảng giá",
    url: "#pricing",
  },
  {
    id: "3",
    title: "Hướng dẫn",
    url: "#how-to-use",
  },
  {
    id: "4",
    title: "Liên hệ",
    url: "#contact",
  },
];

export const heroIcons = [homeSmile, file02, searchMd, plusSquare];

export const notificationImages = [notification4, notification3, notification2];

export const companyLogos = [reveo, reveo, reveo, reveo, reveo];

export const reveoServices = [
  "Tạo video từ ảnh sản phẩm",
  "AI Voiceover tiếng Việt",
  "Tích hợp Shopee, TikTok, Lazada",
];

export const reveoServicesIcons = [
  recording03,
  recording01,
  disc02,
  chromecast,
  sliders04,
];

export const roadmap = [
  {
    id: "0",
    title: "Batch Video Creation",
    text: "Tạo hàng loạt video cho nhiều sản phẩm cùng lúc. Upload CSV danh sách sản phẩm và ảnh, hệ thống tự động tạo video theo template đã chọn.",
    date: "Q1 2024",
    status: "done",
    imageUrl: roadmap1,
    colorful: true,
  },
  {
    id: "1",
    title: "Template Marketplace",
    text: "Hệ sinh thái template do creator tạo và bán. Seller chọn template phù hợp với ngành hàng và nền tảng TMĐT của mình.",
    date: "Q2 2024",
    status: "progress",
    imageUrl: roadmap2,
  },
  {
    id: "2",
    title: "Advanced Video Editor",
    text: "Chế độ chỉnh sửa nâng cao với timeline, scene control, AI reframe, color grading, và motion effects cho creator chuyên nghiệp.",
    date: "Q2 2024",
    status: "done",
    imageUrl: roadmap3,
  },
  {
    id: "3",
    title: "Team Collaboration & Client Review",
    text: "Workspace cho freelancer và agency: quản lý project, gửi video cho khách duyệt, nhận feedback theo timestamp, version control.",
    date: "Q3 2024",
    status: "progress",
    imageUrl: roadmap4,
  },
];

export const collabText =
  "Với workflow tự động hóa và tối ưu cho từng nền tảng TMĐT, ReVeo Studio là giải pháp hoàn hảo cho seller, creator và agency muốn làm việc hiệu quả hơn.";

export const collabContent = [
  {
    id: "0",
    title: "Workflow Tự Động",
    text: collabText,
  },
  {
    id: "1",
    title: "Tối Ưu Nền Tảng",
  },
  {
    id: "2",
    title: "Team Collaboration",
  },
];

export const collabApps = [
  {
    id: "0",
    title: "Shopee",
    icon: figma,
    width: 26,
    height: 36,
  },
  {
    id: "1",
    title: "TikTok Shop",
    icon: notion,
    width: 34,
    height: 36,
  },
  {
    id: "2",
    title: "Lazada",
    icon: discord,
    width: 36,
    height: 28,
  },
  {
    id: "3",
    title: "Tiki",
    icon: slack,
    width: 34,
    height: 35,
  },
  {
    id: "4",
    title: "Facebook Shop",
    icon: photoshop,
    width: 34,
    height: 34,
  },
  {
    id: "5",
    title: "Instagram",
    icon: protopie,
    width: 34,
    height: 34,
  },
  {
    id: "6",
    title: "Sendo",
    icon: framer,
    width: 26,
    height: 34,
  },
  {
    id: "7",
    title: "Zalo Shop",
    icon: raindrop,
    width: 38,
    height: 32,
  },
];

export const pricing = [
  {
    id: "0",
    title: "Basic",
    description: "Hoàn hảo cho seller mới bắt đầu",
    price: "0",
    priceNote: "Miễn phí 1 tháng đầu",
    features: [
      "Tạo 10 video/tháng",
      "50+ template cơ bản",
      "Export 720p (9:16, 1:1)",
      "AI Voiceover tiếng Việt",
      "Watermark ReVeo",
      "Support qua email",
    ],
    premium: false,
    popular: false,
    badge: "FREE TRIAL",
  },
  {
    id: "1",
    title: "Plus",
    description: "Cho seller đang phát triển",
    price: "199.000",
    features: [
      "Tạo 50 video/tháng",
      "200+ template chuyên nghiệp",
      "Export 1080p, không watermark",
      "AI Voiceover đa giọng",
      "Lưu 5 template cá nhân",
      "Music library 500+ tracks",
      "Priority email support",
    ],
    premium: false,
    popular: false,
  },
  {
    id: "2",
    title: "Pro",
    description: "Cho creator & seller chuyên nghiệp",
    price: "399.000",
    features: [
      "Tạo KHÔNG GIỚI HẠN video",
      "Toàn bộ template marketplace",
      "Advanced Editor với timeline",
      "Export 4K, không watermark",
      "AI reframe, color grading",
      "Motion effects & transitions",
      "Lưu không giới hạn template",
      "Music library premium",
      "Priority chat support 24/7",
      "Remove ReVeo branding",
    ],
    premium: true,
    popular: true,
    badge: "MOST POPULAR",
  },
  {
    id: "3",
    title: "Premium",
    description: "Cho team, agency & doanh nghiệp",
    price: "999.000",
    features: [
      "Tất cả tính năng Pro",
      "Batch creation (hàng loạt)",
      "Team workspace (5-10 users)",
      "Client review & feedback",
      "Brand library & style guide",
      "White-label solution",
      "API access & webhooks",
      "Custom template development",
      "Dedicated account manager",
      "SLA 99.9% uptime",
    ],
    premium: false,
    popular: false,
    badge: "ENTERPRISE",
  },
];

export const benefits = [
  {
    id: "0",
    title: "Tạo video trong vài phút",
    text: "Chỉ cần upload ảnh sản phẩm và mô tả, AI sẽ tự động tạo video bán hàng chuyên nghiệp. Không cần biết dựng video.",
    backgroundUrl: "/src/assets/benefits/card-1.svg",
    iconUrl: benefitIcon1,
    imageUrl: benefitImage2,
  },
  {
    id: "1",
    title: "AI Voiceover tiếng Việt",
    text: "Giọng đọc tự nhiên bằng AI với giọng Nam/Nữ, giọng Bắc/Nam. Tự động đọc mô tả sản phẩm, ưu điểm, giá cả.",
    backgroundUrl: "/src/assets/benefits/card-2.svg",
    iconUrl: benefitIcon2,
    imageUrl: benefitImage2,
    light: true,
  },
  {
    id: "2",
    title: "Tối ưu cho mọi nền tảng",
    text: "Video tạo ra chuẩn format cho Shopee, TikTok Shop, Lazada, Facebook. Tỷ lệ 9:16, 1:1, 16:9 tùy chọn.",
    backgroundUrl: "/src/assets/benefits/card-3.svg",
    iconUrl: benefitIcon3,
    imageUrl: benefitImage2,
  },
  {
    id: "3",
    title: "Render nhanh chóng",
    text: "AI xử lý video trong vài phút. Không cần chờ đợi lâu, có video ngay để đăng sản phẩm hoặc chạy ads.",
    backgroundUrl: "/src/assets/benefits/card-4.svg",
    iconUrl: benefitIcon4,
    imageUrl: benefitImage2,
    light: true,
  },
  {
    id: "4",
    title: "Template Marketplace",
    text: "Hàng trăm template chuyên biệt cho từng ngành hàng: Mỹ phẩm, Thời trang, Điện tử, Gia dụng... Chọn và dùng ngay.",
    backgroundUrl: "/src/assets/benefits/card-5.svg",
    iconUrl: benefitIcon1,
    imageUrl: benefitImage2,
  },
  {
    id: "5",
    title: "Chỉnh sửa nâng cao",
    text: "Advanced Editor cho creator: timeline, scene control, AI reframe, color grading, motion effects. Tùy chỉnh mọi chi tiết.",
    backgroundUrl: "/src/assets/benefits/card-6.svg",
    iconUrl: benefitIcon2,
    imageUrl: benefitImage2,
  },
];

export const socials = [
  {
    id: "0",
    title: "Discord",
    iconUrl: discordBlack,
    url: "https://discord.com",
  },
  {
    id: "1",
    title: "Twitter",
    iconUrl: twitter,
    url: "https://twitter.com",
  },
  {
    id: "2",
    title: "Instagram",
    iconUrl: instagram,
    url: "https://www.instagram.com",
  },
  {
    id: "3",
    title: "Telegram",
    iconUrl: telegram,
    url: "https://telegram.org",
  },
  {
    id: "4",
    title: "Facebook",
    iconUrl: facebook,
    url: "https://www.facebook.com",
  },
];
