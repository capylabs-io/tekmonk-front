
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
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
  			primary: {
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
  			},
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
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
  		fontFamily: {
  			dela: ['var(--font-dela)', 'cursive'],
			nutito: ['var(--font-nunito)', 'cursive'],
  		},
  		boxShadow: {
  			'custom-gray': '0px 4px 0px rgb(208, 213, 221) ',
  			'custom-primary': '0px 4px 0px rgb(159,42,143)'
  		},
  		screens: {
  			mobile: '440px',
  			tabletHeader: '768px'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}