// Gemini API client - Tích hợp Google Gemini cho chatbot responses
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

export const sendMessageToGemini = async (messages) => {
    if (!GEMINI_API_KEY) {
        console.warn('Gemini API key not found. Using mock response.');
        return getMockResponse(messages);
    }

    try {
        const contents = messages.map(msg => ({
            role: msg.role === 'bot' ? 'model' : 'user',
            parts: [{ text: msg.content }]
        }));

        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents,
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 1024,
                }
            })
        });

        if (!response.ok) {
            throw new Error(`Gemini API error: ${response.status}`);
        }

        const data = await response.json();
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Xin lỗi, tôi không thể trả lời lúc này.';

        return { reply };
    } catch (error) {
        console.error('Gemini API error:', error);
        return getMockResponse(messages);
    }
};

const getMockResponse = (messages) => {
    const lastMessage = messages[messages.length - 1]?.content.toLowerCase() || '';

    const mockResponses = {
        'tạo video': `Để tạo video bán hàng với ReVeo Studio:

**Bước 1: Chuẩn bị ảnh**
- Upload ảnh chất lượng cao
- Nên có 3-5 ảnh từ nhiều góc

**Bước 2: AI tạo kịch bản**
- Hệ thống phân tích ảnh
- Tạo kịch bản tự động

**Bước 3: Xuất video**
- Chọn giọng đọc AI
- Xuất video trong 2-3 phút`,

        'kịch bản': `Mẫu kịch bản TikTok 15s:

**0-3s:** Hook
"Bạn đang tìm [sản phẩm]?"

**3-10s:** Value
- Tính năng 1
- Lợi ích 2

**10-15s:** CTA
"Đặt ngay! Link bio ⬇️"`,

        'tính năng': `ReVeo Studio có:

**🎬 AI Video Creator**
- Tự động từ ảnh
- AI viết kịch bản
- Voice AI đa dạng

**✂️ Quick Editor**
- Chỉnh sửa nhanh
- Thêm text, music
- Export đa nền tảng`,

        'shopee': `Xuất video chuẩn Shopee:

**1. Tỉ lệ 1:1 hoặc 9:16**
**2. Thời lượng 15-60s**
**3. Chất lượng 1080p**
**4. File < 30MB**

ReVeo tự động optimize!`,

        'default': `Xin chào! Tôi là ReVeo Bot.

Tôi có thể giúp:
- Tạo video từ ảnh
- Tư vấn kịch bản
- Hướng dẫn tính năng

Bạn cần gì?`
    };

    for (const [key, response] of Object.entries(mockResponses)) {
        if (lastMessage.includes(key)) {
            return { reply: response };
        }
    }

    return { reply: mockResponses.default };
};

export const uploadFile = async (file) => {
    await new Promise(resolve => setTimeout(resolve, 800));

    return {
        url: URL.createObjectURL(file),
        filename: file.name,
        size: file.size,
        type: file.type
    };
};
