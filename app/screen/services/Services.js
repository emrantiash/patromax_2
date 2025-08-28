import { ScrollView, View, StyleSheet } from "react-native";
import React from "react";
import { Text, Card } from "@gluestack-ui/themed";

export default function Services() {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text size="md" style={styles.shrink}>
        By using the Petromax Dealer App, you agree that:

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
          We use this information to :
        </Text>
      </View>
      <View style={styles.body}>
        <View style={styles.bodyPart}>
          <Text style={styles.dot}> </Text>
          <Text size="md" style={styles.shrink}>
          Only authorized dealers & staff can use the app

          </Text>
        </View>
        <View style={styles.bodyPart}>
          <Text style={styles.dot}> </Text>
          <Text size="md" style={styles.shrink}>
          You will not share your account or give false info
          </Text>
        </View>
        <View style={styles.bodyPart}>
          <Text style={styles.dot}> </Text>
          <Text size="md" style={styles.shrink}>
          Minimum order 1 item, and all orders are binding
          </Text>
        </View>
        <View style={styles.bodyPart}>
          <Text style={styles.dot}> </Text>
          <Text size="md" style={styles.shrink}>
          You won’t use the app for illegal purposes
          </Text>
        </View>
        <View style={styles.bodyPart}>
          <Text style={styles.dot}> </Text>
          <Text size="md" style={styles.shrink}>
          You won’t use the app for illegal purposes
          </Text>
        </View>
        <View style={styles.bodyPart}>
          <Text style={styles.dot}> </Text>
          <Text size="md" style={styles.shrink}>
          We’re not responsible for losses due to misuse 

          </Text>
        </View>
        <View style={styles.bodyPart}>
              {/* <Text style={styles.dot}> </Text> */}
          <Text size="md" style={{marginLeft : 10 }}>
          or technical issues
          </Text>
        </View>
        <View style={styles.bodyPart}>
          <Text style={styles.dot}> </Text>
          <Text size="md" style={styles.shrink}>
          Governed by Bangladesh law

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
    borderRadius: "50%",
    display: "inline-block",
  },
  summery : {
    marginHorizontal : 10 
  },
  shrink: {
    flexShrink: 1,
  },
});
