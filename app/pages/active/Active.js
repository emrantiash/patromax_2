import {TouchableOpacity, StyleSheet, View, Dimensions } from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import { storeOrder } from "../../redux/slices/orderSlice";
import { useRouter } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import SearchBox from "../../component/search/Search";
// import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Card, Text, Icon, ArrowRightIcon,Divider } from "@gluestack-ui/themed";
import BadgeSymbol from "../../component/badge/Badge";
import { LinearGradient } from 'expo-linear-gradient';
import AntDesign from '@expo/vector-icons/AntDesign';
import {router,Link} from "expo-router"; 
import Octicons from '@expo/vector-icons/Octicons';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const _horizontal = (windowWidth * 2) / 100;
const _variant = "elevated";


export default function Active({status,order,total,items,date,dataset }) {
  const dispatch = useDispatch()
  const makeTheCall =(data) =>{
    dispatch(storeOrder(data))
    router.push("screen/orderDetails/OrderDetails")
  }
  return (
    <TouchableOpacity style={styles.container}
    onPress={()=>makeTheCall(dataset)}
    >
      <Card
        size="md"
        variant={"filled"}
         // className="m-3"
        style={styles.body}
      >
        <LinearGradient colors={[ '#fff' , '#fff']}
        // '#e8f7f1','#fff4f2',#e5e4d2
        
        start={{x: 0.5, y: 0.4}} end={{x: 0.6, y: 0.9}}
        style={styles.background}
        >
        <View style={styles.header}>
          <Text size="md"  style={styles.color} bold>
            Order : {order}
          </Text>
          <Text size="md"  style={styles.color} color="green" bold>
            Tk-{total}/-
           
          </Text>
         
        </View>
        {
          items && 
          items.map((data,index)=>
        <View style={styles.innerBody} key={index}>
          <Text size="sm" style={styles.letter} >
          <Octicons name="dot" size={12} color="green" />  {data.name} | {data.capacity}
          </Text>
          <Text size="sm" sub >
            (Qty) {data.qty}
          </Text>
        </View>
          )
        }
         </LinearGradient>
         <Card>
         <View style={[styles.innerBody]}>
          <View style={{
            height : 50,
            flexDirection : 'column',
            justifyContent : 'space-between'
          }}>
          <Text size="sm">Latest Status</Text>
        <Text size="sm">{date}</Text>

          </View>
         
        <BadgeSymbol  text={status} action="warning" />
        </View>
         </Card>
      {/* </Card>
      <Card    
      size="md"
      variant={"filled"}
      style={styles.body}
    > */}
        {/* <View style={[styles.innerBody]}>
          <View style={{
            height : 50,
            flexDirection : 'column',
            justifyContent : 'space-between'
          }}>
          <Text size="sm">Latest Status</Text>
        <Text size="sm">{date}</Text>

          </View>
         
        <BadgeSymbol  text={status}/>
        </View> */}
        
        </Card>
       
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    marginVertical: (windowWidth * 0.2) / 100
  },
  background : {
    padding: 10,
    borderRadius: 5,
  },
  color : {
    // color : 'red',

  },
  divider : {
    marginVertical : 10 
  },
  letter: {
    // letterSpacing : 0.5
  },
  body: {
    // backgroundColor: "#ffffff"
  },
  header: {
    color : 'red',
    marginVertical: 5,
    marginHorizontal :8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  innerBody: {
    // marginHorizontal : 10,
    // width : (windowHeight * 80) / 100,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },

  imagesGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 60,
  },
  button: {
    // justifyContent : 'flex-end',
    // alignItems : 'flex-end',
    // justifyContent : 'space-between',
    width: 200,
  },
});
