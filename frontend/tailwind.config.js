/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '640px',  
      'md': '768px',  
      'lg': '1024px',  
      'xl': '1280px', 
    },
    extend: {
      boxShadow: {
        '3xl': '0 4px 4px 0px rgba(0, 0, 0, 0.3)',
      },
      animation: {
        typing: "typing 2s steps(10) infinite alternate, blink .7s infinite"
      },
      keyframes: {
        typing: {
          "0%": {
            width: "0%",
            visibility: "hidden"
          },
          "100%": {
            width: "100%"
          }  
        },
        blink: {
          "50%": {
            borderColor: "transparent"
          },
          "100%": {
            borderColor: "black"
          }  
        }
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif']
      },
      colors: {
        primaryText: '#4B296B',
        buttonBg: '#5339B6',
        buttonText: '#706E73', 
        chatBubble: '#FFFFFF',
        chatBorder: '#E5E5E5', 
        inputBg: '#F3F3F3', 
        icon: '#A3A3A3', 
      },
    },
  },
  plugins: [],
}

