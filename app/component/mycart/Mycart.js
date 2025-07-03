import { View,TouchableOpacity,StyleSheet } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import {Entypo} from '@expo/vector-icons';
import {Text} from "@gluestack-ui/themed";
import {router} from "expo-router"

export default function Mycart() {
    const cart = useSelector((state)=>state.cartReducer.data)
  return (
    <TouchableOpacity
    style={styles.container}
    //  onPress={()=>router.push('screen/cart/Cart')}
    onPress={()=>router.push('/(drawer)/(tabs)/cart')}
    >
    <Entypo name="shopping-cart" size={24} color="white" />
    <Text color='white'>{cart?.length > 0 &&  "("+ cart?.length + ") "}</Text>
    </TouchableOpacity>
    
   
  )
}

const styles = StyleSheet.create({
    container : {
        flexDirection : 'row'
    }
})