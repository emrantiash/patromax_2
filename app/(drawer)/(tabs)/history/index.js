import { View, StyleSheet, FlatList ,Dimensions,RefreshControl} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Text } from "@gluestack-ui/themed";
import Active from "../../../pages/active/Active";
import { getHistory } from "../../../redux/slices/historySlice";
import { past_items } from "../../data";
import SelectBox from "../../../component/select/SelectBox";
import { getLocales } from "expo-localization";
import { i18n } from "../../../utils/libs/localization/Localization";
import useConfig from "../../../lib/hook/config";
import PSpinner from "../../../component/spinner/Spinner";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

// paid : "success" , unpaid : "error", partly paid : "warning"

const __selectdata = [
  {
    id: 1,
    name: "All",
    value: "All",
  },
  {
    id: 2,
    name: "Paid",
    value: "Paid",
  },
  {
    id: 3,
    name: "Unpaid",
    value: "Unpaid",
  },
  {
    id :  4 ,
    name : "Partly Paid",
    value : "Partly Paid"
  }
];

export default function Page() {
  const config = useConfig();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [status,setStatus] = useState("")
  i18n.locale = config[5] === 0 ? 'en' : 'bn' ;
  const [data, setData] = useState([]);

  useEffect(() => {
   makeTheCall()
  }, []);

  const  makeTheCall = () =>{
    const option = {
      customer: config[2],
    };
    getDataCall(option);
  }

  const onRefresh = async () => {
    setRefreshing(true);
    makeTheCall();
    setRefreshing(false);
  };

  const getDataCall = (option) => {
    setIsLoading(true)
    dispatch(getHistory(option)).then(function (e) {
      setData(e?.payload.message);
      setIsLoading(false)
    });
  };

  const renderNoStateMessage = () => {
    <View>
      <Text>No Item Found</Text>
    </View>;
  };

  const selectedValue = (value) => {
    let option ;
    value == "All" ? 
    option = {
      customer : config[2]
    } :
    option = {
      customer: config[2],
      filter: [
        ["status", "=", value]
      ],
    };
    getDataCall(option);
  };

  const calculate_payment = (data) =>{
    let __amount = 0 
    data.map((data)=>{
      __amount = data.amount + __amount
    })
    return __amount
  }

 

  return (
    <View style={styles.container}>
      {/* <View style={styles.selectBox}>
        <SelectBox
          defaultValue="All"
          data={__selectdata}
          height={(height*4)/100}
          width={(width*24)/100}
          selectedValue={selectedValue}
        />
      </View> */}

      <FlatList
        ListEmptyComponent={() => (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              margin: 10,
              padding: 10,
            }}
          >
            {isLoading ? (
              <PSpinner />
            ) : (
              <Text
                style={{
                  fontSize: 12,
                  letterSpacing: 1.0,
                }}
              >
                No Item Found
              </Text>
            )}
          </View>
        )}
        data={data}
        renderItem={({ item }) => (
          <Active
            order={"#" + item.order.split(/[-]+/).pop()}
            total={item.total}
            items={item.items}
            status={item.status}
            date={item.date}
            dataset={item}
            action={item.status=="Paid" ?"success" : item.status=="Unpaid" ? "error" : "warning"}
            // amount={calculate_payment(item.payment_Entry)}
            amount = {item.petromax_status || "Order Created"}
          />
        )}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
          />
      }
        //   ListHeaderComponent = {() => (
        //     <Text style={styles.text}>{i18n.t('Past')} {i18n.t('Orders')}</Text>
        // )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    // alignItems : 'center'
  },
  selectBox: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginVertical: 10,
    // marginHorizontal: 15,
    marginRight: 15,
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    // alignItems: 'center',
    borderRadius: 5,
  },
  text: {
    // backgroundColor: 'transparent',
    // fontSize: 15,
    // color: '#000',
    paddingHorizontal: 20,
    paddingTop: 20,
    letterSpacing: 1.0,
  },
});
