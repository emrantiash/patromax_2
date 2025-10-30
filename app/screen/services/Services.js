import { ScrollView, View, StyleSheet,Platform } from "react-native";
import { useSelector } from "react-redux";
import React from "react";
import { Text, Card } from "@gluestack-ui/themed";
import { i18n } from "../../utils/libs/localization/Localization";
import { getLocales } from "expo-localization";

export default function Services() {
  const _language = useSelector((state) => state.loginReducer.language);
  i18n.locale = getLocales()[_language]?.languageCode;
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text size="md" style={styles.shrink}>
        {i18n.t("service_head")}:

        </Text>
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
          {i18n.t("service_discuss")} :
        </Text>
      </View>
      <View style={styles.body}>
        <View style={styles.bodyPart}>
          <Text style={styles.dot}> </Text>
          <Text size="md" style={styles.shrink}>
          {i18n.t("service_1")}

          </Text>
        </View>
        <View style={styles.bodyPart}>
          <Text style={styles.dot}> </Text>
          <Text size="md" style={styles.shrink}>
          {i18n.t("service_2")}
          </Text>
        </View>
        <View style={styles.bodyPart}>
          <Text style={styles.dot}> </Text>
          <Text size="md" style={styles.shrink}>
          {i18n.t("service_3")}
          </Text>
        </View>
        <View style={styles.bodyPart}>
          <Text style={styles.dot}> </Text>
          <Text size="md" style={styles.shrink}>
          {i18n.t("service_4")}
          </Text>
        </View>
        <View style={styles.bodyPart}>
          <Text style={styles.dot}> </Text>
          <Text size="md" style={styles.shrink}>
          {i18n.t("service_6_1")}
          </Text>
        </View>
        {/* <View style={styles.bodyPart}>
          <Text style={styles.dot}> </Text>
          <Text size="md" style={styles.shrink}>
          We’re not responsible for losses due to misuse 

          </Text>
        </View> */}
        <View style={styles.bodyPart}>
              {/* <Text style={styles.dot}> </Text> */}
          <Text size="md" style={{marginLeft : 10 }}>
          {i18n.t("service_6_2")}
          </Text>
        </View>
        <View style={styles.bodyPart}>
          <Text style={styles.dot}> </Text>
          <Text size="md" style={styles.shrink}>
          {i18n.t("service_7")}

          </Text>
        </View>
      
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
    height: 8,
    width: 8,
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
