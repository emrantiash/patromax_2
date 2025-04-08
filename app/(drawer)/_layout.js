import { View, Text, StyleSheet, Image,Dimensions } from "react-native";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { signout } from "../redux/slices/loginSlice";
import { Drawer } from "expo-router/drawer";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
// import {
//   Feather,
//   AntDesign,
//   MaterialIcons,
//   Ionicons,
// } from "@expo/vector-icons";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router, usePathname } from "expo-router";

const CustomDrawerContent = (props) => {
  const pathname = usePathname();
  const dispatch = useDispatch()

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
        // backgroundColor: 'yellow',
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
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userEmail}>john@email.com</Text>
        </View>
      </View>
      <DrawerItem
        icon={({ color, size }) => (
            <FontAwesome name="feed" size={24} color="black" />
        )}
        label={"Home"}
        labelStyle={[
          styles.navItemLabel,
          { color: pathname == "/home" ? "#fff" : "#000" },
        ]}
        style={{ backgroundColor: pathname == "/home" ? "#333" : "#fff" }}
        onPress={() => {
          router.push("/(drawer)/(tabs)/home");
        }}
      />
     
      <DrawerItem
        icon={({ color, size }) => (
          <MaterialCommunityIcons name="order-numeric-descending" size={24} color="black" />
        )}
        label={"Order History"}
        
        labelStyle={[
          styles.navItemLabel,
          { color: pathname == "/orderHistory" ? "#fff" : "#000" },
        ]}
        style={{ backgroundColor: pathname == "/orderHistory" ? "#333" : "#fff" }}
        onPress={() => {
          router.push("/orderHistory/");
        }}
      />
       <DrawerItem
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
          router.push("/(drawer)/(tabs)/profile");
        }}
      />
      <DrawerItem
        icon={({ color, size }) => (
            <Fontisto name="favorite" size={24} color="black" />
        )}
        label={" Favourites"}
        labelStyle={[
          styles.navItemLabel,
          { color: pathname == "/favourites" ? "#fff" : "#000" },
        ]}
        style={{ backgroundColor: pathname == "/favourites" ? "#333" : "#fff",
      marginLeft : 5,
      justifyContent : 'space-between'
      }}
        onPress={() => {
          router.push("/favourites");
        }}
      />
      <DrawerItem
        icon={({ color, size }) => (
            <AntDesign name="setting" size={24} color="black" />
        )}
        label={"Settings"}
        labelStyle={[
          styles.navItemLabel,
          { color: pathname == "/settings" ? "#fff" : "#000" },
        ]}
        style={{ backgroundColor: pathname == "/settings" ? "#333" : "#fff" }}
        onPress={() => {
          router.push("/settings");
        }}
      />
       <DrawerItem
        icon={({ color, size }) => (
            <AntDesign name="logout" size={24} color="black" />
        )}
        label={"Log out"}
        labelStyle={[
          styles.navItemLabel,
          { color: pathname == "/settings" ? "#fff" : "#000" },
        ]}
        // style={{ backgroundColor: pathname == "/logout" ? "#333" : "#fff" }}
        onPress={_logout}
      />
    </DrawerContentScrollView>
  );
};

export default function Layout() {
  return (
    <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />} 
    // backBehavior="history"
    screenOptions={{headerShown: false}}
    >
       <Drawer.Screen name="orderHistory" options={{headerShown: true,title : "Order History"}} />
      <Drawer.Screen name="favourites" options={{headerShown: true}} />
      <Drawer.Screen name="settings" options={{headerShown: true}} />
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
    backgroundColor : '#fff',
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