import { View, StyleSheet,FlatList } from 'react-native'
import React from 'react'
import { Card,Text } from "@gluestack-ui/themed";
import Active from '../pages/active/Active';
import { LinearGradient } from 'expo-linear-gradient';
import AntDesign from '@expo/vector-icons/AntDesign';
import {items} from './data'



export default function orderHistory() {
  return (
    <View style={styles.container}>
        {/* <Active /> */}
        <LinearGradient
        // Button Linear Gradient
        colors={['#fff', '#fff']}
        style={styles.button}>
        <Text style={styles.text}>All Orders</Text>
        <Text style={styles.text}>
        <AntDesign name="filter" size={24} color="black" />
        </Text>
      </LinearGradient>
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
      />
        
    </View>
  )
}

const styles = StyleSheet.create({
    container : {
        flex : 1 ,
        backgroundColor : '#fff'
    },
    button: {
      flexDirection : 'row',
      justifyContent : 'space-between',
      padding: 15,
      // alignItems: 'center',
      borderRadius: 5,
    },
    text: {
      backgroundColor: 'transparent',
      fontSize: 15,
      color: '#000',
      letterSpacing : 1.0
    },
})