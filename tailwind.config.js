/** @type {import('tailwindcss').Config} */
import { nextui } from "@nextui-org/react";
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
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
    {
      "postcss-preset-mantine": {},
      "postcss-simple-vars": {
        variables: {
          "mantine-breakpoint-xs": "36em",
          "mantine-breakpoint-sm": "48em",
          "mantine-breakpoint-md": "62em",
          "mantine-breakpoint-lg": "75em",
          "mantine-breakpoint-xl": "88em",
        },
      },
    },
    nextui({
      themes: {
        light: {
          // ...
          colors: {
            background: "#FFFFFF", // or DEFAULT
            foreground: "#11181C", // or 50 to 900 DEFAULT
            primary: {
              //... 50 to 900
              foreground: "#FFFFFF",
              DEFAULT: "#006FEE",
            },
            gray: {
              200: "#191e25",
            },
            // ... rest of the colors
          },
        },
        dark: {
          // ...
          colors: {
            default: {
              50: "#222831",
              foreground: "#FFFFFF",
            },
            // ... rest of the colors
          },
        },
        // ... custom themes
      },
    }),
  ],
};
