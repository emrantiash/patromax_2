import { StyleSheet, View,  Button, Dimensions,FlatList } from "react-native";
import {
  Card,
  Text,
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
  SettingsIcon,
} from "@gluestack-ui/themed";
import React from "react";
import ImageItem from "../../../component/image/ImageItem";

const width = Dimensions.get('window').width

// import "../../../../assets/images/logo.png"

const notification = [
  {
    id: 1,
    order: "123D34E",
    date: "6:25pm",
    status : "cancelled"
  },
  {
    id: 2,
    order: "123D34E",
    date: "6:25pm",
    status : "delivered"
  },
  {
    id: 3,
    order: "123D30E",
    date: "6:25pm",
    status : "Approaved"
  },
  {
    id: 4,
    order: "123D35E",
    date: "6:25pm",
    status : "deleivered"
  },
];

export function NotificationCard({ order,time,status }) {
  return (
    <Card 
    size="md" variant="outline" className="m-3"
    style={styles.cardRoot}
    >
        <View style={styles.cover}>
        <ImageItem
          src="https://petromax-test.s3.ap-south-1.amazonaws.com/petromax.png"
          alt="no image"
          size="sm"
        />
      <View style={styles.cardItem}>
        <Text size="sm" style={{    
            width : (width*70)/100
        }}>Your Order ({order}) has been {status}</Text>
        <Text size="sm">{time}</Text>
      </View>

        </View>
        
    </Card>
  );
}

export default function Page() {
  return (
    <View style={styles.container}>
        <FlatList
        data={notification}
        renderItem={({item}) => <NotificationCard 
        order={item.order}
        time={item.date}
        status={item.status}
       
        />}
        keyExtractor={item => item.id}
    //     ListHeaderComponent = {() => (
    //       <Text style={styles.text}>{i18n.t('Active')} {i18n.t('Orders')}</Text>
    //   )}
      />
      {/* <NotificationCard title="Hello" /> */}
      {/* <Text size="3xl">Your Order (123RE) has been delivered</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop : 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor : '#fff'
  },
  cardRoot : {
    marginTop : 10 ,
    marginVertical : 0
  },
  cover : {
    flexDirection : 'row',
    alignItems : 'center'
  },
  cardItem : {

    marginVertical : 5 ,
    padding : 5 ,
    // marginBottom : 10 
  }
});
