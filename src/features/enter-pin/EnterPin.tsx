import { useTransactionNavigation } from '@entities/transaction'
import { useGetUserInformation } from '@entities/user/useGetUserInformation'
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

const pinIsInvalid = (pin: string) => pin.length === 4

export const EnterPin = () => {
  const [pin, setPin] = useState('')
  const { goToMainMenu } = useTransactionNavigation()
  const [getUserInfo, result] = useGetUserInformation(pin, {
    onSuccess: goToMainMenu,
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
            >
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          </HStack>
          <Button
            isLoading={result.isFetching}
            isDisabled={!pinIsInvalid(pin)}
            onClick={() => getUserInfo()}
          >
            Confirm
          </Button>
          {result.isError && <Txt color="red.500">PIN is not found!</Txt>}
        </Stack>
      </Flex>
    </FormControl>
  )
}
