import { useTransactionNavigation } from '@entities/transaction'
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
} from '@shared/ui'
import { useState } from 'react'

const passwordLength = 4
const passWordDigits = new Array(passwordLength).fill(null)
const pinIsInvalid = (pin: string) => pin.length === passwordLength

export const EnterPin = () => {
  const [pin, setPin] = useState('')
  const { backToMainMenu } = useTransactionNavigation()
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
          <Button
            variant="primary"
            isLoading={result.isFetching}
            isDisabled={!pinIsInvalid(pin)}
            onClick={() => enterPin()}
          >
            Confirm
          </Button>
          {result.isError && <Txt color="red.500">PIN is not found!</Txt>}
        </Stack>
      </Flex>
    </FormControl>
  )
}
