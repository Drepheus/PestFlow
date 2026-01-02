# PestFlow Implementation Guide

We have successfully built the high-conversion pest control booking website.

## 🚀 Features Implemented

1.  **Modern Design System**
    *   High-contrast Black/White/Red theme.
    *   Responsive layout with mobile-first approach.
    *   Google Fonts (Outfit) for clear, modern typography.

2.  **Conversion-Optimized Booking Flow**
    *   **Context-Managed State**: Data persists across steps.
    *   **Steps**: Location -> Pests -> Property -> Plan -> Schedule -> Checkout.
    *   **UI**: Progress bar, clear selection cards, and "Most Popular" plan highlighting.

3.  **Components**
    *   `HomePage`: Hero section with instant zip-code entry.
    *   `Navbar`: Responsive, glassmorphism effect.
    *   `AIAssistant`: Floating chat widget that answers basic questions.

## 🛠️ How to Run

1.  **Install Dependencies** (if you haven't already):
    ```bash
    npm install
    ```

2.  **Start Development Server**:
    ```bash
    npm run dev
    ```

3.  **Build for Production**:
    ```bash
    npm run build
    ```

## 📂 Project Structure

*   `src/context`: Global state management (`BookingContext`).
*   `src/components/ui`: Reusable primitives (`Button`, `Card`, `Input`).
*   `src/components/layout`: `Layout`, `Navbar`.
*   `src/pages`: `HomePage`, `BookingPage`.
*   `src/types`: TypeScript definitions.

The app is fully functional and ready for further development or deployment!
