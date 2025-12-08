// Composer - Input area compact
import { useState, useRef } from 'react';
import useFileUpload from '../../hooks/useFileUpload';

const Composer = ({ onSend, disabled }) => {
    const [message, setMessage] = useState('');
    const [attachments, setAttachments] = useState([]);
    const fileInputRef = useRef(null);
    const imageInputRef = useRef(null);
    const { uploadFile, uploading, error } = useFileUpload();

    const handleSend = async () => {
        if (!message.trim() && attachments.length === 0) return;
        if (disabled || uploading) return;

        await onSend(message.trim(), attachments);
        setMessage('');
        setAttachments([]);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleFileSelect = async (e, type = 'file') => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        for (const file of files) {
            const result = await uploadFile(file);
            if (result) {
                setAttachments(prev => [...prev, result]);
            }
        }

        if (type === 'image') {
            imageInputRef.current.value = '';
        } else {
            fileInputRef.current.value = '';
        }
    };

    const removeAttachment = (index) => {
        setAttachments(prev => prev.filter((_, i) => i !== index));
    };

    const canSend = (message.trim() || attachments.length > 0) && !disabled && !uploading;

    return (
        <div className="border-t border-n-6 p-2">
            {/* Attachments */}
            {attachments.length > 0 && (
                <div className="mb-1.5 flex flex-wrap gap-1">
                    {attachments.map((attachment, idx) => (
                        <div key={idx} className="relative group">
                            {attachment.type.startsWith('image/') ? (
                                <div className="relative">
                                    <img
                                        src={attachment.url}
                                        alt={attachment.filename}
                                        className="w-12 h-12 object-cover rounded border border-n-6"
                                    />
                                    <button
                                        onClick={() => removeAttachment(idx)}
                                        className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100"
                                    >
                                        ×
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-1 px-1.5 py-1 bg-n-7 rounded text-[10px] border border-n-6 pr-5">
                                    <svg className="w-3 h-3 text-n-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clipRule="evenodd" />
                                    </svg>
                                    <span className="truncate max-w-[60px]">{attachment.filename}</span>
                                    <button
                                        onClick={() => removeAttachment(idx)}
                                        className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px]"
                                    >
                                        ×
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Error */}
            {error && (
                <div className="mb-1.5 p-1 bg-red-500/10 border border-red-500/30 rounded text-red-500 text-[10px]">
                    {error}
                </div>
            )}

            {/* Input */}
            <div className="flex items-center gap-1">
                {/* Image */}
                <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => handleFileSelect(e, 'image')}
                />
                <button
                    onClick={() => imageInputRef.current?.click()}
                    disabled={uploading}
                    className="p-1.5 text-n-4 hover:text-purple-500 hover:bg-n-7 rounded transition-colors disabled:opacity-50"
                    title="Gửi hình"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </button>

                {/* File */}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="*/*"
                    multiple
                    className="hidden"
                    onChange={(e) => handleFileSelect(e, 'file')}
                />
                <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="p-1.5 text-n-4 hover:text-purple-500 hover:bg-n-7 rounded transition-colors disabled:opacity-50"
                    title="Gửi file"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                </button>

                {/* Text input */}
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Nhập tin nhắn..."
                    disabled={disabled || uploading}
                    className="flex-1 px-2.5 py-1.5 bg-n-7 border border-n-6 rounded text-xs text-n-1 placeholder-n-4 focus:outline-none focus:border-purple-500 disabled:opacity-50"
                />

                {/* Send */}
                <button
                    onClick={handleSend}
                    disabled={!canSend}
                    className="p-1.5 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Gửi"
                >
                    {uploading ? (
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    )}
                </button>
            </div>
        </div>
    );
};

export default Composer;
