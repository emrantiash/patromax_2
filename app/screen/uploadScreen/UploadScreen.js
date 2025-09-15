import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
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
} from "@gluestack-ui/themed";
import ButtonBox from "../../component/button/Button";
import SelectBox from "../../component/select/SelectBox";
import InputBox from "../../component/input/Input";
import * as ImagePicker from "expo-image-picker";
import { i18n } from "../../utils/libs/localization/Localization";
import { getLocales } from "expo-localization";
import { router } from "expo-router";
import { storeOrder, getBankName } from "../../redux/slices/orderSlice";
import { storeImage } from "../../redux/slices/cartSlice";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const payment_method = [
  {
    id: 1,
    value: "Bank Deposit",
    name: "Bank Deposit",
  },
];

export default function UploadScreen() {
  const dispatch = useDispatch();
  const toast = useToast();
  const [toastId, setToastId] = useState(0);
  const total = useSelector((state) => state.cartReducer.total);
  const data = useSelector((state) => state.cartReducer);
  const [depositValue, setDepositValue] = useState("");
  const [bank, setBank] = useState("");
  const _language = useSelector((state) => state.loginReducer.language);
  const [selectedImage, setSelectedImage] = useState([]);
  const [myaccount, setMyaccount] = useState("");
  const [paid_amount, setPaid_amount] = useState(total);
  const [mydate, setMydate] = useState("");

  const [image, setImage] = useState("");
  const [createObjectURL, setCreateObjectURL] = useState("");
  const [totalPaid, setTotalPaid] = useState(0);

  const bank_account = useSelector((state) => state.orderReducer.banks);
  const warehouse = useSelector(
    (state) => state.productReducer.selectedWareHouse
  );

  useEffect(() => {
    const option = {
      txt: "",
      doctype: "Bank Account",
      ignore_user_permissions: 0,
      reference_doctype: "Payment Entry",
      page_length: 10,
      filters: {
        is_company_account: 1,
        company: "Petromax",
      },
    };

    dispatch(getBankName(option));
  }, []);

  useEffect(() => {
    let paid = 0;
    if (data?.data?.payment_Entry) {
      data?.data?.payment_Entry?.map((data) => {
        paid = paid + data.amount;
      });
      setTotalPaid(paid);
      const currectDue = data.data.total - paid;
      setPaid_amount(currectDue);
    }
  }, [data?.data?.payment_Entry]);

  useEffect(() => {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    const __mydate = year + "-" + month + "-" + date;
    setMydate(__mydate);
  }, []);

  // console.log(paid_amount)

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
      // setSelectedImage((prevImages) => [...prevImages, result.assets[0].uri]);
      setSelectedImage([result.assets[0].uri]);
      const body = new FormData();
    } else {
      alert("You did not select any image.");
    }
  };

  const myaccounset = (name, text) => {
    setMyaccount(text);
  };
  const setInputValue = (name, text) => {
    setPaid_amount(text);
  };

  const makeTheCall = () => {
    const __payment = Number(totalPaid) + Number(paid_amount);
    if (Number(paid_amount) == 0) alert("O amount is not allowed");
    else if (isNaN(__payment)) alert("Amount is not number");
    else if (__payment > total) alert("Amount is too large");
    else if(myaccount== "") alert("Enter a/c");
    else {
      if (depositValue !== "" && bank !== "") {
        let newDate = new Date();
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        let _date = newDate;
        let day = _date.toLocaleString("en-us", { weekday: "long" });
        const currTime = newDate.toLocaleTimeString();

        const originalArray = data.data;
        const newArray = data.data.is_previous
          ? originalArray.items
          : originalArray.filter((item) => item.quantity > 0);
        let subtotal = data.data.is_previous ? data.data.total : 0;
        let tax = 0;
        !data.data.is_previous &&
          newArray.map((data) => {
            subtotal = subtotal + data.price;
          });

        tax = 0; //Math.round((subtotal * 15) / 100);

        const _data = {
          date: currTime + "," + day + "," + date + "/" + month + "/" + year,
          date_use: mydate,
          time: currTime,
          items: newArray,
          deposit: depositValue,
          status:
            parseFloat(total) == parseFloat(paid_amount)
              ? "Paid"
              : "Prtly Paid",
          subtotal: subtotal,
          tax: tax,
          paid_amount: paid_amount,
          total: subtotal + tax,
          page_status: 0,
          order: data.data?.order,
          payment_Entry: data.data?.payment_Entry,
          is_previous: false,
          bank: bank,
          myaccount: myaccount,
          warehouse: warehouse,
        };

        dispatch(storeOrder(_data));
        dispatch(storeImage(selectedImage[0]));
        router.push("screen/orderDetails/OrderDetails");
      } else {
        alert("All fields must be filled");
      }
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

  const selectedValue = (a) => {
    console.log(a);
    setBank(a);
  };

  const setDepositVal = (a, e) => {
    setDepositValue(e);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View style={styles.rootCard}>
          <View style={styles.containerCard}>
            <Card style={styles.imageCard}>
              {selectedImage.length == 0 && <Text>{i18n.t("Image")} : </Text>}

              {selectedImage.length > 0 &&
                selectedImage.map((data, index) => (
                  <Image
                    key={index}
                    source={{ uri: data }}
                    style={styles.image}
                  />
                ))}
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
          <View style={styles.bankInfo}></View>
          <View style={styles.body}>
            <InputBox
              isLabel={true}
              labelSize={"sm"}
              label={"Payment Account"}
              borderRadius={8}
              placeholder={"a/c"}
              setInputValue={myaccounset}
              height={45}
            />
          </View>
          <View style={styles.body}>
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
              defaultValue="Bank Deposit"
              height={40}
              data={payment_method}
              selectedValue={selectedValue}
            />
          </View>
          <View style={styles.body}>
            <InputBox
              name="deposit"
              placeholder={"Deposit reference"}
              isLabel={true}
              labelSize={"sm"}
              label={"Deposit Reference"}
              borderRadius={8}
              height={50}
              setInputValue={setDepositVal}
            />
          </View>
          <View style={styles.body}>
            <Text size="sm">{i18n.t("Bank_Account")}</Text>
            <SelectBox
              placeholder={i18n.t("Select_Option")}
              height={40}
              data={bank_account}
              selectedValue={selectedValue}
            />
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
            fontColor={"#fff"}
          />
        </Card>
      </View>
    </KeyboardAvoidingView>
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
    height: "auto",
    marginVertical: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  imageCard: {
    width: (width * 70) / 100,
    flexDirection: "column",
    justifyContent: "space-between",
    height: "auto",
    alignItems: "center",
  },
  bankInfo: {
    marginVertical: 10,
  },
  body: {
    marginVertical: 10,
    height: 80,
    justifyContent: "space-between",
  },
  summery: {
    height: (height * 10) / 100,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  total: {
    letterSpacing: 1.5,
  },
  image: {
    width: "90%",
    height: 100,
    borderRadius: 8,
    marginVertical: 5,
  },
});
