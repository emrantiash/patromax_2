import {
  StyleSheet,
  View,
  Button,
  Dimensions,
  FlatList,
  RefreshControl,
} from "react-native";
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
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageItem from "../../../component/image/ImageItem";
import { getNotification } from "../../../redux/slices/historySlice";
import PSpinner from "../../../component/spinner/Spinner";
import useConfig from "../../../lib/hook/config";
import { getLocales } from "expo-localization";
import { i18n } from "../../../utils/libs/localization/Localization";

const width = Dimensions.get("window").width;

export function NotificationCard({ order, time, status }) {
  i18n.locale = config[5] === 0 ? 'en' : 'bn' ;
  return (
    <Card size="md" variant="outline" className="" style={styles.cardRoot}>
      <View style={styles.cover}>
        <ImageItem
          src="https://petromax-test.s3.ap-south-1.amazonaws.com/petromax.png"
          alt="no image"
          size="sm"
        />
        <View style={styles.cardItem}>
          <Text
            size="sm"
            style={{
              width: (width * 70) / 100,
            }}
          >
            {i18n.t("your_order")} ({order}) {i18n.t("has_been")} {status} {i18n.t("aa")}
          </Text>
          <Text size="sm">{time}</Text>
        </View>
      </View>
    </Card>
  );
}

export default function Page() {
  const dispatch = useDispatch();
  const config = useConfig();
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([]);

  const makeTheCall = () => {
    const option = {
      customer: config[2],
      latest_per_order: 0,
      limit: 1000,
    };
    setIsLoading(true);
    dispatch(getNotification(option)).then(function (e) {
      setData(e.payload.message.changes);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    makeTheCall();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    makeTheCall();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ListEmptyComponent={() => (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              margin: 10,
              padding: 10,
            }}
          >
            {isLoading ? (
              <PSpinner />
            ) : (
              <Text
                style={{
                  fontSize: 12,
                  letterSpacing: 1.0,
                }}
              >
                No Item Found
              </Text>
            )}
          </View>
        )}
        data={data}
        renderItem={({ item }) => (
          <NotificationCard
            order={item.sales_order}
            time={item.date}
            status={item.current_status}
          />
        )}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
    // backgroundColor: "#fff",
    // marginHorizontal : 15
  },
  cardRoot: {
    marginTop: 10,
    marginVertical: 0,
    backgroundColor: "#fff",
  },
  cover: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  cardItem: {
    marginVertical: 5,
    padding: 5,
    // marginBottom : 10
  },
});
