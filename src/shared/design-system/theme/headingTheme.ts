import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system"
const brandPrimary = defineStyle({
    color: "blue.500",
    // let's also provide dark mode alternatives
    _dark: {
        color: 'blue.300',
    }
})

const custom = defineStyle({
    color: "yellow.500",
    fontFamily: "mono",
    fontWeight: "semibold",
    // let's also provide dark mode alternatives
    _dark: {
        color: 'yellow.300',
    }
})

const underline = defineStyle({
    color: "orange.500",
    borderBottom: "2px",
    borderRadius: "10",
    fontFamily: "serif",
    // let's also provide dark mode alternatives
    _dark: {
        color: 'orange.400',
    },
    _hover: {
        borderColor: "red.200",
        _dark: {
            borderColor: "red.300"
        }
    }
})


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
    },
    variants: {
        "h1": h1,
        h2,
        h3,
        h4
    },
})