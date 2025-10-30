import { ScrollView, View, StyleSheet, Dimensions,FlatList } from "react-native";
import {
  Card,
  Text,
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableHead,
  TableData,
  TableFooter,
} from "@gluestack-ui/themed";
import ImageItem from "../component/image/ImageItem";
import React from "react";

const height = Dimensions.get("window").height;
const data = [
    { id: '1', title: 'Trust',description : "Courage to let people lead." }, 
{ id: '2', title: 'Integrity',description : "Courage to stay true to our principles" },
{ id: '3', title: 'Curiosity',description : "Courage to shape the future" },
{ id: '4', title: 'Passion',description : "Courage to deliver the exceptional" }

];

const _2_data = [
    { id : 1 , title : "For Our People" ,description : "Equal Opportunities, Good Work Conditions, Community Development "},
    { id : 2 , title : "For Our Planet" ,description : "Sustainable supple Chain, Smaller Footprint"},
    { id : 3 , title : "For Our Performance" ,description : "Customer Satisfaction, Sustainable Growth"}
]

export default function aboutus() {
  return (
    // <ScrollView style={styles.rootContainer}>
    <FlatList
    data={data}
    keyExtractor={(item) => item.id}
    style={styles.rootContainer}
    ListHeaderComponent={() => (
        <View style={styles.container}>
        <View 
        // style={styles.header}
        style={{
          height :  (height * 4)/100,
          width : '50%'
        }}
        >
        <ImageItem 
          src="https://petromax-test.s3.ap-south-1.amazonaws.com/petromax-1709001.png"
          size= "full"
          />
          {/* <ImageItem
            src="https://petromax-test.s3.ap-south-1.amazonaws.com/petromax.png"
            size="xs"
          />
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>PETROMAX LPG</Text>
          </View> */}
        </View>
        {/* card */}

        <Card
          variant="ghost"
          style={{
            height: (height * 30) / 100,
          }}
        >
          <ImageItem
            src="https://petromax-test.s3.ap-south-1.amazonaws.com/Petromax-1609001.png"
            size="full"
          />
        </Card>

        {/* text */}
        <View style={styles.paragraph}>
          <View style={styles.paragraphGap}>
            <Text size="xl" bold>
              About Petromax LPG
            </Text>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 10,
          }}
        >
          <Text style={styles.thistext}>
            In August 2022, Petromax LPG became part of SHV Energy, the world’s
            leading distributor of LPG. This strategic partnership has enabled
            Petromax to integrate global expertise, advanced safety protocols,
            and sustainable practices into its operations—strengthening its
            position as a trusted energy provider in Bangladesh.
          </Text>
          <View style={styles.gap}>
            <Text style={styles.thistext}>
              As a member of this global network, Petromax LPG proudly upholds
              SHV Energy’s values of safety, reliability, and
              sustainability—while continuing to meet the growing energy needs
              of Bangladesh with world-class standards.
            </Text>
          </View>
        </View>
        {/* 2nd para */}
        <View style={styles.paragraph}>
          <View style={styles.paragraphGap}>
            <Text size="xl" bold>
              Purpose and Values
            </Text>
          </View>
        </View>
        <View
          style={{
            padding: 10,
          }}
        >
          <Text style={styles.thistext}>
            We Share our Purpose, core values and ambitions with our parent
            company SHV
          </Text>
          <View
            style={{
              paddingVertical: 10,
            }}
          >
            <Card
              variant="ghost"
              style={{
                height: (height * 30) / 100,
              }}
            >
              <ImageItem
                src="https://petromax-test.s3.ap-south-1.amazonaws.com/Petromax-1609002.png"
                size="2xl"
              />
            </Card>
          </View>
        </View>
        {/* 3rd para */}
        <View style={styles.paragraph}>
          <View style={styles.paragraphGap}>
            <Text size="xl" bold>
              Courage to Care for Generations to Come
            </Text>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 10,
          }}
        >
          <Text style={styles.thistext}>
            The courage to care means a promise to shape the future, not simply
            adapt to it. For everyone at Petromax LPG, every day provides the
            inspiration to create a better tomorrow for generations to come.
          </Text>
          <View style={styles.gap}>
            <Text style={styles.thistext}>
              Petromax LPG proudly shares its purpose, core values and ambitions
              with parent company SHV. We are tens of thousands talented
              individuals from all around the world. We are a family of
              companies active in various industries operating across
              continents. Our purpose is the glue that connects us.
            </Text>
          </View>
          <View style={styles.gap2}>
            <Text style={styles.thistext}>
              A defined purpose makes the difference between knowing how we
              should go about our work and understanding why we are all proud to
              do so. A long-term vision supported by our shareholders.
            </Text>
          </View>
        </View>
        {/* values */}

        <View style={styles.paragraph}>
          <View style={styles.paragraphGap}>
            <Text size="xl" bold>
              Values
            </Text>
          </View>
        </View>
        
      </View>
    )}
    renderItem={({ item }) => <View 
    style={styles.element}
    >
        <Text bold>{item.title}</Text>
        <Text style={{marginTop:3}}>{item.description}</Text>
    </View>}
    ListFooterComponent={() => (
        
        <FlatList
        data={_2_data}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={()=>(
            <View style={{
                height : (height*10)/100,
                justifyContent : 'center',
                paddingHorizontal :  10 ,
                marginHorizontal :  20 
            }}>
                <Text size="xl" bold>Our Ambitions</Text>
            </View> 
        )}
        renderItem={({ item }) => <View 
        style={styles.element}
        >
            <Text bold>{item.title}</Text>
            <Text style={{marginTop:3}}>{item.description}</Text>
        </View>}

        ListFooterComponent={()=>(
            <View style={{
                marginTop :  40 ,
                height : 100,
               
                justifyContent : 'center',
                alignItems : 'center'
            }}>

         <View style={{
//              height : 500,
// //  flexDirection : 'column',
// //  justifyContent : 'space-around'
//  backgroundColor : 'red',
// justifyContent : 'center',
// alignItems : 'center',
// width : '100%'
height :  (height * 4)/100,
width : '50%'
         }}>
           {/* <ImageItem
            src="https://petromax-test.s3.ap-south-1.amazonaws.com/petromax.png"
            size="xs"
          />
          <View>
            <Text>PETROMAX LPG</Text>
          </View> */}
          <ImageItem 
          src="https://petromax-test.s3.ap-south-1.amazonaws.com/petromax-1709001.png"
          size= "full"
          />
        </View>
                

            </View>
        )}
        />

        

    )}
  />
    // </ScrollView>
  );
}

const styles = StyleSheet.create({
  
  rootContainer: {
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    // justifyContent: "flex-start",
    padding: 10,
  },
  header: {
    padding: 10,
    flexDirection: "row",
  },
  paragraph: {
    padding: 10,
  },
  paragraphGap: {
    marginVertical: 10,
  },
  gap: {
    paddingVertical: 10,
  },
  thistext: {
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 10,
    lineHeight: 24,
    flexShrink: 1,
    textAlign: "justify",
  },
  //   table
  values: {
   
  },
  element: {
    height  : (height*10)/100 ,
    borderWidth : 1 ,
    borderColor : '#DBDBDB',
    paddingHorizontal : 10 ,
    marginHorizontal : 20 ,
    justifyContent : 'center',

}
});
