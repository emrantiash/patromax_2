import { View, Text } from 'react-native'
import React from 'react';
import { useSelector } from 'react-redux';
import { Tabs } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { AddIcon } from "@gluestack-ui/themed";
import {Entypo} from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
// import { Ionicons } from "@expo/vector-icons";
// import Feather from "@expo/vector-icons/Feather";
import { DrawerToggleButton } from '@react-navigation/drawer';
import { getLocales } from 'expo-localization';
import { i18n } from '../../utils/libs/localization/Localization';
import Mycart from '../../component/mycart/Mycart';
import ButtonBox from '../../component/button/Button';

export default function _layout() {
  const length = useSelector((state)=>state.cartReducer.data.length)
  const _language = useSelector((state)=>state.loginReducer.language) ;
  i18n.locale = getLocales()[_language].languageCode
  // const backIcon = Platform.OS === "ios" ? "chevron-back" : "arrow-back-sharp";
  return (
    <Tabs  screenOptions={{ tabBarActiveTintColor: 'blue',headerLeft : ()=><DrawerToggleButton tintColor='#000'/> 
    }}>
    <Tabs.Screen
      name="home"
      options={{
        tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        
        tabBarTitle :  "Home",
        title :  i18n.t('Home'),
        headerTitle : "",// i18n.t('Home'),
        headerRight : ()=> 
        <ButtonBox 
        size="xs"
        isIcon={true}
        icon={AddIcon}
        color="#fff"
        borderRadius = {8}
        action="negative"
        text="Add New Order"
        onClick={()=>router.push("/(drawer)/(tabs)/cart")}
        />,
    //     <Button size="md" className="rounded-full m-3.5">
    //   {/* <ButtonIcon as={EditIcon} /> */}
    // </Button>,
        // <Button title="Add New" onPress={()=>router.push('home/new')}/>,
        //  <Mycart />,
         headerRightContainerStyle :{
          marginEnd : 5,
          padding : 5
         },
        headerStyle : {
          backgroundColor : '#fff',
          // margin : 10
          
          
        }
      }}
      
    />
   
     <Tabs.Screen
      name={"cart"}
      options={{
        // headerShown : false,
        title : i18n.t('Orders')+ '(' + length +')',
        // title : 'Cart',
        tabBarTitle: 'Cart',
        headerTitle : i18n.t('Orders'),
        unmountOnBlur: true,
        tabBarIcon: ({ color }) => <Entypo name="shopping-cart" size={24} color="black" />,
      }}
    />
     <Tabs.Screen
      name="profile"
      options={{
        // headerShown : false,
        title : i18n.t('Profile'),
        tabBarTitle: 'Profile',
        headerTitle : i18n.t('Profile'),
        tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
      }}
    />
  </Tabs>
  )
}