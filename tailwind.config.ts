import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: 'calc(var(--spacing) * 4)',
      screens: {
        sm: '40rem',
        md: '48rem', 
        lg: '64rem',
        xl: '80rem',
        '2xl': '100rem',
      },
    },
    extend: {
      fontFamily: {
        mono: ['IBM Plex Mono', 'monospace'],
      },
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        darkroom: {
          red: "var(--darkroom-red)",
        },
        amy: {
          rose: "var(--amy-rose)",
          "rose-light": "var(--amy-rose-light)",
          gold: "var(--amy-gold)",
          "gold-light": "var(--amy-gold-light)",
          cream: "var(--amy-cream)",
          blush: "var(--amy-blush)",
        },
        dot: {
          void: "var(--dot-void)",
          surface: "var(--dot-surface)",
          border: "var(--dot-border)",
          commit: "var(--dot-commit)",
          cursor: "var(--dot-cursor)",
          text: "var(--dot-text)",
          comment: "var(--dot-comment)",
          string: "var(--dot-string)",
          keyword: "var(--dot-keyword)",
          error: "var(--dot-error)",
        },
        claude: {
          void: "var(--claude-void)",
          amber: "var(--claude-amber)",
          question: "var(--claude-question)",
          text: "var(--claude-text)",
        },
        goose: {
          mint: "var(--goose-mint)",
          lime: "var(--goose-lime)",
          quantum: "var(--goose-quantum)",
          void: "var(--goose-void)",
        },
        letta: {
          void: "var(--letta-void)",
          lavender: "var(--letta-lavender)",
          starlight: "var(--letta-starlight)",
          mist: "var(--letta-mist)",
        },
      },
      borderRadius: {
        lg: "0px",
        md: "0px",
        sm: "0px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
