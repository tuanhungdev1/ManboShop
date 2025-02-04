/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      fontSize: {
        10: "10px",
      },
      colors: {
        primary: {
          900: "#110E11",
          800: "#3D3D3D",
          500: "#EE9923",
          300: "#D1D1D1",
        },
        second: {
          500: "#343A40",
        },
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        colorAndRotate: {
          "0%, 100%": { color: "black", transform: "rotate(0deg)" },
          "50%": { color: "red", transform: "rotate(30deg)" },
          "75%": { transform: "rotate(-30deg)" },
        },
        shake: {
          "0%, 100%": { color: "black", transform: "rotate(0deg)" },
          "20%": { color: "red", transform: "rotate(-10deg)" },
          "30%": { transform: "rotate(10deg)" },
          "40%": { transform: "rotate(-10deg)" },
          "50%": { transform: "rotate(10deg)" },
          "60%": { transform: "rotate(0deg)" },
        },
      },
      animation: {
        marquee: "marquee 80s linear infinite",
        colorRotate: "colorAndRotate 1s infinite",
        shake: "shake 0.9s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
