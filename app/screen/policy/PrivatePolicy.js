import { ScrollView, View, StyleSheet } from "react-native";
import React from "react";
import { Text, Card } from "@gluestack-ui/themed";

export default function PrivatePolicy() {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text size="md" style={styles.shrink}>
          Petromax Dealer Application values your privacy. When you use our app,
          we collect:
        </Text>
      </View>
      <View style={styles.body}>
        <View style={styles.bodyPart}>
          <Text style={styles.dot}> </Text>
          <Text size="md" bold>
            Personal Info :
          </Text>
          <Text size="md" style={styles.shrink}>
            name, phone, email, role{" "}
          </Text>
        </View>
        <View style={styles.bodyPart}>
          <Text style={styles.dot}> </Text>
          <Text size="md" bold>
            Order info :
          </Text>
          <Text size="md" style={styles.shrink}>
            {" "}
            order details, payment information
          </Text>
        </View>
        <View style={styles.bodyPart}>
          <Text style={styles.dot}> </Text>
          <Text size="md" bold>
            Location :
          </Text>
          <Text size="md" style={styles.shrink}>
            {" "}
            for account and order processing
          </Text>
        </View>
        <View style={styles.bodyPart}>
          <Text style={styles.dot}> </Text>
          <Text size="md" bold>
            Cookies :
          </Text>
          <Text size="md" style={styles.shrink}>
            {" "}
            improve your experience
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
          We use this information to :
        </Text>
      </View>
      <View style={styles.body}>
        <View style={styles.bodyPart}>
          <Text style={styles.dot}> </Text>
          <Text size="md" style={styles.shrink}>
          Create and manage your account
          </Text>
        </View>
        <View style={styles.bodyPart}>
          <Text style={styles.dot}> </Text>
          <Text size="md" style={styles.shrink}>
          Process and deliver your orders
          </Text>
        </View>
        <View style={styles.bodyPart}>
          <Text style={styles.dot}> </Text>
          <Text size="md" style={styles.shrink}>
          Maintain secure access to the system
          </Text>
        </View>
      
      </View>
      <View style={styles.summery}>
        <Text style={styles.shrink}>
        We do not share your personal information with third parties.
 Your data is stored securely, and you can request to view or delete it at 
 any time by contacting <Text bold>Petromax.HR@shvenergybd.com.</Text>
             
        </Text>
        <Text style={{
            marginVertical : 20 
        }}>
        By using the app, you agree to this Privacy Policy.
             
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
