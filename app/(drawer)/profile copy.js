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

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width 

export default function Profile() {
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
        <VStack
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
        </VStack>
      </Card>

      <Card style={styles.lowerCard}>
        <VStack
          style={{
            marginTop: (height*5)/100,
            alignItems: "flex-start",
          }}
        >
          <View style={styles.account}>
            <View style={{
              width : '100%',
              flexDirection : 'row',
              justifyContent : 'space-between',
              alignItems : 'center'
            }}>
              <View style={{
                width :  '35%',
                flexDirection : 'row',
                alignItems : 'center',
                justifyContent : 'space-between'
              }}>
              <MaterialIcons name="account-circle" size={20} color="red" />
              <Text>My Account</Text>
              </View>
            
              <AntDesign name="rightcircleo" size={20} color="black" />
            </View>
            <View style={{
              width : '100%',
              flexDirection : 'row',
              justifyContent : 'space-between',
              alignItems : 'center'
            }}>
              <View style={{
                width :  '30%',
                flexDirection : 'row',
                alignItems : 'center',
                justifyContent : 'space-between',
              }}>
            <Icon as={MenuIcon} className="text-typography-500 m-2 w-4 h-4" color="red" />
              <Text>My Order</Text>
              </View>
            
              <AntDesign name="rightcircleo" size={20} color="black" />
            </View>
            <View style={{
              width : '100%',
              flexDirection : 'row',
              justifyContent : 'space-between',
              alignItems : 'center'
            }}>
              <View style={{
                width :  '26%',
                flexDirection : 'row',
                alignItems : 'center',
                justifyContent : 'space-between'
              }}>
              <Icon as={SettingsIcon} className="text-typography-500 m-2 w-4 h-4"  color="red"/>
              <Text>Setting</Text>
              </View>
            
              <AntDesign name="rightcircleo" size={20} color="black" />
            </View>
          </View>
        </VStack>
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
    height: 200,
    width: "100%",
  },
  lowerCard: {
    // justifyContent  : 'center',
    // alignItems : 'center',
    height: "100%",
    width: "100%",
  },
  account: {
    height: 120,
    flexDirection: "column",
    justifyContent: "space-between",
  },
});
