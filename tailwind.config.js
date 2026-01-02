export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Outfit', 'sans-serif'],
            },
            colors: {
                bg: '#09090b',
                surface: '#18181b',
                primary: '#ffffff',
                accent: {
                    DEFAULT: '#ef4444',
                    hover: '#dc2626',
                }
            }
        },
    },
    plugins: [],
}
