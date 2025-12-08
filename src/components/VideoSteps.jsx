// Section "Các bước để có video bán hàng" - step-by-step guide với 5 bước
import Section from "./Section";
import Heading from "./Heading";
import { check } from "../assets";
import { gradient } from "../assets";

const steps = [
    {
        id: "0",
        step: "01",
        title: "Tạo kịch bản",
        description: "Nhập mô tả sản phẩm hoặc để AI tự động tạo script bán hàng từ ảnh và thông tin cơ bản",
        cta: "Thử AI Script Generator"
    },
    {
        id: "1",
        step: "02",
        title: "Chọn template",
        description: "Duyệt marketplace và chọn template phù hợp với ngành hàng và nền tảng TMĐT của bạn",
        cta: "Xem Template Library"
    },
    {
        id: "2",
        step: "03",
        title: "Tạo AI voice",
        description: "Chọn giọng đọc Nam/Nữ, Bắc/Nam. AI sẽ tự động đọc script với intonation tự nhiên",
        cta: "Nghe demo giọng đọc"
    },
    {
        id: "3",
        step: "04",
        title: "Tối ưu thumbnail",
        description: "AI gợi ý thumbnail hấp dẫn, hoặc tự chọn frame nổi bật nhất từ video để tăng CTR",
        cta: "Xem best practices"
    },
    {
        id: "4",
        step: "05",
        title: "Publish & Track",
        description: "Export video theo format nền tảng, đăng lên shop và theo dõi performance qua dashboard",
        cta: "Kết nối shop ngay"
    }
];

const VideoSteps = () => {
    return (
        <Section className="overflow-hidden" id="how-to-use">
            <div className="container relative z-2">
                <Heading
                    tag="Hướng dẫn"
                    title="Các bước để có video bán hàng"
                />

                <div className="relative">
                    {steps.map((item, index) => (
                        <div
                            key={item.id}
                            className={`md:flex items-center mb-12 ${index % 2 === 0 ? "" : "md:flex-row-reverse"
                                }`}
                        >
                            {/* Step number circle */}
                            <div className="relative flex items-center justify-center w-[200px] h-[200px] mx-auto md:mx-0 mb-6 md:mb-0">
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full opacity-20 blur-xl"></div>
                                <div className="relative flex items-center justify-center w-32 h-32 bg-n-8 border border-n-6 rounded-full">
                                    <span className="text-6xl font-bold bg-gradient-to-br from-purple-500 to-blue-500 bg-clip-text text-transparent">
                                        {item.step}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className={`flex-1 ${index % 2 === 0 ? "md:ml-12" : "md:mr-12"}`}>
                                <div className="relative p-8 bg-n-7 border border-n-6 rounded-3xl">
                                    <div className="flex items-center mb-4">
                                        <img src={check} width={24} height={24} alt="check" />
                                        <h4 className="h4 ml-3">{item.title}</h4>
                                    </div>
                                    <p className="body-2 text-n-3 mb-6">{item.description}</p>
                                    <button className="text-sm font-code font-bold text-purple-500 hover:text-purple-400 transition-colors">
                                        {item.cta} →
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Background gradient */}
                    <div className="absolute top-0 left-1/2 w-[78rem] aspect-square border border-n-2/5 rounded-full -translate-x-1/2 md:-top-[38.5rem] xl:-top-[32rem] pointer-events-none">
                        <div className="absolute top-1/2 left-1/2 w-[65.875rem] aspect-square border border-n-2/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute top-1/2 left-1/2 w-[51.375rem] aspect-square border border-n-2/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute top-1/2 left-1/2 w-[36.125rem] aspect-square border border-n-2/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute top-1/2 left-1/2 w-[23.125rem] aspect-square border border-n-2/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default VideoSteps;
