// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/supabase", "@formkit/nuxt", "@nuxtjs/tailwindcss"],
  formkit: {
    autoImport: true,
  },
  supabase: {
    redirectOptions: {
      login: "/login",
      callback: "/",
      include: [],
      exclude: ["/signup"],
    },
  },
});
