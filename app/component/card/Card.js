import { Card,Heading,HStack,Image,Link, LinkText,Text,Icon,ArrowRightIcon,VStack,Button,ButtonText }  from "@gluestack-ui/themed";;
import { View,StyleSheet,Dimensions ,TouchableHighlight} from "react-native"
import ImageItem from "../image/ImageItem";
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const windowWidth = Dimensions.get("window").width;

	
export default function CardItem({type,title,rating,total,price,image,onPress}){
    return (
      <TouchableHighlight 
      style={{
        margin : 5,
        //  padding : 5
      }}
       onPress={onPress}
      >
        <Card size="md" className="" style={styles.container}
        variant="elevated"
        // borderRadius={20}
        
        >
          <View style={{
            alignItems : 'flex-end'
          }}>
            <MaterialIcons name="favorite-outline" size={24} color="black"  />
          </View> 
        <ImageItem
         
          src={image}
          alt="no image"
          size="xl"
        />
        <View style={{
          // backgroundColor : 'red',
          // marginTop : -40
        }}>
        <Text size="md" sub="true">
          #{type}
        </Text>
       <Text size="md" style={styles.textGap}>{title}</Text>
       <View style={styles.priceRoot}>
       <Text size="sm"> <AntDesign name="staro" size={15} color="black" /> {rating} | {total}</Text>
       <Text style={{
        color : 'green'
       }}> ${price}</Text>
       </View>
       </View>
       
      
      </Card>
      </TouchableHighlight>
);
}

const styles = StyleSheet.create({
    container : {
        borderRadius : 0,
        //  marginVertical : (windowWidth* 3)/100 ,
        // marginHorizontal : (windowWidth* 0.2)/100,
        backgroundColor : '#fff'
    },
    textGap : {
      marginVertical : 5
    },
    priceRoot : {
      flexDirection : 'row',
      justifyContent : 'space-between'
    }
})