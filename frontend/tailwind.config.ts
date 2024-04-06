/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sora: ["Sora", "sans-serif"],
      },

      backgroundImage: {
        "dark-grad":
          "linear-gradient(to bottom, rgba(12, 77, 153, 1), rgba(150, 227, 227, 0.3))",
        "light-grad":
          "linear-gradient(to bottom, rgba(210, 230, 239, 1), rgba(111, 183, 248, 1))",
        "linear-grad":
          "linear-gradient(to right, rgba(48, 25, 105, 0.3),rgba(29, 12, 70, 0.8), rgba(29, 12, 70, 1))",
      },
      colors: {
        "bg-1": "#E7F4FF",
        "bg-2": "#C7DEF2",
        "bg-1-60": "rgba(231, 244, 255, 0.6)",
        "bg-2-60": "rgba(199, 222, 242, 0.6)",
        "theme-500": "#63A4F0",
        "theme-200": "#052F46",
        // "theme-200-30": "rgba(219, 210, 239, 30%)",
        // "theme-200-10": "rgba(219, 210, 239, 0.1)",
        "theme-300": "#A9CBFF",
        // "theme-400": "#4f495f",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
