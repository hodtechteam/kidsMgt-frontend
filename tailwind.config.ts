import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))',
				200: "var(--primary-200)",
				dark: {
					900: "var(--primary-dark-900)"
				},
				main: {
					500: "var(--primary-main-500)"
				}
  			},
			neutral: {
				200: "var(--neutral-200)",
				600: "var(--neutral-600)",
				700: "var(--neutral-700)",
				800: "var(--neutral-800)"
			},
			grey: {
				200:"var(--grey-200)",
				600:"var(--grey-600)",
				800:"var(--grey-800)",
			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
		spacing: {
			5: '22px',
		},
		fontSize: {
			'xl-2': '12px',
			'xl-3':'14px',
			'xl-4': '16px',
			'xl-4.5': '18px',
			'xl-5': '28px',
			'xl-8':'32px',
		},
		lineHeight: {
			'20': '20px',
		},
		padding: {
			'1.5': '6px',
			'2.5': '10px'
		},
		fontFamily: {
			inter: ['Inter'],
			ubuntu: ['Ubuntu']
		},
		borderWidth: {
			1: "1px"
		},
  		borderRadius: {
  			// lg: 'var(--radius)',
  			// md: 'calc(var(--radius) - 2px)',
  			// sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
