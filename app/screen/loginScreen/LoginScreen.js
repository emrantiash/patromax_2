import { View, StyleSheet, Dimensions } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn, setLanguage, getLogin, testPost } from "../../redux/slices/loginSlice";
import InputBox from "../../component/input/Input";
import ButtonBox from "../../component/button/Button";
import ImageItem from "../../component/image/ImageItem";
import { Redirect } from "expo-router";
import {
  UnlockIcon,
  Text,
  useToast,
  Toast,
  ToastTitle,
  ToastDescription,
} from "@gluestack-ui/themed";
import { router, Link } from "expo-router";
import PSpinner from "../../component/spinner/Spinner";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function LoginScreen() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [object, setObject] = useState({
    email: "",
    password: "",
  });
  const toast = useToast();
  const [toastId, setToastId] = useState(0);

  const handleToast = () => {
    if (!toast.isActive(toastId)) {
      showNewToast();
    }
  };
  const showNewToast = () => {
    const newId = Math.random();
    setToastId(newId);
    toast.show({
      id: newId,
      placement : "top",
      duration: 2000,
      containerStyle: {
        backgroundColor : 'transoparent',
        // color: "red",
      },
      render: ({ id }) => {
        const uniqueToastId = "toast-" + id;
        return (
          <Toast nativeID={uniqueToastId} action="muted" variant="solid" >
          <ToastTitle></ToastTitle>
          <ToastDescription>
           Wrong Email or Password
          </ToastDescription>
        </Toast>
        )
        
      },
    });
  };

  const setInputValue = (a, e) => {
    const name = a;
    const value = e;
    // console.log(name, value);
    setObject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // console.log(object);

  const buttonClicked = () => {
    if(object.email == "") {
      handleToast()
    }
    else {
      setIsLoading(true);
      dispatch(setLanguage(0));
      const option = {
        usr: object.email,
        pwd: object.password,
      };
      
      dispatch(getLogin(option)).then(function(e){
        setIsLoading(false);
        console.log("=======",e.payload.message)
       e.payload.message == "Logged In" ?
       router.push('/(tabs)/home')
       :
      ( console.log("hello") ,handleToast())  
      })
    }
    
   
   
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageBox}>
        <ImageItem
          // src={require('../../../assets/images/logo/petromax.png')}
          src="https://petromax-test.s3.ap-south-1.amazonaws.com/petromax.png"
          size="lg"
        />
      </View>
      <View style={styles.inBetween}>
        <InputBox
          isLabel
          label="Email"
          //  variant="rounded"
          //  size="2xl"
          height={(height * 6) / 100}
          placeholder={"Enter Email"}
          name="email"
          setInputValue={setInputValue}
        />
      </View>
      <View style={styles.inBetween}>
        <InputBox
          isLabel
          label="Password"
          // variant="rounded"
          height={(height * 6) / 100}
          placeholder={"Enter Password"}
          isPasswordField
          name="password"
          setInputValue={setInputValue}
        />
      </View>
      <View style={styles.rememberTab}>
        <Text>Remember me</Text>
        <Text>Forget Password</Text>
      </View>
      <View style={styles.inBetween}>
        <ButtonBox
          variant="solid"
          text="Log In"
          size="lg"
          action={"negative"}
          borderRadius={8}
          onClick={buttonClicked}
          icon={UnlockIcon}
          fontColor="white"
          // width = {'90%'}
        />
      </View>
      <View style={styles.signupText}>
        <Text size="xs" style={styles.textDown}>
          Don't have an Account?{" "}
        </Text>
        <Text size="xs" bold>
          <Link href="screen/signupScreen/SignupScreen">Sign Up</Link>
        </Text>
      </View>
      {isLoading && <PSpinner />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: "#fff",
  },
  imageBox: {
    marginVertical: (height * 10) / 100,
  },
  inBetween: {
    // backgroundColor : 'red',
    marginVertical: 10,
    marginHorizontal: 10,
  },
  rememberTab: {
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    // flex : 1
  },
  signupText: {
    flexDirection: "row",
    // backgroundColor : 'red',
    justifyContent: "center",
    alignItems: "center",
  },
});
