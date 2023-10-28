/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    screens:{
      sm:'360px',
      tablet:'960px',
      desktop:'1248px',

      sm:'640px',
      md:'768px',	      
      lg:'1024px',	
      xl:'1280px',	
      '2xl':'1536px'


    },
    colors:{
      white:'#FFFFFF',
      color1:'#3A1078',
      color2:'#4E31AA',
      color3:'#2F58CD',
      color4:'#3795BD',
      color5:'#0096FF'

    },
    extend: {
      fontFamily:{
        poppins:['Poppins'],
        raleway: ['Raleway'],
        inconsolata: ['Inconsolata'],

      }
    },
  },
  plugins: [],
}

