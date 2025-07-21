import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
  StatusBar,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { Card, Text } from "@gluestack-ui/themed";
import { BarChart } from "react-native-gifted-charts";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { getMyCart } from "../../../redux/slices/cartSlice";
import { getDashboard ,getActiveOrder} from "../../../redux/slices/historySlice";
import { router } from "expo-router";
import useConfig from "../../../lib/hook/config";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const barData = [
  {
    value: 250,
    label: "Week 1",
    frontColor: "#DF2B2A",
    //   topLabelComponent: () => (
    //     <Text style={{color: 'blue', fontSize: 18, marginBottom: 6}}>50</Text>
    //   ),
  },
  {
    value: 500,
    label: "Week 2",
    frontColor: "#DF2B2A",
    sideColor: "#23A7F3",
    topColor: "#92e6f6",
    // topLabelComponent: () => (
    //     <Text style={{color: 'blue', fontSize: 18, marginBottom: 6}}>560</Text>
    //   ),
  },
  {
    value: 745,
    label: "Week 3",
    frontColor: "#DF2B2A",
    //   topLabelComponent: () => (
    //     <Text style={{color: 'blue', fontSize: 18, marginBottom: 6}}>100</Text>
    //   ),
  },
  {
    value: 320,
    label: "Week 4",
    frontColor: "#DF2B2A",
    //   topLabelComponent: () => (
    //     <Text style={{color: 'blue', fontSize: 18, marginBottom: 6}}>50</Text>
    //   ),
  },
  //   {value: 600, label: 'F', frontColor: '#177AD5'},
  //   {value: 256, label: 'S'},
  //   {value: 300, label: 'S'},
];

export default function index() {
  const dispatch = useDispatch();
  const config = useConfig();
  let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.toLocaleString('default', { month: 'long' });;
    let year = newDate.getFullYear();
    const __mydate = month+","+year

  const [data,setData] = useState(barData) //useState(useSelector((state)=>state.historyReducer.data))
  const [info,setInfo] = useState([])
  console.log(info)
  
  useEffect(() => {

    let option = {
      customer : config[2]
    }
    dispatch(getDashboard(option)).then(function(e){
      setData(e.payload.message.weekly_data)
      setInfo(e.payload.message.stats)
    })

    
   
    dispatch(getMyCart(option));
    
  }, []);

  const shift_active = () => {
    let option = {
          customer : config[2]
        }
    dispatch(getActiveOrder(option))
    router.push("screen/activeScreen/ActiveScreen");
  };

  return (
    <ScrollView contentContainerStyle={styles.conatiner}>
      <StatusBar
        backgroundColor="#DF2B2A"
        color="#fff"
        translucent={true}
        barStyle="light-content"
      />
      <Card style={styles.headerTop}>
        <View style={styles.upperCard}>
          <Text size="lg" bold>
            Good Afternoon, {config[1]?.first_name} !
          </Text>
          <Text size="sm">Here's what you need to know today</Text>
        </View>
        <View style={styles.upperCard}>
          <View style={styles.upperInside}>
            <Text size="lg" bold>
              Total Purchase
            </Text>
            <Text size="lg" bold>
              {__mydate}
            </Text>
          </View>

          <Text size="sm">Tk: {info?.total_spent_since_last_month}</Text>
        </View>
      </Card>
      <Card style={styles.header}>
        <BarChart
          // xAxisTextNumberOfLines = {2}
          data={data}
          backgroundColor={"#fff"}
          showLine
          // isThreeD
          side="right"
          // isAnimated
          width={width}
          barWidth={width / 7}
          noOfSections={4}
          barBorderRadius={4}
          frontColor="lightgray"
          
          yAxisThickness={0}
          xAxisThickness={0}
        />
      </Card>
      <Card style={styles.headerLower}>
        <View style={styles.headerLowerInside}>
          <Card
            size="lg"
            variant="outline"
            style={{
              width: (width * 45) / 100,
            }}
          >
            <View style={styles.lowerInsideFirst}>
              <View>
                <Text size="md">{month} Orders</Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    marginHorizontal: 5,
                    justifyContent: "flex-end",
                  }}
                >
                  <Text size="4xl">{info?.total_orders}</Text>
                </View>
                <View>
                  <Text> </Text>
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "flex-end",
                    flexDirection: "column",
                  }}
                >
                  <View>
                    <Text size="lf" color="green">
                      
                      {info?.spending_increase_rate}%<Text> </Text>
                      {
                        info?.is_spending_increased && 
                        <SimpleLineIcons name="graph" size={14} color="green" />
                      }
                      
                    </Text>
                  </View>
                  <View>
                    <Text size="2xs">since last month</Text>
                  </View>
                </View>
              </View>
            </View>
          </Card>
          <Card
            size="lg"
            variant="outline"
            // className="m-3"
            style={{
              width: (width * 45) / 100,
            }}
          >
            <TouchableOpacity onPress={shift_active}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text size="md">Total Orders</Text>
                <MaterialIcons
                  name="arrow-forward-ios"
                  size={15}
                  color="black"
                />
              </View>
              <View
                style={{
                  marginHorizontal: 5,
                  justifyContent: "flex-end",
                }}
              >
                <Text size="4xl">{info?.pending_orders}</Text>
              </View>
            </TouchableOpacity>
          </Card>
        </View>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    backgroundColor: "white",
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTop: {
    height: (height * 22) / 100,
    width: width,
    justifyContent: "space-between",
    // marginVertical  :  20
  },
  header: {
    height: Platform.OS === "ios" ? (height * 30) / 100 : (height * 35) / 100,
    // marginTop : 10 ,
    width: width,
    // marginVertical  :  20
  },
  upperCard: {
    flexDirection: "column",
    marginVertical: Platform.OS === "ios" ? 20 : 5,
    // paddingVertical: Platform.OS=="android" ? 5 : 10,
    // marginVertical :  20
    // justifyContent : ''
  },
  upperInside: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerLower: {
    height: (height * 33) / 100,
    width: "100%",
    justifyContent: "center",
  },
  headerLowerInside: {
    // backgroundColor : 'yellow',
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems : 'center'
  },
  lowerInsideFirst: {
    // backgroundColor : 'red',
    height: 70,
    justifyContent: "space-between",
  },
});
