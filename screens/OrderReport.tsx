import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from "moment";
import { Dropdown } from "react-native-element-dropdown";
import { getStoreValue } from "../common/LocalStorage";


const OrderReport = ({ navigation }: any) => {

    const { control, handleSubmit, getValues, setValue, formState: { errors, isValid } } =
    useForm({ mode: "onChange" });
    const [showFromDate,setShowFromDate]=useState(false);
    const [showToDate,setShowToDate]=useState(false);
    const [customer, setCustomer] = useState([]);
    const [karigar, setKarigar] = useState([]);
    const [status, setStatus] = useState([]);
    const [selectedFromDate,setSelectedFromDate]=useState(new Date());
    const [selectedToDate,setSelectedToDate]=useState(new Date());
    const[selectedStatus,setSelectedStatus]=useState('');
    const[selectedKarigar,setSelectedKarigar]=useState('');
    const[selectedcustomer,setSelectedCustomer]=useState('');
    const [fromdate,setFromdate]=useState('');
    const [toDate,setTodate]=useState('');
    const [filterddata,setfilteredData]=useState([])
    
    useEffect(()=>{
        navigation.closeDrawer();
      },[]);

      useEffect(()=>{
        const getDropdownList = async()=>{
            axios.post('https://hgsonsapp.hgsons.in/master/karigar_list.php',{UserType:1,Token: await getStoreValue("token")}).then((res)=>{
              const arr=[];
              res.data.data.forEach((item:any)=>{
                const data={
                    label:item.KarigarName,
                    value:item.PartyId
                }
                arr.push(data);
            })
            setKarigar(arr)
            }).catch((err)=>{
              console.log('err:',err);
            })
        
            axios.post('https://hgsonsapp.hgsons.in/master/party_list.php',{PartyId:await getStoreValue('userId'),UserType:1,Token: await getStoreValue("token")}).then((res)=>{
              const arr=[];
                    res.data.data.forEach((item:any)=>{
                        const data={
                            label:item.PartyName,
                            value:item.PartyId
                        }
                        arr.push(data);
                    })
                    setCustomer(arr)
                }).catch((err)=>{
                    console.log('err:',err);
                })
            axios.post('https://hgsonsapp.hgsons.in/master/order_status_dropdown.php',{UsetType:'1',Token:await getStoreValue("token")}).then((res)=>{
                const arr=[];
                    res.data.data.forEach((item:any)=>{
                        const data={
                            label:item.OrderStatus,
                            value:item.OrderStatusId
                        }
                        arr.push(data);
                    })
                    setStatus(arr)
            }).catch((err)=>{
                console.log('err:',err);
                
            })
          }
          getDropdownList();
      },[])
    
      const onSearch = async()=>{
        axios.post('https://hgsonsapp.hgsons.in/master/search_order.php',{StartDate:fromdate,EndDate:toDate,PartyId:selectedcustomer,KarigarId:selectedKarigar,StatusId:selectedStatus,Token:await getStoreValue('token')}).then((res)=>{
            const arr=Object.values(res.data.data);
            let newArr=[];
                arr.map((item)=>{
                    const data= { 
                        srNo: 1,
                        orderNo:item.OrderNo,
                        orderDate:item.OrderDate,
                        orderType:item.OrderType,
                        customerName:'Test'
                    }
                    newArr.push(data);
                })    
                setfilteredData(newArr);
        }).catch((err)=>{
            console.log('err:',err);
        })
      }
      const arr=[1,2]
    return (
        <SafeAreaView style={{flex:1}}>
                <View style={styles.container}>
                    <View style={styles.headerMain}>
                        <Text style={styles.title}>{'ORDER ANALYSIS REPORT'}</Text>
                    </View>
                    <ScrollView>
                        <View style={styles.dataMain}>
                            <Text style={styles.labelText}>{'From Date'}</Text>
                            <TouchableOpacity onPress={()=>{setShowFromDate(true)}} style={styles.inputBox} >
                                <TextInput
                                    placeholder='dd-mm-yyyy'
                                    placeholderTextColor={'#28282B'}
                                    value={moment(selectedFromDate).format('YYYY-MM-DD').toString()}
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    editable={false}
                                    // onChangeText={(e)=>{setFromdate(moment(e).format('YYYY-DD-MM').toString())}}
                                    returnKeyType={"next"}
                                    style={{padding:0,paddingLeft:10,color:'#28282B'}}
                                />
                                <Icon name='calendar' color={'#28282B'} size={20} style={{position:'absolute',right:10,top:7}}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.dataMain}>
                            <Text style={styles.labelText}>{'To Date'}</Text>
                            <TouchableOpacity style={styles.inputBox} onPress={()=>{setShowToDate(true)}}>
                                <TextInput
                                    placeholder='dd-mm-yyyy'
                                    placeholderTextColor={'#28282B'}
                                    value={moment(selectedToDate).format('YYYY-MM-DD').toString()}
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    editable={false}
                                    // onChangeText={(e)=>{console.log("e::",e);}}
                                    returnKeyType={"next"}
                                    style={{padding:0,paddingLeft:10,color:'#28282B'}}
                                />
                                <Icon name='calendar' color={'#28282B'} size={20} style={{position:'absolute',right:10,top:7}}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.dataMain}>
                            <Text style={styles.labelText}>{'Customer'}</Text>
                            {/* <View style={styles.inputBox} > */}
                                <Dropdown
                                    style={styles.dropdown}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    data={customer}
                                    search
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    placeholder="Select Customer"
                                    searchPlaceholder="Search Customer"
                                    value={selectedcustomer}
                                    onChange={item => {
                                        setSelectedCustomer(item.value);
                                    }} 
                                />
                            {/* </View> */}
                        </View>
                        <View style={styles.dataMain}>
                            <Text style={styles.labelText}>{'Karigar'}</Text>
                            {/* <View style={styles.inputBox} > */}
                            <Dropdown
                                    style={styles.dropdown}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    data={karigar}
                                    search
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    placeholder="Select Karigar"
                                    searchPlaceholder="Search Karigar"
                                    value={selectedKarigar}
                                    onChange={item => {
                                        setSelectedKarigar(item.value);
                                    }} 
                                />
                            {/* </View> */}
                        </View>
                        <View style={styles.dataMain}>
                            <Text style={styles.labelText}>{'Status'}</Text>
                            {/* <View style={styles.inputBox} > */}
                            <Dropdown
                                    style={styles.dropdown}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    data={status}
                                    search
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    placeholder="Select Status"
                                    searchPlaceholder="Search Status"
                                    value={selectedStatus}
                                    onChange={item => {
                                        setSelectedStatus(item.value);
                                    }} 
                                />
                            {/* </View> */}
                        </View>
                        <TouchableOpacity style={styles.searchBtn} onPress={()=>onSearch()}>
                            <Text style={styles.searchTxt}>{'Search'}</Text>
                        </TouchableOpacity>
                        {showFromDate && 
                        <DateTimePicker

                        testID="dateTimePicker"
                        maximumDate={undefined}
                        minimumDate={undefined}
                        value={selectedFromDate}
                        mode={"date"}
                        is24Hour
                        display={"calendar"}
                        onChange={(e,d)=>{setShowFromDate(false);setSelectedFromDate(d)}}
                        // onChange={onChange}
                        textColor={"#28282B"}
                        accentColor={'#28282B'}
                        // neutralButtonLabel={'hello'}
                        disabled={false}
                      />

                        }
                        {showToDate && 
                        <DateTimePicker

                        testID="dateTimePicker"
                        maximumDate={undefined}
                        minimumDate={undefined}
                        value={selectedToDate}
                        mode={"date"}
                        is24Hour
                        display={"calendar"}
                        onChange={(e,d)=>{setShowToDate(false);setSelectedToDate(d)}}
                        // onChange={onChange}
                        textColor={"#28282B"}
                        accentColor={'#28282B'}
                        // neutralButtonLabel={'hello'}
                        disabled={false}
                      />

                        }
                        <View style={styles.cardContainer}>
                            {filterddata.map((item)=>{
                                return(
                            <View style={styles.cardMain}>
                                <View style={styles.bodyMain}>
                                    <Text style={styles.bodyTxt}>{'SR NO : '+1}</Text>
                                    <Text style={styles.bodyTxt}>{'Order NO : '+'001'}</Text>
                                    <Text style={styles.bodyTxt}>{'Order Date : '+'2022-02-21'}</Text>
                                    <Text style={styles.bodyTxt}>{'Order Type : '+'Order'}</Text>
                                    <Text style={styles.bodyTxt}>{'Customer Name : '+'Admin'}</Text>
                                </View>
                            </View>
                                )
                            })}
                        </View>
                    </ScrollView>    
                        <View style={styles.footerMain}>
                            <Text style={styles.footerTxt}>{'Privacy policy @ H.G.Sons, 2022'}</Text>
                        </View>
                </View>
        </SafeAreaView>
    )
}

