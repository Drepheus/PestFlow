import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface CardProps extends HTMLMotionProps<"div"> {
    hover?: boolean;
    selected?: boolean;
    variant?: 'default' | 'glass';
}

export const Card: React.FC<CardProps> = ({
    children,
    className = '',
    hover = false,
    selected = false,
    variant = 'default',
    ...props
}) => {
    return (
        <motion.div
            className={`
                rounded-xl transition-all relative
                ${selected ? 'overflow-hidden' : 'border'}
                ${!selected && (variant === 'glass' ? 'bg-[#18181b]/60 backdrop-blur-md border-[#27272a]' : 'bg-[#18181b] border-[#27272a]')}
                ${!selected && 'group-hover:border-[#3f3f46]'}
                ${hover ? 'cursor-pointer' : ''}
                p-6
                ${className}
            `}
            whileHover={hover ? { y: -4 } : {}}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            {...props}
        >
            {/* Selected State: Glowing Border Effect */}
            {selected && (
                <>
                    {/* Persistent Glowing Border */}
                    <div className="absolute inset-0 rounded-xl border-2 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)] z-0" />

                    {/* Subtle Pulse Animation */}
                    <motion.div
                        animate={{ opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-emerald-500/10 z-0"
                    />

                    {/* Spinning Light Effect (Optional - made subtle and persistent) */}
                    <div className="absolute inset-[-100%] top-[-50%] -z-10 animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_50%,#10b981_50%,#00000000_100%)] opacity-30" />
                </>
            )}

            {children}
        </motion.div>

    );
};
