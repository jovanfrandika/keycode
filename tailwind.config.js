module.exports = {
  purge: {
    enable: false,
    content: []
  },
  darkMode: false, // or 'media' or 'class'
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