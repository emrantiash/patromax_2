import { View, StyleSheet, TouchableOpacity } from "react-native";
import React,{useState} from "react";
import { useDispatch,useSelector } from "react-redux";
import { Card, Icon, CalendarDaysIcon, Switch ,Text,PlayIcon} from "@gluestack-ui/themed";
import SelectBox from "../component/select/SelectBox";
import { setLanguage, setLanguageName } from "../redux/slices/loginSlice";
import { router } from "expo-router";

const data = [
  {
    id  : 1 ,
    value : "0",
    name : "English"
  },
  // {
  //   id :  2 , 
  //   value : "1",
  //   name : "Bangla"
  // }
]

export default function settings() {
  const dispatch = useDispatch()

  const _language =  useSelector((state)=>state.loginReducer.language_name)

  const [mylanguage,setMylanguage] = useState(0)

  const selectedValue =(value) =>{
    // console.log("=== ===  ===",value)
    // dispatch(setLanguage(parseInt(value)))
    // dispatch(setLanguageName(name))
  }

  const _policy = (_link) =>{
    router.push(_link)
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
        {/* <View style={styles.innerBody}>
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
        </View> */}
        <View style={styles.innerBody}>
          <Text size="md"> Language </Text>
          <SelectBox 
          defaultValue={"English"}
          data={data}
          selectedValue={selectedValue}
          // thisValue = {_language}
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
        <TouchableOpacity style={styles.innerBody} onPress={()=>_policy("screen/policy/PrivatePolicy")}>
          <Text size="md"> Private policy</Text>
          
        </TouchableOpacity>
        <TouchableOpacity style={styles.innerBody} onPress={()=>_policy('screen/services/Services')}>
          <Text size="md"> Terms of service </Text>
          
        </TouchableOpacity>
        <TouchableOpacity style={styles.innerBody} onPress={()=>_policy('screen/support/Support')}>
          <Text size="md"> Contact support </Text>
          
        </TouchableOpacity>
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
