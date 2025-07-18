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
  makeCompareZero,
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
} from "@gluestack-ui/themed";
import { storeOrder, activeOrder } from "../../../redux/slices/orderSlice";
import { storeProduct } from "../../../redux/slices/productSlice";
import ImageItem from "../../../component/image/ImageItem";
import ButtonBox from "../../../component/button/Button";
import InputBox from "../../../component/input/Input";
import { Redirect, router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { getMyCart } from "../../../redux/slices/cartSlice";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
import _data from "../home/data";
import { getLocales } from "expo-localization";
import { i18n } from "../../../utils/libs/localization/Localization";

export default function index() {
  const dispatch = useDispatch();
  const _language = useSelector((state) => state.loginReducer.language);
  const _mydata = useSelector((state) => state.cartReducer.data);
  const compare = useSelector((state) => state.cartReducer.compare);
  const [data, setData] = useState(
    useSelector((state) => state.cartReducer.data)
  ); //useState(_data);
  const [myData, setMyData] = useState([]);
  const [total, setTotal] = useState(0.0);

  console.log("===compare data is ====" + JSON.stringify(compare));

  i18n.locale = getLocales()[_language].languageCode;

  useEffect(() => {
    data == undefined && dispatch(getMyCart());
  }, [data == undefined]);

  useEffect(() => {
    _mydata.map((__data, index) => {
      console.log(__data.id);
      if (__data.id == compare?.id) {
        const item = __data;
        const updatedItem = {
          ...compare,
          quantity: parseInt(compare.quantity) + parseInt(__data.quantity),
          price: parseInt(compare.basePrice) * parseInt(compare.quantity),
        };

        // console.log("==updated item=="+JSON.stringify(updatedItem))
        const newState = [..._mydata];

        newState.splice(_mydata.indexOf(item), 1, updatedItem);
        // console.log("==" + JSON.stringify(newState));
        setData(newState);
      }
    });
  }, [compare]);

  // console.log("database"+JSON.stringify(data))

  // useEffect(() => {
  //   <Redirect href="screen/cart/Cart" />;
  // });

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
    // setData(data);
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
    // setData()
    console.log(item);
    dispatch(storeProduct(item));
    router.push("screen/productDetails/ProductDetails");
  };

  return (
    <>
      <View style={styles.container}>
        <FlatList
          ListEmptyComponent={renderNoStateMessage}
          data={data}
          renderItem={({ item }) => (
            <Card style={styles.mycart}>
              <LinearGradient
                colors={["#f9f9f9", "#fff"]}
                start={{ x: 0.2, y: 0.8 }}
                end={{ x: 0.2, y: 0.4 }}
                style={styles.background}
              >
                <View style={styles.header}>
                  <View style={styles.leftSide}>
                    <TouchableOpacity
                      style={styles.image}
                      onPress={() => itemSelected(item)}
                    >
                      <ImageItem src={item?.image} size="lg" borderWidth={0} />
                    </TouchableOpacity>

                    {/* <View>
                      <Text size="md" style={styles.spacing}>
                        {item?.name}
                      </Text>
                      <Text size="sm">Capacity : {item?.capacity}</Text>
                      <Text size="sm">${item?.basePrice}</Text>
                    </View> */}
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
                      <ButtonBox
                        isIcon={true}
                        text=""
                        action="default"
                        width={(width * 10) / 100}
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
                      />
                    </View>
                  </View>
                </View>
              </LinearGradient>
            </Card>
          )}
          keyExtractor={(item) => item?.id}
          ListFooterComponent={() => <Text></Text>}
        />
      </View>
      <View>
        <Card>
          <View style={styles.summery}>
            <Text size="md" style={styles.total}>
              {i18n.t("Total")} : Tk: {total}
            </Text>
            <View>
              <ButtonBox
                action="negative"
                text={i18n.t("Proceed")}
                width={(width * 35) / 100}
                borderRadius={10}
                onClick={confirmedCalled}
                fontColor={"#fff"}
              />
            </View>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <ButtonBox
              variant={"outline"}
              action="secondary"
              text="Proceed without payment"
              width={(width * 80) / 100}
              borderRadius={10}
              onClick={withoutPayment}
              fontColor={"green"}
            />
          </View>
        </Card>
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
    borderColor: "#e8f7f1",
  },
  mycart: {
    marginVertical: 5,
    marginHorizontal: 10,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "#fff",
  },
  header: {
    width: "100%",
    // backgroundColor : 'red',
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
