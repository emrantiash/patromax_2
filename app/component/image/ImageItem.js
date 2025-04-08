import { View, Text,StyleSheet } from 'react-native'
import { Image } from '@gluestack-ui/themed'
import React from 'react'

import logo from '../../../assets/images/logo/petromax.png'

export default function ImageItem({src,size,marginVertical,paddingVertical,borderWidth}) {
  return (
    <View style={
      [styles.container,
      {
        marginVertical : {marginVertical},
        paddingVertical : {paddingVertical}
    }]}>
    <Image
    
    size={size}
    // source={{
    //   uri: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    // }}
    source={{
      uri : src
    }}
    alt="image"
    style={{
      // borderColor : 'red',
      borderWidth : borderWidth,
      margin : 0,
      padding : 0,
      borderRadius : 0
    }}
  />
  </View>
  )
}

const styles = StyleSheet.create({
    container : {
        // flex : 1,
        // justufyContent : 'center',
        alignItems : 'center'
    }
})