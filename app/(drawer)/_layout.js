import { View, Text, StyleSheet, Image,Dimensions } from "react-native";
import React, { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { signout } from "../redux/slices/loginSlice";
import { Drawer } from "expo-router/drawer";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router, usePathname } from "expo-router";
import useConfig from "../lib/hook/config";
import { getLocales } from 'expo-localization';
import { i18n } from "../utils/libs/localization/Localization";

const width =  Dimensions.get('window').width 
const image_size =  (width * 6) / 100

const CustomDrawerContent = (props) => {
  const config = useConfig();
  const pathname = usePathname();
  const dispatch = useDispatch()
  const _language = useSelector((state)=>state.loginReducer.language )  ;
  // console.log(_language)
  i18n.locale = getLocales()[_language]?.languageCode

  useEffect(() => {
  }, [pathname]);

  const _logout =()=>{
    dispatch(signout())
    router.push("/")
  }

  return (
    <DrawerContentScrollView {...props} 
    contentContainerStyle={{
        flex: 1, top: 0, bottom: 0, 
        backgroundColor: '#fff',
        width: '100%'
    }}
    
    >
      <View style={styles.userInfoWrapper}>
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/women/26.jpg" }}
          width={80}
          height={80}
          style={styles.userImg}
        />
        <View style={styles.userDetailsWrapper}>
          <Text style={styles.userName}>{config[1]?.first_name}</Text>
          <Text style={styles.userEmail}>{config[1]?.email}</Text>
        </View>
      </View>
      <DrawerItem
        icon={({ color, size }) => (
            <FontAwesome name="feed" size={image_size} color={pathname == "/home" ? "#fff" : "#DF2B2A"} />
        )}
        label={"Home"}
        labelStyle={[
          styles.navItemLabel,
          { color: pathname == "/home" ? "#fff" : "#000" },
        ]}
        style={{ backgroundColor: pathname == "/home" ? "#DF2B2A" : "#fff" }}
        onPress={() => {
          router.push("/(drawer)/(tabs)/home");
        }}
        screenOptions = {{
          headerTintColor :'#fff'
        }}
      />
       <DrawerItem
        icon={({ color, size }) => (
            <Fontisto name="favorite" size={image_size} color={pathname == "/favourites" ? "#fff" : "#DF2B2A"}  />
        )}
        label={i18n.t('Statement')}
        labelStyle={[
          styles.navItemLabel,
          { color: pathname == "/favourites" ? "#fff" : "#000" },
        ]}
        style={{ backgroundColor: pathname == "/favourites" ? "#DF2B2A" : "#fff",
      marginLeft : 5,
      justifyContent : 'space-between'
      }}
        onPress={() => {
          router.push("/favourites");
        }}
      />
      <DrawerItem
        icon={({ color, size }) => (
          <MaterialIcons name="account-circle" size={image_size} color={pathname == "/profile" ? "#fff" : "#DF2B2A"} />
        )}
        label={i18n.t('MY_ACCOUNT')}
        
        labelStyle={[
          styles.navItemLabel,
          { color: pathname == "/profile" ? "#fff" : "#000" },
        ]}
        style={{ backgroundColor: pathname == "/profile" ? "#DF2B2A" : "#fff" }}
        onPress={() => {
          router.push("/profile/");
        }}
        
      />
      {/* <DrawerItem
        icon={({ color, size }) => (
          <MaterialCommunityIcons name="order-numeric-descending" size={24} color="black" />
        )}
        label={"Active Order"}
        
        labelStyle={[
          styles.navItemLabel,
          { color: pathname == "/screen/activeScreen/ActiveScreen" ? "#fff" : "#000" },
        ]}
        style={{ backgroundColor: pathname == "/screen/activeScreen/ActiveScreen" ? "#333" : "#fff" }}
        onPress={() => {
          router.push("/screen/activeScreen/ActiveScreen/");
        }}
      /> */}
     
      {/* <DrawerItem
        icon={({ color, size }) => (
          <MaterialCommunityIcons name="order-numeric-descending" size={24} color="black" />
        )}
        label={"Order History"}
        
        labelStyle={[
          styles.navItemLabel,
          { color: pathname == "/history" ? "#fff" : "#000" },
        ]}
        style={{ backgroundColor: pathname == "/history" ? "#333" : "#fff" }}
        onPress={() => {
          router.push("/history/");
        }}
      /> */}
       {/* <DrawerItem
        icon={({ color, size }) => (
            <AntDesign name="profile" size={24} color="black" />
        )}
        label={"Profile"}
        labelStyle={[
          styles.navItemLabel,
          { color: pathname == "/profile" ? "#fff" : "#000" },
        ]}
        style={{ backgroundColor: pathname == "/profile" ? "#333" : "#fff" ,
        justifyContent : 'space-between'
      }}
        onPress={() => {
          // router.push("/(drawer)/(tabs)/profile");
          router.push("/profile");
        }}
      /> */}
     
      <DrawerItem
        icon={({ color, size }) => (
            <AntDesign name="setting" size={image_size} color={pathname == "/settings" ? "#fff" : "#DF2B2A"} />
        )}
        label={"Settings"}
        labelStyle={[
          styles.navItemLabel,
          { color: pathname == "/settings" ? "#fff" : "#000" },
        ]}
        style={{ backgroundColor: pathname == "/settings" ? "#DF2B2A" : "#fff" }}
        onPress={() => {
          router.push("/settings");
        }}
      />
       <DrawerItem
        icon={({ color, size }) => (
            // <AntDesign name="logout" size={image_size} color="#DF2B2A" />
            <MaterialCommunityIcons name="logout" size={image_size} color="#DF2B2A" />
            
        )}
        label={"Log out"}
        labelStyle={[
          styles.navItemLabel,
           { color:  "#000" },
        ]}
        onPress={_logout}
      />
    </DrawerContentScrollView>
  );
};

export default function Layout() {
  return (
    <Drawer 
    
     drawerContent={(props) => <CustomDrawerContent {...props} />} 
    // backBehavior="history"
    screenOptions={{
      headerShown: false,
      drawerActiveTintColor: 'white',
      drawerActiveBackgroundColor: '#003CB3',
      drawerLabelStyle: {
        color: 'white',
      },
      headerStyle : {
        backgroundColor: "#DF2B2A"
      },
      headerTintColor : '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    }}
    >
      <Drawer.Screen name="home" options={{headerShown: true,title : "Home"}} />
       <Drawer.Screen name="orderHistory" options={{headerShown: true,title : "Order History"}} />
       <Drawer.Screen name="profile" options={{headerShown: true,title : "Profile"}} />
      <Drawer.Screen name="favourites" options={{headerShown: true,title : "Statement"}} />
      <Drawer.Screen name="settings" options={{headerShown: true,title : "Setting"}} />
      {/* <Drawer.Screen name="logout" options={{headerShown: true}} /> */}
    </Drawer>
  );
}

const styles = StyleSheet.create({
  navItemLabel: {
    // marginLeft: -20,
    fontSize: 18,
  },
  userInfoWrapper: {
    // backgroundColor : '#fff',
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  userImg: {
    borderRadius: 40,
  },
  userDetailsWrapper: {
    marginTop: 25,
    marginLeft: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize:16,
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  }
});