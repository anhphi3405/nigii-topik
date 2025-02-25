import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {

      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      height:{
        "10vh": "10vh",
        "9vh": "9vh",
        "12vh": "12vh",
        "40vh": "40vh",
        "50vh": "50vh",
        "60vh": "60vh",
        "70vh": "70vh",
      },
      width:{
        "10vw": "10vw",
        "20vw": "20vw",
        "40vw": "40vw",
      },
      margin:{
        "40vw" : "40vw",
        "30vw" : "30vw",
      },
      top:{
        "8vh": "8vh",
      },
      left:{
        "40vw": "40vw",
      },
      backgroundColor:{
        "green-background": "#00B2A5",
        "green-hover": "#39C3B9",
      }
    },
  },
  plugins: [],
} satisfies Config;
