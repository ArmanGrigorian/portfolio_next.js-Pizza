import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			fontFamily: {
				nunito: ["var(--font-fontFamily-nunito)"],
			},
			colors: {
				"custom-white": "#FFFFFF",
				"custom-black": "#181818",
				"custom-grey-light": "#F9F9F9",
				"custom-grey-dark": "#7B7B7B",
				"custom-orange": "#FE5F1E",
				"custom-yellow": "#FFDF8C",
				"custom-green": "#2f9e44",
			},
			screens: {
				xsm: "375px",
			},
		},
	},
	plugins: [],
};
export default config;
