import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { PlanSelectionModal } from '../components/ui/PlanSelectionModal';
import { TestimonialsCarousel } from '../components/ui/TestimonialsCarousel';
import { ShieldCheck, ArrowRight, Star, CheckCircle2, DollarSign, Building2, Home, Store, MapPin, Clock, XCircle, Moon, Sun } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export const HomePage = () => {
    const navigate = useNavigate();
    const { updateState } = useBooking();
    const [zipCode, setZipCode] = useState('');

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState({ title: '', price: '' });

    const handleStartBooking = () => {
        if (zipCode) {
            updateState({ zip: zipCode });
            navigate('/booking');
        }
    };

    const handlePlanClick = (title: string, price: string) => {
        setSelectedPlan({ title, price });
        setIsModalOpen(true);
    };

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };

    return (
        <div className="flex flex-col">
            <PlanSelectionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                planTitle={selectedPlan.title}
                planPrice={selectedPlan.price}
            />

            {/* Dark Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-[#09090b]">
                {/* Background Video & Gradients */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                    {/* Video Layer */}
                    {/* Video Layer */}
                    <video
                        key={selectedPlan ? 'video-player' : 'video-player-init'} // Force re-render if needed, though simpler is better
                        autoPlay
                        muted
                        playsInline
                        onEnded={(e) => {
                            const video = e.target as HTMLVideoElement;
                            const currentSrc = video.currentSrc;
                            const isHero1 = currentSrc.includes('hero.mp4');
                            video.src = isHero1 ? '/videos/hero2.mp4' : '/videos/hero.mp4';
                            video.play();
                        }}
                        className="absolute w-full h-full object-cover transition-opacity duration-1000"
                    >
                        <source src="/videos/hero.mp4" type="video/mp4" />
                    </video>

                    {/* Dark Overlay to ensure readability */}
                    <div className="absolute inset-0 bg-[#09090b]/60"></div>

                    {/* Gradient Accents */}
                    <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-red-600/20 rounded-full blur-[120px] mix-blend-screen"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] mix-blend-screen"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">

                        {/* Left Content */}
                        <div className="max-w-xl">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-2 mb-6"
                            >
                                <div className="flex text-yellow-500">
                                    <Star size={16} fill="currentColor" />
                                    <Star size={16} fill="currentColor" />
                                    <Star size={16} fill="currentColor" />
                                    <Star size={16} fill="currentColor" />
                                    <Star size={16} fill="currentColor" />
                                </div>
                                <span className="text-sm font-medium text-gray-400">#1 Rated in Phoenix, AZ</span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1] text-white"
                            >
                                Phoenix's Premier <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Instant Pest Control.</span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-lg text-gray-400 mb-8 max-w-lg leading-relaxed"
                            >
                                Skip the quote forms and waiting. Book professional, certified pest control for your home or business in under 2 minutes.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="flex items-center gap-4"
                            >
                                <Button size="lg" className="bg-[#18181b]/80 hover:bg-[#27272a] backdrop-blur-sm text-white border border-[#333]" onClick={() => navigate('/booking')}>
                                    Book Now <ArrowRight className="ml-2" size={18} />
                                </Button>
                                <Button size="lg" variant="outline" className="backdrop-blur-sm bg-white/5" onClick={() => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })}>
                                    View Plans
                                </Button>
                            </motion.div>
                        </div>

                        {/* Right Booking Widget */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                        >
                            <div className="relative">
                                <Card className="bg-[#09090b]/80 backdrop-blur-md border-[#333] p-0 shadow-2xl relative overflow-hidden">
                                    {/* Progress Line */}
                                    <div className="h-1 w-full bg-[#27272a]">
                                        <div className="h-full w-1/5 bg-[#ef4444]"></div>
                                    </div>

                                    <div className="p-8">
                                        <div className="flex justify-between items-center mb-8">
                                            <div>
                                                <h3 className="text-xl font-bold text-white mb-1">Where do you need service?</h3>
                                            </div>
                                            <div className="text-sm font-semibold text-[#52525b]">
                                                Step 1 of 5
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <label className="text-sm font-medium text-gray-400">Enter your zip code</label>
                                            <div className="flex gap-4">
                                                <Input
                                                    placeholder="85001"
                                                    className="h-12 text-lg bg-[#18181b] border-[#3f3f46] focus:border-white focus:ring-0"
                                                    value={zipCode}
                                                    onChange={(e) => setZipCode(e.target.value)}
                                                />
                                                <Button size="lg" className="bg-[#111827] hover:bg-[#1f2937] text-white px-8" onClick={handleStartBooking}>
                                                    Continue
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="mt-6">
                                            <p className="text-sm text-[#ef4444]">
                                                Checking availability for Phoenix Metro Area...
                                            </p>
                                        </div>
                                    </div>
                                </Card>

                                {/* Trust Badge */}
                                <div className="absolute -bottom-6 -left-6 bg-[#18181b] border border-[#333] p-4 rounded-xl flex items-center gap-3 shadow-xl">
                                    <div className="bg-green-500/20 p-2 rounded-lg text-green-500">
                                        <ShieldCheck size={20} />
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-400">Certified & Insured</div>
                                        <div className="text-sm font-bold text-white">100% Guaranteed</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* Features Grid - Light Mode */}
            <section className="py-20 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8">
                        <motion.div {...fadeInUp} transition={{ delay: 0.1 }} className="text-center group">
                            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-red-600 transition-all shadow-sm group-hover:scale-110">
                                <CheckCircle2 size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Licensed Professionals</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">AZ Licensed, insured, and background-checked technicians.</p>
                        </motion.div>
                        <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="text-center group">
                            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 transition-all shadow-sm group-hover:scale-110">
                                <ShieldCheck size={24} fill="currentColor" className="text-blue-600" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Satisfaction Guarantee</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">If pests return between visits, we'll re-treat for free.</p>
                        </motion.div>
                        <motion.div {...fadeInUp} transition={{ delay: 0.3 }} className="text-center group">
                            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 transition-all shadow-sm group-hover:scale-110">
                                <Star size={24} fill="currentColor" className="text-purple-600" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Family & Pet Safe</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">We use EPA-approved products safe for Phoenix families.</p>
                        </motion.div>
                        <motion.div {...fadeInUp} transition={{ delay: 0.4 }} className="text-center group">
                            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-yellow-50 border border-yellow-100 flex items-center justify-center text-yellow-600 transition-all shadow-sm group-hover:scale-110">
                                <DollarSign size={24} fill="currentColor" className="text-yellow-600" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Transparent Pricing</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">No hidden fees. No contracts. Instant Quotes.</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 24/7 vs 9-5 Comparison - Light Mode */}
            <section className="py-24 bg-gray-50 border-y border-gray-200">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Why Phoenix Chooses PestFlow</h2>
                        <p className="text-gray-500">Pests don't wait for "business hours". Neither do we.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* PestFlow */}
                        <div className="relative transform md:-translate-y-4">
                            <div className="absolute inset-0 bg-red-600/10 blur-xl rounded-2xl"></div>
                            <Card className="relative bg-white border-red-100 p-8 shadow-xl ring-1 ring-red-50">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-3 rounded-full bg-red-50 text-red-600">
                                        <Sun size={32} className="hidden" />
                                        <Moon size={32} className="block" />
                                    </div>
                                    <span className="px-3 py-1 rounded-full bg-red-100 text-xs font-bold text-red-600 uppercase">PestFlow</span>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">24/7/365 Service</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-center gap-3 text-gray-700 font-medium">
                                        <CheckCircle2 className="text-green-500" size={20} /> Instant Booking Anytime
                                    </li>
                                    <li className="flex items-center gap-3 text-gray-700 font-medium">
                                        <CheckCircle2 className="text-green-500" size={20} /> Weekends & Evenings Included
                                    </li>
                                    <li className="flex items-center gap-3 text-gray-700 font-medium">
                                        <CheckCircle2 className="text-green-500" size={20} /> Same-Day Emergency Service
                                    </li>
                                    <li className="flex items-center gap-3 text-gray-700 font-medium">
                                        <CheckCircle2 className="text-green-500" size={20} /> Exact Time Appointments
                                    </li>
                                </ul>
                                <div className="mt-8 pt-6 border-t border-gray-100">
                                    <p className="text-sm text-gray-500 italic">"Booked at 11pm, technician arrived 8am next day. Lifesaver!" - Sarah T., Mesa</p>
                                </div>
                            </Card>
                        </div>

                        {/* Traditional */}
                        <Card className="bg-white border-gray-200 p-8 opacity-70 hover:opacity-100 transition-opacity">
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3 rounded-full bg-gray-100 text-gray-500">
                                    <Clock size={32} />
                                </div>
                                <span className="px-3 py-1 rounded-full bg-gray-100 text-xs font-bold text-gray-500 uppercase">The Other Guys</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Monday - Friday</h3>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-3 text-gray-500">
                                    <XCircle className="text-red-400" size={20} /> 9:00 AM - 5:00 PM Only
                                </li>
                                <li className="flex items-center gap-3 text-gray-500">
                                    <XCircle className="text-red-400" size={20} /> Closed Weekends
                                </li>
                                <li className="flex items-center gap-3 text-gray-500">
                                    <XCircle className="text-red-400" size={20} /> Wait days for a callback
                                </li>
                                <li className="flex items-center gap-3 text-gray-500">
                                    <XCircle className="text-red-400" size={20} /> 4-hour arrival windows
                                </li>
                            </ul>
                        </Card>
                    </div>
                </div>

            </section >

            {/* Testimonials Section */}
            < TestimonialsCarousel />

            {/* Target Audiences - Dark Mode (Keep for contrast) */}
            < section className="py-24 bg-[#111113] border-t border-[#27272a]" >
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Commercial & Residential Protection</h2>
                        <p className="text-gray-400">Tailored solutions for every property type in the Valley.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <Card className="bg-[#18181b] border-[#27272a] p-8 hover:border-red-500/50 transition-colors">
                            <Home className="text-red-500 mb-4" size={32} />
                            <h3 className="text-xl font-bold text-white mb-2">Residential</h3>
                            <p className="text-gray-400 text-sm">
                                Homes, apartments, and condos. We protect your living space from scorpions, roaches, and ants common in AZ.
                            </p>
                        </Card>
                        <Card className="bg-[#18181b] border-[#27272a] p-8 hover:border-blue-500/50 transition-colors">
                            <Store className="text-blue-500 mb-4" size={32} />
                            <h3 className="text-xl font-bold text-white mb-2">Retail & Food</h3>
                            <p className="text-gray-400 text-sm">
                                Discrete and effective service for restaurants and shops. Zero-tolerance pest policy to protect your brand.
                            </p>
                        </Card>
                        <Card className="bg-[#18181b] border-[#27272a] p-8 hover:border-purple-500/50 transition-colors">
                            <Building2 className="text-purple-500 mb-4" size={32} />
                            <h3 className="text-xl font-bold text-white mb-2">Commercial</h3>
                            <p className="text-gray-400 text-sm">
                                Office buildings and warehouses. Scalable solutions including monthly maintenance and documentation.
                            </p>
                        </Card>
                    </div>
                </div>
            </section >

            {/* How It Works */}
            < section id="how" className="py-24 bg-[#09090b] relative overflow-hidden" >
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#111113] to-transparent pointer-events-none"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Simple 3-Step Process</h2>
                        <p className="text-gray-400">We've automated the hassle out of pest control.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto relative">
                        {/* Connector Line */}
                        <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-[#27272a] z-0"></div>

                        {[
                            { step: "1", title: "Book Online", desc: "Select your pest, property size, and plan instantly. No sales reps." },
                            { step: "2", title: "Expert Service", desc: "Our licensed tech arrives fully equipped for a comprehensive treatment." },
                            { step: "3", title: "Stay Protected", desc: "Automatic seasonal visits keep your property pest-free year round." }
                        ].map((step, i) => (
                            <motion.div
                                key={i}
                                className="relative z-10 text-center"
                                {...fadeInUp}
                                transition={{ delay: i * 0.2 }}
                            >
                                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#18181b] border-4 border-[#27272a] flex items-center justify-center shadow-xl group hover:border-red-500 transition-colors">
                                    <span className="text-2xl font-bold text-white group-hover:text-red-500 transition-colors">{step.step}</span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                                <p className="text-gray-400 leading-relaxed max-w-xs mx-auto text-sm">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section >

            {/* Plans Section */}
            < section id="plans" className="py-24 bg-[#111113] relative overflow-hidden" >
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Choose Your Protection</h2>
                        <p className="text-gray-400">Simple pricing for every need. Phoenix-tested.</p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* One Time */}
                        <Card
                            onClick={() => handlePlanClick('One-Time Service', '$299')}
                            hover
                            className="bg-[#18181b] border-[#27272a] flex flex-col h-full hover:border-gray-600 transition-colors cursor-pointer group"
                        >
                            <div className="mb-6">
                                <h3 className="text-xl font-bold mb-2 text-white">One-Time</h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-white">$299</span>
                                </div>
                                <p className="text-gray-500 mt-4 text-sm">Perfect for immediate pest problems. Single treatment with 30-day guarantee.</p>
                            </div>
                            <div className="space-y-4 flex-1">
                                <div className="h-px bg-[#27272a] my-4"></div>
                                {['Single comprehensive spray', 'Interior & Exterior', '30-day guarantee', 'No commitment'].map(f => (
                                    <div key={f} className="text-sm text-gray-300 flex items-center gap-3">
                                        <div className="p-0.5 rounded-full bg-[#27272a]"><CheckCircle2 size={14} /></div>
                                        {f}
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-red-500 font-medium text-sm flex items-center">Select Plan <ArrowRight size={16} className="ml-1" /></span>
                            </div>
                        </Card>

                        {/* Quarterly - Highlighted */}
                        <div className="relative transform lg:-translate-y-4">
                            <div className="absolute inset-0 bg-red-600/20 blur-xl rounded-2xl"></div>
                            <Card
                                onClick={() => handlePlanClick('Quarterly Protection', '$129/visit')}
                                hover
                                className="relative bg-[#18181b] border-red-500/50 h-full flex flex-col shadow-2xl cursor-pointer"
                            >
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#ef4444] text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                                    Best Value
                                </div>

                                <div className="mb-6">
                                    <h3 className="text-xl font-bold mb-2 text-white">Quarterly</h3>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-bold text-white">$129</span>
                                        <span className="text-gray-500">/visit</span>
                                    </div>
                                    <p className="text-gray-500 mt-4 text-sm">Our most popular plan. Four seasonal visits per year with continuous protection.</p>
                                </div>

                                <div className="space-y-4 flex-1">
                                    <div className="h-px bg-red-500/20 my-4"></div>
                                    {['4 visits/year', 'Free Re-Services', 'Includes Scorpions', 'Priority Scheduling', 'Cancel anytime'].map(f => (
                                        <div key={f} className="text-sm text-white flex items-center gap-3">
                                            <div className="p-0.5 rounded-full bg-red-500 text-white"><CheckCircle2 size={14} /></div>
                                            {f}
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-8">
                                    <Button fullWidth variant="accent">Select Quarterly</Button>
                                </div>
                            </Card>
                        </div>

                        {/* Monthly */}
                        <Card
                            onClick={() => handlePlanClick('Monthly Premium', '$179/month')}
                            hover
                            className="bg-[#18181b] border-[#27272a] h-full flex flex-col hover:border-gray-600 transition-colors cursor-pointer group"
                        >
                            <div className="mb-6">
                                <h3 className="text-xl font-bold mb-2 text-white">Monthly</h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-white">$179</span>
                                    <span className="text-gray-500">/month</span>
                                </div>
                                <p className="text-gray-500 mt-4 text-sm">Maximum protection for severe infestations or commercial food properties.</p>
                            </div>
                            <div className="space-y-4 flex-1">
                                <div className="h-px bg-[#27272a] my-4"></div>
                                {['Monthly treatments', 'Commercial Grade', 'Emergency visits included', 'Documentation provided'].map(f => (
                                    <div key={f} className="text-sm text-gray-300 flex items-center gap-3">
                                        <div className="p-0.5 rounded-full bg-[#27272a]"><CheckCircle2 size={14} /></div>
                                        {f}
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-red-500 font-medium text-sm flex items-center">Select Plan <ArrowRight size={16} className="ml-1" /></span>
                            </div>
                        </Card>
                    </div>
                </div>
            </section >

            {/* Coverage Map / Local Trust */}
            {/* Coverage Map / Local Trust - Light Mode */}
            <section className="py-24 bg-gray-50 border-t border-gray-200">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-1 space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-xs font-semibold text-gray-800 border border-gray-200 shadow-sm">
                                <MapPin size={14} className="text-red-500" /> Serving Phoenix Metro
                            </div>
                            <h2 className="text-4xl font-bold text-gray-900">Local Experts, <br />Neighborhood Care.</h2>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                We understand the unique pest challenges of the Arizona desert. From Bark Scorpions to Roof Rats, our preventative barriers are designed specifically for the Phoenix climate.
                            </p>
                            <ul className="space-y-3">
                                {['Scottsdale', 'Tempe', 'Mesa', 'Gilbert', 'Chandler', 'Glendale', 'Peoria'].map(city => (
                                    <li key={city} className="flex items-center gap-2 text-gray-700 font-medium">
                                        <CheckCircle2 size={16} className="text-red-500" /> {city}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex-1 w-full h-[400px] bg-white rounded-2xl border border-gray-200 relative overflow-hidden flex items-center justify-center shadow-lg">
                            {/* Placeholder for map or image */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-500/5 via-white to-white"></div>
                            <div className="text-center z-10">
                                <MapPin size={48} className="text-red-500 mx-auto mb-4 animate-bounce" />
                                <h3 className="text-xl font-bold text-gray-900">Phoenix, AZ Headquarters</h3>
                                <p className="text-sm text-gray-500">Dispatching city-wide</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    );
};
