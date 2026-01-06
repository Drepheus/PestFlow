import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from './Button';
import { MessageSquare, ArrowRight, X } from 'lucide-react';

interface PlanSelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    planTitle: string;
    planPrice: string;
}

export const PlanSelectionModal: React.FC<PlanSelectionModalProps> = ({
    isOpen,
    onClose,
    planTitle,
    planPrice
}) => {
    const navigate = useNavigate();
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    const handleBookNow = () => {
        navigate('/booking');
        onClose();
    };

    const handleContact = () => {
        navigate('/contact');
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center px-4"
                >
                    {/* Backdrop Layer */}
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    ></div>

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-md z-[101]"
                    >
                        <div ref={modalRef} className="bg-[#18181b] border border-[#27272a] rounded-2xl shadow-2xl overflow-hidden">
                            {/* Header with gradient line */}
                            <div className="h-1 bg-gradient-to-r from-green-600 to-green-400"></div>

                            <div className="p-6 relative">
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>

                                <div className="text-center mb-8">
                                    <h3 className="text-sm font-medium text-green-500 uppercase tracking-wider mb-2">Excellent Choice</h3>
                                    <h2 className="text-2xl font-bold text-white mb-2">{planTitle}</h2>
                                    <p className="text-gray-400">
                                        Starting at <span className="text-white font-bold">{planPrice}</span>. How would you like to proceed?
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <Button
                                        fullWidth
                                        size="lg"
                                        onClick={handleBookNow}
                                        className="h-14 text-lg bg-white text-neutral-900 hover:bg-gray-100"
                                    >
                                        Book Now <ArrowRight className="ml-2" size={20} />
                                    </Button>

                                    <div className="relative flex py-2 items-center">
                                        <div className="flex-grow border-t border-[#27272a]"></div>
                                        <span className="flex-shrink-0 mx-4 text-gray-500 text-xs uppercase">Or</span>
                                        <div className="flex-grow border-t border-[#27272a]"></div>
                                    </div>

                                    <Button
                                        fullWidth
                                        size="lg"
                                        variant="outline"
                                        onClick={handleContact}
                                        className="h-14 text-lg border-[#3f3f46] hover:bg-[#27272a] text-white group"
                                    >
                                        <MessageSquare className="mr-2 group-hover:text-blue-400 transition-colors" size={20} /> Chat with an Expert
                                    </Button>
                                </div>

                                <div className="mt-6 text-center">
                                    <p className="text-xs text-gray-500">
                                        By selecting 'Book Now', you'll be taken to our 2-minute express checkout.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
