import { View, StyleSheet,Dimensions,ScrollView } from 'react-native'
import React from 'react'
import InputBox from '../component/input/Input'
import ButtonBox from '../component/button/Button'
import {Text} from '@gluestack-ui/themed'
const height = Dimensions.get('window').height ;

export default function Favourites() {
  const title = "Statement00123-01-01-2025.pdf"
  return (
    <>
    <View style={styles.container}>
      {/* <ScrollView> */}
      <View style={styles.box}>
      <InputBox 
      
      height={(height*7)/100}
      value = {title}
      />

      <View style={styles.text}>
        <Text size="xs" color='gray'>Statement generated in pdf formate</Text>

      </View>

     </View>

      {/* </ScrollView> */}
     
     
    </View>

    <View>
      <ButtonBox 
       action="negative"
       text={"Download"}
       fontColor = {"#fff"}
       borderRadius={10}
      //  onClick={makeTheCall}
      
      />

    </View>
    
    </>
    
  )
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    alignItems : 'center'
  },
  box : {
    marginTop : (height*5)/100,
    width :  '80%',
    // marginHorizontal : 20 ,
    marginVertical :  20 
  },
  text : {
    marginVertical :  50,
    alignItems : 'center'
  }
})