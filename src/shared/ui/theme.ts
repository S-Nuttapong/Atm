import { extendTheme, theme } from '@chakra-ui/react';

const secondaryColor = {
    "50": "#f7f7f9",
    "100": "#dee0e7",
    "200": "#c2c5d3",
    "300": "#a0a5ba",
    "400": "#8d94ac",
    "500": "#747c9a",
    "600": "#5e688b",
    "700": "#48537b",
    "800": "#394570",
    "900": "#233060"
}

const primaryColor = {
    "50": "#f6f7ff",
    "100": "#d9dffd",
    "200": "#b9c3fb",
    "300": "#90a0f9",
    "400": "#798cf8",
    "500": "#5970f6",
    "600": "#475dda",
    "700": "#394baf",
    "800": "#303f94",
    "900": "#232e6b"
}

const neutralColor = {
    50: '#F5F7FA',
    100: '#E4E7EB',
    200: '#CBD2D9',
    300: '#9AA5B1',
    400: '#7B8794',
    500: '#616E7C',
    600: '#52606D',
    700: '#3E4C59',
    800: '#323F4B',
    900: '#1F2933',
}

const themeConfig = extendTheme({
    colors: {
        primary: primaryColor,
        secondary: secondaryColor,
        bg: {
            primary: secondaryColor[900]
        },
        border: {
            primary: neutralColor[900]
        },
        neutral: neutralColor
    },
    components: {
        Button: {
            variants: {
                primary: {
                    border: 'unset',
                    bg: 'primary.500',
                    color: 'gray.50',
                    _hover: {
                        bg: 'primary.700',
                        _disabled: {
                            bg: 'primary.500',
                        },
                    },
                    _focus: {
                        bg: 'primary.600',
                        boxShadow: 'outline',
                    },
                    _disabled: {
                        opacity: 0.5,
                        cursor: 'not-allowed',
                    },
                },
                outline: {
                    bg: 'transparent',
                    borderColor: 'primary.500',
                    color: 'primary.500',
                    _hover: {
                        bg: 'primary.50',
                        color: 'primary.500',
                        _disabled: {
                            bg: 'primary.500',
                        },
                    },
                    _focus: {
                        bg: 'primary.50',
                        color: 'primary.500',
                        boxShadow: 'outline',
                    },
                    _disabled: {
                        opacity: 0.5,
                        cursor: 'not-allowed',
                    },
                },
            },
        },
    },
}, theme);

export default themeConfig;
