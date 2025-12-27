/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],

  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        inter: ["Inter", "system-ui", "sans-serif"],
      },
      container: {
        center: true,
        padding: "1rem",
        screens: {
          sm: "600px",
          md: "728px",
          lg: "984px",
          xl: "1240px",
        },
      },
    },
  },

  plugins: [require("daisyui")],

  daisyui: {
    themes: [
      {
        /* 🌤️ LIGHT – LIMPO */
        churchlight: {
          primary: "#4E6DD8",
          "primary-content": "#FFFFFF",

          secondary: "#0A0F2C",
          "secondary-content": "#FFFFFF",

          accent: "#FBBF24",
          "accent-content": "#111827",

          neutral: "#111827",
          "neutral-content": "#F9FAFB",

          "base-content": "#111827",

          "base-100": "#FFFFFF",
          "base-200": "#F3F4F6",
          "base-300": "#E5E7EB",

          info: "#64748B",
          "info-content": "#FFFFFF",

          success: "#22C55E",
          warning: "#FACC15",
          error: "#EF4444",
        },
      },

      {
        /* 🌑 DARK – FINAL, LEGÍVEL E ELEGANTE */
        churchdark: {
          /* ações */
          primary: "#6B85FF",
          "primary-content": "#020617",

          accent: "#FBBF24",
          "accent-content": "#020617",

          /* texto */
          secondary: "#020617",
          "secondary-content": "#E6EAF0",

          neutral: "#020617",
          "neutral-content": "#E6EAF0",

          "base-content": "#E6EAF0",   // 🔑 texto global off-white

          /* fundos */
          "base-100": "#020617",       // fundo geral
          "base-200": "#0B1220",       // cards
          "base-300": "#1E293B",       // bordas

          /* links / info */
          info: "#A5B4FC",
          "info-content": "#020617",

          success: "#22C55E",
          warning: "#FACC15",
          error: "#EF4444",
        },
      },
    ],
  },
};
