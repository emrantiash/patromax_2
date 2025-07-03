import { View, Text } from 'react-native'
import React from 'react';
import { useSelector } from 'react-redux';
import { Tabs } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { AddIcon } from "@gluestack-ui/themed";
import {Entypo} from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
// import { Ionicons } from "@expo/vector-icons";
// import Feather from "@expo/vector-icons/Feather";
import { DrawerToggleButton } from '@react-navigation/drawer';
import { getLocales } from 'expo-localization';
import  {i18n}  from '../../utils/libs/localization/Localization';
import Mycart from '../../component/mycart/Mycart';
import ButtonBox from '../../component/button/Button';

export default function _layout() {
  const length = useSelector((state)=>state.cartReducer.data?.length)
  const _language = useSelector((state)=>state.loginReducer.language )  ;
  // console.log(_language)
  i18n.locale = getLocales()[_language]?.languageCode
  // const backIcon = Platform.OS === "ios" ? "chevron-back" : "arrow-back-sharp";
  return (
    <Tabs  
    
    screenOptions={{ tabBarActiveTintColor: '#DF2B2A',
    headerLeft : ()=><DrawerToggleButton tintColor='#fff'/> 
    }}>
    <Tabs.Screen
      name="home"
      options={{
        tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        
        tabBarTitle :  "Home",
        title :  i18n.t('Home'),
        headerTitle : "Home",// i18n.t('Home')
        tabBarLabelStyle : {
          color  : '#DF2B2A' //red
        },
        headerTintColor : '#fff',
        headerRight : ()=> 
        <ButtonBox 
        size="xs"
        isIcon={true}
        icon={AddIcon}
        iconsize={"xl"}
        color="#fff"
        borderRadius = {8}
        action="negative"
        variant={"outline"}
        // text="New Order"
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
          backgroundColor : '#DF2B2A',      
        },
        headerTitleStyle : {
          color : '#fff'
        },
      }}
      
    />
    <Tabs.Screen
      name="history"
      options={{
        // title : i18n.t('Profile'),
        title : "History",
        tabBarTitle: 'History',
        // headerTitle : i18n.t('Profile'),
        headerTitle : "History",
        tabBarLabelStyle : {
          color  : '#DF2B2A'
        },
        headerTintColor : '#fff',
        unmountOnBlur: true,
        tabBarIcon: ({ color }) => <MaterialIcons name="history" size={24} color={color} />,
        headerStyle : {
          backgroundColor : '#DF2B2A',      
        },
        headerTitleStyle : {
          color : '#fff'
        },
       
      }}
    />
   
     <Tabs.Screen
      name={"cart"}
      options={{
        // headerShown : false,
        title : i18n.t('Orders')+ '(' + length +')',
        // title : i18n.t('Orders'),
        // title : 'Cart',
        tabBarTitle: 'Cart',
        headerTitle : i18n.t('Orders'),
        tabBarLabelStyle : {
          color  : '#DF2B2A'
        },
        headerTintColor : '#fff',
        unmountOnBlur: true,
        tabBarIcon: ({ color }) => <Entypo name="shopping-cart" size={24} color={color} />,
        headerStyle : {
          backgroundColor : '#DF2B2A'
        }
      }}
    />
     
    <Tabs.Screen
      name="notification"
      options={{
        title : i18n.t('Notification'),
        tabBarTitle: 'Notification',
        headerTitle : i18n.t('Notification'),
        tabBarLabelStyle : {
          color  : '#DF2B2A'
        },
        headerTintColor : '#fff',
        tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
        headerStyle : {
          backgroundColor : '#DF2B2A',
          
        }
      }}
    />
  </Tabs>
  )
}