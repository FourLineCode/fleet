import { extendTheme, theme as defaultTheme } from '@chakra-ui/react';

export const theme = extendTheme({
	config: {
		initialColorMode: 'light',
		useSystemColorMode: false,
	},
	colors: {
		brand: defaultTheme.colors.green,
		dark: defaultTheme.colors.gray[900],
		light: defaultTheme.colors.gray[100],
	},
	styles: {
		global: (props) => ({
			'html, body': {
				bg: props.colorMode === 'dark' ? 'dark' : 'light',
				color: props.colorMode === 'dark' ? 'light' : 'dark',
			},
		}),
	},
});
