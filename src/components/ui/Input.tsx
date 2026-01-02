import React, { type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
    return (
        <div className="flex flex-col gap-2 w-full">
            {label && (
                <label className="text-sm font-medium text-gray-300">
                    {label}
                </label>
            )}
            <input
                className={`
          flex h-12 w-full rounded-lg border border-[#3f3f46] bg-[#09090b] px-4 py-2 text-sm text-white
          placeholder:text-gray-500 
          focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#ef4444] focus-visible:border-[#ef4444]
          disabled:cursor-not-allowed disabled:opacity-50
          transition-all duration-200
          ${error ? 'border-red-500 text-red-500 focus-visible:ring-red-500' : ''}
          ${className}
        `}
                {...props}
            />
            {error && (
                <span className="text-xs text-red-400">{error}</span>
            )}
        </div>
    );
};
