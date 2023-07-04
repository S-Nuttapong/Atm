import { extendTheme, theme } from '@chakra-ui/react';
import { buttonTheme } from '@shared/design-system/theme/buttonTheme';
import { textTheme } from '@shared/design-system/theme/textTheme';
import { colorPalette } from "./colorPalette";
import { headingTheme } from "./headingTheme";

const { primary, neutral, red } = colorPalette

export default extendTheme({
    colors: {
        ...colorPalette,
        bg: {
            primary: primary[900],
        },
        border: {
            primary: neutral[900]
        },
        content: {
            primary: neutral[50],
            warning: red[500],
            form: neutral[300]
        },
        button: {
            primary: primary[500]
        }
    },
    fonts: {
        body: 'Poppins, sans-serif',
        heading: 'Poppins, sans-serif',
        mono: 'Poppins, monospace',
    },
    fontSizes: {
        'xx-small': '0.625rem',
        xs: '0.75rem',
        sm: '0.875rem',
        md: '1rem',
        lg: '1.125rem',
        xl: '1.5rem',
        xxl: '2rem',
    },
    fontWeights: {
        normal: 400,
        semibold: 450,
        medium: 500,
        bold: 700,
    },
    lineHeights: {
        normal: 'normal',
        none: '1',
        shorter: '1.25',
        short: '1.375',
        base: '1.5',
        tall: '1.625',
        taller: '2',
    },
    letterSpacings: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
    },
    components: {
        Text: textTheme,
        Heading: headingTheme,
        Button: buttonTheme
    },
}, theme);


