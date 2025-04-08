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
  storeTotal
} from "../../../redux/slices/cartSlice";
import {
  Card,
  Text,
  AddIcon,
  TrashIcon,
  RemoveIcon,
  Repeat1Icon,
  Icon,
  EyeIcon
} from "@gluestack-ui/themed";
import ImageItem from "../../../component/image/ImageItem";
import ButtonBox from "../../../component/button/Button";
import InputBox from "../../../component/input/Input";
import { Redirect,router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
import { _data } from "../home/data";
import { getLocales } from 'expo-localization';
import { i18n } from "../../../utils/libs/localization/Localization";


export default function index() {
  const dispatch = useDispatch();
  const _language = useSelector((state)=>state.loginReducer.language) ;
  // const [data, setData] = useState(useSelector((state) => state.cartReducer.data));
  const [data, setData] = useState(_data); 
  const [myData,setMyData] = useState([])
  const [total, setTotal] = useState(0.0);

  i18n.locale = getLocales()[_language].languageCode

  // console.log(i18n.t('Total'));

  useEffect(() => {
    <Redirect href="screen/cart/Cart" />;
  });

  useEffect(() => {
    let total = 0.0;
    data?.map((item) => {
      total = ((item.quantity) > 0 ) ? total + parseFloat(item?.price) : total 
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
    console.log("=="+JSON.stringify(newState))
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

  const confirmedCalled = () => {
    setMyData([])
    data?.map((item) => {
      item.quantity > 0 &&
      setMyData(oldArray => [...oldArray,item] );
    });
    dispatch(storeTotal(total))
    router.push('screen/uploadScreen/UploadScreen')
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
                    <View style={styles.image}>
                      <ImageItem src={item?.image} size="lg" borderWidth={0} />
                    </View>

                    {/* <View>
                      <Text size="md" style={styles.spacing}>
                        {item?.name}
                      </Text>
                      <Text size="sm">Capacity : {item?.capacity}</Text>
                      <Text size="sm">${item?.basePrice}</Text>
                    </View> */}
                  </View>
                  <View style={styles.rightSide}>
                  <View >
                      <Text size="xs" style={styles.spacing}>
                        {item?.name}
                      </Text>
                      <Text size="2xs">Capacity : {item?.capacity}</Text>
                      <Text size="xl" color="green" bold>${item?.basePrice}</Text>
                    </View>
                   
                    <View
                      style={{
                        marginVertical : 10,
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
                        width={(width * 5) / 100}
                        size="xs"
                        icon={RemoveIcon}
                        onClick={() => negetiveCalled(item)}
                        color = "green"
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
                        color = "green"
                      />
                    </View>
                  </View>
                </View>
              </LinearGradient>
            </Card>
          )}
          keyExtractor={(item) => item?.id}
          ListFooterComponent={() => (
            <Text></Text>
          )}
        />
      </View>
      <View>
        <Card style={styles.summery}>
          <Text size="md" style={styles.total}>
            {i18n.t('Total')} : ${total}
          </Text>
          <ButtonBox
            action="negative"
            text={i18n.t('Proceed')}
            width={(width * 35) / 100}
            borderRadius={10}
            onClick={confirmedCalled}
          />
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 400,
    height: 200,
  },
  docupload: {
    marginHorizontal: 20,
    marginTop: (height*10)/100,
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
    flexDirection : 'column',
    // backgroundColor : 'yellow',
    // flexDirection: "column",
    justifyContent: "space-between",
    // alignItems: "flex-end",
  },
  summery: {
    height: 100,
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
