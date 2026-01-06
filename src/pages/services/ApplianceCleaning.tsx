import { motion } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ApplianceCleaning = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#09090b] pt-20 flex flex-col items-center justify-center">
            <div className="container mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-2xl mx-auto"
                >
                    <h1 className="text-4xl font-bold text-white mb-6">Appliance Detailing</h1>
                    <p className="text-gray-400 text-lg mb-8">
                        We offer deep cleaning for Ovens and Refrigerators as optional add-ons to any service.
                        These are not standalone services but can be added during your booking process.
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
            </div>
        </div>
    );
};
