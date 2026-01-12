/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dellut: {
          red: "#C02E35", // Vermelho exato da marca
          dark: "#1a1a1a",
        },
      },
    },
  },
  plugins: [],
};
