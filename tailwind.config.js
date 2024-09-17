/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    plugins: [],
    darkMode: "class",
    corePlugins: {
        preflight: true,
    },
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inconsolata", " monospace"],
            },
            colors: {
                backgroundColor: "rgba(var(--backgroundColor))",
                boardBackground: "rgba(var(--boardBackground))",
                boardHover: "rgba(var(--boardHover))",
                fontColor: "rgba(var(--fontColor))",
                fontHover: "rgba(var(--fontHover))",
                startPoint: "rgba(var(--startButton))",
                endPoint: "rgba(var(--endButton))",
                obstacles: "rgba(var(--obstacles))",
                path: "rgba(var(--path))",
                visited: "rgba(var(--visited))",
            },
        },
    },
    plugins: [],
};
