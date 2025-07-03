import { StyleSheet, View,  Button, Dimensions } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import SearchBox from "../../component/search/Search";
import { Card, Image, Heading,Text } from "@gluestack-ui/themed";
import ImageItem from "../../component/image/ImageItem";
import ButtonBox from "../../component/button/Button";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const _horizontal = (windowWidth * 2) / 100
const _variant = "filled"

// import {} from "../../../assets/images/home/exclusive.png"
export default function Exclusive() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Home page</Text> */}
      {/* <Button onPress={()=>router.back()} title='Go Back' />  */}
      
      {/* exclisive */}
    
      
      <Card style={styles.exclusivePart}
        size="md"
        variant={_variant}
        className="m-3"
      >
        <View style={styles.leftRoot}>
          <View style={styles.header}>
          <Text size="sm" style={styles.letterSpacing} sub="true">#Exclusive Offer !!</Text>
          <Heading size="lg" className="mb-1 tracking-widest" style={styles.letterSpacing}>
            500tk Cashback
          </Heading>
          <Text size="sm" style={styles.letterSpacing} sub="true">*Condition Applicable</Text>
          </View>
          <View style={styles.buttonbox}>
          <ButtonBox text="Learn More" 
          width={150}
          />
          </View>
         
        
        </View>

        <ImageItem
           src={"https://petromax-test.s3.ap-south-1.amazonaws.com/petromax-image-3-04062025.jpg"}
          alt="no image"
          size="lg"
          marginVertical={10}
          paddingVertical={10}
          borderWidth={0}
        />
      </Card>

      
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent : 'center',
    // alignItems: "center",
    // padding: 24,
    backgroundColor: "#fff",
  },
  letterSpacing : {
    letterSpacing :  0.7  
  },
  exclusivePart: {
    height : (windowHeight * 20)/100,
    marginHorizontal: _horizontal,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor : '#fff',
    flexDirection: "row",
    justifyContent: "space-around",
  },
  leftRoot : {
    // justifyContent : 'space-around'
  },
  buttonbox : {
    marginVertical : 20
  },
  header : {
    height : 70,
    flexDirection : 'column',
    justifyContent : 'space-around'
  }
});
