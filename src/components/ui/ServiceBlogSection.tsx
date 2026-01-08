import React from 'react';
import { motion } from 'framer-motion';

interface ServiceBlogSectionProps {
    title: string;
    subtitle: string;
    content: React.ReactNode;
    imageSrc: string;
    imageAlt: string;
    reverse?: boolean;
}

export const ServiceBlogSection: React.FC<ServiceBlogSectionProps> = ({
    title,
    subtitle,
    content,
    imageSrc,
    imageAlt,
    reverse = false
}) => {
    return (
        <section className="py-24 bg-[#09090b] relative overflow-hidden">
            {/* Gradient Background Effect */}
            <div className={`absolute top-1/2 ${reverse ? 'left-0' : 'right-0'} -translate-y-1/2 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[100px] pointer-events-none`}></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16`}>
                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: reverse ? 50 : -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex-1 space-y-6"
                    >
                        <div className="inline-block px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                            <span className="text-green-500 text-xs font-bold uppercase tracking-wider">{subtitle}</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                            {title}
                        </h2>
                        <div className="text-gray-400 text-lg leading-relaxed space-y-4">
                            {content}
                        </div>
                    </motion.div>

                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex-1 w-full"
                    >
                        <div className="relative group rounded-2xl overflow-hidden border border-[#27272a] shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-60"></div>
                            <img
                                src={imageSrc}
                                alt={imageAlt}
                                className="w-full aspect-video object-cover transform group-hover:scale-105 transition-transform duration-700"
                            />
                            {/* Decorative Frame */}
                            <div className="absolute inset-0 border border-white/10 rounded-2xl z-20 pointer-events-none"></div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
