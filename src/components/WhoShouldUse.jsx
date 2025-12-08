// Section "Ai nên dùng ReVeo.art?" - giới thiệu đối tượng người dùng phù hợp
import Section from "./Section";
import Heading from "./Heading";
import { check } from "../assets";

const targetAudiences = [
    {
        id: "0",
        title: "Seller TMĐT",
        description: "Bán hàng trên Shopee, TikTok Shop, Lazada cần video sản phẩm nhanh và chuyên nghiệp"
    },
    {
        id: "1",
        title: "Content Creator",
        description: "Tạo video review, unboxing, hoặc làm content cho brand với hiệu quả cao"
    },
    {
        id: "2",
        title: "Agency & Freelancer",
        description: "Nhận làm video cho nhiều khách hàng, cần workflow quản lý dự án và client review"
    },
    {
        id: "3",
        title: "Team Marketing",
        description: "Đội nội bộ cần collaboration, brand library và tạo video hàng loạt cho campaigns"
    }
];

const WhoShouldUse = () => {
    return (
        <Section className="pt-[4rem] -mt-[5.25rem]" crosses crossesOffset="lg:translate-y-[5.25rem]" customPaddings id="who-should-use">
            <div className="container relative z-2">
                <Heading
                    className="md:max-w-md lg:max-w-2xl text-center mx-auto"
                    title="Ai nên dùng ReVeo.art?"
                />

                <div className="flex flex-wrap justify-center gap-6 mb-10">
                    {targetAudiences.map((audience) => (
                        <div
                            key={audience.id}
                            className="block relative p-0.5 bg-conic-gradient rounded-2xl max-w-[280px] hover:scale-105 transition-transform"
                        >
                            <div className="relative bg-n-8 rounded-[15px] p-8">
                                <div className="flex items-start mb-4">
                                    <img src={check} width={24} height={24} alt="check" />
                                    <h6 className="h6 ml-3">{audience.title}</h6>
                                </div>
                                <p className="body-2 text-n-3">{audience.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
};

export default WhoShouldUse;
