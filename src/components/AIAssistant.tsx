import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot } from 'lucide-react';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ai';
}

export const AIAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', text: "Hi! I'm your ReadyCleans assistant. Need help with Move-Out or Airbnb turnover pricing?", sender: 'ai' }
    ]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg: Message = { id: Date.now().toString(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInput('');

        // Simulate AI response logic
        setTimeout(() => {
            let responseText = "I'm not sure about that, but our team is available 7 days a week if you book a service!";
            const lower = input.toLowerCase();

            if (lower.includes('price') || lower.includes('cost') || lower.includes('how much')) {
                responseText = "Our Move-Out cleans start at $125 (Studio) and Airbnb upgrades start at $80. The price is fixed based on your unit size!";
            } else if (lower.includes('include') || lower.includes('what do you do') || lower.includes('checklist')) {
                responseText = "We cover all standard inspection points: Kitchen (cabinets in/out, appliances out), Bathrooms (sanitize), Floors, Baseboards, and Dusting.";
            } else if (lower.includes('furniture') || lower.includes('trash') || lower.includes('junk')) {
                responseText = "Please note: We DO NOT move heavy furniture or remove heavy trash/junk. Please have the unit cleared of personal items.";
            } else if (lower.includes('guarantee') || lower.includes('deposit')) {
                responseText = "Yes! We offer a 100% Satisfaction Guarantee. If you fail an inspection due to cleaning, we return for free.";
            }

            setMessages(prev => [...prev, { id: 'ai-' + Date.now(), text: responseText, sender: 'ai' }]);
        }, 1000);
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
                                        <span className="text-xs text-gray-400">Online</span>
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
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-3 bg-[#18181b] border-t border-[#27272a] flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ask a question..."
                                className="flex-1 bg-[#27272a] border border-[#3f3f46] text-white rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-green-500 placeholder:text-gray-500"
                            />
                            <button
                                onClick={handleSend}
                                disabled={!input.trim()}
                                className="w-10 h-10 bg-white text-neutral-900 rounded-full flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
