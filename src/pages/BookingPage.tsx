import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBooking } from '../context/BookingContext';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { ArrowLeft, Check, CheckCircle2 } from 'lucide-react';
import { type PestType, type PropertyType, type PlanType } from '../types';

// Step Components
const LocationStep = () => {
    const { state, updateState, nextStep } = useBooking();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (state.city && state.zip) nextStep();
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Where do you need service?</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Zip Code"
                    value={state.zip}
                    onChange={(e) => updateState({ zip: e.target.value })}
                    placeholder="12345"
                    required
                />
                <Input
                    label="City"
                    value={state.city}
                    onChange={(e) => updateState({ city: e.target.value })}
                    placeholder="San Francisco"
                    required
                />
                <Button type="submit" fullWidth disabled={!state.zip || !state.city}>
                    Continue
                </Button>
            </form>
        </div>
    );
};

const PestStep = () => {
    const { state, updateState, nextStep } = useBooking();

    const pests: { id: PestType; label: string; icon: string }[] = [
        { id: 'ants', label: 'Ants', icon: '🐜' },
        { id: 'roaches', label: 'Roaches', icon: '🪳' },
        { id: 'spiders', label: 'Spiders', icon: '🕷️' },
        { id: 'scorpions', label: 'Scorpions', icon: '🦂' },
        { id: 'rodents', label: 'Rodents', icon: '🐁' },
        { id: 'mosquitos', label: 'Mosquitos', icon: '🦟' },
        { id: 'general', label: 'General Prevention', icon: '🛡️' },
    ];

    const togglePest = (id: PestType) => {
        const current = state.pests;
        const updated = current.includes(id)
            ? current.filter(p => p !== id)
            : [...current, id];
        updateState({ pests: updated });
    };

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-white">What's the issue?</h2>
                <p className="text-gray-400">Select all that apply.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {pests.map((pest) => (
                    <Card
                        key={pest.id}
                        hover
                        selected={state.pests.includes(pest.id)}
                        onClick={() => togglePest(pest.id)}
                        className="flex flex-col items-center justify-center gap-2 p-4 h-32 text-center"
                    >
                        <div className="text-3xl mb-1">{pest.icon}</div>
                        <span className={`font-medium ${state.pests.includes(pest.id) ? 'text-white' : 'text-gray-400'}`}>
                            {pest.label}
                        </span>
                    </Card>
                ))}
            </div>

            <Button
                fullWidth
                onClick={nextStep}
                disabled={state.pests.length === 0}
            >
                Continue
            </Button>
        </div>
    );
};

