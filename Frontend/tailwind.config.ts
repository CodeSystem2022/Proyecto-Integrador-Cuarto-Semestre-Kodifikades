import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
		},
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#d5fcae',
					secondary: '#bb28cc',
					accent: '#05bc42',
					neutral: '#272433',
					'base-100': '#ffffff',
					info: '#5f9fd3',
					success: '#50d798',
					warning: '#f4c11a',
					error: '#f2140d',
					body: {
						'background-color': '#e3e6e6',
					},
				},
			},
		],
	},
};
export default config;
