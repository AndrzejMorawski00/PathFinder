/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    plugins: [],
    darkMode: "selector",
    corePlugins: {
        preflight: true,
    },
    theme: {
        extend: {
            fontFamily: {
                sans: ["Segoe UI"],
                display: ["Segoe UI"],
            },
        },
    },
    plugins: [],
};
