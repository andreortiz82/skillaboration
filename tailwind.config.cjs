/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      keyframes: {
        colors: {
          "0%": { background: "rgb(239 68 68)" },
          "10%": { background: "rgb(249 115 22)" },
          "20%": { background: "rgb(250 204 21)" },
          "30%": { background: "rgb(163 230 53)" },
          "40%": { background: "rgb(74 222 128)" },
          "50%": { background: "rgb(94 234 212)" },
          "60%": { background: "rgb(34 211 238)" },
          "70%": { background: "rgb(56 189 248)" },
          "80%": { background: "rgb(129 140 248)" },
          "100%": { background: "rgb(251 113 133)" },
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
        colors: "colors 2s ease-in-out infinite",
        players: "playerBounce 200ms ease-in infinite alternate",
      },
    },
  },
  plugins: [],
};
