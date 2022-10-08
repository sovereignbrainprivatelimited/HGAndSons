import { Text } from "native-base";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Alert, SafeAreaView, ScrollView, StyleSheet, TextInput, TouchableOpacity, View,ToastAndroid, Platform } from "react-native";
import { Controller, useForm } from 'react-hook-form';
import { Dropdown } from "react-native-element-dropdown";
import moment from "moment";
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import {getStoreValue} from '../common/LocalStorage'
import axios from "axios";


const CreateOrder = (props:any) => {
    const { control, handleSubmit, getValues, setValue, formState: { errors, isValid } } =
    useForm({ mode: "onChange" });
    const navigation=useNavigation()
    const [selectedParty, setSelectedParty] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedKarigar, setSelectedKarigar] = useState(null);

    const [showDeliveryDate, setShowDeliveryDate] = useState(false);
    const [deliverydate, setDeliverydate] = useState(new Date());
    
    const [showReminderDate, setShowReminderDate] = useState(false);
    const [reminderdate, setReminderdate] = useState(new Date());
    
    const [showOrderDate, setShowOrderDate] = useState(false);
    const [orderdate, setOrderDate] = useState(new Date());
    
    const [isEdit,setIsEdit]=useState(false);
    const [selecteImage,setSelectedImage]=useState('');
    const [partyList,setPartyList]=useState([]);
    const [itemList,setItemList]=useState([]);
    const [karigarList,setKarigarList]=useState([]);
    
    const options1={
        title:'Select Image',
        type:'library',
        options:{
            maxHeight:200,
            maxWidth:200,
            selectionLimit:0,
            mediaType:'photo',
            includeBase64:false
        },
    }

    const openGallery=async()=>{
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: false,
            includeBase64:true
        }).then((res)=>{
            setSelectedImage(res.path);
            console.log('-------------result-----------',res.path)
        })
    }
  
    useEffect(() => {
    const getDropdownList = async()=>{
        axios.post('https://hgsonsapp.hgsons.in/master/party_list.php',{PartyId:await getStoreValue('userId'),UserType:1,Token: await getStoreValue("token")}).then((res)=>{
            let arr=[]
            res.data.data.forEach((item:any)=>{
                const data={
                    label:item.PartyName,
                    value:item.PartyId
                }
                arr.push(data);
            })
            setPartyList(arr)
        }).catch((err)=>{
            console.log('err:',err);
        })
        axios.post('https://hgsonsapp.hgsons.in/master/item_list.php',{UserType:1,Token: await getStoreValue("token")}).then((res)=>{
            res.data.data.forEach((item:any)=>{
                const data={
                    label:item.ItemName,
                    value:item.ItemId
                }
                itemList.push(data)
            })
        }).catch((err)=>{
            console.log('err:',err);
        })
        axios.post('https://hgsonsapp.hgsons.in/master/karigar_list.php',{UserType:1,Token:await getStoreValue("token")}).then((res)=>{
            res.data.data.forEach((item:any)=>{
                const data={
                    label:item.KarigarName,
                    value:item.PartyId
                }
                karigarList.push(data);
            })
        })
    }
    getDropdownList()
    },[])
    useEffect(() => { 
        const getOrderData =async()=>{
            if(props?.route?.params?.userId !== undefined){
                axios.post('https://hgsonsapp.hgsons.in/master/read_order.php',{OrderId:props.route.params.userId,Token:await getStoreValue("token")}).then((res)=>{
                    const arr=Object.values(res.data.data);
                    let data=arr.map((item)=>{
                        return item 
                    })
                    // console.log('data::',data[0].PartyId);
                    setValue('orderNo',data[0].OrderNo);
                    // setDeliverydate(moment(data.d).format('YYYY-MM-DD'))
                    setSelectedParty(data[0].PartyId);
                    setSelectedItem(data[0].ItemId);
                    setValue('weight',data[0].Weight);
                    setValue('height',data[0].Weight);
                    setValue('pcs',data[0].Pcs);
                    setOrderDate(data[0].OrderDate);
                    setReminderdate(data[0].ReminderDate);
                    setValue('size',data[0].Size);
                    setValue('width',data[0].Width);
                    setValue('Remarks',data[0].Remarks);
                    setSelectedImage(data[0].imageOrder[0])
                    
                }).catch((err)=>{
                    console.log('err:',err);
                })
                
                setIsEdit(true)
            }
        }
        getOrderData();
    },[])

    const onCreateOrder =async(data:any)=>{
        
        if(getValues('orderNo') === undefined){
            ToastAndroid.show('Please Enter Valid Data.',ToastAndroid.TOP)
        }
        let param={ 
            OrderNo: getValues('orderNo').toString(),
            DeliveryDate:moment(deliverydate).format('YYYY-MM-DD').toString(),
            PartyId:selectedParty,
            ItemId:selectedItem,
            Weight:getValues('weight').toString(),
            Height:getValues('height').toString(),
            Pcs:getValues('pcs').toString(),
            OrderDate:moment(orderdate).format('YYYY-MM-DD').toString(),
            ReminderDate:moment(reminderdate).format('YYYY-MM-DD').toString(),
            KarigarId:selectedKarigar,
            Purity:getValues('Purity').toString(),
            Size:getValues('size').toString(),
            Width:getValues('width').toString(),
            Remarks:getValues('Remarks').toString(),
            OrderType:"SO",
            Token: await getStoreValue("token")
        }
        console.log('res::',param);
        if(props?.route?.params?.userId === undefined){
            axios.post('https://hgsonsapp.hgsons.in/master/create_order.php',param).then((res)=>{
                
                ToastAndroid.show(res.data.message,ToastAndroid.TOP);
            }).catch((err)=>{
                console.log('err:',err);
            })
        }else{
            axios.post('https://hgsonsapp.hgsons.in/master/edit_order.php',param).then((res)=>{
            }).catch((err)=>{
                console.log('err',err);
                
            })
        }
    }
    return(
        <SafeAreaView style={{paddingBottom:0,flex:1}}>
        <View style={{flex:1,backgroundColor:'#FFFAF0'}}>
            <View style={styles.Title}>
                <Text style={{fontSize:22,fontWeight:'800',color:'#28282B'}}>{ isEdit ?'Edit Your Order':'Create Single Order'}</Text>
            </View>
            <ScrollView>
            <View style={{display:'flex',justifyContent:'flex-start',alignItems:'center',flexDirection:'row'}}>
            <View style={[styles.dataMain,styles.doubleValue]}>
                <Text style={styles.labelText}>{'Order No'}</Text>
                <View style={styles.inputBox} >
                    <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                placeholder='Enter Order No'
                                placeholderTextColor={'#28282B'}
                                keyboardType='number-pad'
                                value={value}
                                autoCorrect={false}
                                autoCapitalize="none"
                                onChangeText={onChange}
                                returnKeyType={"next"}
                                style={{padding:0,paddingLeft:10,color:'#28282B'}}
                            />
                        )}
                        name="orderNo"
                        rules={{
                            required: { value: true, message: 'Enter Order No' },
                        }}
                    />
                </View>
            </View>
            <View style={[styles.dataMain,styles.doubleValue]}>
                <Text style={styles.labelText}>{'Order Date'}</Text>
                <TouchableOpacity style={styles.inputBox} onPress={()=>setShowOrderDate(true)}>
                            <TextInput
                                placeholder='Enter Order date'
                                placeholderTextColor={'#28282B'}
                                keyboardType='number-pad'
                                value={moment(orderdate).format('YYYY-MM-DD').toString()}
                                autoCorrect={false}
                                editable={false}
                                autoCapitalize="none"
                                // onChangeText={onChange}
                                returnKeyType={"next"}
                                style={{padding:0,paddingLeft:10,color:'#28282B'}}
                            />
                                <Icon name='calendar' color={'#28282B'} size={20} style={{position:'absolute',right:10,top:7}}/>
                </TouchableOpacity>
            </View>
            </View>
            <View style={{display:'flex',justifyContent:'flex-start',alignItems:'center',flexDirection:'row'}}>
            <View style={[styles.dataMain,styles.doubleValue]}>
                <Text style={styles.labelText}>{'Approx Delivery date'}</Text>
                <TouchableOpacity style={styles.inputBox} onPress={()=>setShowDeliveryDate(true)}>
                            <TextInput
                                placeholder='Enter Approx Delivery Date'
                                placeholderTextColor={'#28282B'}
                                keyboardType='default'
                                value={moment(deliverydate).format('YYYY-MM-DD').toString()}
                                editable={false}
                                autoCorrect={false}
                                autoCapitalize="none"
                                // onChangeText={(e)=>console.log('date::',e)
                                // }
                                returnKeyType={"next"}
                                style={{padding:0,paddingLeft:10,color:'#28282B'}}
                            />
                                <Icon name='calendar' color={'#28282B'} size={20} style={{position:'absolute',right:10,top:7}}/>
                </TouchableOpacity>
            </View>
            <View style={[styles.dataMain,styles.doubleValue]}>
                <Text style={styles.labelText}>{'Reminder Date'}</Text>
                <TouchableOpacity style={styles.inputBox} onPress={()=>setShowReminderDate(true)} >
                    
                            <TextInput
                                placeholder='Enter Reminder Date'
                                placeholderTextColor={'#28282B'}
                                keyboardType='number-pad'
                                value={moment(reminderdate).format('YYYY-MM-DD').toString()}
                                editable={false}
                                autoCorrect={false}
                                autoCapitalize="none"
                                // onChangeText={onChange}
                                returnKeyType={"next"}
                                style={{padding:0,paddingLeft:10,color:'#28282B'}}
                            />
                                <Icon name='calendar' color={'#28282B'} size={20} style={{position:'absolute',right:10,top:7}}/>
                </TouchableOpacity>
            </View>
            </View>
            <View style={styles.dataMain}>
                <Text style={styles.labelText}>{'Select Party'}</Text>
                {console.log('selected:',selectedParty)}
                
                <View style={[styles.inputBox,styles.select]} >
                    {/* <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => ( */}
                        <Dropdown
                          style={styles.dropdown}
                          placeholderStyle={styles.placeholderStyle}
                          selectedTextStyle={styles.selectedTextStyle}
                          inputSearchStyle={styles.inputSearchStyle}
                          iconStyle={styles.iconStyle}
                          data={partyList}
                          search
                          maxHeight={300}
                          labelField="label"
                          valueField="value"
                          placeholder="Select Party"
                          searchPlaceholder="Search Party"
                          value={selectedParty}
                          onChange={item => {
                          setSelectedParty(item.value);
                          }} 
                        />
                        {/* )} */}
                        {/* name="party"
                        rules={{
                            required: { value: true, message: 'Enter Select Party' },
                        }}
                    /> */}
                </View>
            </View>
            <View style={styles.dataMain}>
                <Text style={styles.labelText}>{'Select Karigar'}</Text>
                <View style={[styles.inputBox,styles.select]} >
                    <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                iconStyle={styles.iconStyle}
                                data={karigarList}
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
                        )}
                        name="selectKarigar"
                        rules={{
                            required: { value: true, message: 'Enter Select Karigar' },
                        }}
                    />
                </View>
            </View>
            <View style={styles.dataMain}>
                <Text style={styles.labelText}>{'Select Item'}</Text>
                <View style={[styles.inputBox,styles.select]} >
                    <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Dropdown
                          style={styles.dropdown}
                          placeholderStyle={styles.placeholderStyle}
                          selectedTextStyle={styles.selectedTextStyle}
                          inputSearchStyle={styles.inputSearchStyle}
                          iconStyle={styles.iconStyle}
                          data={itemList}
                          search
                          maxHeight={300}
                          labelField="label"
                          valueField="value"
                          placeholder="Select Item"
                          searchPlaceholder="Search Item"
                          value={selectedItem}
                          onChange={item => {
                          setSelectedItem(item.value);
                          }} 
                        />
                        )}
                        name="item"
                        rules={{
                            required: { value: true, message: 'Enter Select Item' },
                        }}
                    />
                </View>
            </View>
            <View style={{display:'flex',justifyContent:'flex-start',alignItems:'center',flexDirection:'row'}}>
            <View style={[styles.dataMain,styles.threeData]}>
                <Text style={styles.labelText}>{'Purity'}</Text>
                <View style={styles.inputBox} >
                    <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                placeholder='Enter Purity'
                                placeholderTextColor={'#28282B'}
                                keyboardType='number-pad'
                                value={value}
                                autoCorrect={false}
                                autoCapitalize="none"
                                onChangeText={onChange}
                                returnKeyType={"done"}
                                style={{padding:0,paddingLeft:10,color:'#28282B'}}
                            />
                        )}
                        name="Purity"
                        rules={{
                            required: { value: true, message: 'Enter Purity' },
                        }}
                    />
                </View>
            </View>
            <View style={[styles.dataMain,styles.threeData]}>
                <Text style={styles.labelText}>{'Weight'}</Text>
                <View style={styles.inputBox} >
                    <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                placeholder='Enter Weight'
                                placeholderTextColor={'#28282B'}
                                keyboardType='number-pad'
                                value={value}
                                autoCorrect={false}
                                autoCapitalize="none"
                                onChangeText={onChange}
                                returnKeyType={"next"}
                                style={{padding:0,paddingLeft:10,color:'#28282B'}}
                            />
                        )}
                        name="weight"
                        rules={{
                            required: { value: true, message: 'Enter Weight' },
                        }}
                    />
                </View>
            </View>
            <View style={[styles.dataMain,styles.threeData]}>
                <Text style={styles.labelText}>{'Size'}</Text>
                <View style={styles.inputBox} >
                    <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                placeholder='Enter Size'
                                placeholderTextColor={'#28282B'}
                                keyboardType='number-pad'
                                value={value}
                                autoCorrect={false}
                                autoCapitalize="none"
                                onChangeText={onChange}
                                returnKeyType={"next"}
                                style={{padding:0,paddingLeft:10,color:'#28282B'}}
                            />
                        )}
                        name="size"
                        rules={{
                            required: { value: true, message: 'Enter Size' },
                        }}
                    />
                </View>
            </View>
            </View>
            <View style={{display:'flex',justifyContent:'flex-start',alignItems:'center',flexDirection:'row'}}>
            <View style={[styles.dataMain,styles.threeData]}>
                <Text style={styles.labelText}>{'Height'}</Text>
                <View style={styles.inputBox} >
                    <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                placeholder='Enter Height'
                                placeholderTextColor={'#28282B'}
                                keyboardType='number-pad'
                                value={value}
                                autoCorrect={false}
                                autoCapitalize="none"
                                onChangeText={onChange}
                                returnKeyType={"next"}
                                style={{padding:0,paddingLeft:10,color:'#28282B'}}
                            />
                        )}
                        name="height"
                        rules={{
                            required: { value: true, message: 'Enter Height' },
                        }}
                    />
                </View>
            </View>
            <View style={[styles.dataMain,styles.threeData]}>
                <Text style={styles.labelText}>{'Width'}</Text>
                <View style={styles.inputBox} >
                    <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                placeholder='Enter Width'
                                placeholderTextColor={'#28282B'}
                                keyboardType='number-pad'
                                value={value}
                                autoCorrect={false}
                                autoCapitalize="none"
                                onChangeText={onChange}
                                returnKeyType={"next"}
                                style={{padding:0,paddingLeft:10,color:'#28282B'}}
                            />
                        )}
                        name="width"
                        rules={{
                            required: { value: true, message: 'Enter Width' },
                        }}
                    />
                </View>
            </View>
            <View style={[styles.dataMain,styles.threeData]}>
                <Text style={styles.labelText}>{'Pcs'}</Text>
                <View style={styles.inputBox} >
                    <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                placeholder='Enter Pcs'
                                placeholderTextColor={'#28282B'}
                                keyboardType='number-pad'
                                value={value}
                                autoCorrect={false}
                                autoCapitalize="none"
                                onChangeText={onChange}
                                returnKeyType={"next"}
                                style={{padding:0,paddingLeft:10,color:'#28282B'}}
                            />
                        )}
                        name="pcs"
                        rules={{
                            required: { value: true, message: 'Enter Pcs' },
                        }}
                    />
                </View>
            </View>
            </View>
            <View style={styles.dataMain}>
                <Text style={styles.labelText}>{'Remarks'}</Text>
                <View style={[styles.inputBox,styles.single]} >
                    <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                placeholder='Enter Remarks'
                                placeholderTextColor={'#28282B'}
                                keyboardType='default'
                                value={value}
                                autoCorrect={false}
                                autoCapitalize="none"
                                onChangeText={onChange}
                                returnKeyType={"done"}
                                style={{padding:0,paddingLeft:10,color:'#28282B'}}
                            />
                        )}
                        name="Remarks"
                        rules={{
                            required: { value: true, message: 'Enter Remarks' },
                        }}
                    />
                </View>
            </View>
            <View style={styles.dataMain}>
                <Text style={styles.labelText}>{'Upload Photo'}</Text>
                <View style={[styles.inputBox,styles.upload]} >
                            <TextInput
                                placeholder='Enter '
                                placeholderTextColor={'#28282B'}
                                keyboardType='number-pad'
                                value={selecteImage==''?'Upload photo':selecteImage}
                                autoCorrect={false}
                                autoCapitalize="none"
                                // onChangeText={onChange}
                                returnKeyType={"done"}
                                style={{padding:0,paddingLeft:10,color:'#28282B'}}
                            />
                            <TouchableOpacity style={styles.uploadBtn} onPress={openGallery}>
                                <Text style={{color:'#FDBD01',fontWeight:'bold'}}>{'upload'}</Text>
                            </TouchableOpacity>
                </View>
            </View>
            <View style={styles.saveBtn}>
                  <TouchableOpacity style={{height:50,width:80,borderRadius:50,marginRight:10,backgroundColor:'#28282B',justifyContent:'center',alignItems:'center'}}
                  onPress={onCreateOrder}
                  >
                        <Text style={{color:'#FDBD01',fontWeight:'bold',fontSize:16}}>{'Save'}</Text>
                    </TouchableOpacity>          
                  <TouchableOpacity style={{height:50,width:80,borderRadius:50,backgroundColor:'#28282B',justifyContent:'center',alignItems:'center'}}
                  onPress={()=>{navigation.goBack()}}
                  >
                        <Text style={{color:'#FDBD01',fontWeight:'bold',fontSize:16}}>{'Cancel'}</Text>
                    </TouchableOpacity>          
            </View>
            {showDeliveryDate &&
                <DateTimePicker

                testID="dateTimePicker"
                maximumDate={undefined}
                minimumDate={undefined}
                value={deliverydate}
                mode={"date"}
                is24Hour
                display={"calendar"}
                // onChange={()=>}
                onChange={(e,d)=>{
                    setShowDeliveryDate(false)
                    setDeliverydate(d);
                }}
                textColor={"#28282B"}
                accentColor={'#28282B'}
                disabled={false}
              />
            }
            {showReminderDate &&
                <DateTimePicker

                testID="dateTimePicker"
                maximumDate={undefined}
                minimumDate={undefined}
                value={reminderdate}
                mode={"date"}
                is24Hour
                display={"calendar"}
                onChange={(e,d)=>{
                    setShowReminderDate(false)
                    setReminderdate(d);
                }}
                // onChange={onChange}
                textColor={"#28282B"}
                accentColor={'#28282B'}
                disabled={false}
              />
            }
            {showOrderDate &&
                <DateTimePicker

                testID="dateTimePicker"
                maximumDate={undefined}
                minimumDate={undefined}
                value={orderdate}
                mode={"date"}
                is24Hour
                display={"calendar"}
                onChange={(e,d)=>{
                    setShowOrderDate(false)
                    setOrderDate(d);
                }}
                // onChange={onChange}
                textColor={"#28282B"}
                accentColor={'#28282B'}
                // neutralButtonLabel={'hello'}
                disabled={false}
              />
            }
            </ScrollView>
            <View style={styles.footerMain}>
                <Text style={styles.footerTxt}>{'Privacy policy @ H.G.Sons, 2022'}</Text>
            </View>
        </View>
        </SafeAreaView>
    )
}

