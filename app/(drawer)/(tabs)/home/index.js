import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
  StatusBar,
  Platform,
  BackHandler,
  Alert
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
import { useFocusEffect } from "@react-navigation/native";
import { getLocales } from "expo-localization";
import { i18n } from "../../../utils/libs/localization/Localization";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const barData = [
  {value: 20, label: 'M',
  topLabelComponent: () => (
    <Text style={{color: 'blue', fontSize: 12, marginBottom: 6}}>20</Text>
  )},
    {value: 30, label: 'T',
    topLabelComponent: () => (
      <Text style={{color: 'blue', fontSize: 12, marginBottom: 6}}>30</Text>
    )},
    {
      value: 50,
      label: 'W',
      topLabelComponent: () => (
        <Text style={{color: 'blue', fontSize: 12, marginBottom: 6}}>50</Text>
      ),
    },
    {value: 40, label: 'T',topLabelComponent: () => (
      <Text style={{color: 'blue', fontSize: 12, marginBottom: 6}}>40</Text>
    )},
    // {value: 30, label: 'F'},
];

export default function index() {
  const dispatch = useDispatch();
  const config = useConfig();
  const _language = useSelector((state) => state.loginReducer.language)  ;
  i18n.locale = getLocales()[_language]?.languageCode;
   console.log(_language,i18n.locale)
  let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.toLocaleString('default', { month: 'long' });;
    let year = newDate.getFullYear();
    const __mydate = month+","+year

  const [data,setData] = useState(barData) //useState(useSelector((state)=>state.historyReducer.data))
  const [info,setInfo] = useState([])

  

  const handleBackPress = ()=>{
    Alert.alert('Exit App','Are you sure to exit?',[
      {
        text : 'Cancel',
        onPress : () => null ,
        style : 'cancel'
      },
      {
        text : 'Exit',
        onPress : ()=>BackHandler.exitApp()
      }
    ]);
    return true ;
  }

  useFocusEffect(
    React.useCallback(()=>{
      BackHandler.addEventListener('hardwareBackPress',handleBackPress)
      return ()=>{
        BackHandler.removeEventListener('hardwareBackPress',handleBackPress)
      }
    })
  )
  
  useEffect(() => {
    let option = {
      customer : config[2]
    }

    // console.log("==== the options "+option)

    dispatch(getDashboard(option)).then(function(e){
      let _array = e.payload?.message?.weekly_data
      // setData(e.payload.message.weekly_data)
      const updatedData = _array.map(row => ({
        ...row, // Copy existing properties
        topLabelComponent: () => (
          <Text style={{color: 'green', fontSize: 10, margin : 0,padding : 0 }}>{row.value}</Text>
        ),
      }));
      setData(updatedData);
      // setData(e.payload.message.weekly_data)
      setInfo(e.payload.message.stats)
    })
    dispatch(getMyCart(option));

   
    
  }, []);

  // console.log("====data========="+JSON.stringify(data))

  

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
            {i18n.t("Welcome")}, {config[4]} !
          </Text>
          <Text size="sm">{i18n.t("what_to_know")}</Text>
        </View>
        <View style={styles.upperCard}>
          <View style={styles.upperInside}>
            <Text size="lg" bold>
              {i18n.t("total_purchase")}
            </Text>
            <Text size="lg" bold>
              {__mydate}
            </Text>
          </View>

          <Text size="sm">{i18n.t("tk")}: {Math.round(info?.total_spent_since_last_month)}</Text>
        </View>
      </Card>
      <Card style={styles.header}>
     
        <BarChart
          data={data}
          backgroundColor={"#fff"}
          showLine
          // isThreeD
          side=""
          // isAnimated
          width={width}
          // height={200}
          barWidth={width / 7}
          noOfSections={5}
          barBorderRadius={4}
          frontColor="#1ABC9C"
          
          yAxisThickness={0}
          xAxisThickness={0}
          // yAxisLabelTexts={['0', '1k', '2k', '3k', '800', '1k']}
          labelWidth={40}
          xAxisLabelTextStyle={{ color: '#000', textAlign: 'center',opacity : 0.5 }}
          // showGradient
          // gradientColor={'rgba(200, 100, 244,0.8)'}
          // xAxisType={'dashed'}
          xAxisColor={'lightgray'}
          barStyle={{ 
           margin : 0,
           padding : 0,
          //  backgroundColor : 'yellow'
          }}
         

          
        />
      </Card>
      <Card style={styles.headerLower}>
        <View style={styles.headerLowerInside}>
          <Card
            size="lg"
            variant="outline"
            style={{
              width: (width * 45) / 100,
              // backgroundColor : 'green',
              justifyContent : 'center',
              alignItems : 'center'
            }}
          >
            <View style={styles.lowerInsideFirst}>
              <View>
                <Text size="md">{month} {i18n.t("Orders")}</Text>
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
                <Text size="md">{i18n.t("Total") + " " + i18n.t("Orders")} </Text>
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
                <Text size="2xl">{info?.pending_orders}</Text>
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
    justifyContent: "space-between"
  },
  header: {
    // backgroundColor : 'yellow',
    // flex :1 ,
    height: Platform.OS === "ios" ? (height * 30) / 100 : (height * 35) / 100,
    width: width,
    justifyContent : 'center',
    alignItems : 'center',
    
  },
  upperCard: {
    flexDirection: "column",
    marginVertical: Platform.OS === "ios" ? 20 : 5
  },
  upperInside: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerLower: {
    height: (height * 33) / 100,
    width: "100%",
    justifyContent: "center"
  },
  headerLowerInside: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  lowerInsideFirst: {
    height: 70,
    justifyContent: "space-between",
  },
});
