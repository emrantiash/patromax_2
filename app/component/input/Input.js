import { View,StyleSheet,KeyboardAvoidingView,Platform } from 'react-native'
import React,{useState} from 'react'
import { VStack,Heading,Text,Input,InputField,InputIcon, InputSlot,EyeIcon, EyeOffIcon  } from '@gluestack-ui/themed'

export default function InputBox({size,placeholder,isPasswordField,label,labelSize,text,name,setInputValue,width,height,
  isnumber,isLabel,isReadOnly,value,fontSize,variant,color,labelColor,borderRadius,textAlign,isDisabled}) {
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
          <Text className="text-bold-200" size={labelSize} color={labelColor}>{label}</Text>
        }
     <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined} // Adjust behavior based on platform
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0} // Optional offset for iOS
    >
      <Input     
      variant={variant}
      size={size}
      isDisabled={isDisabled}
      isInvalid={false}
      width={width}
      height={height}
      isReadOnly = {isReadOnly}
      borderRadius={borderRadius}
      focus={true}
      
    >
      <InputField 
      
      placeholder={placeholder} 
      type={!showPassword && isPasswordField ? "password" : isnumber ? "number" : "text"} 
      name ={name}
      onChangeText={(text) => setInputValue(name,text)}
      style={[styles.extra,{
        fontSize : fontSize,
        color : color,
        textAlign: textAlign
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
    </KeyboardAvoidingView>
    </VStack>
   
    </View>
  )
}

const styles = StyleSheet.create({
    extra : {
        // color : 'red',
        // borderRadius :  19
        letterSpacing : 0.5
    }
})