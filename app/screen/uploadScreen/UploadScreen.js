import { View, StyleSheet, Dimensions,Image } from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Card,
  Text,
  PaperclipIcon
} from "@gluestack-ui/themed";
import ButtonBox from "../../component/button/Button";
import SelectBox from "../../component/select/SelectBox";
import * as ImagePicker from 'expo-image-picker';
import { i18n } from "../../utils/libs/localization/Localization";
import { getLocales } from 'expo-localization';


const width = Dimensions.get("window").width;
const height  = Dimensions.get("window").height ;

export default function UploadScreen() {
  const total = useSelector((state)=>state.cartReducer.total)
  const _language = useSelector((state)=>state.loginReducer.language) ;
  const [selectedImage,setSelectedImage] = useState(undefined)
 
  i18n.locale = getLocales()[_language].languageCode

  const pickImageAsync = async()=> {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      allowsMultipleSelection : true,
      quality: 1,
    });

    // console.log(!result.canceled)

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri)
      // console.log("====="+JSON.stringify(result.assets[0].uri));
    } else {
      alert('You did not select any image.');
    }
  };

  const _image = "require('+ selectedImage + ')"

  return (
    <>
      <View style={styles.container}>
      <View style={styles.rootCard}>
      <View style={styles.containerCard}>
        <Card style={styles.imageCard}>
        <Text>{i18n.t('Image')} : </Text>  
        {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}
          
          {/* <Text>Size</Text> */}
        </Card>
        <ButtonBox 
        width={(width*90)/100}
        action="secondary"
        size="lg"
        isIcon={true}
        icon={PaperclipIcon}
        text={i18n.t('Add_Attachment')}
        borderRadius={10}
        color={"#fff"}
        onClick={pickImageAsync}
        />
      </View>
      <View style={styles.bankInfo}>
        <Text size="lg">{i18n.t('Bank_Information')}</Text>

      </View>
      <View style={styles.body}>
        <Text size="md">{i18n.t('User_Account')}</Text>
        <SelectBox 
        placeholder={i18n.t('Select_Option')}
        />

      </View>
      <View style={styles.body}>
        <Text size="md">{i18n.t('Bank_Account')}</Text>
        <SelectBox 
        placeholder={i18n.t('Select_Option')}
        />

      </View>
      </View>
    </View>

    <View>
        <Card style={styles.summery}>
          <Text size="md" style={styles.total}>
            {i18n.t('Total')} : ${total}
          </Text>
          <ButtonBox
            action="negative"
            text={i18n.t('Submit')}
            width={(width * 35) / 100}
            borderRadius={10}
           
          />
        </Card>
      </View>

    </>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

  },
  rootCard : {
    marginHorizontal :  (width*6)/100
  },
  containerCard: {
    height : (height *  13)/100 ,
    marginVertical: 10,
    justifyContent : 'space-between',
    alignItems: "center",
  },
  imageCard: {
    width: (width * 90) / 100,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bankInfo : {
    marginVertical :  10
  },
  body : {
    marginVertical : 10,
    height : 80,
    // backgroundColor : 'red',
    justifyContent : 'space-between'
  },
  summery: {
    height: 100,
    flexDirection: "row",
    justifyContent: "space-around",
    // alignItems: "center",
  },
  total: {
    // fontSize : 19,
    letterSpacing: 1.5,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius : 8
  },
});
