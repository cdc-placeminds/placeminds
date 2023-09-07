/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    // custom colors 
    colors:{
      sechead:'#102970',
     headcolor:'#676767',
     warn:'#ff0000',
     warnborder:'#fc7a7ab5',
     succ:'#d0ffd0',
     white:'#ffffff',
     lblue:'#0b5ed7',
     bkg: '#EAF1FF',
     cardborder: '#60606041'
    },
    extend: {
      fontFamily:{
        'head':['Outfit', 'sans-serif'],
        'subt':['Kaushan Script', 'cursive'],
        'tagline': ['Playfair Display', 'serif'],
        'numb':['digital-7','sans-serif']
      },
      backgroundImage: {
        'form-doodle': "url('./Components/images/doodle4.jpg')",
        'hor-doodle': "url('./Components/images/doodle_bkg.jpg')",
        
      }
    },
  },
  plugins: [],
}