export default OrderReport;

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFFAF0'
    },
    headerMain:{
        backgroundColor:'#28282B',
        // borderRadius:15,
        width:'100%',
        height:50,
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    title:{
        color:'#D4AF37',
        fontSize:20,
        fontWeight:'bold'
    },
    labelText:
    {
        // fontFamily: Font.MONTSERRAT_REGULAR,
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
        marginTop:10,
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        // textAlign:'center',
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
    searchBtn:{
        width:'80%',
        height:40,
        marginTop:20,        
        alignSelf:'center',
        backgroundColor:'#28282B',
        borderRadius:25,
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    searchTxt:{
        fontSize:20,
        color:'#D4AF37',
        fontWeight:"bold"
    },
    dropdown: {
        marginTop:8,
        marginLeft:10,
        // top:-5,
        height: 39,
        width:"100%",
        backgroundColor: '#F0F8FF',
        borderRadius: 5,
        paddingLeft:15,
        borderColor:'gray',
        borderWidth:1,
        paddingRight:10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
    
        elevation: 2,
      },
      placeholderStyle: {
        fontSize: 16,
      },
      selectedTextStyle: {
        fontSize: 16,
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },
      cardContainer:{
        flex:1,
     backgroundColor:'#FFFAF0' ,
     display:'flex',
     flexDirection:'column',
     marginTop:20,
     justifyContent:'center',
     alignItems:'center'
      },
      cardMain:{
        width:'80%',
        paddingRight:10,
        marginVertical:15,
        display:'flex',
        flexDirection:'column'
      },
      bodyMain:{
        width:300,
        height:170,
        borderRadius:10,
        display:'flex',
        padding:20,
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
        fontSize:18,
        color:'#D4AF37',
        fontWeight:'700'
      },
      footerMain:{
        width:'100%',
        display:'flex',
        backgroundColor:'#28282B',
        height:30,
        justifyContent:'center',
        alignItems:'center'
    },
    footerTxt:{
        fontSize:10,
        color:'#D4AF37'
    }
})