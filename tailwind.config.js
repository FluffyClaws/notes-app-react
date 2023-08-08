/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontSize: {
        xl: "1.25rem",
        "2xl": "1.5rem",
      },
      colors: {
        primary: "#007bff",
        danger: "#dc3545",
      },
      spacing: {
        4: "1rem",
        8: "2rem",
      },
      screens: {
        md: "768px",
        lg: "1024px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
