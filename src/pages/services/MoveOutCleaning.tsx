import { motion } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { CheckCircle2, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const MoveOutCleaning = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#09090b] pt-20">
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-black pointer-events-none"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <span className="text-emerald-500 font-bold tracking-wider uppercase text-sm mb-4 block">Deposit Back Guarantee</span>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                            Move-Out <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-600">Perfection.</span>
                        </h1>
                        <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                            The comprehensive cleaning solution designed to satisfy the strictest property managers and landlords.
                        </p>
                        <Button
                            size="lg"
                            variant="accent"
                            onClick={() => navigate('/booking')}
                            className="shadow-[0_0_30px_rgba(16,185,129,0.3)]"
                        >
                            Book Move-Out Clean <ArrowRight className="ml-2" size={18} />
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* Checklist Section */}
            <section className="py-16 bg-[#111113] border-y border-[#27272a]">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-12">
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-6">What's Included</h3>
                                <ul className="space-y-4">
                                    {[
                                        "Inside all cabinets and drawers",
                                        "Inside oven and microwave",
                                        "Inside fridge (optional add-on)",
                                        "Baseboards detailed hand-wash",
                                        "Ceiling fans and light fixtures",
                                        "Shower grout and tile scrubbing",
                                        "Window sills and tracks",
                                        "Deep vacuum and chemical-free mopping"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-gray-300">
                                            <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={18} />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="relative">
                                <Card className="bg-[#18181b] border-[#27272a] h-full p-8 shadow-2xl relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-32 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
                                    <ShieldCheck className="text-emerald-500 mb-6" size={48} />
                                    <h3 className="text-xl font-bold text-white mb-3">Checklist Verified</h3>
                                    <p className="text-gray-400 leading-relaxed mb-6">
                                        We use standard real estate approved checklists to ensure nothing is missed. If your landlord finds an issue, we return within 24 hours for free.
                                    </p>
                                    <div className="flex items-center gap-3 text-sm text-gray-500">
                                        <Clock size={16} /> Avg. duration: 4-6 hours
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing CTA */}
            <section className="py-20 text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-white mb-8">Ready to secure your deposit?</h2>
                    <Button
                        size="lg"
                        variant="outline"
                        onClick={() => navigate('/booking')}
                    >
                        View Pricing & Availability
                    </Button>
                </div>
            </section>
        </div>
    );
};
