import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, ToastAndroid } from 'react-native';
import PropTypes from 'prop-types';
import { Image, Text, TextArea } from 'native-base';
import logo from '../../constants/images/Logo.png';
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { getStoreValue } from '../LocalStorage';

const CardView = (props: any) => {
  const { date, onPress, srNo, OrderNo, orderType, Party, Karigar, Item, Status,orderData,showCatalogOrder} = props;
  const navigation=useNavigation()
  const imagePath='https://order.hgsons.in/uploads/order_images/'

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showNotifyModal, setShowNotifyModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [value, setValue] = useState(null);
  const [orderStatusList,setOrderStatusList]=useState([]);
  const [karigarList,setKarigarList]=useState([]);
  const [partyList,setPartyList]=useState([]);
  const [selectedCustomer,setSelectedCustomer]=useState('');
  const [selectedKarigar,setSelectedKarigar]=useState('');
  const [narration,setNarration]=useState('');
  const [userType,setUserType]=useState('');

 
    
    useEffect(()=>{
      console.log('orderData',orderData);
    })

    const getStatusList = async () => {
      console.log('data:',orderData);
      axios.post('https://hgsonsapp.hgsons.in/master/order_status_dropdown.php',{UserType:1,Token: await getStoreValue("token")}).then((res)=>{
          res.data.data.map((item:any)=>{
              const data={
                  label:item.OrderStatus,
                  value:item.OrderStatusId
              }
              orderStatusList.push(data);
          })
      })
  }

  
  const getNotifyList = async()=>{
    axios.post('https://hgsonsapp.hgsons.in/master/party_list.php',{PartyId:1,UserType:1,Token: await getStoreValue("token")}).then((res)=>{
          res.data.data.forEach((item:any)=>{

              const data={
                  label:item.PartyName,
                  value:item.PartyId
              }
              partyList.push(data);
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

  const onDelete = async () => {
    axios.post('https://hgsonsapp.hgsons.in/master/delete_order.php',{OrderId:orderData.orderId,Token: await getStoreValue("token")}).then((res)=>{
      console.log('res:::',res.data);
    }).catch((err)=>{
      console.log('err:',err);
    })
  } 

  const onUpdate = async () => {
    let param={}
    if(value.value==='1'){
    param = {
    PartyId:'1',
    OrderId:orderData.OrderId,
    OrderStatusId:value.value,
    ConfirmDeliveryDate:orderData.ConfirmDeliveryDate,
    Remarks:orderData.Remarks,
    Token:await getStoreValue("token")
    }
  }else if(value.value==='2'){
    param={
    PartyId:'1',
    OrderId:orderData.OrderId,
    OrderStatusId:value.value,
    KarigarDeliveryDate:orderData.KarigarDeliveryDate,
    Remarks:orderData.Remarks,
    Token:await getStoreValue("token")
    }
  }else if(value.value==='3'){
    param={
      PartyId:'1',
      OrderId:orderData.OrderId,
      OrderStatusId:value.value,
      KarigarReceivedDate:orderData.KarigarReceivedDate,
      Remarks:orderData.Remarks,
      Token:await getStoreValue("token")
      }
  }else if(value.value==='4'){
    param={
      PartyId:'1',
      OrderId:orderData.OrderId,
      OrderStatusId:value.value,
      CustomerDeliveredDate:orderData.CustomerDeliveredDate,
      Remarks:orderData.Remarks,
      Token:await getStoreValue("token")
      }
  }
    axios.post('https://hgsonsapp.hgsons.in/master/order_status.php',param).then((res)=>{
      console.log('res::',res.data);
      setShowUpdateModal(false)
    }).catch((err)=>{
      console.log('err:',err);
    })
  }

  const onNotify = async () => {
    console.log('data:',selectedCustomer,selectedKarigar,narration);
    
    axios.post('https://hgsonsapp.hgsons.in/master/order_notify.php',{PartyId:selectedCustomer,KarigarId:selectedKarigar,Narration:'abcd',OrderId:orderData.orderId,Token:await getStoreValue("token")}).then((res)=>{
      console.log('res::',res.data);
      ToastAndroid.show(res.data.message,ToastAndroid.TOP);
      setShowNotifyModal(false)
    }).catch((err)=>{
      console.log('err:',err);
    })
  }
  const data = [
    { label: 'Item vndfjkvnjdfkvn1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];

  useEffect(()=>{
    const getUserInfo =async()=>{
      let userId= await getStoreValue('userId');
      let typeOfUser= await getStoreValue('userType');
      console.log('type:',typeOfUser);
      setUserType(typeOfUser);
    }
    getUserInfo();
  },[])

  return (
    <View style={{ flex: 1,backgroundColor:'#FFFAF0' }}>
    {showCatalogOrder ==false ?
      <View style={styles.cardMain}>
        <View style={styles.dataMain}>
        <View style={{ display: 'flex', flexDirection: 'column' }}>
            <Text style={styles.datatitle}>{'Sr No: ' + srNo}</Text>
            <Text style={styles.datatitle}>{'Order No: ' + OrderNo}</Text>
            <Text style={styles.datatitle}>{'Order Date: ' + date}</Text>
            <Text style={styles.datatitle}>{'Order type: ' + orderType}</Text>
          </View>
          <View style={styles.cardImage}>
            {orderData.Image?
            <Image source={{uri:`${imagePath}${orderData.Image}`}} style={{ width: '100%', height: '100%' }} alt="Alternate Text"/>
            :  
            <Image source={logo} style={{ width: '100%', height: '100%' }} alt="Alternate Text"/>
          }
          </View>
        </View>
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.datatitle}>{'Party: ' + Party}</Text>
          <Text style={styles.datatitle}>{'Karigar: ' + Karigar}</Text>
          <Text style={styles.datatitle}>{'Item: ' + Item}</Text>
          <Text style={styles.datatitle}>{'Status: ' + Status}</Text>
        </View>
        <View style={styles.actionMain}>
          <TouchableOpacity onPress={() => {getStatusList();setShowUpdateModal(true)}} style={{marginRight:20}}><Icon name="edit" size={22} color={'#D4AF37'}/></TouchableOpacity>
          <TouchableOpacity onPress={() => {getNotifyList();setShowNotifyModal(true)}} style={{marginRight:20}}><Icon name="bell" size={22} color={'#D4AF37'}/></TouchableOpacity>
          {userType!=='1' &&
          <>
          <TouchableOpacity style={{marginRight:20 }} onPress={()=>{ navigation.navigate('CreateOrder',{userId:orderData.orderId})}}><Icon name="pencil" size={22} color={'#D4AF37'}/></TouchableOpacity>
          <TouchableOpacity onPress={() => setShowDeleteModal(true)} style={{marginRight:30}}><Icon name="trash" size={22} color={'#D4AF37'}/></TouchableOpacity>
          </>
          }
        </View>
      </View>
      :
      <View style={[styles.cardMain,styles.orderCardMain]}>
        <View style={styles.dataMain}>
        <View style={{ display: 'flex', flexDirection: 'column' }}>
            <Text style={styles.datatitle}>{'Sr No: ' + srNo}</Text>
            <Text style={styles.datatitle}>{'C/Order No: ' + OrderNo}</Text>
            <Text style={styles.datatitle}>{'C/Order Date: ' + date}</Text>
            {/* <Text style={styles.datatitle}>{'Order type: ' + orderType}</Text> */}
          </View>
          <View style={styles.cardImage}>
            {orderData.Image?
            <Image source={{uri:`${imagePath}${orderData.Image}`}} style={{ width: '100%', height: '100%' }} alt="Alternate Text"/>
            :  
            <Image source={logo} style={{ width: '100%', height: '100%' }} alt="Alternate Text"/>
          }
          </View>
        </View>
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.datatitle}>{'Party: ' + Party}</Text>
          <Text style={styles.datatitle}>{'Karigar: ' + Karigar}</Text>
          <Text style={styles.datatitle}>{'Item: ' + Item}</Text>
          {/* <Text style={styles.datatitle}>{'Status: ' + Status}</Text> */}
        </View>
        {/* <View style={styles.actionMain}>
          <TouchableOpacity onPress={() => {getStatusList();setShowUpdateModal(true)}} style={{marginRight:20}}><Icon name="edit" size={22} color={'#FFD700'}/></TouchableOpacity>
          <TouchableOpacity onPress={() => {getNotifyList();setShowNotifyModal(true)}} style={{marginRight:20}}><Icon name="bell" size={22} color={'#FFD700'}/></TouchableOpacity>
          <TouchableOpacity style={{marginRight:20 }} onPress={()=>{ navigation.navigate('CreateOrder',{userId:orderData.orderId})}}><Icon name="pencil" size={22} color={'#FFD700'}/></TouchableOpacity>
          <TouchableOpacity onPress={() => setShowDeleteModal(true)} style={{marginRight:30}}><Icon name="trash" size={22} color={'#FFD700'}/></TouchableOpacity>
        </View> */}
      </View>
      }

      {showUpdateModal &&
        <View>
          <Modal
            animationType='slide'
            transparent={true}
            visible={showUpdateModal}
            onRequestClose={() => setShowUpdateModal(!showUpdateModal)}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={styles.modalBodyMain}>
                <Text style={styles.modalTitle}>Update Order Status</Text>
                  <View style={styles.modalBody}>
                      <Text style={styles.label}>Order Status</Text>
                      <View style={styles.dataValue}>
                      <Dropdown
                          style={styles.dropdown}
                          placeholderStyle={styles.placeholderStyle}
                          selectedTextStyle={styles.selectedTextStyle}
                          inputSearchStyle={styles.inputSearchStyle}
                          iconStyle={styles.iconStyle}
                          data={orderStatusList}
                          search
                          maxHeight={300}
                          labelField="label"
                          valueField="value"
                          placeholder="Select Status"
                          searchPlaceholder="Search..."
                          value={value}
                          onChange={item => {
                          setValue(item);
                          }} 
                        />
                        </View>
                  </View>
                  <View style={styles.modalBody}>
                      <Text style={styles.label} >Remarks</Text>
                      <View style={styles.dataValue}> 
                      <TextArea h={10} placeholder="Enter Remarks" w={190} borderColor={'#FDBD01'} color={'#28282B'} placeholderTextColor={'#28282B'} marginLeft={-3} fontSize={14}/>
                      </View>
                  </View>
                  <View style={styles.BtnMain}>
                  <TouchableOpacity style={styles.close} onPress={()=>{
                    setShowUpdateModal(false)
                  }}>
                    <Text style={{color:'#D4AF37',fontSize:16,fontWeight:'bold'}}>
                      {'Close'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.close} onPress={()=>onUpdate()}>
                    <Text style={{color:'#D4AF37',fontSize:16,fontWeight:'bold'}}>
                      {'Update'}
                    </Text>
                  </TouchableOpacity>
                  {/* <Button title='Close'  onPress={() => setShowDeleteModal(!showDeleteModal)}>Close</Button> */}
                  {/* <Button title='Close' onPress={() => setShowDeleteModal(!showDeleteModal)}>Close</Button> */}
                </View>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      }
      {showNotifyModal &&
        <View>
          <Modal
            animationType='slide'
            transparent={true}
            visible={showNotifyModal}
            onRequestClose={() => setShowNotifyModal(!showNotifyModal)}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
              <View style={[styles.modalBodyMain,styles.notifyModal]}>
                <Text style={styles.modalTitle}>Notify Order</Text>
                <View style={styles.modalBody}>
                      <Text style={[styles.label]}>Customer Name</Text>
                      <View style={styles.dataValue}>
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
                          placeholder="Select Customer"
                          searchPlaceholder="Search..."
                          value={selectedCustomer}
                          onChange={item => {
                          setSelectedCustomer(item.value);
                          }} 
                        />
                        </View>
                  </View>
                <View style={styles.modalBody}>
                      <Text style={styles.label}>Kariar Name </Text>
                      <View style={styles.dataValue}>
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
                          searchPlaceholder="Search..."
                          value={selectedKarigar}
                          onChange={item => {
                          setSelectedKarigar(item.value);
                          }} 
                        />
                        </View>
                  </View>
                  <View style={styles.modalBody}>
                      <Text style={styles.label} >Narration </Text>
                      <View style={styles.dataValue}>
                      <TextArea h={10} placeholder="Enter Narration" w={190} borderColor={'#FDBD01'} color={'#28282B'} placeholderTextColor={'#28282B'}  value={narration} marginLeft={-3} onChange={(e)=>setNarration('')}/>
                      </View>
                  </View>
                  <View style={styles.BtnMain}>
                  <TouchableOpacity style={styles.close} onPress={() => setShowNotifyModal(false)}>
                    <Text style={{color:'#D4AF37',fontSize:16,fontWeight:'bold'}}>
                      {'Close'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.close} onPress={()=>onNotify()}>
                    <Text style={{color:'#D4AF37',fontSize:16,fontWeight:'bold'}}>
                      {'Save'}
                    </Text>
                  </TouchableOpacity>
                  {/* <Button title='Close'  onPress={() => setShowDeleteModal(!showDeleteModal)}>Close</Button> */}
                  {/* <Button title='Close' onPress={() => setShowDeleteModal(!showDeleteModal)}>Close</Button> */}
                </View>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      }
      {showDeleteModal &&
        <View>
          <Modal
            animationType='slide'
            transparent={true}
            visible={showDeleteModal}
            onRequestClose={() => setShowDeleteModal(!showDeleteModal)}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
              <View style={[styles.modalBodyMain,styles.deleteModal]}>
                <Text style={styles.deleteTitle}>Are you sure you want to delete this order ??</Text>
                <View style={styles.BtnMain}>
                  <TouchableOpacity style={styles.close}  onPress={() => setShowDeleteModal(!showDeleteModal)}>
                    <Text style={{color:'#D4AF37',fontSize:16,fontWeight:'bold'}}>
                      {'No'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.close} onPress={()=>onDelete()}>
                    <Text style={{color:'#D4AF37',fontSize:16,fontWeight:'bold'}}>
                      {'Yes'}
                    </Text>
                  </TouchableOpacity>
                </View>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      }
    </View>
  )
}

CardView.propTypes = {
  cardContainer: PropTypes.any,
  oppotunityName: PropTypes.string,
  OrganizationName: PropTypes.string,
  serviceType: PropTypes.string,
  date: PropTypes.any,
  onPress: PropTypes.func,
  mainView: PropTypes.any,
  detailsView: PropTypes.any,
  isFromHomeDetails: PropTypes.any,
  cardLogoStyle: PropTypes.any,
  homeDetailsStyle: PropTypes.any
}

const styles = StyleSheet.create({
  cardMain: {
    display: 'flex',
    width: '80%',
    height: 220,
    borderRadius: 5,
    backgroundColor: 'white',
    alignSelf: 'center',
    marginVertical: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: -2,
      height: 4
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 10
  },
  orderCardMain:{
    height:160
  },
  dataMain: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: 10,
  },
  cardImage: {
    width: 100,
    height: 100,
    right:0,
    position:'absolute',
    backgroundColor: 'white',
    borderRadius: 5,
    marginRight: 15,
    marginBottom: 10
  },
  datatitle: {
    color: '#D4AF37'
  },
  actionMain: {
    marginTop: 10,
    borderRadius: 5,
    width: '100%',
    height: 30,
    display: 'flex',
    justifyContent: 'flex-end',
    marginHorizontal: 10,
    flexDirection: 'row',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    marginTop:-20,
    width: '100%',
    height:'100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  modalBodyMain:{
    width:340,
    height:250,
    borderRadius:20,
    backgroundColor:'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 15
  },

  notifyModal:{
    height:300
  },
  deleteModal:{
    height: 150,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: "center",
    fontSize:22,
    fontWeight:'bold',
    marginTop:20,
    color:'#D4AF37'
  },
  deleteTitle:{
    textAlign:'center',
    alignSelf:'center',
    justifyContent:'center',
    display:'flex',
    fontSize:22,
    marginTop:30,
    width:290,
    color:'#D4AF37',
    fontWeight:'bold'
  },
  modalBody:{
    display:'flex',
    flexDirection:'row',
    marginTop:20,
    width:'90%',
    marginLeft:10,
  },
  label:{
    fontSize:16,
    fontWeight:'bold',
    width:'40%',
    color:'#D4AF37',
    marginRight:10
  },
  longName:{
    fontSize:14
  },
  dataValue:{
    fontSize:16,
    fontWeight:'400',
    width:'40%',
  },
  dropdown: {
    marginLeft: -13,
    top:-5,
    height: 30,
    width:200,
    borderColor:'yellow',
    borderWidth:1,
    backgroundColor: 'white',
    borderRadius: 12,
    paddingLeft:15,
    paddingRight:10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    paddingTop:5,
    paddingBottom:5,
    display:'flex',
    elevation: 2,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 12,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  closeBtn:{
    marginTop:10,
    display:'flex',
    width:100,
    borderRadius:5
  },
  BtnMain:{
    width:'100%',
    height:50,
    marginTop:10,
    paddingRight:10,
    display:'flex',
    justifyContent:'flex-end',
    flexDirection:'row',
  },
  close:{
    backgroundColor:'#28282B',
    borderRadius:10,
    alignItems:'center',
    textAlign:'center',
    justifyContent:'center',
    height:40,
    width:70,
    marginRight:10
  }
})

export default CardView;