import React, { createContext, useContext, useState, type ReactNode } from 'react';
import { type BookingState, INITIAL_BOOKING_STATE } from '../types';

interface BookingContextType {
    state: BookingState;
    updateState: (updates: Partial<BookingState>) => void;
    resetBooking: () => void;
    nextStep: () => void;
    prevStep: () => void;
    currentStep: number;
    goToStep: (step: number) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState<BookingState>(INITIAL_BOOKING_STATE);
    const [currentStep, setCurrentStep] = useState(0);

    const updateState = (updates: Partial<BookingState>) => {
        setState(prev => ({ ...prev, ...updates }));
    };

    const resetBooking = () => {
        setState(INITIAL_BOOKING_STATE);
        setCurrentStep(0);
    };

    const nextStep = () => setCurrentStep(prev => prev + 1);
    const prevStep = () => setCurrentStep(prev => Math.max(0, prev - 1));
    const goToStep = (step: number) => setCurrentStep(step);

    return (
        <BookingContext.Provider value={{
            state,
            updateState,
            resetBooking,
            nextStep,
            prevStep,
            currentStep,
            goToStep
        }}>
            {children}
        </BookingContext.Provider>
    );
};

export const useBooking = () => {
    const context = useContext(BookingContext);
    if (!context) {
        throw new Error('useBooking must be used within a BookingProvider');
    }
    return context;
};
