/** @type {import('tailwindcss').Config} */
module.exports = {
  // include all handlebars files and all js files
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
  },
  variants: {},
  plugins: [],
  purge: {
    content: [
      ".views/layout/**/*.handlebars",
      "./views/**/*.handlebars",
      "./public/js/**/*.js",
    ],
    defaultExtractor: (content) => {
      const matches = content.match(/[A-Za-z0-9-_:/]+/g) || [];
      return matches;
    },
  },
};

// Styling 3rd party libraries with tailwind
// https://tailwindcss.com/docs/content-configuration
