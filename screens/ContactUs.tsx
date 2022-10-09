import axios from "axios";
import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native";
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getStoreValue } from "../common/LocalStorage";
import Navigation from "../navigation";


const ContactUs = ({navigation}:any) => {

    const [fullName,setFullName]=useState('')
    const [email,setEmail]=useState('')
    const [remarks,setRemarks]=useState('')

   const onSubmit =async()=>{
    let data={FullName:fullName,Email:email,Remarks:remarks,PartyId:await getStoreValue('userId'),Token:await getStoreValue('token')}
    
    axios.post('https://hgsonsapp.hgsons.in/master/contact_us.php',{FullName:fullName,Email:email,Remarks:remarks,PartyId:await getStoreValue('userId'),Token:await getStoreValue('token')}).then((res)=>{
        ToastAndroid.show(res.data.message,ToastAndroid.TOP);
        // navigation.navigate('ContractorDashboard')
    }).catch((err)=>{
        ToastAndroid.show('Something went wrong!',ToastAndroid.TOP)
        console.log('err:',err);
    })
   }
    return(
        <SafeAreaView style={{flex:1}}>
            <ScrollView style={{width:'100%',height:'100%',backgroundColor:'#FFFAF0'}}>
                <View style={{flex:1}}>
                    <View style={styles.headerMain}>
                        <Text style={styles.headerTitle}>{'How Can We Help You?'}</Text>
                    </View>
                    <View style={styles.locationMain}>
                            <Text style={styles.locationTitle}>{'Our Location'}</Text>
                            {/* <Icon name={'map-marker'} size={20}  /> */}
                            <Text style={styles.locationLabel}>{'H.G. & Sons  '}<Icon name={'map-marker'} size={20}  /></Text>
                            <Text style={styles.locationValue}>{'Ashapura Main Rd, Prahlad Plot, Rajkot, Gujarat 360001'}</Text>
                            <Text style={styles.locationLabel}>{'Telephone  '}<Icon name={'phone'} size={20}  /></Text>
                            <Text style={styles.locationValue}>{'088662 75875'}</Text>
                            <Text style={styles.locationLabel}>{'Fax  '}<Icon name={'fax'} size={20}  /></Text>
                            <Text style={styles.locationValue}>{'88662 75875'}</Text>
                            <Text style={styles.locationLabel}>{'Opening Times  '}<Icon name={'clock-o'} size={20}  /></Text>
                            <Text style={styles.locationValue}>{'10:00 AM - 6:00 PM'}</Text>
                    </View>
                    <View style={styles.formMain}>
                        <View style={styles.dataMain}>
                            <Text style={styles.labelText}>{'Your Name'}</Text>
                            <View style={styles.inputBox} >
                                <TextInput
                                    placeholder='Enter Your Name'
                                    placeholderTextColor={'#28282B'}
                                    keyboardType='default'
                                    value={fullName}
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    onChangeText={(e)=>{setFullName(e)}}
                                    returnKeyType={"next"}
                                    style={{padding:0,paddingLeft:10,color:'#28282B'}}
                                />
                            </View>
                        </View>
                        <View style={styles.dataMain}>
                            <Text style={styles.labelText}>{'Email'}</Text>
                            <View style={styles.inputBox} >
                                <TextInput
                                    placeholder='Enter Your Email'
                                    placeholderTextColor={'#28282B'}
                                    keyboardType='email-address'
                                    value={email}
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    onChangeText={(e)=>{setEmail(e)}}
                                    returnKeyType={"next"}
                                    style={{padding:0,paddingLeft:10,color:'#28282B'}}
                                />
                            </View>
                        </View>
                        <View style={styles.dataMain}>
                            <Text style={styles.labelText}>{'Remarks'}</Text>
                            <View style={styles.inputAreaBox} >
                                <TextInput
                                numberOfLines={4}
                                    placeholder='Enter Remarks'
                                    placeholderTextColor={'#28282B'}
                                    keyboardType='default'
                                    value={remarks}
                                    autoCorrect={false}
                                    autoCapitalize="Done"
                                    onChangeText={(e)=>{setRemarks(e)}}
                                    returnKeyType={"next"}
                                    style={{padding:0,paddingLeft:10,color:'#28282B'}}
                                />
                            </View>
                        </View>
                        <View style={styles.btnMain}>
                            <TouchableOpacity style={styles.btn} onPress={onSubmit}>
                                <Text style={styles.btnTxt}>{'Submit'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                    {/* <MapView
                        initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                        }}
                    /> */}
                    </View>
                </View>
            </ScrollView>
            <View style={styles.footerMain}>
                <Text style={styles.footerTxt}>{'privacy policy, T&C @ H.G. Sons © 2022'}</Text>
            </View>
        </SafeAreaView>
    )
}

export default ContactUs;

const styles = StyleSheet.create({
    headerMain:{
        width:'100%',
        height:50,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginTop:20,
    },
    headerTitle:{
        color:'#28282B',
        fontSize:26,
        fontWeight:'bold'
    },
    formMain:{
        display:'flex',
        width:'100%',
        flexDirection:"column",
        marginTop:30,
        height:'100%'
    },
    labelText:
    {
        color: '#28282B',
        lineHeight: 17.07,
        fontSize: 16,
        marginLeft:5,
        fontWeight:'bold',
    },
    dataMain:{
        width:'90%',
        marginVertical:5,
        marginHorizontal:5,
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        justifyContent:'flex-start',
        marginLeft:10
    },
    inputBox:
    {
        borderColor:'gray',
        borderWidth:1,
        height:35,
        width:'100%',
        marginTop:10,
        marginLeft:10,
        borderRadius:5,
        backgroundColor:'#F0F8FF'
    },
    inputAreaBox:
    {
        borderColor:'gray',
        borderWidth:1,
        height:65,
        width:'100%',
        marginTop:10,
        marginLeft:10,
        borderRadius:5,
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',
        backgroundColor:'#F0F8FF'
    },
    btnMain:{
        display:'flex',
        width:'100%',
        height:50,
        marginTop:20,
        justifyContent:"center",
        alignItems:'flex-end',
        paddingRight:20
    },
    btn:{
        width:110,
        height:45,
        borderRadius:8,
        display:'flex',
        borderColor:'#28282B',
        borderWidth:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#28282B'
    },
    btnTxt:{
        fontSize:18,
        color:'#D4AF37',
        fontWeight:'900'
    },
    footerMain:{
        width:'100%',
        display:'flex',
        backgroundColor:'#28282B',
        height:30,
        marginTop:20,
        justifyContent:'center',
        alignItems:'center'
    },
    footerTxt:{
        fontSize:10,
        color:'#D4AF37'
    },
    locationMain:{
        width:'100%',
        display:'flex',
        alignItems:'flex-start',
        flexDirection:'column',
        marginTop:10,
        paddingLeft:20
    },
    locationTitle:{
        fontSize:18,
        color:'#28282B',
        fontWeight:'bold'
    },
    locationValue:{
        width:200
    },
    locationLabel:{
        marginTop:10,
        fontSize:14 ,
        fontWeight:'600',
    }
})