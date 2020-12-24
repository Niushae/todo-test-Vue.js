module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      borderWidth: ['first', 'last'],
      borderRadius: ['first', 'last'],
      display: ['hover', 'focus', 'group-hover']
    },
  },
  plugins: [],
}
