import { Text } from 'native-base';
import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const BarChartScreen = ({ navigation }: any) => {

  useEffect(()=>{
    navigation.closeDrawer();
  },[])

  return (
    <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.title}>{'Welcome To  H.G. Sons'}</Text>
        </View>
        <View style={styles.bodyMain}>
          <View style={styles.customerData}>
              <Text style={styles.custdetails}>{'Welcome Customer Name'}</Text>
          </View>
          <View style={styles.otherData}>
              <Text style={styles.otherDateLabel}>{'Party GST-In : '}</Text>
              <Text style={styles.otherDataValue}>{'ABFDHN12348'}</Text>
          </View>
          <View style={styles.otherData}>
              <Text style={styles.otherDateLabel}>{'Registered Mobile : '}</Text>
              <Text style={styles.otherDataValue}>{'1234567890'}</Text>
          </View>
          <View style={styles.otherData}>
              <Text style={styles.otherDateLabel}>{'Registered Email : '}</Text>
              <Text style={styles.otherDataValue}>{'abc@gmail.com'}</Text>
          </View>
          <View style={styles.cardContainer}>
            <View style={styles.cardMain}>
                <View style={styles.cardbodyMain}>
                  <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                    <Text style={styles.bodyTxt}>{'Order Details Counter  '}</Text>
                    <TouchableOpacity>
                      <Icon name={'info-circle'} size={22} color={'#D4AF37'} style={{marginTop:30}} onPress={()=>{}}/>
                    </TouchableOpacity>
                  </View>
                  <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                    <Text style={styles.bodyTxt}>{'Order Status Counter '}</Text>
                    <TouchableOpacity>
                      <Icon name={'info-circle'} size={22} color={'#D4AF37'}  style={{marginTop:30}}/>
                    </TouchableOpacity>
                   </View> 
                </View>
            </View>
          </View>
        </View>
          <View style={styles.footerMain}>
              <Text style={styles.footerTxt}>{'Privacy policy @ H.G.Sons, 2022'}</Text>
          </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFAF0',
    width:'100%',
  },
  header:{
    backgroundColor:'#28282B',
    display:'flex',
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
    height:50,
  },
  title:{
    fontSize:22,
    color:'#FFFAF0',
    fontWeight:'bold'
  },
  bodyMain:{
    width:'100%',
    height:'100%',
    paddingVertical:10
  },
  customerData:{
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    height:40
  },
  custdetails:{
    fontSize:22,
    color:'#28282B',
    fontWeight:'bold'
  },
  otherData:{
    display:'flex',
    paddingLeft:30,
    flexDirection:'row',
    marginTop:25,
    flexWrap:'wrap'
  },
  otherDateLabel:{
    fontSize:20,
    color:'#D4AF37',
    fontWeight:'500'
  },
  otherDataValue:{
    fontSize:20,
    color:'#D4AF37',
    fontWeight:'500',
  },
  cardContainer:{
    marginTop:60,
 backgroundColor:'#FFFAF0' ,
 display:'flex',
 flexDirection:'column',
 justifyContent:'center',
 alignItems:'center'
  },
  cardMain:{
    width:'100%',
    marginLeft:55,
    // paddingRight:10,
    marginVertical:15,
    display:'flex',
    flexDirection:'column'
  },
  cardbodyMain:{
    width:300,
    height:170,
    borderRadius:10,
    padding:10,
    backgroundColor:'#28282B',
    shadowColor: '#000',
shadowOffset: {
  width: 0,
  height: 1,
},
shadowOpacity: 0.5,
shadowRadius: 1.41,

elevation: 20,
  },
  bodyTxt:{
    paddingTop:10,
    paddingLeft:20,
    fontSize:22,
    marginTop:20,
    color:'#D4AF37',
    fontWeight:'700'
  },
  footerMain:{
    width:'100%',
    display:'flex',
    backgroundColor:'#28282B',
    height:30,
    position:'absolute',
    bottom:0,
    justifyContent:'center',
    alignItems:'center'
},
footerTxt:{
    fontSize:10,
    color:'yellow'
}
});

export default BarChartScreen;