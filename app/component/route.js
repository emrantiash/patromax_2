
import React,{useEffect,useRef} from "react";
import { StyleSheet, View,Text, Button, Platform,AppState } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import { useSelector } from 'react-redux';
import { i18n } from '../utils/libs/localization/Localization';
import { getLocales } from "expo-localization";
import useConfig from "../lib/hook/config";

export default function Routes() {
  const config = useConfig()
  i18n.locale =  config[5] === 0 ? 'en' : 'bn'

  const backIcon = Platform.OS === "ios" ? "chevron-back" : "arrow-back-sharp";
  const appState = useRef(AppState.currentState);
  return (
    <Stack
            screenOptions={{
              headerStyle: {
                backgroundColor: "#DF2B2A",
                color : '#fff'
              },
              headerTintColor: "#fff",
            }}
          >
            <Stack.Screen
              name="screen/loginScreen/LoginScreen"
              screenOptions={{
                headerStyle: {
                  backgroundColor: "white",
                },
              }}
              options={{
                headerTitle: "Sign Up",
                headerShown: false 
               
              }}
            />  
             <Stack.Screen
              name="screen/signupScreen/SignupScreen"
              screenOptions={{
                headerStyle: {
                  backgroundColor: "white",
                },
              }}
              options={{
                headerTitle: "Sign Up",
                // headerShown: false 
            
              }}
            />
            <Stack.Screen
              name="index"
              screenOptions={{
                headerStyle: {
                  backgroundColor: "white",
                },
              }}
            />
            <Stack.Screen
              name="about"
              options={{ headerTitle: "About", presentation: "modal" }}
            />
            <Stack.Screen
            
              name="screen/orderDetails/OrderDetails"
              options={{
                title: i18n.t("Order_Details"),
                headerStyle: {
                  backgroundColor: "#DF2B2A",
                },
                headerTitleStyle: {
                  color: "#fff",
                },
                headerLeft: () => (
                  <Ionicons
                    name={backIcon}
                    size={25}
                    color="#fff"
                    // onPress={() => router.push("/(drawer)/(tabs)/history")}
                    // onPress={()=>router.push("/(drawer)/(tabs)/history")}
                    onPress={()=>router.back()}
                  />
                ),
              }}
            />
            <Stack.Screen
              name="screen/productDetails/ProductDetails"
              options={{
                title: "Product Details",
                headerLeft: () => (
                  <Ionicons
                    name={backIcon}
                    size={25}
                    color="#fff"
                    onPress={() => router.back()}
                  />
                ),
                // headerRight: () => <Mycart />,
                // headerRightContainerStyle: {
                //   marginEnd: 5,
                //   padding: 5,
                //   cursor: "pointer",
                // },
              }}
            />
            <Stack.Screen
              name="screen/cart/Cart"
              options={{
                title: i18n.t("Cart"),
                headerLeft: () => (
                  <Ionicons
                    name={backIcon}
                    size={25}
                    color="#fff"
                    onPress={() => router.back()}
                  />
                ),
              }}
            />
            <Stack.Screen
              name="screen/uploadScreen/UploadScreen"
              options={{
                title: i18n.t("Payment"),
                headerStyle: {
                  backgroundColor: "#DF2B2A",
                  color: "#fff",
                },
                headerTitleStyle: {
                  color: "#fff",
                },
                headerLeft: () => (
                  <Ionicons
                    name={backIcon}
                    size={25}
                    color="#fff"
                    onPress={() => router.back()}
                  />
                ),
              }}
            />
            <Stack.Screen
              name="screen/activeScreen/ActiveScreen"
              options={{
                title: i18n.t("Active_Order"),
                headerStyle: {
                  backgroundColor: "#DF2B2A",
                  color: "#fff",
                },
                headerTitleStyle: {
                  color: "#fff",
                },
                headerLeft: () => (
                  <Ionicons
                    name={backIcon}
                    size={25}
                    color="#fff"
                    onPress={() => router.push("/(drawer)/(tabs)/home")}
                  />
                ),
              }}
            />
             <Stack.Screen
              name="screen/policy/PrivatePolicy"
              options={{
                title: i18n.t("P_policy"),
                headerStyle: {
                  backgroundColor: "#DF2B2A",
                  color: "#fff",
                },
                headerTitleStyle: {
                  color: "#fff",
                },
                headerLeft: () => (
                  <Ionicons
                    name={backIcon}
                    size={25}
                    color="#fff"
                    onPress={() => router.push("/(drawer)/settings")}
                  />
                ),
              }}
            />
             <Stack.Screen
              name="screen/services/Services"
              options={{
                title: i18n.t("T_A_S"),
                headerStyle: {
                  backgroundColor: "#DF2B2A",
                  color: "#fff",
                },
                headerTitleStyle: {
                  color: "#fff",
                },
                headerLeft: () => (
                  <Ionicons
                    name={backIcon}
                    size={25}
                    color="#fff"
                    onPress={() => router.push("/(drawer)/settings")}
                  />
                ),
              }}
            />
             <Stack.Screen
              name="screen/support/Support"
              options={{
                title: i18n.t("C_S"),
                headerStyle: {
                  backgroundColor: "#DF2B2A",
                  color: "#fff",
                },
                headerTitleStyle: {
                  color: "#fff",
                },
                headerLeft: () => (
                  <Ionicons
                    name={backIcon}
                    size={25}
                    color="#fff"
                    onPress={() => router.push("/(drawer)/settings")}
                  />
                ),
              }}
            />
            <Stack.Screen
              name="screen/varify/Varify"
              options={{
                title: " OTP",
                headerStyle: {
                  backgroundColor: "#DF2B2A",
                  color: "#fff",
                },
                headerTitleStyle: {
                  color: "#fff",
                },
                headerLeft: () => (
                  <Ionicons
                    name={backIcon}
                    size={25}
                    color="#fff"
                    onPress={() => router.push("screen/loginScreen/LoginScreen")}
                  />
                ),
              }}
            />
            <Stack.Screen name="blog/index" options={{ headerTitle: "Blog" }} />
            <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
          </Stack>
  )
}