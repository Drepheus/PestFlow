import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ai';
}

export const AIAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', text: "Hi! I'm your ReadyCleans AI assistant. I can help with Standard or Airbnb turnover pricing, service details, and booking questions. How can I assist you today?", sender: 'ai' }
    ]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMsg: Message = { id: Date.now().toString(), text: input, sender: 'user' };
        const currentInput = input;
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            // Get conversation history (excluding the initial greeting and the message just sent)
            const history = messages.filter(msg => msg.id !== '1');

            const response = await fetch('http://localhost:4242/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: currentInput,
                    history: history,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to get response');
            }

            const data = await response.json();
            setMessages(prev => [...prev, {
                id: 'ai-' + Date.now(),
                text: data.response,
                sender: 'ai'
            }]);
        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, {
                id: 'ai-' + Date.now(),
                text: "I'm having trouble connecting right now. Please try again or call us directly for immediate assistance.",
                sender: 'ai'
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        onClick={() => setIsOpen(true)}
                        aria-label="Toggle chat"
                        className="fixed bottom-6 right-6 w-12 h-12 bg-green-600 text-white rounded-full shadow-[0_4px_20px_rgba(34,197,94,0.5)] flex items-center justify-center hover:bg-green-700 transition-colors z-50 border border-white/10"
                    >
                        <MessageSquare size={20} />
                    </motion.button>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-6 right-6 w-full max-w-[350px] bg-[#18181b] rounded-2xl shadow-2xl border border-[#27272a] overflow-hidden z-50 flex flex-col max-h-[500px]"
                    >
                        {/* Header */}
                        <div className="bg-[#09090b] p-4 flex justify-between items-center border-b border-[#27272a]">
                            <div className="flex items-center gap-3">
                                <div className="bg-green-500/20 p-2 rounded-lg text-green-500">
                                    <Bot size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm text-white">ReadyCleans AI</h3>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_5px_rgba(34,197,94,0.5)]"></span>
                                        <span className="text-xs text-gray-400">Powered by Gemini</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#111113] min-h-[350px]">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`
                                            max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed
                                            ${msg.sender === 'user'
                                                ? 'bg-green-600 text-white rounded-tr-none'
                                                : 'bg-[#27272a] text-gray-200 rounded-tl-none border border-[#3f3f46]'
                                            }
                                        `}
                                    >
                                        {msg.sender === 'ai' ? (
                                            <ReactMarkdown
                                                components={{
                                                    p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                                                    ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
                                                    ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
                                                    li: ({ children }) => <li className="ml-1">{children}</li>,
                                                    strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
                                                    em: ({ children }) => <em className="italic">{children}</em>,
                                                    h1: ({ children }) => <h1 className="font-bold text-base mb-2">{children}</h1>,
                                                    h2: ({ children }) => <h2 className="font-bold text-sm mb-1">{children}</h2>,
                                                    h3: ({ children }) => <h3 className="font-semibold text-sm mb-1">{children}</h3>,
                                                }}
                                            >
                                                {msg.text}
                                            </ReactMarkdown>
                                        ) : (
                                            msg.text
                                        )}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-[#27272a] text-gray-200 rounded-2xl rounded-tl-none border border-[#3f3f46] p-3 flex items-center gap-2">
                                        <Loader2 size={16} className="animate-spin text-green-500" />
                                        <span className="text-sm text-gray-400">Thinking...</span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-3 bg-[#18181b] border-t border-[#27272a] flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSend()}
                                placeholder="Ask a question..."
                                disabled={isLoading}
                                className="flex-1 bg-[#27272a] border border-[#3f3f46] text-white rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-green-500 placeholder:text-gray-500 disabled:opacity-50"
                            />
                            <button
                                onClick={handleSend}
                                disabled={!input.trim() || isLoading}
                                className="w-10 h-10 bg-white text-neutral-900 rounded-full flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
                            >
                                {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

