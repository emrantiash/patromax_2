import {
  ScrollView,
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageItem from "../../component/image/ImageItem";
import {
  addToCart,
  storeData,
  addToCompare,
} from "../../redux/slices/cartSlice";
import {
  Card,
  Text,
  Divider,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionTitleText,
  AccordionContentText,
  AccordionIcon,
  AccordionContent,
  ChevronUpIcon,
  ChevronDownIcon,
  AddIcon,
  Icon,
  EditIcon,
  RemoveIcon,
} from "@gluestack-ui/themed";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import ButtonBox from "../../component/button/Button";
import InputBox from "../../component/input/Input";
import { router } from "expo-router";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function ProductDetails() {
  const dispatch = useDispatch();
  const [data, setData] = useState(
    useSelector((state) => state.productReducer.data)
  );
  const [value, setValue] = useState("1");
  const [basePrice, setBasePrice] = useState(0);


  useEffect(() => {
    setBasePrice(data?.price);
  }, []);


  const positiveCalled = () => {
    if (parseInt(value) >= 1) {
      setValue(parseInt(value) + 1);
      setData({
        ...data,
        price:parseInt(data.after_discount) * (parseInt(value) + 1),
        basePrice: parseInt(data?.price) +  parseInt(data.after_discount) * (parseInt(value) + 1),
        quantity: parseInt(value) + 1,
      });
    }
  };

  const negetiveCalled = () => {
    if (parseInt(value) > 1) {
      setValue(parseInt(value) - 1);
      setData({
        ...data,
        price: parseInt(basePrice) * (parseInt(value) - 1),
        basePrice: basePrice,
        quantity: parseInt(value) - 1,
      });
    }
  };

  const _addtocart = () => {
    if (data.quantity == 0) {
      const _data = {
        ...data,
        basePrice: parseInt(data.after_discount),
        quantity: 1,
      };
      dispatch(addToCompare(_data));
      router.push("/(drawer)/(tabs)/cart");
    } else {
      
      dispatch(addToCompare(data));
      router.push("/(drawer)/(tabs)/cart");
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView style={{
        flex : 1, 
        // backgroundColor : 'yellow',
        margin : 0,
        padding : 0
      }}>
        <Card style={styles.header}>
          <ImageItem src={data.image} size="2xl" />
        </Card>
        <Card style={styles.desCard} variant="ghost">
          <View style={styles.middle}>
            <Text size="sm">#{data.type}</Text>
            <Text size="sm">
              {data.name} | {data.capacity}
            </Text>
            <View style={styles.inside}>
              <Text size="sm">
                <AntDesign name="star" size={14} color="yellow" /> {data.rating}{" "}
                Rating
              </Text>
              <Text size="sm">
                <Entypo name="dot-single" size={15} color="black" />
                {data.reviews}+Reviews
              </Text>
              <Text size="sm">
                <Entypo name="dot-single" size={15} color="black" />
                {data.sold}+Sold
              </Text>
            </View>
          </View>
        </Card>
        <Card>
          <Accordion
            defaultValue="0"
            size="md"
            variant="filled"
            type="single"
            isCollapsible={true}
            isDisabled={false}
            className="m-5 w-[90%] border border-outline-200"
            borderRadius={10}
            style={{
              borderRadius: 10,
            }}
          >
            <AccordionItem value="a" borderRadius={10}>
              <AccordionHeader>
                <AccordionTrigger>
                  {({ isExpanded }) => {
                    return (
                      <>
                        <AccordionTitleText>
                          <Text size="small">About</Text>
                        </AccordionTitleText>
                        {isExpanded ? (
                          <AccordionIcon as={ChevronUpIcon} className="ml-3" />
                        ) : (
                          <AccordionIcon
                            as={ChevronDownIcon}
                            className="ml-3"
                          />
                        )}
                      </>
                    );
                  }}
                </AccordionTrigger>
              </AccordionHeader>
              <AccordionContent>
                <AccordionContentText>
                  <View style={styles.aboutHeader}>
                    <Text size="sm">Type : {data.productType} </Text>
                    <Text size="sm">capacity : {data.quantity}</Text>
                  </View>
                  <View>
                    <Text size="sm">
                      To place an order, simply select the products you want,
                      proceed to checkout, provide shipping and payment
                      information, and finalize your purchase.
                    </Text>
                  </View>
                </AccordionContentText>
              </AccordionContent>
            </AccordionItem>
            <Divider />
            <AccordionItem value="b" borderRadius={10}>
              <AccordionHeader>
                <AccordionTrigger>
                  {({ isExpanded }) => {
                    return (
                      <>
                        <AccordionTitleText>
                          <Text size="small">Reviews</Text>
                        </AccordionTitleText>
                        {isExpanded ? (
                          <AccordionIcon as={ChevronUpIcon} className="ml-3" />
                        ) : (
                          <AccordionIcon
                            as={ChevronDownIcon}
                            className="ml-3"
                          />
                        )}
                      </>
                    );
                  }}
                </AccordionTrigger>
              </AccordionHeader>
              <AccordionContent>
                <AccordionContentText>
                  <Text size="sm">
                    We accept all major credit cards, including Visa,
                    Mastercard, and American Express. We also support payments
                    through PayPal.
                  </Text>
                </AccordionContentText>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>
      </ScrollView>
      <View style={{
        // flex:1,
        // height : 10,
        // backgroundColor  :'yellow'
      }}>
            {/* <P style={{ textDecoration: 'line-through' }}>Strikethrough text</P> */}
        <Card style={{
          // backgroundColor : 'green',
          flexDirection : 'row',
          justifyContent : 'space-between'
        }}>
          {/* <View > */}
            {/* <View > */}
              <Text size="lg">Total Price</Text>
              <View>
              <Text size="sm"  style={{
                textDecorationLine : 'line-through'
              }}>Tk {data.basePrice}
              </Text>
              <Text size="lg" bold >Tk {data.after_discount}
              </Text>
              </View>
            {/* </View> */}
            {/* <View
              style={{
                width: "75%",
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center"
              }}
            > */}
              {/* <ButtonBox
                isIcon={true}
                text=""
                action="default"
                width={(width * 13) / 100}
                size="sm"
                icon={RemoveIcon}
                onClick={negetiveCalled}
                color="green"
              />

              <InputBox
                size="sm"
                isnumber={true}
                width={50}
                isReadOnly={true}
                value={value.toString()}
                fontSize={10}
                height={(height * 5) / 100}
                textAlign={"center"}
              />
              <ButtonBox
                isIcon={true}
                text=""
                action="default"
                width={(width * 13) / 100}
                size="sm"
                icon={AddIcon}
                onClick={positiveCalled}
                color="green"
              /> */}
            {/* </View> */}
            {/* <View></View> */}
          {/* </View> */}
        </Card>
        {/* <Card style={styles.cart}>
          <ButtonBox
          variant={"link"}
            text="Add To Cart"
            action="negative"
            width={(width * 80) / 100}
            size="sm"
            onClick={_addtocart}
            fontColor="#fff"
          />
        </Card> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // justifyContent : 'center',
    // alignItems : 'center'
  },
  header: {
    marginHorizontal: (width * 5) / 100,
    marginVertical: (height * 2) / 100,
  },
  desCard: {
    backgroundColor: "#fff",
    // height :  'auto'
  },
  middle: {
    height: 80,
    flexDirection: "column",
    justifyContent: "space-around",
  },
  inside: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  aboutHeader: {
    width: (width * 80) / 100,
    marginBottom: 4,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cart: {
    // height :  60,
    backgroundColor : '#fff',
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
});
