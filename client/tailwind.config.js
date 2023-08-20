/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    // custom colors 
    colors:{
     headcolor:'#676767',
     warn:'#ff0000',
     warnborder:'#fc7a7ab5',
     succ:'#d0ffd0',
     white:'#ffffff',
     lblue:'#0b5ed7'
    },
    extend: {
      fontFamily:{
        'head':['Outfit', 'sans-serif']
      }
    },
  },
  plugins: [],
}

