import { View, StyleSheet, Dimensions, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  Text,
  PaperclipIcon,
  useToast,
  Toast,
  ToastTitle,
  ToastDescription,
  ExternalLinkIcon,
} from "@gluestack-ui/themed";
import ButtonBox from "../../component/button/Button";
import SelectBox from "../../component/select/SelectBox";
import InputBox from "../../component/input/Input";
import * as ImagePicker from "expo-image-picker";
import { i18n } from "../../utils/libs/localization/Localization";
import { getLocales } from "expo-localization";
import { router, Link } from "expo-router";
import { storeOrder, activeOrder } from "../../redux/slices/orderSlice";
import { storeImage } from "../../redux/slices/cartSlice";
import useConfig from "../../lib/hook/config";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const payment_method =[
  {
    id :1 ,
    value : "Wire Transfer",
    name : "Wire Transfer"
  }
]

const bank_account = [
  {
    id : 1 ,
    name : "BRAC Bank",
    value : "BRAC Bank"
  },
  {
    id : 1 ,
    name : "DBBL",
    value : "DBBL"
  },
  {
    id : 1 ,
    name : "Bank Asia",
    value : "Bank Asia"
  },

]

export default function UploadScreen() {
  const dispatch = useDispatch();
  const config = useConfig();
  const toast = useToast();
  const [toastId, setToastId] = useState(0);
  const total = useSelector((state) => state.cartReducer.total);
  const due = useSelector((state) => state.cartReducer.due);
  const data = useSelector((state) => state.cartReducer);
  const [depositValue,setDepositValue] = useState("");
  const [bank,setBank] = useState("")

  // console.log(data.data)
  const _language = useSelector((state) => state.loginReducer.language);
  const [selectedImage, setSelectedImage] = useState([]);

  const [paid_amount, setPaid_amount] = useState(total);
  const [mydate,setMydate] = useState("")

  const [image, setImage] = useState("");
  const [createObjectURL, setCreateObjectURL] = useState("");

  useEffect(()=>{
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    const __mydate = year+"-"+month+"-"+date 
    setMydate(__mydate)
  },[])

  i18n.locale = getLocales()[_language].languageCode;

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {

      setSelectedImage((prevImages) => [...prevImages, result.assets[0].uri]);
      const body = new FormData();

    } else {
      alert("You did not select any image.");
    }
  };

  // const _image = "require('+ selectedImage + ')";
  // console.log(selectedImage)

  const setInputValue = (name, text) => {
    setPaid_amount(text);
  };

  const makeTheCall = () => {
    if(depositValue !== "" && bank !==""){
      let newDate = new Date();
      let date = newDate.getDate();
      let month = newDate.getMonth() + 1;
      let year = newDate.getFullYear();
      let _date = newDate;
      let day = _date.toLocaleString("en-us", { weekday: "long" });
      const currTime = newDate.toLocaleTimeString();
  
      const originalArray = data.data;
      const newArray = originalArray.filter((item) => item.quantity > 0);
      let subtotal = 0;
      let tax = 0;
      newArray.map((data) => {
        subtotal = subtotal + data.price;
      });
  
      tax =  0//Math.round((subtotal * 15) / 100);
  
      const _data = {
        date: currTime + "," + day + "," + date + "/" + month + "/" + year,
        date_use : mydate,
        time : currTime ,
        // id: 100,
        items: newArray,
        deposit : depositValue,
        // order: "#113D34CAG",
        status: parseFloat(total) == parseFloat(paid_amount) ?  "Paid" : "Prtly Paid",
        subtotal: subtotal,
        tax: tax,
        paid_amount : paid_amount,
        total: subtotal + tax,
        page_status : 0
      };
      //
      // let active = [
      //   {
      //     id: 1,
      //     order: "#113D34C",
      //     subtotal: subtotal,
      //     tax: tax,
      //     total: subtotal + tax,
      //     status: parseFloat(total) == parseFloat(paid_amount) ?  "Paid" : "Prtly Paid",
      //     date: currTime + "," + day + "," + date + "/" + month + "/" + year,
      //     items: newArray,
      //   },
      // ];
  
      // // temporary
      // dispatch(activeOrder(active));
      //
      dispatch(storeOrder(_data));
      dispatch(storeImage(selectedImage[0]))
      router.push("screen/orderDetails/OrderDetails");
    }
    else{
      alert("All fields must be filled")
    }
    
  };

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
      placement: "top",
      duration: 2000,
      containerStyle: {
        backgroundColor: "transoparent",
        // color: "red",
      },
      render: ({ id }) => {
        const uniqueToastId = "toast-" + id;
        return (
          <Toast nativeID={uniqueToastId} action="muted" variant="solid">
            <ToastTitle></ToastTitle>
            <ToastDescription>{data}</ToastDescription>
          </Toast>
        );
      },
    });
  };

  const selectedValue = (a,e)=>{
    setBank(e)
    console.log("==")
  }

  const setDepositVal= (a,e)=>{
      console.log(e)
      setDepositValue(e)
  }

  // console.log(selectedImage)

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.rootCard}>
          <View style={styles.containerCard}>
            <Card style={styles.imageCard}>
            {
              selectedImage.length == 0 &&
              <Text>{i18n.t("Image")} : </Text>
            }
              
              {selectedImage.length >0  && (
                selectedImage.map((data,index)=>(
                  <Image key={index} source={{ uri: data }} style={styles.image} />
                )
                )
                
              )}

              {/* <Text>Size</Text> */}
            </Card>
            <ButtonBox
              width={(width * 90) / 100}
              action="secondary"
              size="lg"
              isIcon={true}
              iconsize={"sm"}
              icon={PaperclipIcon}
              text={i18n.t("Add_Attachment")}
              borderRadius={10}
              color={"#fff"}
              onClick={pickImageAsync}
              fontColor={"#fff"}
            />
          </View>
          <View style={styles.bankInfo}>
            {/* <Text size="lg">Payment Information</Text> */}
          </View>
          <View style={styles.body}>
            {/* <Text size="sm">Payment Amount</Text> */}
            <InputBox
            isLabel={true}
            labelSize={"sm"}
            label={"Payment Amount"}
              borderRadius={8}
              value={paid_amount.toString()}
              setInputValue={setInputValue}
              height={45}
            />
          </View>
          <View style={styles.body}>
            <Text size="sm">Payment Method</Text>
            <SelectBox 
            // placeholder={i18n.t("Select_Option")} 
            // placeholder={"Ware Transfer"}
            defaultValue="Ware Transfer"
            height={40} 
            data={payment_method}
            selectedValue={selectedValue}
            />
          </View>
          <View style={styles.body}>
            <Text size="sm">{i18n.t("Bank_Account")}</Text>
            <SelectBox placeholder={i18n.t("Select_Option")} height={40} 
            data={bank_account}
            selectedValue={selectedValue}
            />
          </View>
          <View style={styles.body}>
            <InputBox 
            name="deposit"
            isLabel={true}
            labelSize={"sm"}
            label={"Deposit Reference"}
            borderRadius={8}
            height={50}
            setInputValue={setDepositVal}
            />
            {/* setInputValue={setInputValue} */}
          </View>

          
        </View>
      </ScrollView>

      <View>
        <Card style={styles.summery}>
          <Text size="lg" style={styles.total}>
            {i18n.t("Total")} Tk : {total}
          </Text>
          <ButtonBox
            action="negative"
            text={i18n.t("Continue")}
            width={(width * 35) / 100}
            borderRadius={10}
            onClick={makeTheCall}
            // onClick={save}
            fontColor={"#fff"}
          />
        </Card>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  rootCard: {
    marginHorizontal: (width * 6) / 100,
  },
  containerCard: {
    height: 'auto',
    marginVertical: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  imageCard: {
    width: (width * 70) / 100,
    flexDirection: "column",
    justifyContent: "space-between",
    height : 'auto',
    alignItems : 'center'
  },
  bankInfo: {
    marginVertical: 10,
  },
  body: {
    marginVertical: 10,
    height: 80,
    // backgroundColor : 'red',
    justifyContent: "space-between",
  },
  summery: {
    height: (height*10)/100,
    flexDirection: "row",
    justifyContent: "space-around",
    // alignItems: "center",
  },
  total: {
    // fontSize : 19,
    letterSpacing: 1.5,
  },
  image: {
    width: '90%',
    height: 100,
    borderRadius: 8,
    marginVertical : 5
  },
});
