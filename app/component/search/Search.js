import { View, Text } from 'react-native'
import React from 'react'
import { EyeIcon,Search, Input, InputField ,InputSlot,InputIcon} from  '@gluestack-ui/themed'
import EvilIcons from '@expo/vector-icons/EvilIcons';


export default function SearchBox({width,borderRadius}) {
  return (
    <Input
    width={width}
    borderRadius={borderRadius}
    type ="search"
    variant="outline"
    size="md"
    isDisabled={false}
    isInvalid={false}
    isReadOnly={false}
  >
    <InputField placeholder="" />
    <InputSlot className="pr-3" >
        <InputIcon as={EyeIcon } style={{marginRight : 10}} />
    </InputSlot>
  </Input>
  )
}