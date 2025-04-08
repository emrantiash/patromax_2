import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { AddIcon } from "@gluestack-ui/themed";

import {
  Button,
  ButtonText,
  ButtonSpinner,
  ButtonIcon,
  ButtonGroup,
} from "@gluestack-ui/themed";
import Entypo from '@expo/vector-icons/Entypo';

export default function ButtonBox({
  text,
  onClick,
  width,
  action,
  variant,
  size,
  icon,
  color,
  borderRadius,
  isClassName,
  className,
  isIcon
}) {
  return (
    <View>
      <Button
        className={
          isClassName ? className : " "
        }
        size={size}
        variant={variant}
        action={action}
        width={width}
        onPress={onClick}
        borderRadius={borderRadius}
        // style={{
        //   justifyContent: "center",
        //   alignItems: "center",
        // }}
        // justifyContent="center"
        // alignItems="center"
      >
       
        {
          isIcon && 
          <ButtonIcon
          as={icon}
          className="ml-2"
          color={color}
          marginHorizontal={10}
        />
        }
        
        <ButtonText
          className="text-typography-600"
          style={{
            justifyContent: "center",
            alignItems : 'center'
          }}
        >{text}</ButtonText>
        
      </Button>
      
    </View>
  );
}
