// QuickSuggestions - Gợi ý chat mẫu
const QuickSuggestions = ({ onSelect, disabled }) => {
    const suggestions = [
        {
            id: 1,
            icon: '🎬',
            text: 'Tạo video bán hàng cho sản phẩm của tôi'
        },
        {
            id: 2,
            icon: '📝',
            text: 'Gợi ý kịch bản TikTok 15 giây'
        },
        {
            id: 3,
            icon: '✨',
            text: 'Giải thích các tính năng chính của ReVeo'
        },
        {
            id: 4,
            icon: '🛍️',
            text: 'Hướng dẫn cách xuất video chuẩn Shopee'
        }
    ];

    return (
        <div className="px-3 py-2 space-y-1.5">
            <p className="text-xs text-n-4 font-medium mb-1.5">Gợi ý câu hỏi:</p>
            <div className="grid grid-cols-1 gap-1.5">
                {suggestions.map((suggestion) => (
                    <button
                        key={suggestion.id}
                        onClick={() => onSelect(suggestion.text)}
                        disabled={disabled}
                        className="flex items-center gap-2 px-2.5 py-1.5 bg-n-7 hover:bg-n-6 border border-n-6 hover:border-purple-500/50 rounded-lg text-left text-xs text-n-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                        <span className="text-sm flex-shrink-0">{suggestion.icon}</span>
                        <span className="flex-1 leading-tight">{suggestion.text}</span>
                        <svg className="w-3 h-3 text-n-4 group-hover:text-purple-500 flex-shrink-0 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default QuickSuggestions;
