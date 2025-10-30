import { StyleSheet, View,  Button, Dimensions } from "react-native";
import {
    Text,
    Card
  } from "@gluestack-ui/themed";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "expo-router";
import useConfig from "../lib/hook/config";
import ImageItem from "../component/image/ImageItem";
import { i18n } from "../utils/libs/localization/Localization";
import { getLocales } from "expo-localization";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export default function energy() {
  const config = useConfig();
  const router = useRouter();
  const _language = useSelector((state) => state.loginReducer.language);
  i18n.locale = getLocales()[_language]?.languageCode;
  return (
    <View style={styles.container}>
      {/* <Card style={styles.upperCard}> */}
      <View style={styles.textRoot}>
        <Text style={styles.thistext}>
        {i18n.t("about_shv_energy_1st")}
        </Text>
        <View style={{
            marginTop : 20 
        }}>
          <Text style={styles.thistext}>
          {i18n.t("about_shv_energy_2nd")}
          </Text>
        </View>
      </View>
      {/* </Card> */}
      <View style={{
        height :  (height * 4)/100,
        width : '50%',
        // justifyContent : 'center',
        // alignItems : 'center'
      }}>
        <ImageItem 
          src="https://petromax-test.s3.ap-south-1.amazonaws.com/petromax-1709001.png"
          size= "full"
          />

      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "flex-start",
    backgroundColor: "#fff",
    // alignItems: "center",
    padding: 25,
    flexDirection : 'column',
    justifyContent : 'space-between',
    alignItems : 'center'

  },
  textRoot: {
    justifyContent: "space-between",
    backgroundColor: "#fff",
    // padding: 10,
    // marginHorizontal : 20
  },
  thistext: {
    // fontSize : (height* 2)/100 ,
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 10,
    lineHeight: 24,
    flexShrink: 1,
    textAlign: "justify",
  },
});
