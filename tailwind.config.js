module.exports = {
  future: {

  },
  purge: {
    enable: false,
    content: ["./src/**/*.{js,ts,jsx,tsx}"]
  },
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
          character: {
            DEFAULT: "#FFFFFF",
            correct: "#68d391",
            wrong: "#f56565",
            normal: "#E8E8E8",
          }
      },
    },
  },
  variants: {},
  plugins: [],
}