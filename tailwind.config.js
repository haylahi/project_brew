/*
 ** TailwindCSS Configuration File
 */
module.exports = {
  darkMode: 'class',
  content: ['pages/**/*.vue'],
  plugins: [
    require('@tailwindcss/forms')
  ],
  theme: {
    extend: {
      scale: {
        flip: '-1'
      },
      colors: {},
      fontFamily: {
        sans: ['Open Sans', 'sans-serif']
      }
    }
  }
}
