import { View, Text,Dimensions } from 'react-native'
import React from 'react'
import {Badge,BadgeIcon,BadgeText,GlobeIcon} from "@gluestack-ui/themed";

const height = Dimensions.get('window').height

export default function BadgeSymbol({text,action}) {
  return (
    <Badge size="md" variant="solid" action={action} style={{
      // justifyContent : 'center',
      // alignItems : 'center',
      paddingHorizontal : (height*2)/100,
      height : (height*4)/100,
      
      // backgroundColor : 'red',
      // marginTop : 5
    }}>
    <BadgeText>{text}</BadgeText>
    {/* <BadgeIcon as={GlobeIcon} className="ml-2" /> */}
  </Badge>
  )
}