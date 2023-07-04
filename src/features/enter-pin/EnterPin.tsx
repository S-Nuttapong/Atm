import { useAtmNavigation } from '@entities/transaction'
import { useUserLazyQuery } from '@entities/user/useUserLazyQuery'

import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  HStack,
  PinInput,
  PinInputField,
  Stack,
} from '@shared/design-system'
import { useState } from 'react'

const passwordLength = 4
const passWordDigits = new Array(passwordLength).fill(null)
const pinIsInvalid = (pin: string) => pin.length === passwordLength

export const EnterPin = () => {
  const [pin, setPin] = useState('')
  const { backToMainMenu } = useAtmNavigation()
  const [enterPin, result] = useUserLazyQuery(pin, {
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
              {passWordDigits.map((_, idx) => (
                <PinInputField key={idx} color="primary.500" />
              ))}
            </PinInput>
          </HStack>
          <Stack w="full">
            <Button
              variant="primary"
              isLoading={result.isFetching}
              isDisabled={!pinIsInvalid(pin) || result.isError}
              onClick={() => enterPin()}
            >
              Confirm
            </Button>
            {result.isError && (
              <FormHelperText color="content.form">
                Invalid PIN. Please check your PIN and try again.
              </FormHelperText>
            )}
          </Stack>
        </Stack>
      </Flex>
    </FormControl>
  )
}
