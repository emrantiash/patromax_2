import { View, Text,StyleSheet,TextInput } from 'react-native'
import React, { useState } from 'react'

export default function NumberInput() {
  const [number,setNumber] = useState(1)
  const handleNumberChange = (text)=>{
    setNumber(text)
  }
  return (
    <View>
     <TextInput
          style={styles.input}
          // type="numeric"
          onChangeText={handleNumberChange}
          value={number}
          placeholder="useless placeholder"
          keyboardType="numeric"
          readOnly={true}
        />
    </View>
  )
}
const styles = StyleSheet.create({
  input: {
    height: 35,
    width : 40,
    // margin: 12,
    borderWidth: 1,
    padding: 1,
  },
});
