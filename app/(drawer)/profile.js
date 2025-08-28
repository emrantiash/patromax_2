import { StyleSheet, View, Text, Button,Dimensions } from "react-native";
import {
  Card,
  Avatar,
  AvatarImage,
  AvatarFallbackText,
  Heading,
  VStack,
  HStack,
  Link,
  LinkText,
  Icon,
  ArrowRightIcon,
  MenuIcon,
  SettingsIcon
} from "@gluestack-ui/themed";
import React from "react";
import { useRouter } from "expo-router";
// import BadgeSymbol from "../../../component/badge/Badge";
import BadgeSymbol from "../component/badge/Badge";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import InputBox from "../component/input/Input";

import useConfig from "../lib/hook/config";


const height = Dimensions.get('window').height
const width = Dimensions.get('window').width 

export default function Profile() {
  const config = useConfig();
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Card style={styles.upperCard}>
        <Avatar className="mr-3">
          <AvatarFallbackText>RR</AvatarFallbackText>
          <AvatarImage
            source={{
              uri: "https://gluestack.github.io/public-blog-video-assets/john.png",
            }}
            alt="image"
          />
        </Avatar>
        {/* <VStack
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
          }}
        >
          <Heading size="xl" className="mb-1">
            Sakibur Rahman
          </Heading>
          <BadgeSymbol text={"Retailer"} />
        </VStack> */}
      </Card>

      <Card style={styles.lowerCard}>

        <View style={styles.cover}>
          <InputBox
          isLabel
          labelColor = "gray"
          color = "gray"
          label="Name"
          height={(height * 6) / 100}
          value={config[1]?.first_name }
          isReadOnly ={true}
        />

        </View>
        <View style={styles.cover}>
        <InputBox
          isLabel
          labelColor = "gray"
          color = "gray"
          label="Phone"
          height={(height * 6) / 100}
          value={config[1]?.mobile_no }
          isReadOnly ={true}
        />
        </View>
        <View style={styles.cover}>
        <InputBox
          isLabel
          labelColor = "gray"
          color = "gray"
          label="Role"
          height={(height * 6) / 100}
          value={"Retailer"}
          isReadOnly ={true}
        />
        </View>
      </Card>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  upperCard: {
    // justifyContent  : 'center',
    alignItems: "center",
    height: 100,
    width: "100%",
  },
  lowerCard: {
    // justifyContent  : 'center',
    // alignItems : 'center',
    height: "100%",
    width: "100%",
  },
  cover : {
    marginVertical :  10
  },
  account: {
    height: 120,
    flexDirection: "column",
    justifyContent: "space-between",
  },
});
