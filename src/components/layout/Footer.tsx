import { Link } from 'react-router-dom';
import { Bug, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Button } from '../ui/Button';

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#09090b] text-gray-400 border-t border-[#27272a]">
            {/* Top Section - CTA */}
            <div className="border-b border-[#27272a]">
                <div className="container mx-auto px-4 py-12 md:py-16">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Ready to be pest free?</h2>
                            <p className="text-gray-400">Book your service today and get protected in under 2 minutes.</p>
                        </div>
                        <div className="flex gap-4">
                            <Link to="/booking">
                                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white rounded-full px-8">
                                    Get Started
                                </Button>
                            </Link>
                            <Link to="/contact">
                                <Button variant="outline" size="lg" className="rounded-full border-[#333] hover:bg-[#27272a] text-white">
                                    Contact Us
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                    {/* Brand Column */}
                    <div className="space-y-6">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white shadow-lg shadow-red-500/20">
                                <Bug size={24} fill="currentColor" />
                            </div>
                            <span className="font-bold text-2xl tracking-tight text-white">PestFlow</span>
                        </Link>
                        <p className="text-sm leading-relaxed text-gray-500">
                            Phoenix's premier instant pest control service. We combine technology with local expertise to deliver the fastest, most effective protection for your home.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-[#18181b] border border-[#27272a] flex items-center justify-center hover:border-red-500 hover:text-red-500 transition-colors">
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-[#18181b] border border-[#27272a] flex items-center justify-center hover:border-red-500 hover:text-red-500 transition-colors">
                                <Twitter size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-[#18181b] border border-[#27272a] flex items-center justify-center hover:border-red-500 hover:text-red-500 transition-colors">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-[#18181b] border border-[#27272a] flex items-center justify-center hover:border-red-500 hover:text-red-500 transition-colors">
                                <Linkedin size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold mb-6">Company</h3>
                        <ul className="space-y-4">
                            <li><Link to="/" className="hover:text-red-500 transition-colors">Home</Link></li>
                            <li><Link to="/#plans" className="hover:text-red-500 transition-colors">Plans & Pricing</Link></li>
                            <li><Link to="/#how" className="hover:text-red-500 transition-colors">How it Works</Link></li>
                            <li><Link to="/contact" className="hover:text-red-500 transition-colors">Contact Support</Link></li>
                            <li><a href="#" className="hover:text-red-500 transition-colors">Careers</a></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-white font-bold mb-6">Services</h3>
                        <ul className="space-y-4">
                            <li><Link to="/booking" className="hover:text-red-500 transition-colors">General Pest Control</Link></li>
                            <li><Link to="/booking" className="hover:text-red-500 transition-colors">Scorpion Protection</Link></li>
                            <li><Link to="/booking" className="hover:text-red-500 transition-colors">Rodent Exclusion</Link></li>
                            <li><Link to="/booking" className="hover:text-red-500 transition-colors">Termite Inspection</Link></li>
                            <li><a href="#" className="hover:text-red-500 transition-colors">Commercial Services</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white font-bold mb-6">Contact</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <Phone className="mt-1 text-red-500" size={18} />
                                <div>
                                    <span className="block text-white font-medium">Phone</span>
                                    <a href="tel:6233965203" className="hover:text-white transition-colors">(623) 396-5203</a>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <Mail className="mt-1 text-red-500" size={18} />
                                <div>
                                    <span className="block text-white font-medium">Email</span>
                                    <a href="mailto:support@pestflow.com" className="hover:text-white transition-colors">support@pestflow.com</a>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="mt-1 text-red-500" size={18} />
                                <div>
                                    <span className="block text-white font-medium">Headquarters</span>
                                    <span>4455 E Camelback Rd,<br />Phoenix, AZ 85018</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-[#27272a] bg-[#0c0c0e]">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
                        <p>© {currentYear} PestFlow Inc. All rights reserved.</p>
                        <div className="flex gap-8">
                            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
