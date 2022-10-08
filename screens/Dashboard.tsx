import { Text } from 'native-base';
import axios from 'axios';
import React, { useEffect,useState } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getStoreValue } from '../common/LocalStorage';

const BarChartScreen = ({ navigation }: any) => {

  const [resData,setResData]=useState([])

  useEffect(()=>{
    navigation.closeDrawer();
  },[])
  useEffect(()=>{
    const getPartyData = async ()=>{
      axios.post('https://hgsonsapp.hgsons.in/master/party_list.php',{PartyId:await getStoreValue('userId'),Token:await getStoreValue('token')}).then((res)=>{
        setResData(res.data.data)
      }).catch((err)=>{
        console.log('err:',err);
      })
    }
    getPartyData()
  },[])

  return (
    <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.title}>{'Welcome To  H.G. Sons'}</Text>
        </View>
        <View style={styles.bodyMain}>
          <View style={styles.customerData}>
              <Text style={styles.custdetails}>{resData.length>0?`Welcome ${resData[0].PartyName}`:'Welcome ------'}</Text>
          </View>
          <View style={styles.cardContainer}>
            <View style={styles.cardMain}>
                <View style={styles.cardbodyMain}>
                <View style={styles.otherData}>
                  <Text style={styles.otherDateLabel}>{'Party GST-In : '}</Text>
                  <Text style={styles.otherDataValue}>{(resData.length>0 && resData[0].GSTNO!=='') ?resData[0].GSTNO:'-------'}</Text>
              </View>
              <View style={styles.otherData}>
                <Text style={styles.otherDateLabel}>{'Registered Mobile : '}</Text>
                <Text style={styles.otherDataValue}>{resData.length>0?resData[0].Mobile1:'------'}</Text>
            </View>
            <View style={styles.otherData}>
              <Text style={styles.otherDateLabel}>{'Registered Email : '}</Text>
              <Text style={styles.otherDataValue}>{resData.length>0?resData[0].Email:'-------'}</Text>
          </View>
                  <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:20}}>
                    <Text style={styles.bodyTxt}>{'Order Details Counter  '}</Text>
                    <TouchableOpacity onPress={()=>{navigation.navigate('OrderInfo',{title:'OrderDetails'})}} style={{marginRight:10}}>
                      <Icon name={'eye'} size={22} color={'#D4AF37'} style={{marginTop:30}}/>
                    </TouchableOpacity>
                  </View>
                  <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                    <Text style={styles.bodyTxt}>{'Order Status Counter '}</Text>
                    <TouchableOpacity onPress={()=>{navigation.navigate('OrderInfo',{title:'OrderStatus'})}} style={{marginRight:10}}>
                      <Icon name={'eye'} size={22} color={'#D4AF37'}  style={{marginTop:30}}/>
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
    color:'#D4AF37',
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
    paddingLeft:10,
    flexDirection:'row',
    marginTop:25,
    flexWrap:'wrap'
  },
  otherDateLabel:{
    fontSize:17,
    color:'#D4AF37',
    fontWeight:'500'
  },
  otherDataValue:{
    fontSize:16,
    color:'#D4AF37',
    fontWeight:'500',
  },
  cardContainer:{
    marginTop:10,
 backgroundColor:'#FFFAF0' ,
 display:'flex',
 flexDirection:'column',
 justifyContent:'center',
 alignItems:'center'
  },
  cardMain:{
    width:'100%',
    marginLeft:35,
    // paddingRight:10,
    marginVertical:5,
    display:'flex',
    flexDirection:'column'
  },
  cardbodyMain:{
    width:320,
    height:370,
    borderRadius:10,
    padding:10,
    backgroundColor:'white',
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
    paddingLeft:10,
    fontSize:18,
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
    color:'#D4AF37'
}
});

export default BarChartScreen;