const PropertyStep = () => {
    const { state, updateState, nextStep } = useBooking();

    const properties: { id: PropertyType; label: string }[] = [
        { id: 'house', label: 'House' },
        { id: 'apartment', label: 'Apartment/Condo' },
        { id: 'commercial', label: 'Commercial' },
    ];

    const sizes = ['Under 2000 sqft', '2000-3000 sqft', '3000-5000 sqft', '5000+ sqft'];

    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-white">Property Type</h2>
                <div className="flex flex-col sm:flex-row gap-3">
                    {properties.map((p) => (
                        <button
                            key={p.id}
                            onClick={() => updateState({ propertyType: p.id })}
                            className={`flex-1 py-4 px-4 border rounded-xl transition-all font-medium ${state.propertyType === p.id
                                ? 'border-red-500 bg-red-500/10 text-white'
                                : 'border-[#333] hover:border-gray-500 text-gray-400'
                                }`}
                        >
                            <span className="block">{p.label}</span>
                            {p.id === 'commercial' && <span className="text-xs text-red-400 font-normal mt-1 block">Tailored for Business</span>}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-bold text-white">Approximate Size</h2>
                <div className="grid grid-cols-2 gap-3">
                    {sizes.map((s) => (
                        <button
                            key={s}
                            onClick={() => updateState({ propertySize: s })}
                            className={`py-3 px-4 border rounded-lg text-left transition-all ${state.propertySize === s
                                ? 'border-red-500 bg-red-500/10 text-white shadow-[0_0_15px_rgba(239,68,68,0.2)]'
                                : 'border-[#333] hover:bg-[#27272a] text-gray-400'
                                }`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            <Button fullWidth onClick={nextStep}>Continue</Button>
        </div>
    );
};

const PlanStep = () => {
    const { state, updateState, nextStep } = useBooking();

    const plans = [
        {
            id: 'one-time' as PlanType,
            title: 'One-Time Service',
            price: '$249',
            period: 'single service',
            features: ['Full interior & exterior', '30-day guarantee', 'No contract'],
        },
        {
            id: 'quarterly' as PlanType,
            title: 'Quarterly Protection',
            price: '$129',
            period: '/quarter',
            features: ['Initial flush-out included', 'Unlimited free re-services', 'Seasonal protection', 'Covers 15+ pests'],
            recommended: true,
        },
        {
            id: 'monthly' as PlanType,
            title: 'Monthly Premium',
            price: '$49',
            period: '/month',
            features: ['Maximum protection', 'Priority scheduling', 'Mosquito coverage included'],
        }
    ];

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-white">Choose your plan</h2>
            </div>

            <div className="space-y-4">
                {plans.map((plan) => (
                    <div
                        key={plan.id}
                        onClick={() => updateState({ plan: plan.id })}
                        className={`relative border rounded-xl p-6 cursor-pointer transition-all ${state.plan === plan.id
                            ? 'border-red-500 bg-red-500/5 shadow-[0_0_20px_rgba(239,68,68,0.1)]'
                            : 'border-[#333] hover:border-gray-500 bg-[#18181b]'
                            }`}
                    >
                        {plan.recommended && (
                            <span className="absolute -top-3 right-6 bg-[#ef4444] text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg">
                                MOST POPULAR
                            </span>
                        )}
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className={`font-bold text-lg ${state.plan === plan.id ? 'text-white' : 'text-gray-200'}`}>{plan.title}</h3>
                                <ul className="mt-2 space-y-2">
                                    {plan.features.map((f, i) => (
                                        <li key={i} className="text-sm text-gray-400 flex items-center gap-2">
                                            <Check size={14} className={state.plan === plan.id ? 'text-red-500' : 'text-gray-500'} /> {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-white">{plan.price}</div>
                                <div className="text-xs text-gray-500 uppercase">{plan.period}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Button fullWidth variant="accent" onClick={nextStep}>Select Plan</Button>
        </div>
    );
};

const ScheduleStep = () => {
    const { nextStep } = useBooking();

    // Mock dates
    const dates = [
        'Fri, Oct 24', 'Mon, Oct 27', 'Tue, Oct 28'
    ];
    const times = ['8:00 AM - 12:00 PM', '12:00 PM - 4:00 PM'];

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Schedule your service</h2>

            <div className="space-y-6">
                <div>
                    <h3 className="text-sm font-semibold text-gray-400 uppercase mb-3">Available Dates</h3>
                    <div className="grid grid-cols-3 gap-2">
                        {dates.map((d, i) => (
                            <button
                                key={d}
                                className={`p-3 border rounded-lg text-sm font-medium transition-all ${i === 0
                                    ? 'border-red-500 bg-red-500/10 text-white'
                                    : 'border-[#333] text-gray-400 hover:border-gray-500'
                                    }`}
                            >
                                {d}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-sm font-semibold text-gray-400 uppercase mb-3">Time Slot</h3>
                    <div className="flex flex-col gap-2">
                        {times.map((t, i) => (
                            <button
                                key={t}
                                className={`p-4 border rounded-lg text-left  flex justify-between items-center group transition-all ${i === 0
                                    ? 'border-white/40 bg-white/5 text-white'
                                    : 'border-[#333] text-gray-400 hover:bg-[#27272a]'
                                    }`}
                            >
                                <span>{t}</span>
                                <div className={`w-4 h-4 rounded-full border ${i === 0 ? 'border-red-500 bg-red-500' : 'border-gray-500'}`}></div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <Button fullWidth onClick={nextStep}>Continue to Payment</Button>
        </div>
    );
};

const CheckoutStep = () => {
    const { state } = useBooking();
    return (
        <div className="space-y-8">
            <div className="text-center">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-green-500 border border-green-500/20">
                    <CheckCircle2 size={32} />
                </div>
                <h2 className="text-2xl font-bold text-white">You're almost done!</h2>
                <p className="text-gray-400">Review your booking details.</p>
            </div>

            <div className="bg-[#18181b] border border-[#333] p-6 rounded-xl space-y-4">
                <div className="flex justify-between">
                    <span className="text-gray-400">Service Plan</span>
                    <span className="font-semibold text-white capitalize">{state.plan}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">Property</span>
                    <span className="font-semibold text-white capitalize">{state.propertyType}, {state.propertySize}</span>
                </div>
                <div className="h-px bg-[#333]"></div>
                <div className="flex justify-between">
                    <span className="text-gray-200">Total Due Now</span>
                    <span className="font-bold text-xl text-white">$129.00</span>
                </div>
            </div>

            <div className="space-y-4">
                <Input placeholder="Card number" label="Card Information" />
                <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="MM/YY" />
                    <Input placeholder="CVC" />
                </div>
            </div>

            <Button fullWidth variant="accent" size="lg">Pay $129.00 & Book</Button>

            <p className="text-xs text-center text-gray-500">
                By booking, you agree to our Terms of Service. <br />
                100% Satisfaction Guarantee. Cancel anytime.
            </p>
        </div>
    );
};

export const BookingPage = () => {
    const { currentStep, prevStep } = useBooking();

    const steps = [
        { title: 'Location', component: LocationStep },
        { title: 'Pests', component: PestStep },
        { title: 'Property', component: PropertyStep },
        { title: 'Plan', component: PlanStep },
        { title: 'Schedule', component: ScheduleStep },
        { title: 'Checkout', component: CheckoutStep },
    ];

    const CurrentComponent = steps[currentStep].component;

    const progress = ((currentStep + 1) / steps.length) * 100;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentStep]);

    return (
        <div className="min-h-screen bg-[#09090b] flex items-center justify-center py-12 px-4">
            <div className="max-w-xl w-full">
                {/* Header / Progress */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        {currentStep > 0 ? (
                            <button onClick={prevStep} className="text-gray-400 hover:text-white flex items-center gap-1 text-sm font-medium transition-colors">
                                <ArrowLeft size={16} /> Back
                            </button>
                        ) : (
                            <button onClick={() => window.history.back()} className="text-gray-400 hover:text-white flex items-center gap-1 text-sm font-medium transition-colors">
                                <ArrowLeft size={16} /> Home
                            </button>
                        )}
                        <span className="text-xs font-semibold text-gray-500 tracking-wider">
                            STEP {currentStep + 1} OF {steps.length}
                        </span>
                    </div>

                    <div className="h-1 bg-[#27272a] rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-red-600 to-red-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                </div>

                {/* Content */}
                <Card variant="default" className="shadow-2xl border-[#333]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                        >
                            <CurrentComponent />
                        </motion.div>
                    </AnimatePresence>
                </Card>
            </div>
        </div>
    );
};
