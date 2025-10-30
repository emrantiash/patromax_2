import { View, StyleSheet, Dimensions,Linking,Platform } from 'react-native';
import React from 'react';
import { useSelector } from "react-redux";;
import ImageItem from '../../component/image/ImageItem'
import { Text, Card } from "@gluestack-ui/themed";
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
import ButtonBox from '../../component/button/Button';
import * as Clipboard from "expo-clipboard";
import { i18n } from "../../utils/libs/localization/Localization";
import { getLocales } from "expo-localization";

export default function support() {
  const _language = useSelector((state) => state.loginReducer.language);
  i18n.locale = getLocales()[_language]?.languageCode;

  const copyToClipboard = async (data) => {
    await Clipboard.setStringAsync(data);
  };
  const handleCall = async () => {
    const phoneNumber = "+8809678111000"
    const url = `tel:${phoneNumber}`;
    try {
      const supported = await Linking.canOpenURL(url);
      if (!supported) {
        alert('Phone calls are not supported on this device.');
      } else {
        await Linking.openURL(url);
      }
    } catch (error) {
      // console.error('An error occurred:', error);
      Alert.alert('Failed to open dialer.');
    }

  }

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <ImageItem
          // src={require('../../../assets/images/logo/petromax.png')}
          src="https://petromax-test.s3.ap-south-1.amazonaws.com/petromax.png"
          size="md"
        />
        <View >
          <Text> {i18n.t("support_head")}</Text>
        </View>
        <View >
          <Text size="3xl" bold>+8809678111000</Text>
        </View>
      </View>

      <View style={styles.body}>
        <Text>{i18n.t("support_discuss")}</Text>
      </View>

      <View style={styles.body}>
        <View style={{
          display : 'flex',
          justifyContent : 'space-between',
          height :  100
        }}>

<ButtonBox
          variant="solid" action="negative"
          text={i18n.t("Call")}
          width={(width*90)/100}
          fontColor={'#fff'}
          borderRadius={10}
          onClick={handleCall} 
        />
         <ButtonBox
         variant="outline" action="secondary"
          text={i18n.t("Clipboard")}
          width={(width*90)/100}
          // fontColor={'#fff'}
          
        />
          
        </View>
       
      </View>



    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-around',
  },
  body: {
    // marginVertical : (height *  20 )/100 ,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginHorizontal: 10
  }
})