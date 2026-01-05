import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageSquare, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';

export const ContactPage = () => {
    return (
        <div className="min-h-screen pt-32 pb-20 bg-[#09090b]">
            <div className="container mx-auto px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">We're Here for You 24/7</h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Whether it's an emergency infestation or a question about our safe products, our team in Phoenix is ready to help.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">

                    {/* Contact Info */}
                    <div className="space-y-8">
                        <Card className="bg-[#18181b] border-[#27272a] p-6 hover:border-red-500/30 transition-colors">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-lg bg-red-500/10 text-red-500">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-1">Call Us Anytime</h3>
                                    <p className="text-gray-400 text-sm mb-2">Instant response for emergencies.</p>
                                    <a href="tel:623-396-5203" className="text-xl font-bold text-white hover:text-red-400 transition-colors">
                                        (623) 396-5203
                                    </a>
                                </div>
                            </div>
                        </Card>

                        <Card className="bg-[#18181b] border-[#27272a] p-6 hover:border-blue-500/30 transition-colors">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-lg bg-blue-500/10 text-blue-500">
                                    <MessageSquare size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-1">Live Chat</h3>
                                    <p className="text-gray-400 text-sm mb-2">Chat with our AI or support team.</p>
                                    <Button variant="outline" size="sm" onClick={() => (document.querySelector('.fixed.bottom-6.right-6') as HTMLElement)?.click()}>
                                        Open Chat Widget
                                    </Button>
                                </div>
                            </div>
                        </Card>

                        <Card className="bg-[#18181b] border-[#27272a] p-6 hover:border-purple-500/30 transition-colors">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-lg bg-purple-500/10 text-purple-500">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-1">Email Us</h3>
                                    <p className="text-gray-400 text-sm mb-2">For general inquiries and quotes.</p>
                                    <a href="mailto:support@pestflow.com" className="text-gray-300 hover:text-white transition-colors">
                                        support@pestflow.com
                                    </a>
                                </div>
                            </div>
                        </Card>

                        <div className="flex items-center gap-2 text-gray-500 text-sm px-4">
                            <MapPin size={16} />
                            <span>HQ: 4400 N Scottsdale Rd, Scottsdale, AZ 85251</span>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <Card className="bg-[#18181b] border-[#27272a] p-8 h-full">
                            <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
                            <form className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <Input placeholder="First Name" />
                                    <Input placeholder="Last Name" />
                                </div>
                                <Input placeholder="Email Address" type="email" />
                                <Input placeholder="Phone Number" type="tel" />

                                <div className="flex flex-col gap-2 w-full">
                                    <label className="text-sm font-medium text-gray-300">
                                        How can we help?
                                    </label>
                                    <textarea
                                        className="w-full rounded-lg border border-[#3f3f46] bg-[#09090b] px-4 py-3 text-sm text-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#ef4444] min-h-[150px]"
                                        placeholder="Tell us about your pest problem..."
                                    ></textarea>
                                </div>

                                <Button fullWidth size="lg" variant="accent">
                                    Send Message <ArrowRight className="ml-2" size={18} />
                                </Button>
                            </form>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};
