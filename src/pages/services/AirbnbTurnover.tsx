import { motion } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { ArrowRight, Star, Calendar, RefreshCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AirbnbTurnover = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#09090b] pt-20">
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-bl from-green-900/10 to-black pointer-events-none"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <span className="text-emerald-500 font-bold tracking-wider uppercase text-sm mb-4 block">5-Star Guest Ready</span>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                            Automated <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400">Turnovers.</span>
                        </h1>
                        <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                            Reliable, hotel-quality cleaning for high-performing Airbnbs and STRs in Phoenix.
                        </p>
                        <div className="flex justify-center gap-4">
                            <Button
                                size="lg"
                                variant="accent"
                                onClick={() => navigate('/booking')}
                                className="shadow-[0_0_30px_rgba(16,185,129,0.3)] bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500"
                            >
                                Schedule Turnover <ArrowRight className="ml-2" size={18} />
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-[#111113] border-y border-[#27272a]">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
                        <Card className="bg-[#18181b] border-[#27272a] p-6 text-center hover:border-emerald-500/30 transition-colors">
                            <RefreshCcw className="text-emerald-500 mx-auto mb-4" size={32} />
                            <h3 className="text-lg font-bold text-white mb-2">Fast Turnaround</h3>
                            <p className="text-gray-400 text-sm">Same-day service available. We ensure your unit is ready before 4 PM check-in.</p>
                        </Card>
                        <Card className="bg-[#18181b] border-[#27272a] p-6 text-center hover:border-emerald-500/30 transition-colors">
                            <Star className="text-emerald-500 mx-auto mb-4" size={32} />
                            <h3 className="text-lg font-bold text-white mb-2">Guest Ready</h3>
                            <p className="text-gray-400 text-sm">We stage towels, toiletries, and amenities exactly how you want them.</p>
                        </Card>
                        <Card className="bg-[#18181b] border-[#27272a] p-6 text-center hover:border-emerald-500/30 transition-colors">
                            <Calendar className="text-emerald-500 mx-auto mb-4" size={32} />
                            <h3 className="text-lg font-bold text-white mb-2">Sync & Forget</h3>
                            <p className="text-gray-400 text-sm">Automated scheduling available for tailored needs. Never miss a booking.</p>
                        </Card>
                    </div>

                    <div className="max-w-4xl mx-auto bg-[#18181b] rounded-2xl p-8 border border-[#27272a]">
                        <h3 className="text-2xl font-bold text-white mb-6">STR Specific Checklist</h3>
                        <div className="grid md:grid-cols-2 gap-y-3 gap-x-8">
                            {[
                                "Change and wash all linens",
                                "Restock coffee/tea/toiletries",
                                "Report damages immediately",
                                "Test lights and appliances",
                                "Sanitize high-touch surfaces",
                                "Vacuum furniture and under beds",
                                "Clean and arrange patio furniture",
                                "Remove all guest trash"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-gray-300 list-none">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
