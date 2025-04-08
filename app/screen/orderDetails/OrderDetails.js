import { ScrollView,View, StyleSheet, DimensionValue, Dimensions } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import {
  Card,
  Text,
  Icon,
  ArrowRightIcon,
  Divider,
} from "@gluestack-ui/themed";
import Fontisto from "@expo/vector-icons/Fontisto";
import Entypo from '@expo/vector-icons/Entypo';
import BadgeSymbol from "../../component/badge/Badge";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;


export default function OrderDetails() {
  const data = useSelector((state)=>state.orderReducer.data)
  // console.log("====data====="+data.date)
  return (
    <ScrollView style={styles.container}>
      <Card style={styles.body} variant="ghost">
        <View style={styles.header}>
          <View style={styles.headerColumn}>
            <Text size="lg" style={styles.letter}>
              Order ID
            </Text>
            <Text size="xl" style={styles.letter} bold>
              {data.order}
            </Text>
          </View>
          <View>
            <Fontisto name="copy" size={24} color="black" />
          </View>
        </View>
      </Card>
      <Card style={styles.body} variant="ghost">
        {/* <View > */}
          <View style={styles.headerColumn2}>
            <Text size="lg" style={[styles.letterHead,styles.letter]}>
              Timeline
            </Text>
            <View style={styles.dateBody}>
            <Text size="md" style={styles.letter} bold>
              Submission Date : {data.date}
            </Text>
            
            <Text size="md" style={styles.letter} bold>
              Last Update : {data.date}
            </Text>
           
            </View>
          {/* </View> */}
          {/* <View></View> */}
        </View>
        {/* </Card>
        <Card style={styles.body} variant="ghost"> */}
        <View style={styles.myGap}></View>
        <View >
          <View >
            <Text size="lg" style={styles.letter}>
              Product Details
            </Text>
            {data.items?.map((data, index) => (
              <View style={styles.dataTable} key={index}>
                <Text size="sm" style={{
                  // backgroundColor : 'red',
                  justifyContent : 'center',
                  alignItems : 'center'
                }}>
                <Entypo name="dot-single" size={15} color="green" /> {data.name} | {data.capacity}
                </Text>
                <Text size="sm">(QTY){data.qty}</Text>
                <Text size="sm">{data.price} Tk</Text>
              </View>
            ))}
          </View>
          <View style={styles.myGap}>
          <Divider className="my-0.5" />
          </View>
          <View style={styles.subTotal}>
                <Text>Subtotal</Text>
                <Text>{data.subtotal}</Text>
          </View>
          <View style={styles.subTotal}>
                <Text>       Tax</Text>
                <Text>{data.tax}</Text>
          </View>
          <View style={styles.subTotal}>
                <Text bold>      Total</Text>
                <Text bold>{data.total}</Text>
          </View>
          <View style={styles.subTotal}>
                <Text >      status</Text>
                <Text  style={{
                  marginVertical :5}}><BadgeSymbol text={data.status} /></Text>
          </View>
        </View>
      </Card>
      <Card>
        <View>
          <Text size="sm" style={[styles.letter ,styles.shipping]}>Shipping Info</Text>
        </View>
        <View style={styles.dateBody}>
          <Text size="sm"  style={styles.letter} bold>139,Road 10,Sector-4,Uttara ,Dhaka-1230</Text>
          <Text size="sm" bold>Contact : 01765667656</Text>
        </View>
      </Card>
      {/* <Card>

      </Card> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor : '#fff'
  },
  body: {
    backgroundColor: "#fff",
    marginVertical: 8,
  },
  dateBody : {
    height : (height * 6) /100 ,
    // backgroundColor : 'red',
    justifyContent : 'space-between'
  },
  letterHead : {
    marginVertical : (height * 1.5) /100 
  },
  letter: {
    // letterSpacing: 0.5,
    fontSize : (height * 1.7) /100
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerColumn: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  headerColumn2: {
    // height: (height * 10) / 100,
    flexDirection: "column",
    justifyContent: "space-between",
    // marginVertical : 10 
  },
  myGap: {
    marginVertical: 10,
  },
  dataTable: {
    // backgroundColor : 'red',
    marginVertical: 10,
    // width: width,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  subTotal : {
    marginStart : '50%',
    marginVertical : 8,
    flexDirection : 'row',
    justifyContent : 'space-around'
  },
  shipping : {
    marginVertical : 10
  }
});
