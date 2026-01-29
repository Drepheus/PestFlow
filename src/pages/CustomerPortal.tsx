import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import {
    Calendar,
    Clock,
    CheckCircle2,
    Home,
    Tag,
    LogOut,
    ChevronRight,
    Sparkles,
    Gift,
    History,
    CalendarCheck
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { PRICING } from '../types';

// Mock user data - in production this would come from your backend
const mockUser = {
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@email.com',
    memberSince: 'January 2026'
};

const mockUpcomingBookings = [
    {
        id: 'BK-2026-001',
        date: '2026-02-03',
        time: '10:00 AM',
        service: 'Standard Clean',
        unitSize: '2 Bed / 2 Bath',
        address: '4521 E Sunrise Dr, Phoenix, AZ 85044',
        status: 'confirmed',
        price: 250
    },
    {
        id: 'BK-2026-002',
        date: '2026-02-15',
        time: '2:00 PM',
        service: 'Airbnb Turnover',
        unitSize: '1 Bed / 1 Bath',
        address: '1200 N Central Ave #305, Phoenix, AZ 85004',
        status: 'pending',
        price: 130
    }
];

const mockPastBookings = [
    {
        id: 'BK-2025-089',
        date: '2026-01-20',
        service: 'Standard Clean',
        unitSize: '2 Bed / 2 Bath',
        address: '4521 E Sunrise Dr, Phoenix, AZ 85044',
        status: 'completed',
        price: 250,
        rating: 5
    },
    {
        id: 'BK-2025-078',
        date: '2026-01-05',
        service: 'Airbnb Turnover',
        unitSize: '1 Bed / 1 Bath',
        address: '1200 N Central Ave #305, Phoenix, AZ 85004',
        status: 'completed',
        price: 130,
        rating: 5
    },
    {
        id: 'BK-2025-065',
        date: '2025-12-18',
        service: 'Standard Clean',
        unitSize: '2 Bed / 2 Bath',
        address: '4521 E Sunrise Dr, Phoenix, AZ 85044',
        status: 'completed',
        price: 250,
        rating: 4
    }
];

const currentDeals = [
    {
        id: 1,
        title: 'New Customer Special',
        description: '15% off your first Standard Clean booking',
        code: 'WELCOME15',
        validUntil: '2026-03-31',
        icon: Gift
    },
    {
        id: 2,
        title: 'Airbnb Host Loyalty',
        description: 'Book 5 turnovers, get the 6th at 50% off',
        code: 'HOST50',
        validUntil: '2026-06-30',
        icon: Sparkles
    }
];

type TabType = 'upcoming' | 'history' | 'pricing';

export const CustomerPortal = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [activeTab, setActiveTab] = useState<TabType>('upcoming');
    const [isLoading, setIsLoading] = useState(false);

    // Check for existing session
    useEffect(() => {
        const session = localStorage.getItem('rc_portal_session');
        if (session) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock login - accept any email/password for demo
        localStorage.setItem('rc_portal_session', JSON.stringify({ email: loginEmail }));
        setIsLoggedIn(true);
        setIsLoading(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('rc_portal_session');
        setIsLoggedIn(false);
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    // Login Screen
    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-[#09090b] pt-24 pb-16">
                <Helmet>
                    <title>Customer Portal | ReadyCleans</title>
                    <meta name="description" content="Access your ReadyCleans customer portal to view booked cleans, past history, and current pricing." />
                </Helmet>

                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-md mx-auto"
                    >
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/20">
                                <Home className="text-white" size={32} />
                            </div>
                            <h1 className="text-3xl font-bold text-white mb-2">Customer Portal</h1>
                            <p className="text-gray-400">Sign in to manage your bookings</p>
                        </div>

                        <Card className="bg-[#18181b] border-[#27272a] p-8">
                            <form onSubmit={handleLogin} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        value={loginEmail}
                                        onChange={(e) => setLoginEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        required
                                        className="w-full h-12 px-4 rounded-xl bg-[#09090b] border border-[#27272a] text-white placeholder:text-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                                    <input
                                        type="password"
                                        value={loginPassword}
                                        onChange={(e) => setLoginPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                        className="w-full h-12 px-4 rounded-xl bg-[#09090b] border border-[#27272a] text-white placeholder:text-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="accent"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Signing in...' : 'Sign In'}
                                </Button>
                            </form>

                            <div className="mt-6 pt-6 border-t border-[#27272a] text-center">
                                <p className="text-gray-500 text-sm">
                                    Don't have an account?{' '}
                                    <button
                                        onClick={() => navigate('/booking')}
                                        className="text-emerald-400 hover:text-emerald-300 font-medium"
                                    >
                                        Book your first clean
                                    </button>
                                </p>
                            </div>
                        </Card>

                        <p className="text-center text-gray-600 text-xs mt-6">
                            Demo: Enter any email/password to access the portal
                        </p>
                    </motion.div>
                </div>
            </div>
        );
    }

    // Dashboard
    return (
        <div className="min-h-screen bg-[#09090b] pt-24 pb-16">
            <Helmet>
                <title>My Dashboard | ReadyCleans</title>
            </Helmet>

            <div className="container mx-auto px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row md:items-center md:justify-between mb-8"
                >
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-1">
                            Welcome back, {mockUser.firstName}!
                        </h1>
                        <p className="text-gray-400">Member since {mockUser.memberSince}</p>
                    </div>
                    <div className="flex items-center gap-4 mt-4 md:mt-0">
                        <Button variant="accent" onClick={() => navigate('/booking')}>
                            Book New Clean
                        </Button>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                        >
                            <LogOut size={18} /> Sign Out
                        </button>
                    </div>
                </motion.div>

                {/* Stats Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
                >
                    <Card className="bg-gradient-to-br from-emerald-900/30 to-[#18181b] border-emerald-500/20 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">Upcoming Cleans</p>
                                <p className="text-3xl font-bold text-white">{mockUpcomingBookings.length}</p>
                            </div>
                            <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                                <CalendarCheck className="text-emerald-400" size={24} />
                            </div>
                        </div>
                    </Card>

                    <Card className="bg-[#18181b] border-[#27272a] p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">Completed Cleans</p>
                                <p className="text-3xl font-bold text-white">{mockPastBookings.length}</p>
                            </div>
                            <div className="w-12 h-12 bg-[#27272a] rounded-xl flex items-center justify-center">
                                <History className="text-gray-400" size={24} />
                            </div>
                        </div>
                    </Card>

                    <Card className="bg-[#18181b] border-[#27272a] p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">Active Deals</p>
                                <p className="text-3xl font-bold text-white">{currentDeals.length}</p>
                            </div>
                            <div className="w-12 h-12 bg-[#27272a] rounded-xl flex items-center justify-center">
                                <Tag className="text-gray-400" size={24} />
                            </div>
                        </div>
                    </Card>
                </motion.div>

                {/* Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex gap-2 mb-6 overflow-x-auto pb-2"
                >
                    {[
                        { id: 'upcoming', label: 'Upcoming', icon: CalendarCheck },
                        { id: 'history', label: 'History', icon: History },
                        { id: 'pricing', label: 'Pricing & Deals', icon: Tag }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as TabType)}
                            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${activeTab === tab.id
                                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                                    : 'bg-[#18181b] text-gray-400 hover:text-white border border-[#27272a]'
                                }`}
                        >
                            <tab.icon size={18} />
                            {tab.label}
                        </button>
                    ))}
                </motion.div>

                {/* Tab Content */}
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {/* Upcoming Bookings */}
                    {activeTab === 'upcoming' && (
                        <div className="space-y-4">
                            {mockUpcomingBookings.length > 0 ? (
                                mockUpcomingBookings.map((booking) => (
                                    <Card key={booking.id} className="bg-[#18181b] border-[#27272a] p-6 hover:border-[#3f3f46] transition-colors">
                                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                                            <div className="flex-shrink-0 w-16 h-16 bg-emerald-500/10 rounded-2xl flex flex-col items-center justify-center">
                                                <span className="text-emerald-400 text-xs font-bold uppercase">
                                                    {new Date(booking.date).toLocaleDateString('en-US', { month: 'short' })}
                                                </span>
                                                <span className="text-white text-xl font-bold">
                                                    {new Date(booking.date).getDate()}
                                                </span>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-1">
                                                    <h3 className="text-lg font-bold text-white">{booking.service}</h3>
                                                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${booking.status === 'confirmed'
                                                            ? 'bg-emerald-500/20 text-emerald-400'
                                                            : 'bg-yellow-500/20 text-yellow-400'
                                                        }`}>
                                                        {booking.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                                                    </span>
                                                </div>
                                                <p className="text-gray-400 text-sm mb-2">{booking.address}</p>
                                                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                                    <span className="flex items-center gap-1">
                                                        <Clock size={14} /> {booking.time}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Home size={14} /> {booking.unitSize}
                                                    </span>
                                                    <span className="text-white font-bold">${booking.price}</span>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button variant="outline" size="sm">Reschedule</Button>
                                                <Button variant="secondary" size="sm">Details</Button>
                                            </div>
                                        </div>
                                    </Card>
                                ))
                            ) : (
                                <Card className="bg-[#18181b] border-[#27272a] p-12 text-center">
                                    <Calendar className="mx-auto text-gray-600 mb-4" size={48} />
                                    <h3 className="text-xl font-bold text-white mb-2">No upcoming bookings</h3>
                                    <p className="text-gray-400 mb-6">Schedule your next clean to get started!</p>
                                    <Button variant="accent" onClick={() => navigate('/booking')}>
                                        Book Now
                                    </Button>
                                </Card>
                            )}
                        </div>
                    )}

                    {/* History */}
                    {activeTab === 'history' && (
                        <div className="space-y-4">
                            {mockPastBookings.map((booking) => (
                                <Card key={booking.id} className="bg-[#18181b] border-[#27272a] p-6">
                                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                                        <div className="flex-shrink-0 w-16 h-16 bg-[#27272a] rounded-2xl flex flex-col items-center justify-center">
                                            <CheckCircle2 className="text-emerald-500" size={32} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-1">
                                                <h3 className="text-lg font-bold text-white">{booking.service}</h3>
                                                <div className="flex items-center gap-1 text-yellow-400">
                                                    {[...Array(booking.rating)].map((_, i) => (
                                                        <Sparkles key={i} size={14} fill="currentColor" />
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-gray-400 text-sm mb-2">{booking.address}</p>
                                            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                                <span className="flex items-center gap-1">
                                                    <Calendar size={14} /> {formatDate(booking.date)}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Home size={14} /> {booking.unitSize}
                                                </span>
                                                <span className="text-white font-bold">${booking.price}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <Button variant="outline" size="sm">
                                                Book Again <ChevronRight size={16} />
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}

                    {/* Pricing & Deals */}
                    {activeTab === 'pricing' && (
                        <div className="space-y-8">
                            {/* Active Deals */}
                            <div>
                                <h2 className="text-xl font-bold text-white mb-4">Active Deals</h2>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {currentDeals.map((deal) => (
                                        <Card key={deal.id} className="bg-gradient-to-br from-emerald-900/20 to-[#18181b] border-emerald-500/30 p-6 relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl"></div>
                                            <div className="relative z-10">
                                                <deal.icon className="text-emerald-400 mb-3" size={28} />
                                                <h3 className="text-lg font-bold text-white mb-1">{deal.title}</h3>
                                                <p className="text-gray-400 text-sm mb-4">{deal.description}</p>
                                                <div className="flex items-center justify-between">
                                                    <code className="px-3 py-1 bg-[#09090b] rounded-lg text-emerald-400 font-mono text-sm">
                                                        {deal.code}
                                                    </code>
                                                    <span className="text-gray-500 text-xs">
                                                        Valid until {formatDate(deal.validUntil)}
                                                    </span>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </div>

                            {/* Current Pricing */}
                            <div>
                                <h2 className="text-xl font-bold text-white mb-4">Current Pricing</h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Standard Clean */}
                                    <Card className="bg-[#18181b] border-[#27272a] p-6">
                                        <h3 className="text-lg font-bold text-white mb-4">Standard Clean</h3>
                                        <div className="space-y-3">
                                            {Object.entries(PRICING['standard']).map(([size, price]) => (
                                                <div key={size} className="flex justify-between text-sm">
                                                    <span className="text-gray-400 capitalize">
                                                        {size.replace(/(\d+)bed(\d+)bath/, '$1 Bed / $2 Bath').replace('studio', 'Studio / 1 Bath')}
                                                    </span>
                                                    <span className="text-white font-bold">${price}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </Card>

                                    {/* Airbnb Turnover */}
                                    <Card className="bg-[#18181b] border-[#27272a] p-6">
                                        <h3 className="text-lg font-bold text-white mb-4">Airbnb Turnover</h3>
                                        <div className="space-y-3">
                                            {Object.entries(PRICING['airbnb']).map(([size, price]) => (
                                                <div key={size} className="flex justify-between text-sm">
                                                    <span className="text-gray-400 capitalize">
                                                        {size.replace(/(\d+)bed(\d+)bath/, '$1 Bed / $2 Bath').replace('studio', 'Studio / 1 Bath')}
                                                    </span>
                                                    <span className="text-white font-bold">${price}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </Card>
                                </div>

                                {/* Add-ons */}
                                <Card className="bg-[#18181b] border-[#27272a] p-6 mt-6">
                                    <h3 className="text-lg font-bold text-white mb-4">Add-On Services</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {Object.entries(PRICING['addons']).map(([addon, price]) => (
                                            <div key={addon} className="text-center p-4 bg-[#09090b] rounded-xl border border-[#27272a]">
                                                <span className="text-gray-400 text-sm capitalize block mb-1">
                                                    {addon === 'same-day' ? 'Same-Day' : addon.charAt(0).toUpperCase() + addon.slice(1)}
                                                </span>
                                                <span className="text-white font-bold text-lg">+${price}</span>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};
