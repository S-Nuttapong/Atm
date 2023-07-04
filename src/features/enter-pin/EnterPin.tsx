import { useAtmNavigation } from '@entities/transaction'
import { useEnterPin } from '@features/enter-pin/useEnterPin'

import {
  Button,
  Flex,
  FormControl,
  HStack,
  PinInput,
  PinInputField,
  Stack,
  Txt,
} from '@shared/design-system'
import { useState } from 'react'

const passwordLength = 4
const passWordDigits = new Array(passwordLength).fill(null)
const pinIsInvalid = (pin: string) => pin.length === passwordLength

export const EnterPin = () => {
  const [pin, setPin] = useState('')
  const { backToMainMenu } = useAtmNavigation()
  const [enterPin, result] = useEnterPin(pin, {
    onSuccess: backToMainMenu,
  })
  return (
    <FormControl>
      <Flex alignItems="center" justifyContent="center">
        <Stack w="fit-content" h="full" justifyContent="center" spacing={10}>
          <HStack w="full" h="full" justifyContent="center" spacing={10}>
            <PinInput
              type="number"
              mask
              manageFocus
              value={pin}
              onChange={pin => setPin(pin)}
              size="lg"
            >
              {passWordDigits.map(() => (
                <PinInputField color="primary.500" />
              ))}
            </PinInput>
          </HStack>
          <Stack w="full">
            <Button
              variant="primary"
              isLoading={result.isFetching}
              isDisabled={!pinIsInvalid(pin)}
              onClick={() => enterPin()}
            >
              Confirm
            </Button>
            {result.isError && (
              <Txt
                textAlign="center"
                variant="description"
                color="content.warning"
                fontSize="md"
              >
                Invalid PIN. Please check your PIN and try again.
              </Txt>
            )}
          </Stack>
        </Stack>
      </Flex>
    </FormControl>
  )
}
