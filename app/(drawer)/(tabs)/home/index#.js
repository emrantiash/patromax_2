import {View,ScrollView, FlatList, StyleSheet, StatusBar,Dimensions,Button} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import React,{useState,useEffect, useRef} from "react";
import { useRouter,router } from "expo-router";
import { useDispatch } from 'react-redux';
import { Text } from "@gluestack-ui/themed";

import Search from "../../../pages/search/Search";
import Exclusive from "../../../pages/exclusive/Exclusive";
import CardItem from "../../../component/card/Card";
import Active from "../../../pages/active/Active";
import { storeProduct } from '../../../redux/slices/productSlice';
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const _horizontal = (windowWidth * 0.1) / 100
const _variant = "elevated"

import { _data } from './data';
import {} from "../../../../assets/images/home/exclusive.png";

export const  items = [
  {
    id : 1,
  order : "#113D34E",
  subtotal : "3000",
  tax : "100",
  total : "3100",
  status : "Pending",
  date : "12:05pm,Thrusday,12/10/2024",
  items : [
    {
      id : 1,
      name : "Propane Gas Bottle",
      capacity : "3.9",
      price : "1200",
      qty : 1
    },
    {
      id : 2,
      name : "Propane Gas Bottle",
      capacity : "5.8",
      price : "1800",
      qty : 1
    }
  ]
 

},

]

export default function Page() {
  const dispatch = useDispatch()
  const [index,setIndex] = useState(0)
  const [display,setDisplay] = useState('block')
  const isActive = useState(true)
  const router = useRouter();

  const itemSelected = (item) =>{
    dispatch(storeProduct(item))
    router.push("screen/productDetails/ProductDetails")
  }

  useEffect(()=>{

  },[index])

  return (
    <SafeAreaProvider>


   <SafeAreaView style={styles.container}>
      <Search /> 
      <FlatList
       numColumns={2}
        data={_data}
        renderItem={({item}) => 
        <CardItem 
        title={item.name} 
        type={item.type}
        rating={item.rating}
        total={item.total}
        price = {item.price}
        image={item.image}
        onPress = {()=>itemSelected(item)}
        
        // onScroll={() => console.log("End reached")}
        />}
        keyExtractor={item => item.id}
        ListHeaderComponent={() => (
          <>
          <View style={[styles.myGap]} className="drop-shadow-xs"></View>
        <View style={{display : display}}>
        {
          isActive ? 
          <View style={[styles.textView,{}]}>
            <Text size="lg" style={styles.text}>Active Orders </Text>
            <FlatList
        data={items}
        renderItem={({item}) => <Active 
        order={item.order}
        total={item.total}
        items={item.items}
        status={item.status} 
        date={item.date}
        dataset={item}
        />}
        keyExtractor={item => item.id}
      />
            {/* <Active 
            order={items.order}
            total={items.total}
            items={items.items}
            status={items.status} 
            date={items.date}
            /> */}
          </View>
        
          : 
          <Exclusive />
        }
        </View>
        <ScrollView  style={{
            zIndex : 9,
            marginHorizontal : 10,
            overflow : 'visible'
          }}>
             <Text size="lg" style={styles.text}>
          Products
          </Text>

        </ScrollView>
       
        </>
          
      )}
      ListFooterComponent={() => (
        <Text style={{ fontSize: 10, textAlign: "center",marginBottom:20,fontWeight:'bold' }}></Text>
    )}
      />
    </SafeAreaView>
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
  },
  myGap: {
    marginVertical: 5,
  
  },
  textView : {
    marginVertical : 10 ,
    marginHorizontal : 10
  },
  list : {
    // backgroundColor : 'red',
    flexDirection : 'row',
    justifyContent : 'space-around'
  },
  text: {
    backgroundColor: 'transparent',
    fontSize: 15,
    color: '#000',
    letterSpacing : 1.0
  },
  
});
