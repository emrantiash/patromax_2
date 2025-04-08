import { ScrollView,View, StyleSheet,Dimensions,FlatList } from "react-native";
import React,{useState,useEffect} from "react";
import {useDispatch,useSelector } from "react-redux";
import { removeItem,positiveSignCalled,negativeSignCalled, storeData } from "../../redux/slices/cartSlice";
import { 
    Card, 
    Text, 
    AddIcon,
    TrashIcon,
    RemoveIcon } from "@gluestack-ui/themed";
import ImageItem from "../../component/image/ImageItem";
import ButtonBox from "../../component/button/Button";
import InputBox from "../../component/input/Input";

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function Cart() {
    const dispatch = useDispatch()
   const [data,setData] = useState(useSelector((state) => state.cartReducer.data));
//    console.log(data)
//   const data = useSelector((state) => state.cartReducer.data);
  const [value,setValue] = useState("1")
  const [total,setTotal] = useState(0.0)

 
  useEffect(()=>{
    let total = 0.0 
    data?.map((data)=>{
        total = total + parseFloat(data?.price)
    })
    setTotal(total)
    setData()

  },[data])

  const _deleteItem = (action)=>{
    // console.log(item)
    setData(data.filter(item => item.id !== action.id))
    // dispatch(removeItem(item))
  }

  const positiveCalled=(thisItem)=>{
    const item = data.find((x) => x.id === thisItem.id );
      const updatedItem = {
        ...thisItem,
        quantity: parseInt(thisItem.quantity)+1 ,
        price : parseInt(thisItem.basePrice) * (parseInt(thisItem.quantity)+1)
      };
      const newState = [...data];
      newState.splice(data.indexOf(item), 1, updatedItem);
      setData(newState);
   
  }

  useEffect(()=>{
    dispatch(storeData(data))
    setData(data)

  },[data])

  const negetiveCalled = (thisItem)=>{
    if(thisItem.quantity>1)
    {
        const item = data.find((x) => x.id === thisItem.id );
        const updatedItem = {
          ...thisItem,
          quantity: parseInt(thisItem.quantity)-1 ,
          price : parseInt(thisItem.basePrice) * (parseInt(thisItem.quantity)-1)
        };
        const newState = [...data];
        newState.splice(data.indexOf(item), 1, updatedItem);
        setData(newState);
    }
  }
  const renderNoStateMessage = () => {
    <View>
      <Text>No Item Found</Text>
    </View>
  }
  return (
    <View style={styles.container}>
        {
            data?.length == 0 &&
            <Text style={{
                fontSize : (width * 4)/100,
                letterSpacing : 1.0
            }}>No Item Found</Text>
        }
        {/* <ScrollView> */}
        <FlatList
    //    numColumns={2}
    ListEmptyComponent={renderNoStateMessage}
        data={data}
        renderItem={({item}) => 
        <Card style={styles.mycart}>
          <View style={styles.header}>
            <View style={styles.leftSide}>
                <View style={styles.image}>
                <ImageItem src={item.image} size="xs" borderWidth={1}/>
                </View>
               
                <View>
                <Text size="sm">{item.id+item.name}</Text>
                <Text size="sm">Capacity : {data.capacity}</Text>
                <Text size="sm">${item.price}</Text>
                </View>
            </View>
            <View style={styles.rightSide}>
                <View 
                style={{

                    alignItems : 'flex-end'
                }}>
                <ButtonBox 
                text=""
                action="default"
                width = {(width * 5)/100}
                size= "xs"
                icon ={TrashIcon}
                onClick={()=>_deleteItem(item)}
                color={"red"}
                />
                </View>
            <View style={{
                width : '50%',
                flexDirection : 'row',
                justifyContent : 'center',
                alignItems : 'center'
            }}> 
            <ButtonBox 
                text=""
                action="default"
                width = {(width * 5)/100}
                size= "xs"
                icon ={RemoveIcon}
                onClick={()=>negetiveCalled(item)}
                />
            <InputBox 
            isReadOnly={true}
            size="md"
            isnumber={true} 
            width = {30}
            height={20}
            value = {item?.quantity?.toString()}
            fontSize= {10}
            color = "green"
            />
            <ButtonBox 
                text=""
                action="default"
                width = {(width * 10)/100}
                size= "xs"
                icon ={AddIcon}
                onClick={()=>positiveCalled(item)}
                />
               
            </View>
            </View>
          </View>
        </Card>
    }
        keyExtractor={item => item.id}
  
      ListFooterComponent={() => (
        <Text style={{ fontSize: 10, textAlign: "center",marginBottom:20,fontWeight:'bold' }}></Text>
    )}
        // scrollToEnd = {()=>scrollToItem(animated,item,viewPosition)}
      />
      {/* {data.map((data, index) => (
        <Card key={index} style={styles.mycart}>
          <View style={styles.header}>
            <View style={styles.leftSide}>
                <View style={styles.image}>
                <ImageItem src={data.image} size="xs" borderWidth={1}/>
                </View>
               
                <View>
                <Text size="sm">{data.id+data.name}</Text>
                <Text size="sm">Capacity : {data.capacity}</Text>
                <Text size="sm">${data.price}</Text>
                </View>
            </View>
            <View style={styles.rightSide}>
                <View 
                style={{

                    alignItems : 'flex-end'
                }}>
                <ButtonBox 
                text=""
                action="default"
                width = {(width * 5)/100}
                size= "xs"
                icon ={TrashIcon}
                onClick={()=>_deleteItem(data)}
                color={"red"}
                />
                </View>
            <View style={{
                width : '50%',
                flexDirection : 'row',
                justifyContent : 'center',
                alignItems : 'center'
            }}> 
            <ButtonBox 
                text=""
                action="default"
                width = {(width * 5)/100}
                size= "xs"
                icon ={RemoveIcon}
                onClick={()=>negetiveCalled(data)}
                />
            <InputBox 
            isReadOnly={true}
            size="md"
            isnumber={true} 
            width = {30}
            height={20}
            value = {data?.quantity?.toString()}
            fontSize= {10}
            color = "green"
            />
            <ButtonBox 
                text=""
                action="default"
                width = {(width * 10)/100}
                size= "xs"
                icon ={AddIcon}
                onClick={()=>positiveCalled(data)}
                />
               
            </View>
            </View>
          </View>
        </Card>
      ))} */}
      {/* </ScrollView> */}
      <View>
        <Card style={styles.summery}>
        <Text size="md"  style={styles.total}>Total : ${total}</Text> 
        <ButtonBox 
        action="negative"
        text="Confirm"
        width = {150}
        borderRadius={10}
        />
        </Card>
       
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent : 'center',
    // alignItems : 'center',
    backgroundColor: "#fff",
  },
  mycart: {
    marginVertical: 5,
    marginHorizontal : 10,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    // backgroundColor: "#fff",
  },
  header: {
    width: "100%",
    // backgroundColor : 'red',
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: "center",
  },
  image : {
    justifyContent : 'center',

  },
  leftSide :{
    // backgroundColor : 'red',
    flexDirection : 'row',
    justifyContent : 'space-between',
    width : '60%'
  },
  rightSide : {
    // backgroundColor : 'yellow',
    flexDirection : 'column',
    justifyContent : 'space-between',
     alignItems : 'flex-end'
  },
  summery : {
    height : 100,
    flexDirection : 'row',
    justifyContent : 'space-around',
    alignItems : 'center'
},
total : {
    // fontSize : 19,
    letterSpacing :1.5
}
});
