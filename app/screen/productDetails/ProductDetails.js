import { ScrollView ,View, StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import ImageItem from "../../component/image/ImageItem";
import { addToCart,storeData } from "../../redux/slices/cartSlice";
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
  ChevronUpIcon, ChevronDownIcon,
  AddIcon,
  Icon, EditIcon,
  RemoveIcon
} from "@gluestack-ui/themed";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from '@expo/vector-icons/Entypo';
import ButtonBox from "../../component/button/Button";
import InputBox from "../../component/input/Input";
import {router} from 'expo-router'

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function ProductDetails() {
  const dispatch = useDispatch()
  const [data,setData] = useState(useSelector((state) => state.productReducer.data));
  const [value,setValue] = useState("1")
  const [basePrice,setBasePrice] = useState(0)

  useEffect(()=>{
    setBasePrice(data?.price)
  },[])

  const positiveCalled = ()=>{
    if(parseInt(value) >= 1){
        setValue(parseInt(value)+1)
        setData({
            ...data,
            price : parseInt(basePrice) * (parseInt(value)+1),
            basePrice : basePrice,
            quantity : parseInt(value)+1
        })
    }    
  }


  const negetiveCalled = ()=>{
    if(parseInt(value) > 1){
        setValue(parseInt(value)-1)
        setData({
            ...data,
            price : parseInt(basePrice) * (parseInt(value)-1),
            basePrice : basePrice,
            quantity : parseInt(value)-1
        })
    }
    
  }

  const _addtocart = () =>{
    if(data.quantity==undefined){
        const _data={
            ...data,
            basePrice : basePrice,
            quantity : 1
        }
        dispatch(addToCart(_data))
        router.push('/(drawer)/(tabs)/cart')
    }
    else {
      dispatch(addToCart(data))
      router.push('/(drawer)/(tabs)/cart')
    }
    
  }
  return (
    <View style={styles.container}>
    <ScrollView >
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
            <Text size="sm"><Entypo name="dot-single" size={15} color="black" />{data.reviews}+Reviews</Text>
            <Text size="sm"><Entypo name="dot-single" size={15} color="black" />{data.sold}+Sold</Text>
          </View>
        </View>
      </Card>
      <Card>
      <Accordion
      defaultValue = "0"
      size="md"
      variant="filled"
      type="single"
      isCollapsible={true}
      isDisabled={false}
      className="m-5 w-[90%] border border-outline-200"
      borderRadius={10}
      style={{
        // backgroundColor : 'yellow',
        borderRadius : 10
      }}
      
    >
      <AccordionItem value="a"
       borderRadius={10}
      >
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
                    <AccordionIcon as={ChevronDownIcon} className="ml-3" />
                  )}
                </>
              )
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
            To place an order, simply select the products you want, proceed to
            checkout, provide shipping and payment information, and finalize
            your purchase.
            </Text>
          </View>  
          </AccordionContentText>
        </AccordionContent>
      </AccordionItem>
      <Divider />
      <AccordionItem value="b"  borderRadius={10}>
        <AccordionHeader>
          <AccordionTrigger>
            {({ isExpanded }) => {
              return (
                <>
                  <AccordionTitleText >
                  <Text size="small">Reviews</Text> 
                  </AccordionTitleText>
                  {isExpanded ? (
                    <AccordionIcon as={ChevronUpIcon} className="ml-3" />
                  ) : (
                    <AccordionIcon as={ChevronDownIcon} className="ml-3" />
                  )}
                </>
              )
            }}
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>
          <AccordionContentText >
          <Text size="sm">
          We accept all major credit cards, including Visa, Mastercard, and
            American Express. We also support payments through PayPal.
            </Text>  
          </AccordionContentText>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
      
      </Card>
     
    </ScrollView>
    <View>
      <Card style={styles.desCard}>
        <View style={styles.inside}>
            <View>
                <Text size="sm">Total Price</Text>
                <Text size="lg" bold>${data.price}</Text>
            </View>
            <View style={{
                width : '50%',
                flexDirection : 'row',
                justifyContent : 'center',
                alignItems : 'center'
                // backgroundColor : 'red'
            }}> 
            {/* <NumberInput /> */}
            <ButtonBox 
            isIcon={true}
                text=""
                action="default"
                width = {(width * 10)/100}
                size= "sm"
                icon ={RemoveIcon}
                onClick={negetiveCalled}
                color = "green"
                />
            
            <InputBox 
            size="sm"
            isnumber={true} 
            width = {50}
            isReadOnly={true}
            value = {value.toString()}
            fontSize={10}
            height={(height*5)/100}
            />
            <ButtonBox 
            isIcon={true}
                text=""
                action="default"
                width = {(width * 10)/100}
                size= "sm"
                icon ={AddIcon}
                onClick={positiveCalled}
                color = "green"
                />
           
               
            </View>
            <View >
           
            </View>

        </View>

      </Card>
      <Card style={styles.cart}>
        <View >
        <ButtonBox 
                text="Add To Cart"
                action="negative"
                width = {(width * 80)/100}
                size= "sm"
                // icon ={AddIcon}
                onClick={_addtocart}
                // color="#fff"
                />

        </View>
      
      </Card>
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
  },
  middle: {
    height: 80,
    flexDirection: "column",
    justifyContent: "space-around",
  },
  inside: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems : 'center'
  },
  aboutHeader: {
    width : (width*80)/100,
    marginBottom : 4,
    flexDirection : 'row',
    justifyContent : 'space-between'
  },
  cart : {
    width : width, 
    justifyContent : 'center',
    alignItems  : 'center'
  }
});


