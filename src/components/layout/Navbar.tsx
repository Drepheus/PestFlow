import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Bug, Menu, X } from 'lucide-react';
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
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]">
                            <Bug size={18} fill="currentColor" />
                        </div>
                    </div>
                    <span className="font-bold text-xl tracking-tight text-white">PestFlow</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {!isBooking && (
                        <>
                            <a href="#plans" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Plans</a>
                            <a href="#how" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">How It Works</a>
                            <a href="#guarantee" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Guarantee</a>
                        </>
                    )}
                </div>

                <div className="hidden md:flex items-center gap-6">
                    {/* Trust Signal */}
                    <div className="flex items-center gap-2 text-[#22c55e] text-xs font-semibold uppercase tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-[#22c55e] shadow-[0_0_10px_rgba(34,197,94,0.4)]"></span>
                        Licensed & Insured
                    </div>

                    {!isBooking && (
                        <div className="flex items-center gap-4">
                            <a href="tel:5555555555" className="text-sm font-semibold text-white hover:text-gray-300 transition-colors">(555) 555-5555</a>
                            <Link to="/booking">
                                <Button size="sm" variant="primary">Book Now</Button>
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
                            <Link to="/" className="text-lg font-medium text-gray-300">Plans</Link>
                            <Link to="/" className="text-lg font-medium text-gray-300">How It Works</Link>
                            <Link to="/" className="text-lg font-medium text-gray-300">Guarantee</Link>
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
