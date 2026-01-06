import { motion } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { ArrowRight, Sparkles, Droplets } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const DeepCleaning = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#09090b] pt-20">
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-green-900/20 to-black pointer-events-none"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <span className="text-emerald-500 font-bold tracking-wider uppercase text-sm mb-4 block">Spring Cleaning Standard</span>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                            Total <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-600">Restoration.</span>
                        </h1>
                        <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                            A top-to-bottom scrub for homes that haven't been professionally cleaned in 3+ months.
                        </p>
                        <Button
                            size="lg"
                            variant="accent"
                            onClick={() => navigate('/booking')}
                            className="shadow-[0_0_30px_rgba(16,185,129,0.3)] bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500"
                        >
                            Book Deep Clean <ArrowRight className="ml-2" size={18} />
                        </Button>
                    </motion.div>
                </div>
            </section>

            <section className="py-20 bg-[#111113]">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-6">Beyond the Surface</h2>
                            <p className="text-gray-400 mb-6 leading-relaxed">
                                Regular cleaning maintains. Deep cleaning restores. We tackle the buildup that normal mopping and dusting misses, targeting grime in grout, baseboards, and hard-to-reach corners.
                            </p>
                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <div className="p-3 bg-[#18181b] rounded-xl border border-[#27272a]">
                                        <Droplets className="text-emerald-500" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold">Sanitization</h4>
                                        <p className="text-sm text-gray-400">High-touch surfaces disinfected.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="p-3 bg-[#18181b] rounded-xl border border-[#27272a]">
                                        <Sparkles className="text-emerald-500" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold">Detail Work</h4>
                                        <p className="text-sm text-gray-400">Vents, fans, blinds, and tracks.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <Card className="bg-[#18181b] border-[#27272a] p-6 h-48 flex flex-col justify-end">
                                <span className="text-3xl font-bold text-white mb-2">3x</span>
                                <span className="text-sm text-gray-400">More time spent per room than standard cleaning.</span>
                            </Card>
                            <Card className="bg-[#18181b] border-[#27272a] p-6 h-48 flex flex-col justify-end">
                                <span className="text-3xl font-bold text-white mb-2">100%</span>
                                <span className="text-sm text-gray-400">Satisfaction Guaranteed or free re-clean.</span>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
