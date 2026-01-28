import { motion } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ServiceBlogSection } from '../../components/ui/ServiceBlogSection';
import applianceImg from '../../assets/blog/appliance.png';

export const ApplianceCleaning = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#09090b] pt-20">
            <section className="py-20 container mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-3xl mx-auto"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Appliance <span className="text-emerald-500">Detailing</span></h1>
                    <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                        We offer deep cleaning for Ovens and Refrigerators as optional add-ons to any service.
                        These can be easily added to your Standard or Deep Clean package during booking.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Button variant="secondary" onClick={() => navigate(-1)}>
                            <ArrowLeft className="mr-2" size={18} /> Go Back
                        </Button>
                        <Button variant="accent" onClick={() => navigate('/booking')}>
                            Start Booking with Add-ons
                        </Button>
                    </div>
                </motion.div>
            </section>

            <ServiceBlogSection
                title="Appliance Hygiene: More Than Just Shine"
                subtitle="Detail Work"
                imageSrc={applianceImg}
                imageAlt="Organized clean refrigerator"
                reverse
                content={
                    <>
                        <p>Your refrigerator and oven work hard every day, often accumulating spills and crumbs that go unnoticed until they become a problem. Burnt-on grease in ovens can affect food flavor and cause smoke, while old spills in fridges can harbor bacteria.</p>
                        <p>Our appliance detailing service involves removing shelving/racks for soaking, scrubbing the interior walls, and polishing the exterior stainless steel to a streak-free shine.</p>
                        <p className="font-semibold text-white">It's the finishing touch that makes a kitchen feel truly brand new.</p>
                    </>
                }
            />
        </div>
    );
};
