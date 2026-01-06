import { motion, type HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    className = '',
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#09090b] disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-white text-neutral-900 hover:bg-gray-100 focus:ring-white border border-transparent font-semibold shadow-sm",
        secondary: "bg-[#27272a] text-white hover:bg-[#3f3f46] focus:ring-gray-500 border border-transparent",
        outline: "bg-transparent text-white border border-[#3f3f46] hover:border-gray-400 focus:ring-white",
        ghost: "bg-transparent text-gray-400 hover:text-white hover:bg-[#27272a] border border-transparent",
        accent: "bg-gradient-to-r from-emerald-600 to-green-600 text-white hover:from-emerald-500 hover:to-green-500 focus:ring-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] border border-white/10 relative overflow-hidden after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent after:-translate-x-full hover:after:translate-x-full after:transition-transform after:duration-1000",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-xs md:text-sm",
        md: "px-4 py-2 text-sm md:px-6 md:py-3 md:text-base",
        lg: "px-5 py-3 text-sm md:px-8 md:py-4 md:text-lg",
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
            {...props}
        >
            {children}
        </motion.button>
    );
};
