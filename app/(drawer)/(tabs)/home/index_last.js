import {
  ScrollView,
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItem,
  positiveSignCalled,
  negativeSignCalled,
  storeData,
  storeTotal,
} from "../../../redux/slices/cartSlice";
import {
  Card,
  Text,
  AddIcon,
  TrashIcon,
  RemoveIcon,
  Repeat1Icon,
  Icon,
  EyeIcon,
  Image,
} from "@gluestack-ui/themed";
import { storeProduct } from "../../../redux/slices/productSlice";
import { storeOrder, activeOrder } from "../../../redux/slices/orderSlice";
import ImageItem from "../../../component/image/ImageItem";
import ButtonBox from "../../../component/button/Button";
import InputBox from "../../../component/input/Input";
import { Redirect, router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
import _data from "../home/data";
import { getLocales } from "expo-localization";
import { i18n } from "../../../utils/libs/localization/Localization";
import Exclusive from "../../../pages/exclusive/Exclusive";

export default function index() {
  const dispatch = useDispatch();
  const _language = useSelector((state) => state.loginReducer.language);
  const _mydata = useSelector((state) => state.cartReducer.data);
  const [data, setData] = useState(_data);
  const [myData, setMyData] = useState([]);
  const [total, setTotal] = useState(0.0);
  const _image =
    "https://petromax-test.s3.ap-south-1.amazonaws.com/petromax-7-04062025.png";

  i18n.locale = getLocales()[_language].languageCode;

  // console.log(i18n.t('Total'));

  useEffect(() => {
    <Redirect href="screen/cart/Cart" />;
  });

  useEffect(() => {
    let total = 0.0;
    data?.map((item) => {
      total = item.quantity > 0 ? total + parseFloat(item?.price) : total;
    });
    setTotal(total);

    // setData();
  }, [data]);

  const _deleteItem = (action) => {
    setData(data.filter((item) => item?.id !== action.id));
  };

  const positiveCalled = (thisItem) => {
    const item = data.find((x) => x.id === thisItem.id);
    const updatedItem = {
      ...thisItem,
      quantity: parseInt(thisItem.quantity) + 1,
      price: parseInt(thisItem.basePrice) * (parseInt(thisItem.quantity) + 1),
    };
    const newState = [...data];

    newState.splice(data.indexOf(item), 1, updatedItem);
    // console.log("==" + JSON.stringify(newState));
    setData(newState);
  };

  useEffect(() => {
    dispatch(storeData(data));
    setData(data);
  }, [data]);

  const negetiveCalled = (thisItem) => {
    if (thisItem.quantity > 0) {
      const item = data.find((x) => x.id === thisItem.id);
      const updatedItem = {
        ...thisItem,
        quantity: parseInt(thisItem.quantity) - 1,
        price: parseInt(thisItem.basePrice) * (parseInt(thisItem.quantity) - 1),
      };
      const newState = [...data];
      newState.splice(data.indexOf(item), 1, updatedItem);
      setData(newState);
    }
  };
  const renderNoStateMessage = () => {
    <View>
      <Text>No Item Found</Text>
    </View>;
  };

  const _storeJob = () => {
    setMyData([]);
    data?.map((item) => {
      item.quantity > 0 && setMyData((oldArray) => [...oldArray, item]);
    });
    dispatch(storeTotal(total));
  };

  const confirmedCalled = () => {
    _storeJob();
    router.push("screen/uploadScreen/UploadScreen");
  };

  const withoutPayment = () => {
    _storeJob();
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let _date = newDate;
    let day = _date.toLocaleString("en-us", { weekday: "long" });
    const currTime = newDate.toLocaleTimeString();

    const originalArray = data;
    const newArray = originalArray.filter((item) => item.quantity > 0);
    let subtotal = 0;
    let tax = 0;
    newArray.map((data) => {
      subtotal = subtotal + data.price;
    });

    tax = Math.round((subtotal * 15) / 100);

    const _data = {
      date: currTime + "," + day + "," + date + "/" + month + "/" + year,
      id: 100,
      items: newArray,
      order: "#113D34CAG",
      status: "UnPaid",
      subtotal: subtotal,
      tax: tax,
      total: subtotal + tax,
    };

    // temporary
    let active = [
      {
        id: 1,
        order: "#113D34C",
        subtotal: subtotal,
        tax: tax,
        total: subtotal + tax,
        status: "Unpaid",
        date: currTime + "," + day + "," + date + "/" + month + "/" + year,
        items: newArray,
      },
    ];

    // temporary
    dispatch(activeOrder(active));
    dispatch(storeOrder(_data));
    router.push("screen/orderDetails/OrderDetails");
  };

  const itemSelected = (item) => {
    console.log("called");
    dispatch(storeProduct(item));
    router.push("screen/productDetails/ProductDetails");
  };

  return (
    <>
      <View style={styles.container}>
       {/* <Exclusive /> */}

        <FlatList
          ListEmptyComponent={renderNoStateMessage}
          ListHeaderComponent={()=><View
          style={{
            marginTop :  10 
          }}
          ><Exclusive /></View>}
         data={data}
          renderItem={({ item }) => (
            <Card style={styles.mycart}>
              <LinearGradient
                //   colors={["#f9f9f9", "#fff"]}
                colors={["#fff", "#fff"]}
                start={{ x: 0.2, y: 0.8 }}
                end={{ x: 0.2, y: 0.4 }}
                style={styles.background}
              >
                <TouchableOpacity
                  style={styles.header}
                  onPress={() => itemSelected(item)}
                >
                  <View style={styles.leftSide}>
                    <View style={styles.image}>
                      <ImageItem src={item?.image} size="lg" borderWidth={0} />
                    </View>
                  </View>
                  <View style={styles.rightSide}>
                    <View>
                      <Text size="xs" style={styles.spacing} bold>
                        {item?.name}
                      </Text>
                      <Text size="2xs">{item?.capacity}</Text>
                      <Text size="xl" color="green" bold>
                        Tk:{item?.basePrice}
                      </Text>
                    </View>

                    <View
                      style={{
                        marginVertical: 10,
                        width: "50%",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {/* <ButtonBox
                          isIcon={true}
                          text=""
                          action="default"
                          width={(width * 5) / 100}
                          size="xs"
                          icon={RemoveIcon}
                          onClick={() => negetiveCalled(item)}
                          color="green"
                        />
                        <InputBox
                          isReadOnly={true}
                          size="md"
                          isnumber={true}
                          width={30}
                          height={20}
                          value={item?.quantity?.toString()}
                          fontSize={10}
                          color="green"
                        />
                        <ButtonBox
                          isIcon={true}
                          text=""
                          action="default"
                          width={(width * 10) / 100}
                          size="xs"
                          icon={AddIcon}
                          onClick={() => positiveCalled(item)}
                          color="green"
                        /> */}
                    </View>
                  </View>
                </TouchableOpacity>
              </LinearGradient>
            </Card>
          )}
          keyExtractor={(item) => item?.id}
          ListFooterComponent={() => <Text></Text>}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
   
  },
  containerImage: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 400,
    height: 200,
  },
  docupload: {
    marginHorizontal: 20,
    marginTop: (height * 10) / 100,
  },

  background: {
    padding: 10,
    // alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: "#fff",
    borderColor: "#e8f7f1",
  },
  mycart: {
    marginTop : 10,
    marginVertical: 5,
    marginHorizontal: 10,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "#fff",
  },
  header: {
    width: "100%",
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    // backgroundColor : 'red',
    width: (width * 20) / 100,
    justifyContent: "center",
    // padding : 2
  },
  leftSide: {
    // backgroundColor : 'red',
    flexDirection: "row",
    justifyContent: "space-between",
    width: "40%",
  },
  rightSide: {
    flexDirection: "column",
    // backgroundColor : 'yellow',
    // flexDirection: "column",
    justifyContent: "space-between",
    // alignItems: "flex-end",
  },
  summery: {
    // height: 50,
    marginVertical: 30,
    flexDirection: "row",
    justifyContent: "space-around",
    // alignItems: "center",
  },
  total: {
    // fontSize : 19,
    letterSpacing: 1.5,
  },
  spacing: {
    letterSpacing: 0,
    // fontSize : 14
  },
});
