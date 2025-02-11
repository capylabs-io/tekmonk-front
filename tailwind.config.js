
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
  	container: {
  		center: 'true',
  		padding: '8px',
  		screens: {
  			'2xl': '1400px',
			'xl': '1200px',
			'lg': '960px',
			'md': '720px',
  			'sm': '640px',
  		}
  	},
  	extend: {
  		colors: {
  			primary: {
				"00": "#FCF7FB",
				"05": "#FBF3FA",
				"10": "#F9E7F6",
				"20": "#F5D0EF",
				"30": "#EEABE4",
				"40": "#E578D5",
				"50": "#DC58C8",
				"60": "#BC4CAC",
				"70": "#9A1595",
				"80": "#83077E",
				"90": "#5A0057",
				"95": "#320130",

  				'25': '#FCF7FB',
  				'50': '#FBF3FA',
  				'100': '#F9E7F6',
  				'200': '#F5D0EF',
  				'300': '#EEABE4',
  				'400': '#E578D5',
  				'500': '#DC58C8',
  				'600': '#BC4CAC',
  				'700': '#9A1595',
  				'800': '#83077E',
  				'900': '#5A0057',
  				'950': '#320130'
  			},
  			grey: {
  				'25': '#FCFCFD',
  				'50': '#F9FAFB',
  				'100': '#F2F4F7',
  				'200': '#E4E7EC',
  				'300': '#D0D5DD',
  				'400': '#98A2B3',
  				'500': '#667085',
  				'600': '#475467',
  				'700': '#344054',
  				'800': '#1D2939',
  				'900': '#101828',
  				'950': '#0C111D'
  			},
			gray: {
				"00": "#FFFFFF",
				"05": "#F9FAFB",
				"10": "#F2F4F7",
				"20": "#EBE4EC",
				"30": "#DDD0DD",
				"40": "#AC9EB1",
				"50": "#7C6C80",
				"60": "#5F4C62",
				"70": "#4B3C4E",
				"80": "#2F2433",
				"90": "#241028",
				"95": "#1A0C1D"

			}
  		},
  		keyframes: {
			'accordion-down': {
				from: {
					height: '0'
				},
				to: {
					height: 'var(--radix-accordion-content-height)'
				}
			},
			'accordion-up': {
				from: {
					height: 'var(--radix-accordion-content-height)'
				},
				to: {
					height: '0'
				}
			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
  		fontFamily: {
  			dela: ['var(--font-dela)', 'cursive'],
			nutito: ['var(--font-nunito)', 'cursive'],
  		},
  		boxShadow: {
  			'custom-gray': '0px 4px 0px #EBE4EC',
  			'custom-primary': '0px 4px 0px #9A1595'
  		},
  		screens: {
  			mobile: '440px',
  			tabletHeader: '768px'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}