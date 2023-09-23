// vite.config.js
import { sveltekit } from "file:///home/michael/Documents/GitHub/Random-Quote-Gen-v3.0/node_modules/@sveltejs/kit/src/exports/vite/index.js";
import { defineConfig } from "file:///home/michael/Documents/GitHub/Random-Quote-Gen-v3.0/node_modules/vite/dist/node/index.js";
import { svelteSVG } from "file:///home/michael/Documents/GitHub/Random-Quote-Gen-v3.0/node_modules/rollup-plugin-svelte-svg/index.js";
var vite_config_default = defineConfig({
  plugins: [
    sveltekit(),
    svelteSVG({
      // optional SVGO options
      // pass empty object to enable defaults
      svgo: {},
      // vite-specific
      // https://vitejs.dev/guide/api-plugin.html#plugin-ordering
      // enforce: 'pre' | 'post'
      enforce: "pre"
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9taWNoYWVsL0RvY3VtZW50cy9HaXRIdWIvUmFuZG9tLVF1b3RlLUdlbi12My4wXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9taWNoYWVsL0RvY3VtZW50cy9HaXRIdWIvUmFuZG9tLVF1b3RlLUdlbi12My4wL3ZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL21pY2hhZWwvRG9jdW1lbnRzL0dpdEh1Yi9SYW5kb20tUXVvdGUtR2VuLXYzLjAvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBzdmVsdGVraXQgfSBmcm9tICdAc3ZlbHRlanMva2l0L3ZpdGUnO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgeyBzdmVsdGVTVkcgfSBmcm9tICdyb2xsdXAtcGx1Z2luLXN2ZWx0ZS1zdmcnO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuXHRwbHVnaW5zOiBbXG5cdFx0c3ZlbHRla2l0KCksXG5cdFx0c3ZlbHRlU1ZHKHtcblx0XHRcdC8vIG9wdGlvbmFsIFNWR08gb3B0aW9uc1xuXHRcdFx0Ly8gcGFzcyBlbXB0eSBvYmplY3QgdG8gZW5hYmxlIGRlZmF1bHRzXG5cdFx0XHRzdmdvOiB7fSxcblx0XHRcdC8vIHZpdGUtc3BlY2lmaWNcblx0XHRcdC8vIGh0dHBzOi8vdml0ZWpzLmRldi9ndWlkZS9hcGktcGx1Z2luLmh0bWwjcGx1Z2luLW9yZGVyaW5nXG5cdFx0XHQvLyBlbmZvcmNlOiAncHJlJyB8ICdwb3N0J1xuXHRcdFx0ZW5mb3JjZTogJ3ByZSdcblx0XHR9KVxuXHRdXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBOFUsU0FBUyxpQkFBaUI7QUFDeFcsU0FBUyxvQkFBb0I7QUFDN0IsU0FBUyxpQkFBaUI7QUFFMUIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDM0IsU0FBUztBQUFBLElBQ1IsVUFBVTtBQUFBLElBQ1YsVUFBVTtBQUFBO0FBQUE7QUFBQSxNQUdULE1BQU0sQ0FBQztBQUFBO0FBQUE7QUFBQTtBQUFBLE1BSVAsU0FBUztBQUFBLElBQ1YsQ0FBQztBQUFBLEVBQ0Y7QUFDRCxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
