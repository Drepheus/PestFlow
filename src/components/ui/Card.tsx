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
        rounded-xl border 
        ${variant === 'glass' ? 'bg-[#18181b]/60 backdrop-blur-md' : 'bg-[#18181b]'}
        ${selected
                    ? 'border-[#ef4444] ring-1 ring-[#ef4444]/50 shadow-[0_0_20px_rgba(239,68,68,0.15)]'
                    : 'border-[#27272a] group-hover:border-[#3f3f46]'
                }
        ${hover ? 'cursor-pointer hover:border-[#3f3f46]' : ''}
        p-6
        ${className}
      `}
            whileHover={hover ? { y: -4 } : {}}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            {...props}
        >
            {children}
        </motion.div>
    );
};
