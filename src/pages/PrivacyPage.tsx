import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const PrivacyPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#09090b] py-20 px-4">
            <div className="max-w-3xl mx-auto space-y-8">
                <Button
                    variant="outline"
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2"
                >
                    <ArrowLeft size={16} />
                    Back
                </Button>

                <div className="space-y-4">
                    <h1 className="text-4xl font-bold text-white">Privacy Policy</h1>
                    <p className="text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
                </div>

                <div className="prose prose-invert max-w-none space-y-8 text-gray-300">
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">1. Information We Collect</h2>
                        <p>
                            We collect information that you provide directly to us, such as when you book a service, including:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li>Name and contact information (email, phone number)</li>
                            <li>Service address and property details</li>
                            <li>Payment information (processed securely by Stripe)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">2. How We Use Your Information</h2>
                        <p>
                            We use the information we collect to:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li>Provide, maintain, and improve our cleaning services</li>
                            <li>Process transactions and send related information (confirmations, receipts)</li>
                            <li>Communicate with you about your appointment and our services</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">3. Information Sharing</h2>
                        <p>
                            We do not sell or rent your personal information to third parties. We may share your information with:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li>Service providers (e.g., payment processors like Stripe) who need access to perform services on our behalf</li>
                            <li>Professional cleaners assigned to your booking (limited to address and service details)</li>
                            <li>Legal authorities if required by law</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">4. Data Security</h2>
                        <p>
                            We implement appropriate technical and organizational measures to protect specific personal information.
                            However, no method of transmission over the Internet is 100% secure.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">5. Contact Us</h2>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};
