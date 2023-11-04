// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Nuxion",
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,1,0",
        },
        {
          rel: "shortcut icon",
          href: "favicon.svg",
          type: "image/x-icon",
        },
      ],
    },
  },
  routeRules: {
    "/": { redirect: "/notes" },
    "/notes/**": { ssr: false },
  },
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ["@pinia/nuxt"],
});
