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
const _horizontal = (windowWidth * 0.2) / 100
const _variant = "elevated"

export default function Search(){
    const router = useRouter();
    return (
      <View style={styles.container}>
        {/* <Text style={styles.title}>Home page</Text> */}
        {/* <Button onPress={()=>router.back()} title='Go Back' />  */}
        <Card
          size="md"
          variant={"ghost"}
          className="m-3"
          style={styles.searchPart}
        >
          <SearchBox width={250} borderRadius={10} />
          <View style={styles.imagesGroup}>
          <Feather name="shopping-cart" size={24} color="black" />
          <Feather name="bookmark" size={24} color="black" />
          </View>
          
          
        </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      // flex: 1,
      // justifyContent : 'center',
      // alignItems: "center",
      // padding: 24,
      backgroundColor: "#fff",
    },
 
    searchPart: {
        // backgroundColor : '#fff',
        height: (windowHeight * 10) / 100,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor : '#fff',
        // marginHorizontal: _horizontal,
        // paddingVertical : 10 ,
        flexDirection: "row",
        justifyContent: "space-between",
      },
    
     
      imagesGroup : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        width : 60
      },
  });