import { nextui } from "@nextui-org/react";
import { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textColor: {
        light: "#FFFFFF",
        dark: "#FFFFFF",
      },
      colors: {
        "gray-100": "#222831",
        "gray-200": "#191e25",
        rdate: "rgba(33,33,33,.5)",
        imdb: "rgb(255, 193, 7)",
        namebg: "rgba(0, 0, 0, 0.7)",
      },
      spacing: {
        13: "50px",
        74: "300px",
        75: "310px",
        76: "360px",
        100: "450px",
        102: "500px",
        105: "550px",
        106: "566px",
        200: "836px",
      },
      borderRadius: {
        10: "10px",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      prefix: "nextui",
      defaultTheme: "dark",
      defaultExtendTheme: "dark",
      themes: {
        dark: {},
        light: {
          layout: {},
          colors: {
            foreground: "#FFFFFF",
          },
        },
      },
    }),
  ],
};

export default config;
