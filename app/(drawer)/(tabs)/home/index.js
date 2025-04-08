import { View, StyleSheet,FlatList } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { Card,Text } from "@gluestack-ui/themed";
import Active from '../../../pages/active/Active';
import { LinearGradient } from 'expo-linear-gradient';
import AntDesign from '@expo/vector-icons/AntDesign';
import {items,past_items} from '../../data'
import { getLocales } from 'expo-localization';
import { i18n } from "../../../utils/libs/localization/Localization";


export default function Page() {
  const _language = useSelector((state)=>state.loginReducer.language) ;
  i18n.locale = getLocales()[_language].languageCode
  return (
    <View style={styles.container}>
      
        <FlatList
        data={items}
        renderItem={({item}) => <Active 
        order={item.order}
        total={item.total}
        items={item.items}
        status={item.status} 
        date={item.date}
        dataset={item}
        />}
        keyExtractor={item => item.id}
        ListHeaderComponent = {() => (
          <Text style={styles.text}>{i18n.t('Active')} {i18n.t('Orders')}</Text>
      )}
      />
       <FlatList
        data={past_items}
        renderItem={({item}) => <Active 
        order={item.order}
        total={item.total}
        items={item.items}
        status={item.status} 
        date={item.date}
        dataset={item}
        />}
        keyExtractor={item => item.id}
        ListHeaderComponent = {() => (
          <Text style={styles.text}>{i18n.t('Past')} {i18n.t('Orders')}</Text>
      )}
      />
      
        
    </View>
  )
}

const styles = StyleSheet.create({
    container : {
        // flex : 1 ,
        backgroundColor : '#f8f8f8'
    },
    button: {
      flexDirection : 'row',
      justifyContent : 'space-between',
      padding: 15,
      // alignItems: 'center',
      borderRadius: 5,
    },
    text: {
      // backgroundColor: 'transparent',
      // fontSize: 15,
      // color: '#000',
      paddingHorizontal : 20,
      paddingTop : 20 ,
      letterSpacing : 1.0
    },
})