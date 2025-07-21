import { useSelector } from "react-redux";
import { StyleSheet, View } from "react-native";
import { Redirect } from "expo-router";

export default function Page() {
  const isLogin = useSelector((state)=>state.loginReducer.login)
  console.log(isLogin)
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        {!isLogin ? (
          <Redirect href="screen/loginScreen/LoginScreen" />
        ) : (
           <Redirect href="/(tabs)/home" />

        )}
                   {/* <Redirect href="/(tabs)/cart" /> */}
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
