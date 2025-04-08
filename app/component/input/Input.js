import { View,StyleSheet } from 'react-native'
import React,{useState} from 'react'
import { KeyboardAvoidingView,VStack,Heading,Text,Input,InputField,InputIcon, InputSlot,EyeIcon, EyeOffIcon  } from '@gluestack-ui/themed'

export default function InputBox({size,placeholder,isPasswordField,label,name,setInputValue,width,height,
  isnumber,isLabel,isReadOnly,value,fontSize,variant,color}) {
    const [showPassword, setShowPassword] = useState(false)
    const handleState = () => {
      setShowPassword((showState) => {
        return !showState
      })
    }
  return (
    <View style={{
      marginVertical : 0
    }}>
       
      <VStack space="lg">
        {
          isLabel &&
          <Text className="text-bold-200" size="md" >{label}</Text>
        }
      
      <Input     
      variant={variant}
      size={size}
      isDisabled={false}
      isInvalid={false}
      width={width}
      height={height}
      isReadOnly = {isReadOnly}
    >
      <InputField 
      placeholder={placeholder} 
      type={!showPassword && isPasswordField ? "password" : isnumber ? "number" : "text"} 
      name ={name}
      onChangeText={(text) => setInputValue(text,name)}
      style={[styles.extra,{
        fontSize : fontSize,
        color : color
      }]}
     
      value = {value}
     
      />
      {
        isPasswordField &&
        <InputSlot className="pr-3" onPress={handleState}>
        <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} style={{marginRight : 10}} />
    </InputSlot>
      }
     
    </Input>
    </VStack>
   
    </View>
  )
}

const styles = StyleSheet.create({
    extra : {
        // color : 'red',
        borderRadius :  19
    }
})