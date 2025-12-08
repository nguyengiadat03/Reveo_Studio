// Section "Nhóm người dùng & cấp độ sử dụng" - 4 thẻ cho từng level người dùng
import Section from "./Section";
import Heading from "./Heading";
import Button from "./Button";
import { check2 } from "../assets";
import { GradientLight } from "./design/Benefits";

const userLevels = [
    {
        id: "0",
        level: "Newbie",
        subtitle: "Mới bắt đầu với video editing",
        features: [
            "Template có sẵn, chỉ cần kéo thả ảnh",
            "AI tự động tạo script và voiceover",
            "Hướng dẫn từng bước chi tiết"
        ],
        cta: "Bắt đầu miễn phí",
        color: "from-purple-500 to-blue-500"
    },
    {
        id: "1",
        level: "Experienced",
        subtitle: "Đã có kinh nghiệm làm video",
        features: [
            "Advanced Editor với timeline control",
            "AI reframe, color grading, motion effects",
            "Tùy chỉnh template và lưu preset"
        ],
        cta: "Nâng cấp Pro",
        color: "from-blue-500 to-cyan-500"
    },
    {
        id: "2",
        level: "Freelancer / Agency",
        subtitle: "Làm video cho nhiều khách hàng",
        features: [
            "Client review & feedback system",
            "Request management & version control",
            "Brand library cho từng client"
        ],
        cta: "Dùng thử Agency",
        color: "from-cyan-500 to-green-500"
    },
    {
        id: "3",
        level: "Team / Media Company",
        subtitle: "Đội nhóm hoặc công ty media",
        features: [
            "Team workspace & collaboration tools",
            "Shared assets & style guide library",
            "Multi-seat license & role management"
        ],
        cta: "Liên hệ Sales",
        color: "from-green-500 to-yellow-500"
    }
];

const UserLevels = () => {
    return (
        <Section id="user-levels">
            <div className="container relative z-2">
                <Heading
                    className="md:max-w-md lg:max-w-2xl"
                    title="Nhóm người dùng & cấp độ sử dụng"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {userLevels.map((level) => (
                        <div
                            key={level.id}
                            className="relative p-0.5 bg-n-6 rounded-3xl overflow-hidden hover:scale-105 transition-transform"
                        >
                            {/* Gradient border effect */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${level.color} opacity-50`}></div>

                            <div className="relative bg-n-8 rounded-[23px] p-8 h-full flex flex-col">
                                <h5 className="h5 mb-2">{level.level}</h5>
                                <p className="body-2 text-n-3 mb-6">{level.subtitle}</p>

                                <ul className="flex-1 mb-6 space-y-4">
                                    {level.features.map((feature, index) => (
                                        <li key={index} className="flex items-start">
                                            <img src={check2} width={20} height={20} alt="check" className="mt-1" />
                                            <p className="body-2 ml-3">{feature}</p>
                                        </li>
                                    ))}
                                </ul>

                                <Button className="w-full" white={level.id === "0"}>
                                    {level.cta}
                                </Button>

                                <GradientLight />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
};

export default UserLevels;
