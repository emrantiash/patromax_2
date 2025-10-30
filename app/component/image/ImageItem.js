import { View, Text,StyleSheet } from 'react-native'
import { Image } from '@gluestack-ui/themed'
import React from 'react'

import logo from '../../../assets/images/logo/petromax.png'

const ImageItem = ({src,size,width,marginVertical,paddingVertical,borderWidth}) =>
{
  return (
    <View style={
      [styles.container,
      {
        marginVertical : {marginVertical},
        paddingVertical : {paddingVertical}
    }]}>
    <Image
    size={size}
    source={{
      uri : src
    }}
    alt="image"
    style={{
      borderWidth : borderWidth,
      margin : 0,
      padding : 0,
      borderRadius : 0,
      // width  : 'auto' 
    }}
  />
  </View>
  )
}

export default ImageItem;

ImageItem.propTypes = {
  // width: pr
};

const styles = StyleSheet.create({
    container : {
        // flex : 1,
        // justufyContent : 'center',
        alignItems : 'center'
    }
})