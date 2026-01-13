import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Sparkles, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const isBooking = location.pathname === '/booking';

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    return (
        <nav className="fixed top-0 w-full z-50 h-[var(--header-height)]">
            <div className="absolute inset-0 bg-[#09090b]/80 backdrop-blur-md border-b border-[#27272a]"></div>

            <div className="container h-full mx-auto flex items-center justify-between px-4 relative z-10">
                <Link
                    to="/"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="flex items-center gap-2 group"
                >
                    {/* Logo Icon */}
                    <div className="relative">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center text-white shadow-[0_0_15px_rgba(34,197,94,0.4)]">
                            <Sparkles size={18} fill="currentColor" />
                        </div>
                    </div>
                    <span className="font-bold text-xl tracking-tight text-white">ReadyCleans</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {!isBooking && (
                        <>
                            <a href="/#plans" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Pricing</a>
                            <a href="/#how" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">How It Works</a>
                            <Link to="/blog" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Blog</Link>
                            <Link to="/contact" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Support</Link>
                        </>
                    )}
                </div>

                <div className="hidden md:flex items-center gap-6">
                    {/* Trust Signal */}
                    {/* Trust Signal & Contact */}
                    <div className="flex flex-col items-end mr-2">
                        <a href="tel:6233965203" className="text-white font-bold text-sm hover:text-green-400 transition-colors">(623) 396-5203</a>
                        <div className="flex items-center gap-1.5 text-[#22c55e] text-[10px] font-bold uppercase tracking-wider">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse"></span>
                            Available Today
                        </div>
                    </div>

                    {!isBooking && (
                        <div className="flex items-center gap-3">
                            <Link to="/booking">
                                <Button size="sm" variant="primary" className="shadow-lg shadow-green-500/20">Book Now</Button>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2 text-gray-400 hover:text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-[#18181b] border-b border-[#27272a] overflow-hidden absolute top-[var(--header-height)] left-0 w-full"
                    >
                        <div className="flex flex-col p-6 gap-6">
                            <a href="/#plans" className="text-lg font-medium text-gray-300">Pricing</a>
                            <a href="/#how" className="text-lg font-medium text-gray-300">How It Works</a>
                            <Link to="/booking">
                                <Button fullWidth variant="accent">Book Now</Button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
