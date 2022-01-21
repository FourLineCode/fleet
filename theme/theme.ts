import { extendTheme, theme as defaultTheme, UseToastOptions } from "@chakra-ui/react";

export const theme = extendTheme({
    config: {
        initialColorMode: "dark",
        useSystemColorMode: false,
    },
    colors: {
        brand: defaultTheme.colors.whatsapp,
        dark: defaultTheme.colors.gray[900],
        "dark-muted": defaultTheme.colors.gray[800],
        light: defaultTheme.colors.gray[100],
        "light-muted": defaultTheme.colors.gray[300],
        "text-muted": defaultTheme.colors.gray[400],
    },
    styles: {
        global: (props) => ({
            "html, body": {
                bg: props.colorMode === "dark" ? "dark" : "light",
                color: props.colorMode === "dark" ? "light" : "dark",
                minHeight: "100vh",
            },
        }),
    },
});

export const toastProps: Partial<UseToastOptions> = {
    position: "bottom",
    duration: 5000,
    isClosable: true,
    variant: "solid",
};
