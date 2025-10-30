import { useSelector } from "react-redux";
import { StyleSheet, View } from "react-native";
import { Redirect } from "expo-router";

import i18n from "./utils/libs/localization/Localization";
import * as Font from 'expo-font';

// import *  from '../assets/fonts/HindSiliguri'

export default function Page() {
  const isLogin = useSelector((state)=>state.loginReducer.login)
  // const [fontsLoaded] = Font.useFonts({
  //   'HindSiliguri-Regular': require('../assets/fonts/HindSiliguri-Regular.ttf'),
  // });

  // if (!fontsLoaded) {
  //   return null ;
  // }
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        {!isLogin ? (
          <Redirect href="screen/loginScreen/LoginScreen" />
        ) : (
            <Redirect href="/(tabs)/home" />
          // <Redirect href="screen/orderDetails/OrderDetails" />

        )}
                   {/* <Redirect href="/(drawer)/aboutus" /> */}
        {/* <Redirect href="/(tabs)/home" /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  main: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: "auto",
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 14,
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
