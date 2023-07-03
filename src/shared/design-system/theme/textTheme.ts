import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system"


export const baseStyle = defineStyle({
    fontSize: 'md',
    fontWeight: 'normal',
    margin: 0,
})

export const body1 = defineStyle({
    fontSize: 'md',
    fontWeight: 'normal',
    color: 'content.primary',
})

export const body2 = defineStyle({ fontSize: 'sm', fontWeight: 'medium', color: 'content.primary' })

export const body3 = defineStyle({ fontSize: 'sm', fontWeight: 'normal', color: 'content.primary' })

export const description = defineStyle({
    fontSize: 'xs',
    fontWeight: 'normal',
    color: 'content.secondary',
})

export const textTheme = defineStyleConfig({
    baseStyle,
    variants: {
        body1,
        body2,
        body3,
        description
    }
})