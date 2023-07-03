import { AddIcon as ChakraIcon } from '@chakra-ui/icons'
import {
  IconProps as ChakraIconProps,
  Circle,
  SquareProps,
} from '@chakra-ui/react'
import { isFalsy } from '@shared/libs/fp'
import { isTruthy } from 'remeda'

interface CheckCircleIconProps
  extends Pick<ChakraIconProps, 'boxSize'>,
    Pick<SquareProps, 'bg'> {
  size?: number
  boxSize?: number
  iconColor?: ChakraIconProps['color']
}

const defaultSizes = {
  boxSize: 10,
  size: 20,
}

const scale = {
  up: 2,
  down: 0.5,
}

const autoAdjustIconSize = (
  boxSize?: ChakraIconProps['boxSize'],
  size?: CheckCircleIconProps['size']
) => {
  if (isTruthy(size) && isTruthy(boxSize)) return { size, boxSize }
  if (isFalsy(size) && isFalsy(boxSize)) return defaultSizes
  if (isTruthy(size) && isFalsy(boxSize))
    return { size, boxSize: size * scale.down }
  return { boxSize, size: (boxSize as number) * scale.up }
}

export const createCircleIcon = (Icon: typeof ChakraIcon) => {
  return function IconInsideCircle(props: CheckCircleIconProps) {
    const {
      iconColor = 'bg.primary',
      bg = 'content.primary',
      boxSize,
      size,
    } = props
    const result = autoAdjustIconSize(boxSize, size)
    return (
      <Circle size={result.size} bg={bg}>
        <Icon boxSize={result.boxSize} color={iconColor} />
      </Circle>
    )
  }
}
