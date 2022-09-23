import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
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


const OrderReport = ({ navigation }: any) => {
    const { control, handleSubmit, getValues, setValue, formState: { errors, isValid } } =
    useForm({ mode: "onChange" });
    const [showFromDate,setShowFromDate]=useState(false);
    const [showToDate,setShowToDate]=useState(false);
    const [customer, setCustomer] = useState(null);
    const [karigar, setKarigar] = useState(null);
    const [status, setStatus] = useState(null);

    const data = [
        { label: 'Item 1', value: '1' },
        { label: 'Item 2', value: '2' },
        { label: 'Item 3', value: '3' },
        { label: 'Item 4', value: '4' },
        { label: 'Item 5', value: '5' },
        { label: 'Item 6', value: '6' },
        { label: 'Item 7', value: '7' },
        { label: 'Item 8', value: '8' },
      ];
    

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
                                    value={'01'}
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    editable={false}
                                    // onChangeText={onChange}
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
                                    value={'01'}
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    editable={false}
                                    // onChangeText={onChange}
                                    returnKeyType={"next"}
                                    style={{padding:0,paddingLeft:10,color:'#28282B'}}
                                />
                                <Icon name='calendar' color={'#28282B'} size={20} style={{position:'absolute',right:10,top:7}}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.dataMain}>
                            <Text style={styles.labelText}>{'Customer'}</Text>
                            <View style={styles.inputBox} >
                                <Dropdown
                                    style={styles.dropdown}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    data={data}
                                    search
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    placeholder="Select Customer"
                                    searchPlaceholder="Search Customer"
                                    value={customer}
                                    onChange={item => {
                                        setCustomer(item.value);
                                    }} 
                                />
                            </View>
                        </View>
                        <View style={styles.dataMain}>
                            <Text style={styles.labelText}>{'Karigar'}</Text>
                            <View style={styles.inputBox} >
                            <Dropdown
                                    style={styles.dropdown}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    data={data}
                                    search
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    placeholder="Select Karigar"
                                    searchPlaceholder="Search Karigar"
                                    value={karigar}
                                    onChange={item => {
                                        setKarigar(item.value);
                                    }} 
                                />
                            </View>
                        </View>
                        <View style={styles.dataMain}>
                            <Text style={styles.labelText}>{'Status'}</Text>
                            <View style={styles.inputBox} >
                            <Dropdown
                                    style={styles.dropdown}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    data={data}
                                    search
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    placeholder="Select Status"
                                    searchPlaceholder="Search Status"
                                    value={status}
                                    onChange={item => {
                                        setStatus(item.value);
                                    }} 
                                />
                            </View>
                        </View>
                        <TouchableOpacity style={styles.searchBtn}>
                            <Text style={styles.searchTxt}>{'Search'}</Text>
                        </TouchableOpacity>
                        {showFromDate && 
                        <DateTimePicker

                        testID="dateTimePicker"
                        maximumDate={undefined}
                        minimumDate={undefined}
                        value={new Date()}
                        mode={"date"}
                        is24Hour
                        display={"calendar"}
                        onChange={()=>setShowFromDate(false)}
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
                        value={new Date()}
                        mode={"date"}
                        is24Hour
                        display={"calendar"}
                        onChange={()=>setShowToDate(false)}
                        // onChange={onChange}
                        textColor={"#28282B"}
                        accentColor={'#28282B'}
                        // neutralButtonLabel={'hello'}
                        disabled={false}
                      />

                        }
                        <View style={styles.cardContainer}>
                            <View style={styles.cardMain}>
                                <View style={styles.bodyMain}>
                                    <Text style={styles.bodyTxt}>{'SR NO : '+1}</Text>
                                    <Text style={styles.bodyTxt}>{'Order NO : '+'001'}</Text>
                                    <Text style={styles.bodyTxt}>{'Order Date : '+'2022-02-21'}</Text>
                                    <Text style={styles.bodyTxt}>{'Order Type : '+'Order'}</Text>
                                    <Text style={styles.bodyTxt}>{'Customer Name : '+'Admin'}</Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>    
                </View>
        </SafeAreaView>
    )
}

export default OrderReport;

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
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
        color:'#FDBD01',
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
        color:'#FDBD01',
        fontWeight:"bold"
    },
    dropdown: {
        top:-5,
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
        width:'100%',
        display:"flex",
        justifyContent:'center',
        alignItems:'center',
        padding:20,
        marginTop:20,
      },
      cardMain:{
        width:300,
        height:300,
        borderRadius:15,
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
      bodyMain:{
        width:'80%',
        // backgroundColor:"red",
        display:'flex',
        flexDirection:'column'
      },
      bodyTxt:{
        fontSize:18,
        color:'#FDBD01',
        fontWeight:'700'
      }
})