/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#ff007f",
                "primary-dark": "#d11f78",
                "background-light": "#f8f5f7",
                "background-dark": "#0f0814",
                "surface-dark": "#1a0b1d",
                "card-dark": "#25122b",
            },
            fontFamily: {
                "display": ["Space Grotesk", "sans-serif"]
            },
            boxShadow: {
                'glow': '0 0 20px rgba(244, 37, 140, 0.5)',
                'glow-text': '0 0 10px rgba(244, 37, 140, 0.8)',
            }
        },
    },
    plugins: [],
};
