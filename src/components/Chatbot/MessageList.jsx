// MessageList - Hiển thị tin nhắn với formatting
import { useEffect, useRef } from 'react';

const formatMessage = (text) => {
    if (!text) return '';

    let formatted = text;

    // Code blocks
    formatted = formatted.replace(/```([\s\S]*?)```/g, '<pre class="bg-n-8 p-2 rounded my-1.5 overflow-x-auto text-xs"><code>$1</code></pre>');

    // Bold
    formatted = formatted.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>');

    // Inline code
    formatted = formatted.replace(/`(.+?)`/g, '<code class="bg-n-8 px-1 py-0.5 rounded text-xs font-mono">$1</code>');

    // Paragraphs
    const paragraphs = formatted.split('\n\n');
    formatted = paragraphs.map(p => {
        const lines = p.split('\n').join('<br/>');
        return `<p class="mb-2 last:mb-0">${lines}</p>`;
    }).join('');

    return formatted;
};

const MessageList = ({ messages }) => {
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="flex-1 overflow-y-auto px-2.5 py-3 space-y-2.5">
            {messages.map((message) => (
                <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                    <div className={`flex gap-1.5 max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        {/* Avatar */}
                        <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${message.role === 'user'
                                ? 'bg-purple-500 text-white'
                                : 'bg-gradient-to-br from-purple-500 to-blue-500 text-white'
                            }`}>
                            {message.role === 'user' ? 'B' : 'AI'}
                        </div>

                        {/* Message bubble */}
                        <div className="flex flex-col">
                            <div className={`px-2.5 py-1.5 rounded-xl text-xs ${message.role === 'user'
                                    ? 'bg-purple-500 text-white rounded-tr-sm'
                                    : 'bg-n-7 text-n-1 rounded-tl-sm'
                                } ${message.status === 'sending' ? 'opacity-60' : ''}`}>
                                {/* Attachments */}
                                {message.attachments && message.attachments.length > 0 && (
                                    <div className="mb-1.5 space-y-1">
                                        {message.attachments.map((attachment, idx) => (
                                            <div key={idx}>
                                                {attachment.type.startsWith('image/') ? (
                                                    <img
                                                        src={attachment.url}
                                                        alt={attachment.filename}
                                                        className="max-w-full rounded max-h-32 object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex items-center gap-1.5 p-1.5 bg-n-8 rounded text-[10px]">
                                                        <svg className="w-3 h-3 text-n-4" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clipRule="evenodd" />
                                                        </svg>
                                                        <span className="truncate">{attachment.filename}</span>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Content */}
                                {message.content && (
                                    <div
                                        className="prose prose-sm max-w-none prose-invert leading-relaxed"
                                        dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
                                    />
                                )}

                                {/* Typing */}
                                {message.role === 'bot' && message.status === 'typing' && (
                                    <div className="flex gap-0.5">
                                        <div className="w-1 h-1 bg-n-4 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                        <div className="w-1 h-1 bg-n-4 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                        <div className="w-1 h-1 bg-n-4 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                    </div>
                                )}
                            </div>

                            {/* Time */}
                            <span className={`text-[9px] text-n-4 mt-0.5 px-0.5 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                                {formatTime(message.timestamp)}
                                {message.status === 'error' && <span className="text-red-500 ml-1">✗</span>}
                            </span>
                        </div>
                    </div>
                </div>
            ))}

            <div ref={messagesEndRef} aria-live="polite" className="sr-only">New message</div>
        </div>
    );
};

export default MessageList;
