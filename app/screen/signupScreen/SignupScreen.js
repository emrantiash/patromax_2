import { ScrollView,View,StyleSheet,Dimensions } from 'react-native'
import React from 'react'
import {Card,Text} from '@gluestack-ui/themed'
import InputBox from '../../component/input/Input'
import ButtonBox from '../../component/button/Button'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

export default function SignupScreen() {
  return (
    <ScrollView style={styles.container}>
      <Card 
      variant='elevated'
      style={styles.card}>
        <View style={styles.inBetween}>
        <InputBox 
        isLabel
        label="Name"
        height={(height*5)/100}
        />
        </View>
        <View style={styles.inBetween}>
        <InputBox 
        isLabel
        label="Phone"
        height={(height*5)/100}
        />
        </View>
        <View style={styles.inBetween}>
        <InputBox 
        isLabel
        label="Address"
        height={(height*5)/100}
        />
        </View>
        <View style={styles.inBetween}>
        <InputBox 
        isLabel
        label="UserName"
        height={(height*5)/100}
        />
        </View>
        <View style={styles.inBetween}>
        <InputBox 
        isLabel
        label="Password"
        height={(height*5)/100}
        />
        </View>
        <View style={styles.inBetween}>
        <ButtonBox 
        action={"negative"}
        text="Submit !"
        borderRadius={6}
        />
        </View>
         
      </Card>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        // justifyContent : 'center',
        // alignItems : 'center',
        backgroundColor : '#fff',
       
    },
    card : {
        // justifyContent : 'center',
        marginHorizontal : 4,
        marginVertical : 4 ,
        backgroundColor : '#fff',
    },
    inBetween:{
        // backgroundColor : 'red',
          marginVertical : 10,
          marginHorizontal : 10
          
      },
})