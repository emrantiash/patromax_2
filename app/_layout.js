import { GluestackUIProvider, Box } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View, Button, Platform } from "react-native";
import React from "react";
import { store } from "./redux/store";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { Stack, router } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import Mycart from "./component/mycart/Mycart";
// import { i18n } from "./utils/libs/localization/Localization";

let persistor = persistStore(store);
const _layout = () => {
  const backIcon = Platform.OS === "ios" ? "chevron-back" : "arrow-back-sharp";
  // const backIcon =  "chevron-back" ;
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <GluestackUIProvider config={config}>
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
                title: "Order Details",
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
                    onPress={()=>router.push("screen/activeScreen/ActiveScreen")}
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
                headerRight: () => <Mycart />,
                headerRightContainerStyle: {
                  marginEnd: 5,
                  padding: 5,
                  cursor: "pointer",
                },
              }}
            />
            <Stack.Screen
              name="screen/cart/Cart"
              options={{
                title: "Cart",
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
                title: " Payment",
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
                title: " Active Order",
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
            <Stack.Screen name="blog/index" options={{ headerTitle: "Blog" }} />
            <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
          </Stack>
        </GluestackUIProvider>
      </PersistGate>
    </Provider>
  );
};

export default _layout;

const styles = StyleSheet.create({});

//https://www.youtube.com/watch?v=ZG6GngLP3qo&list=PLQWFhX-gwJbluCKdCPVYnfwVJlBDVf9E-&index=2
//https://www.youtube.com/watch?v=6LGWYRcDLwY
