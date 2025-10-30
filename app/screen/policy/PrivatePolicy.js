import { ScrollView, View, StyleSheet,Platform } from "react-native";
import { useSelector } from "react-redux";
import React from "react";
import { Text, Card } from "@gluestack-ui/themed";
import { i18n } from "../../utils/libs/localization/Localization";
import { getLocales } from "expo-localization";

export default function PrivatePolicy() {
  const _language = useSelector((state) => state.loginReducer.language);
  i18n.locale = getLocales()[_language]?.languageCode;

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text size="md" style={styles.shrink}>
          {i18n.t("Policy_heading")},
          {i18n.t("Policy_collect")}:
        </Text>
      </View>
      <View style={styles.body}>
        <View style={styles.bodyPart}>
          <Text style={styles.dot}> </Text>
          <Text size="md" bold>
            {i18n.t("Personal_info")} :
          </Text>
          <Text size="md" style={styles.shrink}>
            {i18n.t("Personal_info_details")}{" "}
          </Text>
        </View>
        <View style={styles.bodyPart}>
          <Text style={styles.dot}> </Text>
          <Text size="md" bold>
            {i18n.t("Order_info")} :
          </Text>
          <Text size="md" style={styles.shrink}>
            {" "}
            {i18n.t("Order_info_details")}
          </Text>
        </View>
        <View style={styles.bodyPart}>
          <Text style={styles.dot}> </Text>
          <Text size="md" bold>
            {i18n.t("Location")} :
          </Text>
          <Text size="md" style={styles.shrink}>
            {" "}
            {i18n.t("Location_details")}
          </Text>
        </View>
        <View style={styles.bodyPart}>
          <Text style={styles.dot}> </Text>
          <Text size="md" bold>
            {i18n.t("Cookies")} :
          </Text>
          <Text size="md" style={styles.shrink}>
            {" "}
            {i18n.t("Cookies_details")}
          </Text>
        </View>
      </View>

      <View style={styles.title}>
        <Text
          size="md"
          style={{
            width: "100%",
            justifyContent: "flex-start",
            marginHorizontal: 15,
          }}
        >
          {i18n.t("use")} :
        </Text>
      </View>
      <View style={styles.body}>
        <View style={styles.bodyPart}>
          <Text style={styles.dot}> </Text>
          <Text size="md" style={styles.shrink}>
          {i18n.t("use_1")}
          </Text>
        </View>
        <View style={styles.bodyPart}>
          <Text style={styles.dot}> </Text>
          <Text size="md" style={styles.shrink}>
          {i18n.t("use_2")}
          </Text>
        </View>
        <View style={styles.bodyPart}>
          <Text style={styles.dot}> </Text>
          <Text size="md" style={styles.shrink}>
          {i18n.t("use_3")}
          </Text>
        </View>
      
      </View>
      <View style={styles.summery}>
        <Text style={styles.shrink}>
        {i18n.t("policy_tail1")}<Text bold>Petromax.HR@shvenergybd.com.</Text>
             
        </Text>
        <Text style={{
            marginVertical : 20 
        }}>
        {i18n.t("policy_tail2")}
             
        </Text>

      </View>
      <View style={{
        marginVertical : 20 ,
        marginHorizontal : 10
      }}>
        

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  body: {
    width : '100%',
    marginVertical: 20,
    display : 'flex',
    justifyContent : 'flex-start',
    marginHorizontal : 20 
  },
  bodyPart: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 10,
    alignItems: "center",
    marginVertical: 5,
  },
  dot: {
    marginHorizontal: 5,
    height: 10,
    width: 10,
    backgroundColor: "#bbb",
    borderRadius: Platform.OS === "ios" ?  "50%" : 0,
    display: "inline-block",
  },
  summery : {
    marginHorizontal : 10 
  },
  shrink: {
    flexShrink: 1,
  },
});
