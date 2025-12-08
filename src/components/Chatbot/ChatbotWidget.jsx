// ChatbotWidget - Compact professional chatbot 320x480px
import { useState, useRef } from 'react';
import MessageList from './MessageList';
import Composer from './Composer';
import QuickSuggestions from './QuickSuggestions';
import useOutsideClick from '../../hooks/useOutsideClick';
import { sendMessageToGemini } from '../../api/chatClient';

const ChatbotWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [botTyping, setBotTyping] = useState(false);
    const panelRef = useRef(null);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    useOutsideClick(panelRef, () => setIsOpen(false), isOpen);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleQuickSuggestion = (text) => {
        handleSendMessage(text, []);
    };

    const handleSendMessage = async (content, attachments = []) => {
        if (!content && attachments.length === 0) return;

        const userMessage = {
            id: Date.now(),
            role: 'user',
            content,
            attachments,
            timestamp: Date.now(),
            status: 'sending'
        };

        setMessages(prev => [...prev, userMessage]);

        setTimeout(() => {
            setMessages(prev =>
                prev.map(msg =>
                    msg.id === userMessage.id
                        ? { ...msg, status: 'delivered' }
                        : msg
                )
            );
        }, 300);

        setBotTyping(true);
        const typingMessage = {
            id: Date.now() + 1,
            role: 'bot',
            content: '',
            timestamp: Date.now(),
            status: 'typing'
        };
        setMessages(prev => [...prev, typingMessage]);

        try {
            const apiMessages = messages
                .filter(m => m.role !== 'bot' || m.status !== 'typing')
                .map(m => ({ role: m.role, content: m.content }));

            apiMessages.push({ role: 'user', content });

            const response = await sendMessageToGemini(apiMessages, attachments);

            setMessages(prev => {
                const filtered = prev.filter(m => m.id !== typingMessage.id);
                return [
                    ...filtered,
                    {
                        id: Date.now() + 2,
                        role: 'bot',
                        content: response.reply,
                        timestamp: Date.now(),
                        status: 'delivered'
                    }
                ];
            });
        } catch (error) {
            console.error('Failed to send message:', error);

            setMessages(prev => {
                const filtered = prev.filter(m => m.id !== typingMessage.id);
                return [
                    ...filtered,
                    {
                        id: Date.now() + 2,
                        role: 'bot',
                        content: 'Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.',
                        timestamp: Date.now(),
                        status: 'error'
                    }
                ];
            });

            setMessages(prev =>
                prev.map(msg =>
                    msg.id === userMessage.id
                        ? { ...msg, status: 'error' }
                        : msg
                )
            );
        } finally {
            setBotTyping(false);
        }
    };

    return (
        <>
            {/* Floating button - 44x44 */}
            <div className="fixed bottom-4 right-4 z-[9999]">
                <button
                    onClick={handleToggle}
                    className="relative w-11 h-11 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-n-8"
                    aria-label={isOpen ? 'Đóng chat' : 'Mở chat'}
                >
                    {!prefersReducedMotion && !isOpen && (
                        <span className="absolute inset-0 rounded-full bg-purple-500 animate-ping opacity-75"></span>
                    )}

                    <span className="relative z-10 flex items-center justify-center w-full h-full">
                        {isOpen ? (
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                        )}
                    </span>
                </button>
            </div>

            {/* Chat panel - 320x480 */}
            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/50 z-[9998] md:hidden"
                        aria-hidden="true"
                    />

                    <div
                        ref={panelRef}
                        className={`fixed z-[9999] bg-n-8 border border-n-6 shadow-2xl flex flex-col
              ${prefersReducedMotion ? '' : 'animate-slide-in'}
              inset-x-3 bottom-16 top-16
              md:inset-auto md:bottom-16 md:right-4
              md:w-[320px] md:h-[480px]
              rounded-xl overflow-hidden`}
                        role="dialog"
                        aria-label="Chat với ReVeo Bot"
                    >
                        {/* Header - Compact */}
                        <div className="flex items-center justify-between px-2.5 py-2 border-b border-n-6 bg-gradient-to-r from-purple-500/10 to-blue-500/10">
                            <div className="flex items-center gap-1.5">
                                <div className="relative">
                                    <div className="w-7 h-7 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white">
                                        AI
                                    </div>
                                    <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 border-2 border-n-8 rounded-full"></span>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-xs text-n-1">ReVeo Bot</h3>
                                    <p className="text-[9px] text-n-4">
                                        {botTyping ? 'Đang nhập...' : 'Trực tuyến'}
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={handleToggle}
                                className="p-1 text-n-4 hover:text-n-1 hover:bg-n-7 rounded transition-colors"
                                aria-label="Đóng"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Messages or Suggestions */}
                        {messages.length === 0 ? (
                            <div className="flex-1 overflow-y-auto">
                                <div className="flex flex-col items-center justify-center px-3 py-4 text-center">
                                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mb-2">
                                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                        </svg>
                                    </div>
                                    <h4 className="text-sm font-semibold text-n-1 mb-0.5">Chào mừng!</h4>
                                    <p className="text-[10px] text-n-4 mb-3">Tôi là trợ lý AI của ReVeo Studio</p>
                                </div>
                                <QuickSuggestions onSelect={handleQuickSuggestion} disabled={botTyping} />
                            </div>
                        ) : (
                            <MessageList messages={messages} />
                        )}

                        {/* Composer */}
                        <Composer onSend={handleSendMessage} disabled={botTyping} />
                    </div>
                </>
            )}

            <style jsx>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-slide-in {
            animation: none;
          }
        }
      `}</style>
        </>
    );
};

export default ChatbotWidget;