export default CreateOrder

const styles = StyleSheet.create({
    Title:{
        width:'100%',
        marginTop:30,
        height:50,
        textAlign:'center',
        alignItems:'center',
        justifyContent:'center'
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
    doubleValue:{
        width:'45%',
    },
    threeData:{
        width:'29%'
    },
    inputBox:
    {
        borderColor:'gray',
        borderWidth:1,
        height:35,
        width:'100%',
        marginTop:10,
        // marginLeft:10,
        borderRadius:5,
        backgroundColor:'#F0F8FF'
    },
    select:{
    borderWidth:0,
    borderColor:'gray',
    height:35,
    },
    single:{
        marginLeft:10
    },
    upload:{
        marginLeft:10,
        display:'flex',
        flexDirection:'row'
    },
    uploadBtn:{
        backgroundColor:'#28282B',
        justifyContent:'center',    
        alignItems:'center',
        padding:0,
         right:0,
        height:35,
        width:55,
         position:'absolute',
        borderRadius:5
    },
    saveBtn:{
        display:'flex',
        flexDirection:'row',
        right:10,
        bottom:0,
        position:'relative',
        width:'100%',
        height:50,
        marginTop:20,
        marginBottom:20,
        justifyContent:'flex-end',
        alignItems:'flex-end'
    },
    dropdown: {
        top:-5,
        height: 39,
        width:"100%",
        backgroundColor: '#F0F8FF',
        borderRadius: 5,
        paddingLeft:15,
        marginLeft:10,
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