import { View, StyleSheet,FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { Card,Text } from "@gluestack-ui/themed";
import Active from '../../pages/active/Active';
import { LinearGradient } from 'expo-linear-gradient';
import { getActiveOrder } from '../../redux/slices/historySlice';
import items from '../../(drawer)/data';
import { getLocales } from 'expo-localization';
import { i18n } from '../../utils/libs/localization/Localization';
import useConfig from '../../lib/hook/config';
import PSpinner from '../../component/spinner/Spinner';



export default function Page() {
  const dispatch = useDispatch();
  const config = useConfig()
 const items = useSelector((state)=>state.historyReducer.order_active);
 const [isLoading, setIsLoading] = useState(true);
  const _language = useSelector((state)=>state.loginReducer.language) ;
  i18n.locale = getLocales()[_language].languageCode

  console.log(items)

  // useEffect(()=>{
  //   let option = {
  //     customer : config[2]
  //   }
  //   dispatch(getActiveOrder(option)).then(function(e){
  //     console.log(e.payload.message.message)
  //     setItems(e.payload.message.message)
  //   })
  // },[])
  return (
    <View style={styles.container}>
      
        <FlatList
        data={items}
        renderItem={({item}) => <Active 
        order={item.order.split(/[-]+/).pop()}
        total={item.total}
        items={item.items}
        status={item.status} 
        date={item.date}
        dataset={item}
        />}
        keyExtractor={item => item.id}
    //     ListHeaderComponent = {() => (
    //       <Text style={styles.text}>{i18n.t('Active')} {i18n.t('Orders')}</Text>
    //   )}
      ListEmptyComponent={()=>(
        <View style={{
          justifyContent : 'center',
          alignItems : 'center',
          margin : 10,
          padding :  10 
        }}>
          {
            isLoading ? 
            <PSpinner /> :
            <Text style={{
              fontSize : 12,
              letterSpacing : 1.0
            }}>No Item Found</Text>

          }
          </View>
      )}
      />
      
      
        
    </View>
  )
}

const styles = StyleSheet.create({
    container : {
        flex : 1 ,
        // backgroundColor : '#f8f8f8'
        backgroundColor : '#fff',
        justifyContent : 'center',
        // alignItems : 'center'
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