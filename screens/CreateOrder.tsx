import { Text } from "native-base";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Alert, SafeAreaView, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Controller, useForm } from 'react-hook-form';
import { Dropdown } from "react-native-element-dropdown";
import DatePicker from 'react-native-date-picker';
import moment from "moment";
import ImagePicker from 'react-native-image-crop-picker';


const CreateOrder = (props:any,{navigation}:any) => {
    const { control, handleSubmit, getValues, setValue, formState: { errors, isValid } } =
    useForm({ mode: "onChange" });

    const [value1, setValue1] = useState(null);
    const [showDeliveryDate, setShowDeliveryDate] = useState(false);
    const [deliverydate, setDeliverydate] = useState(new Date());
    const [showReminderDate, setShowReminderDate] = useState(false);
    const [reminderdate, setReminderdate] = useState(new Date());
    const [isEdit,setIsEdit]=useState(false);
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
            console.log('-------------result-----------',res)
        })
    }
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

    const onSubmitPress = () => {
    }
    useLayoutEffect(()=>{
        if(props?.route?.params?.userId !== undefined){
            setIsEdit(true)
        }
        console.log('-------props------',props?.route?.params?.userId)
    },[])
    return(
        <SafeAreaView style={{paddingBottom:0,flex:1}}>
        <View style={{flex:1,backgroundColor:'#FDBD01'}}>
            {/* <ImageBackground source={logo} style={{flex:1}}> */}
            <View style={styles.Title}>
            <Text style={{fontSize:22,fontWeight:'800',color:'#28282B'}}>{ isEdit ?'Edit Your Order':'Create Single Order'}</Text>
            </View>
            <ScrollView>
            <View style={styles.dataMain}>
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
            <View style={styles.dataMain}>
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
                                // onChangeText={onChange}
                                returnKeyType={"next"}
                                style={{padding:0,paddingLeft:10,color:'#28282B'}}
                            />
                </TouchableOpacity>
            </View>
            <View style={styles.dataMain}>
                <Text style={styles.labelText}>{'Select Party'}</Text>
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
                          data={data}
                          search
                          maxHeight={300}
                          labelField="label"
                          valueField="value"
                          placeholder="Select Party"
                          searchPlaceholder="Search Party"
                          value={value1}
                          onChange={item => {
                          setValue1(item.value);
                          }} 
                        />
                        )}
                        name="party"
                        rules={{
                            required: { value: true, message: 'Enter Select Party' },
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
                          data={data}
                          search
                          maxHeight={300}
                          labelField="label"
                          valueField="value"
                          placeholder="Select Item"
                          searchPlaceholder="Search Item"
                          value={value1}
                          onChange={item => {
                          setValue1(item.value);
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
            <View style={styles.dataMain}>
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
            <View style={styles.dataMain}>
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
            <View style={styles.dataMain}>
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
            <View style={styles.dataMain}>
                <Text style={styles.labelText}>{'Order Date'}</Text>
                <View style={styles.inputBox} >
                    <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                placeholder='Enter Order date'
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
                        name="orderDate"
                        rules={{
                            required: { value: true, message: 'Enter Order Date' },
                        }}
                    />
                </View>
            </View>
            <View style={styles.dataMain}>
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
                    
                </TouchableOpacity>
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
                                data={data}
                                search
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder="Select Karigar"
                                searchPlaceholder="Search Karigar"
                                value={value1}
                                onChange={item => {
                                setValue1(item.value);
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
                <Text style={styles.labelText}>{'Purity'}</Text>
                <View style={styles.inputBox} >
                    <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                placeholder='Enter Purity'
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
                        name="Purity"
                        rules={{
                            required: { value: true, message: 'Enter Purity' },
                        }}
                    />
                </View>
            </View>
            <View style={styles.dataMain}>
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
            <View style={styles.dataMain}>
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
            <View style={styles.dataMain}>
                <Text style={styles.labelText}>{'Remarks'}</Text>
                <View style={styles.inputBox} >
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
                                value={'Upload photo'}
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
                  onPress={()=>Alert.alert('Success!','Created Order Successfully.')}
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
                <DatePicker
                modal
                open={showDeliveryDate}
                date={new Date()}
                onConfirm={(date) => setDeliverydate(date)}
                onCancel={() => setShowDeliveryDate(false)}
                androidVariant="nativeAndroid"
              />
            }
            {showReminderDate &&
                <DatePicker
                modal
                open={showReminderDate}
                date={new Date()}
                onConfirm={(date) => setReminderdate(date)}
                onCancel={() => setShowReminderDate(false)}
                androidVariant="nativeAndroid"
              />
            }
            </ScrollView>
        {/* </ImageBackground> */}
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
        // backgroundColor:'#FDBD01',
        textAlign:'center',
        alignItems:'center',
        justifyContent:'center'
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
    select:{
    borderWidth:0,
    borderColor:'gray',
    height:35,
    },
    upload:{
        display:'flex',
        flexDirection:'row'
    },
    uploadBtn:{
        backgroundColor:'#28282B',
        justifyContent:'center',    
        alignItems:'center',
        padding:0,
         right:0,
        // top:-2,
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
      }
})