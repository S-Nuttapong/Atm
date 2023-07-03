import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system"

const h1 = defineStyle({
    fontSize: 'xxl',
    fontWeight: 'bold',
    color: 'content.primary'
})

const h2 = defineStyle({
    fontSize: 'xl',
    fontWeight: 'bold',
    color: 'content.primary',
})

const h3 = defineStyle({
    fontSize: 'lg',
    fontWeight: 'bold',
    color: 'content.primary',
})

const h4 = defineStyle({
    fontSize: 'md',
    fontWeight: 'medium',
    color: 'content.primary',
})

export const headingTheme = defineStyleConfig({
    baseStyle: {
        color: 'gray.900',
        margin: 0,
    },
    variants: {
        "h1": h1,
        h2,
        h3,
        h4
    },
})