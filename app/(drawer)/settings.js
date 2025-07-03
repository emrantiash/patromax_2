import { View, StyleSheet } from "react-native";
import React from "react";
import { Card, Icon, CalendarDaysIcon, Switch ,Text,PlayIcon} from "@gluestack-ui/themed";
import SelectBox from "../component/select/SelectBox";

const data = [
  {
    id  : 1 ,
    name : "English"
  },
  {
    id :  2 , 
    name : "Bangla"
  }
]

export default function settings() {

  const selectedValue =(e) =>{
    console.log("=== ===  ===",e)
  }
  return (
    <View style={styles.container}>
      <Card
        size="md"
        variant="outline"
        className="m-3"
        style={styles.appSetting}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems : 'center'
          }}
        >
          <Icon
            as={CalendarDaysIcon}
            className="text-typography-500 m-2 w-4 h-4"
          />
          <Text className="m-3 p-3"  size="lg">
            {" "}
            App Setting{" "}
          </Text>
        </View>
        <View style={styles.innerBody}>
          <Text size="md"> Push Notification</Text>
          <Switch
            size="sm"
            isDisabled={false}
            trackColor={{
              false: "red",
              true: "red",
            }}
            thumbColor={"white"}
            activeThumbColor={"yellow"}
            ios_backgroundColor={"lightgray"}
          />
        </View>
        <View style={styles.innerBody}>
          <Text size="md"> Language </Text>
          <SelectBox 
          placeholder={"English"}
          data={data}
          selectedValue={selectedValue}
          // height={"90"}
          height={40}
          width={90}
          />
        </View>
      </Card>

      <Card
        size="md"
        variant="outline"
        className="m-3"
        style={styles.appSetting}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems : 'center'
          }}
        >
          <Icon
            as={CalendarDaysIcon}
            className="text-typography-500 m-2 w-4 h-4"
            
          />
          <Text className="m-3 p-3"  size="lg" style={{
            // marginBottom :  5
          }} >
            {" "} 
            Help and Terms of Service{" "}
          </Text>
        </View>
        <View style={styles.innerBody}>
          <Text size="md"> Private policy</Text>
          
        </View>
        <View style={styles.innerBody}>
          <Text size="md"> Terms of service </Text>
          
        </View>
        <View style={styles.innerBody}>
          <Text size="md"> Contact support </Text>
          
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent : 'space-around',
    alignItems: "flex-start",
    // marginVertical: 10,
    backgroundColor: "#fff",
  },
  appSetting: {
    width: "100%",
    backgroundColor: "#fff",
  },
  innerBody : {
    marginHorizontal: 20,
    marginVertical: 10,
    flexDirection : 'row',
    justifyContent : 'space-between',
    alignItems : 'center'
  }
});
