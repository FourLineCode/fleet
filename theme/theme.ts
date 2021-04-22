import { extendTheme, theme as defaultTheme } from '@chakra-ui/react';

export const theme = extendTheme({
	config: {
		initialColorMode: 'dark',
		useSystemColorMode: false,
	},
	colors: {
		brand: defaultTheme.colors.whatsapp,
		dark: defaultTheme.colors.gray[900],
		'dark-muted': defaultTheme.colors.gray[800],
		light: defaultTheme.colors.gray[50],
		'light-muted': defaultTheme.colors.blackAlpha[200],
		'text-muted': defaultTheme.colors.gray[500],
	},
	styles: {
		global: (props) => ({
			'html, body': {
				bg: props.colorMode === 'dark' ? 'dark' : 'light',
				color: props.colorMode === 'dark' ? 'light' : 'dark',
				minHeight: '100vh',
			},
		}),
	},
});

export const toastProps: Partial<UseToastOptions> = {
	position: 'bottom',
	duration: 5000,
	isClosable: true,
	variant: 'solid',
};
