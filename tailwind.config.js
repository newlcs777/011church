/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
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
        churchlight: {
          "primary": "#4E6DD8",      // azul suave cristão
          "primary-content": "#FFFFFF",

          "secondary": "#0A0F2C",    // azul profundo (identidade)
          "accent": "#FBBF24",       // dourado quente (igreja)

          "neutral": "#111827",      // cinza carvão
          "neutral-content": "#F3F4F6",

          "base-100": "#FFFFFF",     // fundo principal claro
          "base-200": "#F3F4F6",     // leve cinza para seções
          "base-300": "#E5E7EB",

          "info": "#38BDF8",
          "success": "#22C55E",
          "warning": "#FACC15",
          "error": "#EF4444",
        },
      },
    ],
  },
};
