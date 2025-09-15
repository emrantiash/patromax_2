import { View, StyleSheet, Dimensions, KeyboardAvoidingView, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn, setLanguage, getOtp, testPost, setLanguageName ,signout, getLogin} from "../../redux/slices/loginSlice";
import InputBox from "../../component/input/Input";
import ButtonBox from "../../component/button/Button";
import ImageItem from "../../component/image/ImageItem";
import {
  UnlockIcon,
  Text,
  useToast,
  Toast,
  ToastTitle,
  ToastDescription,
} from "@gluestack-ui/themed";
import { getDashboard } from "../../redux/slices/historySlice";
import { router, Link } from "expo-router";
import PSpinner from "../../component/spinner/Spinner";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function LoginScreen() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const msg = useSelector((state)=>state.loginReducer.isError)
  const [object, setObject] = useState({
    email: "",
    password: "",
  });
  const toast = useToast();
  const [toastId, setToastId] = useState(0);

  // useEffect(()=>{
  //   dispatch(signout())
  // },[])

  const handleToast = (data) => {
    if (!toast.isActive(toastId)) {
      showNewToast(data);
    }
  };
  const showNewToast = (data) => {
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
           {data}
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
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(object.email == "" || object.password=="") {
      handleToast("Please Fill All Field")
    }
    else if(!regex.test(object.email)){
      handleToast("Invalid Email address")
    }
    
    else {
      setIsLoading(true);
      dispatch(setLanguage(0));
      // dispatch(setLanguageName("English"))
      const option = {
        usr: object.email,
        pwd: object.password,
      };


      // <--- without OTP ---->
      dispatch(getLogin(option)).then(function (e) {
        setIsLoading(false);
        if (e.payload?.message && e.payload?.message.message == "Logged In") {
          let option = {
            customer: e.payload.full_name,
          };
          dispatch(getDashboard(option));
          router.push("/(tabs)/home");
          // router.push("screen/varify/Varify")
        } else handleToast("Wrong INput");
      });


      // <--- OTP --->
      // dispatch(getOtp(option)).then(function(e){
      //   setIsLoading(false);
      //   console.log(e.payload)
      //  if(e.payload && e.payload?.message.message == "OTP sent") {
      //   router.push("screen/varify/Varify")
      //  }
       
      //  else
      //  {
      //   handleToast("Wrong UserName or Password")
      //  }
      
      // })
    }
    
   
   
  };
  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  >
      <View style={styles.imageBox}>
        <ImageItem
          // src={require('../../../assets/images/logo/petromax.png')}
          src="https://petromax-test.s3.ap-south-1.amazonaws.com/petromax.png"
          size="lg"
        />
      </View>
     {/* <Text size="sm">Error is : {msg}</Text>  */}
      <View style={styles.inBetween}>
        <InputBox
          isLabel
          label="Email"
          borderRadius={15}
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
          borderRadius={15}
          // variant="rounded"
          height={(height * 6) / 100}
          placeholder={"Enter Password"}
          isPasswordField
          name="password"
          setInputValue={setInputValue}
        />
      </View>
      <View style={styles.rememberTab}>
        {/* <Text>Remember me</Text>
        <Text>Forget Password</Text> */}
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
        {/* <Text size="xs" style={styles.textDown}>
          Don't have an Account?{" "}
        </Text>
        <Text size="xs" bold>
          <Link href="screen/signupScreen/SignupScreen">Sign Up</Link>
        </Text> */}
      </View>
      {isLoading && <PSpinner />}
    </KeyboardAvoidingView>
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
