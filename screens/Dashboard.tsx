import { Text } from 'native-base';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getStoreValue } from '../common/LocalStorage';

const BarChartScreen = ({ navigation }: any) => {

  const [resData, setResData] = useState([])
  const [statusData, setStatusdata] = useState([])

  useEffect(() => {
    navigation.closeDrawer();
  }, [])
  useEffect(() => {
    const getPartyData = async () => {
      axios.post('https://hgsonsapp.hgsons.in/master/party_list.php', { PartyId: await getStoreValue('userId'), Token: await getStoreValue('token') }).then((res) => {
        setResData(res.data.data)
      }).catch((err) => {
        console.log('err:', err);
      })
      axios.post('https://hgsonsapp.hgsons.in/master/dashboard.php', { PartyId: await getStoreValue('userId'), Token: await getStoreValue('token') }).then((res) => {
        console.log('res:',res.data);
        setStatusdata(res.data.data)
      }).catch((err) => {
        console.log('err:', err);
      })
    }
    getPartyData()
  }, [])

  const arr=[1,2,3];
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{'Welcome To  H.G. Sons'}</Text>
        </View>
        <View style={styles.bodyMain}>
          <View style={styles.cardContainer}>
            <View style={styles.cardMain}>
              <View style={styles.cardbodyMain}>
                <View style={styles.otherData}>
                  <View style={{display:'flex',justifyContent:'space-between',width:'40%',flexDirection:'row'}}>
                  <Text style={styles.otherDateLabel}>{'NAME'}</Text>
                  <Text>{':'}</Text>
                  </View>
                  <Text style={styles.otherDataValue}>{(resData.length > 0 && resData[0].PartyName !== '') ? resData[0].PartyName : '-------'}</Text>
                </View>
                <View style={styles.otherData}>
                <View style={{display:'flex',justifyContent:'space-between',width:'40%',flexDirection:'row'}}>
                  <Text style={styles.otherDateLabel}>{'MOBILE'}</Text>
                  <Text >{':'}</Text>
                </View>
                  <Text style={styles.otherDataValue}>{resData.length > 0 ? resData[0].Mobile1 : '------'}</Text>
                </View>
                <View style={styles.otherData}>
                <View style={{display:'flex',justifyContent:'space-between',width:'40%',flexDirection:'row'}}>
                  <Text style={styles.otherDateLabel}>{'EMAIL'}</Text>
                  <Text >{':'}</Text>
                </View>
                  <Text style={styles.otherDataValue}>{resData.length > 0 ? resData[0].Email : '-------'}</Text>
                </View>
                <View style={styles.otherData}>
                <View style={{display:'flex',justifyContent:'space-between',width:'40%',flexDirection:'row'}}>
                  <Text style={styles.otherDateLabel}>{'GST-IN'}</Text>
                  <Text >{':'}</Text>
                </View>
                  <Text style={styles.otherDataValue}>{(resData.length > 0 && resData[0].GSTNO !== '') ? resData[0].GSTNO : '-------'}</Text>
                </View>
              </View>
            </View>
            <View style={[styles.cardMain,styles.second]}>
              <View style={[styles.cardbodyMain,styles.secondMain]}>
                <View style={styles.headerMain}>
                    <Text style={styles.headerTitle}>{'Order Dashboard'}</Text>
                </View>
            {arr.map(()=>{
               return( <View style={styles.otherData}>
                  <Text style={[styles.otherDateLabel,styles.headerOne]}>{'waiting'}</Text>
                  <Text style={[styles.otherDataValue,styles.headerTwo]}>{'1'}</Text>
                  <Icon name='eye' size={22} color={'#D4AF37'} style={{paddingLeft:10}}/>
                </View>)
            })}
              </View>
            </View>
          </View>
        </View>
        <View style={styles.footerMain}>
          <Text style={styles.footerTxt}>{'privacy policy, T&C @ H.G. Sons © 2022'}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFAF0',
    width: '100%',
  },
  header: {
    backgroundColor: '#28282B',
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  title: {
    fontSize: 22,
    color: '#D4AF37',
    fontWeight: 'bold'
  },
  bodyMain: {
    width: '100%',
    height: '100%',
    paddingVertical: 0
  },
  customerData: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40
  },
  custdetails: {
    fontSize: 22,
    color: '#28282B',
    fontWeight: 'bold'
  },
  otherData: {
    display: 'flex',
    paddingLeft: 10,
    flexDirection: 'row',
    marginTop: 15,
    flexWrap: 'wrap'
  },
  otherDateLabel: {
    width:'100%',
    fontSize: 16,
    color: '#D4AF37',
    fontWeight: '500'
  },
  otherDataValue: {
    width:'60%',
    fontSize: 14,
    paddingLeft:15,
    color: '#28282B',
    fontWeight: 'bold',
  },
  cardContainer: {
    marginTop: 10,
    backgroundColor: '#FFFAF0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  otherCard:{
    marginTop: 10,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  otherCardMain:{
    width: '100%',
    marginLeft: 35,
    // paddingRight:10,
    marginVertical: 5,
    display: 'flex',
    flexDirection: 'column'
  },
  cardMain: {
    width: '100%',
    marginLeft: 35,
    // paddingRight:10,
    marginVertical: 5,
    display: 'flex',
    flexDirection: 'column'
  },
  second:{
    marginTop:10
  },
  cardbodyMain: {
    width: 320,
    height: 180,
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1.41,

    elevation: 20,
  },
  secondMain:{
    height: 250,
  },
  headerMain:{
    width:'100%',
    flexDirection:'row',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    padding:10
  },
  headerOne:{
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'center',
    width:'70%'
  },
  headerTitle:{   
    color:'#28282B',
    fontSize:18,
    fontWeight:'bold',
  },
  headerTwo:{
    width:'10%'
  },
  headerThree:{
    paddingLeft:10,
    width:'10%'
  },
  bodyTxt: {
    paddingTop: 10,
    paddingLeft: 10,
    fontSize: 18,
    marginTop: 20,
    color: '#D4AF37',
    fontWeight: '700'
  },
  footerMain: {
    width: '100%',
    display: 'flex',
    backgroundColor: '#28282B',
    height: 30,
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerTxt: {
    fontSize: 10,
    color: '#D4AF37'
  }
});

export default BarChartScreen;