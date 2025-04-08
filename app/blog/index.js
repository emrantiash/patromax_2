import { StyleSheet, View, Text ,Button} from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

export default function Page() {
  const router = useRouter()
  return (
    <View style={styles.container}>
        
        <Text style={styles.title}>Blog page</Text>
        <Button onPress={()=>router.back()} title='Go Back' /> 
        
     
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      padding: 24,
    },
    main: {
      flex: 1,
      justifyContent: "center",
      maxWidth: 960,
      marginHorizontal: "auto",
    },
    title: {
      fontSize: 14,
      // fontWeight: "bold",
    },
    subtitle: {
      fontSize: 36,
      color: "#38434D",
    },
  });