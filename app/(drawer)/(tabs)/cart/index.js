import {
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  RefreshControl
} from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  storeData,
  storeTotal,
  storeDue,
} from "../../../redux/slices/cartSlice";
import {
  Card,
  Text,
  AddIcon,
  RemoveIcon
} from "@gluestack-ui/themed";
import { storeOrder, activeOrder } from "../../../redux/slices/orderSlice";
import { storeProduct,getWareHouse,storeWareHouse } from "../../../redux/slices/productSlice";
import ImageItem from "../../../component/image/ImageItem";
import ButtonBox from "../../../component/button/Button";
import InputBox from "../../../component/input/Input";
import SelectBox from "../../../component/select/SelectBox";
import { Redirect, router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { getMyCart } from "../../../redux/slices/cartSlice";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
import _data from "../home/data";
import { getLocales } from "expo-localization";
import { i18n } from "../../../utils/libs/localization/Localization";
import useConfig from "../../../lib/hook/config";

export default function index() {
  const config = useConfig()
  const dispatch = useDispatch();
  const _mydata = useSelector((state) => state.cartReducer.data);
  const compare = useSelector((state) => state.cartReducer.compare);
  const [warehouse,setWarehouse] = useState([]) //useSelector((state) => state.productReducer.warehouse);
  const [data, setData] = useState(useSelector((state) => state.cartReducer.data)); //useState(_data);//useState(_data); //
  const [myData, setMyData] = useState([]);
  const [total, setTotal] = useState(0.0);
  const [thisWarehouse,setThisWarehouse] = useState("")
  const [refreshing, setRefreshing] = useState(false);

  i18n.locale = config[5] === 0 ? 'en' : 'bn'

  // console.log("=========++================="+JSON.stringify(_mydata))

  const onRefresh = async () => {
    setRefreshing(true);
    makeTheCall();
    setRefreshing(false);
  };

  useEffect(() => {

   makeTheCall()
  }, []);

  const makeTheCall = () =>{
    dispatch(getWareHouse()).then(function(e){
      setWarehouse(makeMyWarehouseCompitable(e.payload.message.warehouses))
      })

      dispatch(getMyCart()).then(function(e){
        setData(e.payload.message)
      })
  }

  function  makeMyWarehouseCompitable(data){
    let arr = [];
    data.map((data, index) =>
      arr.push({
        name : data.warehouse,
        value : data.warehouse
      }),
    );
    return arr;
  }


  useEffect(() => {
    _mydata?.map((__data, index) => {
      if (__data.id == compare?.id) {
        const item = __data;
        const updatedItem = {
          ...compare,
          quantity: parseInt(compare.quantity) + parseInt(__data.quantity),
          price: parseInt(compare.basePrice) * parseInt(compare.quantity),
        };
        const newState = [..._mydata];

        newState.splice(_mydata.indexOf(item), 1, updatedItem);
        setData(newState);
      }
    });
  }, [compare]);

  useEffect(() => {
    let total = 0.0;
    data?.map((item) => {
      total = item.quantity > 0 ? total + parseFloat(item?.price) : total;
    });
    setTotal(total);

  }, [data]);

  const _deleteItem = (action) => {
    setData(data.filter((item) => item?.id !== action.id));
  };

  const positiveCalled = (thisItem) => {
    const item = data.find((x) => x.id === thisItem.id);
    const updatedItem = {
      ...thisItem,
      quantity: parseInt(thisItem.quantity) + 1,
      price:
        parseInt(thisItem.after_discount) * (parseInt(thisItem.quantity) + 1),
    };
    const newState = [...data];

    newState.splice(data.indexOf(item), 1, updatedItem);
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
        price:
          parseInt(thisItem.after_discount) * (parseInt(thisItem.quantity) - 1),
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
    dispatch(storeDue(total));
  };

  const confirmedCalled = () => {
    _storeJob();
    const originalArray = data;
    const newArray = originalArray.filter((item) => item.quantity > 0);
    thisWarehouse == ""  ? 
    alert("Select WareHouse")  :
    newArray.length > 0 && 
    router.push("screen/uploadScreen/UploadScreen");
  };

  const withoutPayment = () => {
   if( thisWarehouse == "")
   alert("Select WareHouse")
  else{
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
    const __mydate = year + "-" + month + "-" + date;
    const _data = {

      date: currTime + "," + day + "," + date + "/" + month + "/" + year,
      date_use: __mydate,
      time: currTime,
      items: newArray,
      deposit: 0,
      status: "Not paid",
      subtotal: subtotal,
      tax: tax,
      paid_amount: 0,
      total: subtotal + tax,
      page_status: 0,
      is_previous: false,
      warehouse : thisWarehouse
    };



    dispatch(storeOrder(_data));
    router.push("screen/orderDetails/OrderDetails");
  }
    
  };

  const itemSelected = (item) => {
    dispatch(storeProduct(item));
    router.push("screen/productDetails/ProductDetails");
  };

  const setInputValue = (a, e) => {
    const thisItem = a;
    const value = e ? e : 0;
    const item = data.find((x) => x.id === thisItem.id);
    const updatedItem = {
      ...thisItem,
      quantity: value && value.replace(/^[0]*/, ""),
      price: parseInt(thisItem.after_discount) * parseInt(value),
    };
    const newState = [...data];

    newState.splice(data.indexOf(item), 1, updatedItem);
    setData(newState);
  };

  const selectedValue = (val) =>{
    // console.log(val)
    setThisWarehouse(val)
    dispatch(storeWareHouse(val))
  }



  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          marginTop: (height * 2) / 100,
        }}
      >
        <Card variant="ghost" style={{

        }}>
          <SelectBox 
          // borderColor={"#FFC0CB"}
          height={(height*5)/100}
          placeholder ="Select WareHouse"
          data={warehouse}
          selectedValue ={selectedValue}
          />
        </Card>
        <FlatList
          removeClippedSubviews={false}
          ListEmptyComponent={renderNoStateMessage}
        //       ListHeaderComponent = {() => (
        //     //  <Text style={styles.text}>{i18n.t('Active')} {i18n.t('Orders')}</Text>
        //     <Card variant="ghost" style={{

        //     }}>
        //       <SelectBox 
        //       // borderColor={"#FFC0CB"}
        //       height={(height*5)/100}
        //       placeholder ="Select WareHouse"
        //       data={warehouse}
        //       selectedValue ={selectedValue}
        //       defaultValue={thisWarehouse}
        //       />
        //     </Card>
        //  )}
          data={data || _data}
          renderItem={({ item }) => (
            <Card variant="ghost" style={styles.mycart}>
              <LinearGradient
                colors={["#fff", "#fff"]}
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
                  </View>
                  <View style={styles.rightSide}>
                    <View
                      style={{
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text size="md" style={styles.spacing} bold>
                        {item?.name}
                      </Text>
                      <Text size="xs">{item?.capacity} ({item?.productType})</Text>
                      <Text size="lg" color="green" bold>
                        Tk:{item?.after_discount}
                      </Text>
                    </View>

                    <View
                      style={{
                        //  marginVertical: 3,
                        // flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        // backgroundColor: "red",
                      }}
                    >
                      <View
                        style={{
                          marginLeft: -10,
                          flexDirection: "row",
                          marginTop: 8,
                        }}
                      >
                        <ButtonBox
                          isIcon={true}
                          text=""
                          action="default"
                          variant="link"
                          width={(width * 14) / 100}
                          size="xs"
                          icon={RemoveIcon}
                          onClick={() => negetiveCalled(item)}
                          color="green"
                        />

                        <InputBox
                          name={item}
                          size={"xl"}
                          isnumber={true}
                          width={(width * 15) / 100}
                          height={(height * 4) / 100}
                          value={item?.quantity?.toString() || 0}
                          fontSize={12}
                          color="green"
                          setInputValue={setInputValue}
                          borderRadius={4}
                          textAlign="center"
                        />

                        <ButtonBox
                          isIcon={true}
                          text=""
                          action="default"
                          width={(width * 14) / 100}
                          size="xs"
                          icon={AddIcon}
                          onClick={() => positiveCalled(item)}
                          color="green"
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </LinearGradient>
            </Card>
          )}
          keyExtractor={(item) => item?.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListFooterComponent={() => <Text></Text>}
        />
      </View>
      <View
        style={{
          backgroundColor: "#fff",
        }}
      >
        <Card
          variant="ghost"
          style={{
            backgroundColor: "#fff",

            // width: "100%",
          }}
        >
          <View style={styles.summery}>
            <Text size="md" style={styles.total}>
              {i18n.t("Total")} :
            </Text>
            <Text>Tk {total}</Text>
           
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              // height : 90
            }}
          >
            <ButtonBox
              variant={"outline"}
              action="secondary"
              text={i18n.t("Proceed_without_payment")}
              width={(width * 45) / 100}
              borderRadius={10}
              onClick={withoutPayment}
              fontColor={"#2f2f2f"}
            />
            <ButtonBox
              action="negative"
              text={i18n.t("Proceed")}
              width={(width * 40) / 100}
              borderRadius={10}
              onClick={confirmedCalled}
              fontColor={"#fff"}
            />
          </View>
        </Card>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
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
    padding: (height * 0.5) / 100,
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
    width: "30%",
  },
  rightSide: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor : 'yellow',
    // flexDirection: "column",
    // justifyContent: "space-between",
    // alignItems: "flex-start",
  },
  summery: {
    // height: 50,
    marginVertical: (height * 3) / 100,
    marginHorizontal: (width * 3) / 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
