import React, { type ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface LayoutProps {
    children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-[var(--color-bg)] font-sans text-[var(--color-text)]">
            <Navbar />
            <main className="flex-grow pt-[var(--header-height)]">
                {children}
            </main>
            <Footer />
        </div>
    );
};
