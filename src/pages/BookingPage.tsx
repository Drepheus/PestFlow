import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBooking } from '../context/BookingContext';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { ArrowLeft, Check, Loader2, Calendar as CalendarIcon, CreditCard, Lock, Smartphone } from 'lucide-react';
import { type PestType, type PropertyType, type PlanType } from '../types';
import { isValidZipCode } from '../utils/validation';

// Step Components
const LocationStep = () => {
    const { state, updateState, nextStep } = useBooking();
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (state.city && state.zip) {
            if (isValidZipCode(state.zip)) {
                nextStep();
            } else {
                setError('Sorry, we are not in your area of service yet.');
            }
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Where do you need service?</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Zip Code"
                    value={state.zip}
                    onChange={(e) => {
                        updateState({ zip: e.target.value });
                        setError('');
                    }}
                    placeholder="12345"
                    required
                />
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-400">City</label>
                    <select
                        value={state.city}
                        onChange={(e) => updateState({ city: e.target.value })}
                        className="w-full h-12 px-4 rounded-lg bg-[#18181b] border border-[#3f3f46] text-white focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white transition-all appearance-none"
                        required
                    >
                        <option value="" disabled>Select City</option>
                        {['Phoenix', 'Scottsdale', 'Mesa', 'Chandler', 'Gilbert', 'Glendale', 'Tempe', 'Peoria', 'Surprise', 'Avondale', 'Goodyear', 'Buckeye', 'Queen Creek'].map(city => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                </div>

                {error && (
                    <p className="text-sm text-red-500 font-medium animate-pulse">
                        {error}
                    </p>
                )}

                <Button type="submit" fullWidth variant="accent" disabled={!state.zip || !state.city}>
                    Continue
                </Button>
            </form>
        </div>
    );
};

const PestStep = () => {
    const { state, updateState, nextStep } = useBooking();

    const pests: { id: PestType; label: string; icon: string }[] = [
        { id: 'general', label: 'General Prevention', icon: '🛡️' },
        { id: 'ants', label: 'Ants', icon: '🐜' },
        { id: 'roaches', label: 'Roaches', icon: '🪳' },
        { id: 'spiders', label: 'Spiders', icon: '🕷️' },
        { id: 'scorpions', label: 'Scorpions', icon: '🦂' },
        { id: 'rodents', label: 'Rodents', icon: '🐁' },
        { id: 'mosquitos', label: 'Mosquitos', icon: '🦟' },
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
                variant="accent"
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
                <h2 className="text-xl font-bold text-white">Approx Rooms</h2>
                <div className="grid grid-cols-2 gap-3">
                    {['Studio / 1 Bed', '2 Bedrooms', '3-4 Bedrooms', '5+ Bedrooms'].map((s) => (
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

            <Button fullWidth variant="accent" onClick={nextStep}>Continue</Button>
        </div>
    );
};

const PlanStep = () => {
    const { state, updateState, nextStep } = useBooking();

    const plans = [
        {
            id: 'monthly' as PlanType,
            title: 'Monthly Premium',
            price: '$49',
            period: '/month',
            features: ['Maximum protection', 'Priority scheduling', 'Mosquito coverage included'],
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
            id: 'one-time' as PlanType,
            title: 'One-Time Service',
            price: '$249',
            period: 'single service',
            features: ['Full interior & exterior', '30-day guarantee', 'No contract'],
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

    // Generate relative dates
    const dates = useMemo(() => {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const datesArr = [];
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize to midnight for consistent comparison

        for (let i = 1; i <= 6; i++) {
            const d = new Date(today);
            d.setDate(today.getDate() + i);
            datesArr.push({
                label: i === 1 ? 'Tomorrow' : days[d.getDay()],
                date: `${months[d.getMonth()]} ${d.getDate()}`,
                full: d.toISOString(),
                blocked: i === 3 || i === 5 // Randomly block some days
            });
        }
        return datesArr;
    }, []);
    const times = ['8:00 AM - 12:00 PM', '12:00 PM - 4:00 PM', '4:00 PM - 6:00 PM'];
    const [selectedDate, setSelectedDate] = useState<string>(dates[0].full); // Default to first available
    const [selectedTime, setSelectedTime] = useState(times[0]);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Schedule Service</h2>
                <button className="text-xs flex items-center gap-1 text-red-400 hover:text-red-300 transition-colors">
                    <CalendarIcon size={14} /> Full Calendar
                </button>
            </div>

            <div className="space-y-6">
                <div>
                    <h3 className="text-sm font-semibold text-gray-400 uppercase mb-3">Available Days</h3>
                    <div className="grid grid-cols-3 gap-2">
                        {dates.slice(0, 6).map((d: any) => (
                            <button
                                key={d.full}
                                disabled={d.blocked}
                                onClick={() => !d.blocked && setSelectedDate(d.full)}
                                className={`p-3 border rounded-lg text-sm font-medium transition-all flex flex-col items-center justify-center gap-1 relative overflow-hidden ${selectedDate === d.full
                                    ? 'border-red-500 bg-red-600 text-white shadow-lg shadow-red-500/40 transform scale-[1.02] z-10'
                                    : d.blocked
                                        ? 'border-[#222] bg-[#111] text-gray-600 cursor-not-allowed opacity-50'
                                        : 'border-[#333] text-gray-400 hover:border-gray-500 hover:bg-[#1f1f22]'
                                    }`}
                            >
                                {selectedDate === d.full && (
                                    <div className="absolute top-1 right-1 bg-white text-red-600 rounded-full p-0.5">
                                        <Check size={8} strokeWidth={4} />
                                    </div>
                                )}
                                <span className={selectedDate === d.full ? 'font-bold text-white' : ''}>{d.label}</span>
                                <span className={`text-xs ${selectedDate === d.full ? 'text-white/90' : 'opacity-60'}`}>{d.date}</span>
                                {d.blocked && <span className="text-[10px] text-red-900 font-bold uppercase mt-1">Booked</span>}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-sm font-semibold text-gray-400 uppercase mb-3">Time Slot</h3>
                    <div className="flex flex-col gap-2">
                        {times.map((t) => (
                            <button
                                key={t}
                                onClick={() => setSelectedTime(t)}
                                className={`p-4 border rounded-lg text-left flex justify-between items-center group transition-all ${selectedTime === t
                                    ? 'border-white/40 bg-white/5 text-white'
                                    : 'border-[#333] text-gray-400 hover:bg-[#27272a]'
                                    }`}
                            >
                                <span>{t}</span>
                                <div className={`w-4 h-4 rounded-full border ${selectedTime === t ? 'border-red-500 bg-red-500' : 'border-gray-500'}`}></div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <Button fullWidth variant="accent" onClick={nextStep}>Continue to Payment</Button>
        </div>
    );
};

const CheckoutStep = () => {
    const { state } = useBooking();
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple' | 'google'>('card');

    return (
        <div className="space-y-6">
            <div className="text-center relative">
                {/* Glowing animation background */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-green-500/20 blur-[50px] rounded-full pointer-events-none"></div>

                <div className="w-20 h-20 bg-[#18181b] rounded-full flex items-center justify-center mx-auto mb-6 text-green-500 border border-green-500/30 relative z-10 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                    <Loader2 size={40} className="animate-spin text-green-500" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Almost Done!</h2>
                <p className="text-gray-400 text-lg">Just one more step to secure your appointment.</p>
            </div>

            <div className="bg-[#18181b] border border-[#333] p-6 rounded-xl space-y-4 shadow-lg">
                <div className="flex justify-between">
                    <span className="text-gray-400">Service Plan</span>
                    <span className="font-semibold text-white capitalize">{state.plan}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">Property</span>
                    <span className="font-semibold text-white capitalize">{state.propertyType}, {state.propertySize}</span>
                </div>
                <div className="h-px bg-[#333]"></div>
                <div className="flex justify-between items-end">
                    <span className="text-gray-200">Total Due Today</span>
                    <div className="text-right">
                        <span className="block text-2xl font-bold text-white">$129.00</span>
                        <span className="text-xs text-green-500 font-medium tracking-wide">100% SECURE CHECKOUT</span>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-bold text-white">Choose Payment Method</h3>
                <div className="grid grid-cols-3 gap-3">
                    <button
                        onClick={() => setPaymentMethod('card')}
                        className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${paymentMethod === 'card'
                            ? 'bg-white text-neutral-900 border-white shadow-lg'
                            : 'bg-[#18181b] text-gray-400 border-[#333] hover:bg-[#27272a]'}`}
                    >
                        <CreditCard size={20} />
                        <span className="text-xs font-bold">Card</span>
                    </button>
                    <button
                        onClick={() => setPaymentMethod('apple')}
                        className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${paymentMethod === 'apple'
                            ? 'bg-white text-neutral-900 border-white shadow-lg'
                            : 'bg-[#18181b] text-gray-400 border-[#333] hover:bg-[#27272a]'}`}
                    >
                        <Smartphone size={20} />
                        <span className="text-xs font-bold">Apple Pay</span>
                    </button>
                    <button
                        onClick={() => setPaymentMethod('google')}
                        className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${paymentMethod === 'google'
                            ? 'bg-white text-neutral-900 border-white shadow-lg'
                            : 'bg-[#18181b] text-gray-400 border-[#333] hover:bg-[#27272a]'}`}
                    >
                        <div className="h-5 w-5 rounded-full border border-current flex items-center justify-center font-bold text-[10px]">G</div>
                        <span className="text-xs font-bold">Google Pay</span>
                    </button>
                </div>

                {paymentMethod === 'card' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-[#18181b] border border-[#333] rounded-xl p-5 space-y-4 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-3 opacity-5 pointer-events-none">
                            <CreditCard size={100} />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs text-gray-400 ml-1">Card Number</label>
                            <div className="relative">
                                <Input placeholder="0000 0000 0000 0000" className="pl-10 font-mono" />
                                <CreditCard className="absolute left-3 top-3.5 text-gray-500" size={16} />
                                <Lock className="absolute right-3 top-3.5 text-green-500/50" size={16} />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs text-gray-400 ml-1">Expiry</label>
                                <Input placeholder="MM / YY" className="text-center font-mono" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs text-gray-400 ml-1">CVC</label>
                                <Input placeholder="123" className="text-center font-mono" />
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-[10px] text-gray-500 uppercase tracking-wider font-semibold pt-2">
                            <div className="flex -space-x-1">
                                <div className="w-6 h-4 bg-gray-600 rounded"></div>
                                <div className="w-6 h-4 bg-gray-500 rounded"></div>
                            </div>
                            Powered by Stripe
                        </div>
                    </motion.div>
                )}
            </div>

            <button className="w-full relative group overflow-hidden rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold py-4 text-lg transition-all transform hover:scale-[1.02] shadow-[0_0_20px_rgba(22,163,74,0.4)]">
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                Pay $129.00 & Book Service
            </button>

            <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1"><Check size={12} className="text-green-500" /> AES-256 Encryption</span>
                <span className="flex items-center gap-1"><Check size={12} className="text-green-500" /> Cancel Anytime</span>
            </div>
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
