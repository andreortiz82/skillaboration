/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      keyframes: {
        colors: {
          "0%": { background: "var(--red)" },
          "10%": { background: "var(--orange)" },
          "30%": { background: "var(--yellow)" },
          "60%": { background: "var(--green)" },
          "80%": { background: "var(--blue)" },
          "100%": { background: "var(--purple)" },
        },
        playerBounce: {
          from: {
            transform: "translate3d(0, -0.5rem, 0)",
          },
          to: {
            transform: "translate3d(0, 0, 0)",
          },
        },
      },
      animation: {
        colors: "colors 2s ease-in-out infinite alternate",
        players:
          "playerBounce 200ms ease-in infinite alternate, colors 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
