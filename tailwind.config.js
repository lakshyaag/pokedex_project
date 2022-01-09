const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    "bg-[#A8A77A]",
    "bg-[#EE8130]",
    "bg-[#6390F0]",
    "bg-[#F7D02C]",
    "bg-[#7AC74C]",
    "bg-[#96D9D6]",
    "bg-[#C22E28]",
    "bg-[#A33EA1]",
    "bg-[#E2BF65]",
    "bg-[#A98FF3]",
    "bg-[#F95587]",
    "bg-[#A6B91A]",
    "bg-[#B6A136]",
    "bg-[#735797]",
    "bg-[#6F35FC]",
    "bg-[#705746]",
    "bg-[#B7B7CE]",
    "bg-[#D685AD]",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
