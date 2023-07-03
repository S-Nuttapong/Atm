import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system"
import { colorPalette } from "@shared/design-system/theme/colorPalette"


const primary = defineStyle({
    border: 'unset',
    bg: colorPalette.primary[500],
    color: 'gray.50',
    _hover: {
        bg: colorPalette.primary[700],
        _disabled: {
            bg: colorPalette.primary[500],
        },
    },
    _focus: {
        bg: colorPalette.primary[600],
        boxShadow: 'outline',
    },
    _disabled: {
        opacity: 0.5,
        cursor: 'not-allowed',
    },
})

const outline = defineStyle({
    bg: 'transparent',
    borderColor: colorPalette.primary[500],
    color: colorPalette.primary[500],
    _hover: {
        bg: 'transparent',
        color: colorPalette.neutral[100],
        borderColor: colorPalette.neutral[100],
        _disabled: {
            bg: colorPalette.primary[500],
        },
    },
    _focus: {
        bg: 'transparent',
        color: colorPalette.neutral[100],
        borderColor: colorPalette.neutral[100],
        boxShadow: 'outline',
    },
    _disabled: {
        opacity: 0.5,
        cursor: 'not-allowed',
    },
})

export const buttonTheme = defineStyleConfig({
    variants: {
        primary,
        outline
    }
})