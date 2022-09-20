import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, Button, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { Image, Text, TextArea } from 'native-base';
import logo from '../../constants/images/Logo.png';
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation } from '@react-navigation/native';
// import CardLogo from '../../assets/images/cardViewLogo.svg';
// import Label from '../Label';
// import { Color, Font } from '../../utils/Themes';
// import CustomIcon from '../CustomIcon';
// import { screenWidth } from '../../utils/globals';

const CardView = (props: any) => {
  const navigation = useNavigation();
  const { date, onPress, srNo, OrderNo, orderType, Party, Karigar, Item, Status } = props;
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showNotifyModal, setShowNotifyModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [value, setValue] = useState(null);
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
    <View style={{ flex: 1 }}>
      <TouchableOpacity style={styles.cardMain}>
        <View style={styles.dataMain}>
          <View style={styles.cardImage}>
            <Image source={logo} style={{ width: '100%', height: '100%' }} />
          </View>
          <View style={{ display: 'flex', flexDirection: 'column' }}>
            <Text style={styles.datatitle}>{'Sr No: ' + srNo}</Text>
            <Text style={styles.datatitle}>{'Order No: ' + OrderNo}</Text>
            <Text style={styles.datatitle}>{'Order Date: ' + date}</Text>
            <Text style={styles.datatitle}>{'Order type: ' + orderType}</Text>
          </View>
        </View>
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.datatitle}>{'Party: ' + Party}</Text>
          <Text style={styles.datatitle}>{'Karigar: ' + Karigar}</Text>
          <Text style={styles.datatitle}>{'Item: ' + Item}</Text>
          <Text style={styles.datatitle}>{'Status: ' + Status}</Text>
        </View>
        <View style={styles.actionMain}>
          <TouchableOpacity onPress={() => setShowUpdateModal(true)}><Text>{'Update'}</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => setShowNotifyModal(true)}><Text>{'Notification'}</Text></TouchableOpacity>
          <TouchableOpacity ><Text>{'Edit'}</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => setShowDeleteModal(true)}><Text>{'Delete'}</Text></TouchableOpacity>
        </View>
      </TouchableOpacity>

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
                <Text style={styles.modalTitle}>Update Order Status</Text>
                  <View style={styles.modalBody}>
                      <Text style={styles.label}>Order Status :</Text>
                      <View style={styles.dataValue}>
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
                          placeholder="Select item"
                          searchPlaceholder="Search..."
                          value={value}
                          onChange={item => {
                          setValue(item.value);
                          }} 
                        />
                        </View>
                  </View>
                  <View style={styles.modalBody}>
                      <Text style={styles.label} >Remarks :</Text>
                      <View style={styles.dataValue}>
                      <TextArea h={10} placeholder="Text Area Placeholder" w={190} borderColor={'#FDBD01'} color={'#FDBD01'} placeholderTextColor={''} marginLeft={-6}/>
                      </View>
                  </View>
                  <View style={styles.BtnMain}>
                  <TouchableOpacity style={styles.close} onPress={()=>{
                    setShowUpdateModal(false)
                  }}>
                    <Text style={{color:'#28282B'}}>
                      {'Close'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.close}>
                    <Text style={{color:'#28282B'}}>
                      {'Update'}
                    </Text>
                  </TouchableOpacity>
                  {/* <Button title='Close'  onPress={() => setShowDeleteModal(!showDeleteModal)}>Close</Button> */}
                  {/* <Button title='Close' onPress={() => setShowDeleteModal(!showDeleteModal)}>Close</Button> */}
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
              <View style={[styles.modalView,styles.notifyModal]}>
                <Text style={styles.modalTitle}>Notify Order</Text>
                <View style={styles.modalBody}>
                      <Text style={[styles.label,styles.longName]}>Customer Name</Text>
                      <View style={styles.dataValue}>
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
                          placeholder="Select item"
                          searchPlaceholder="Search..."
                          value={value}
                          onChange={item => {
                          setValue(item.value);
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
                          data={data}
                          search
                          maxHeight={300}
                          labelField="label"
                          valueField="value"
                          placeholder="Select item"
                          searchPlaceholder="Search..."
                          value={value}
                          onChange={item => {
                          setValue(item.value);
                          }} 
                        />
                        </View>
                  </View>
                  <View style={styles.modalBody}>
                      <Text style={styles.label} >Narration </Text>
                      <View style={styles.dataValue}>
                      <TextArea h={10} placeholder="Text Area Placeholder" w={190} borderColor={'#FDBD01'} color={'#FDBD01'} placeholderTextColor={'#FDBD01'}  marginLeft={-6}/>
                      </View>
                  </View>
                  <View style={styles.BtnMain}>
                  <TouchableOpacity style={styles.close} onPress={() => setShowNotifyModal(false)}>
                    <Text style={{color:'#28282B'}}>
                      {'Close'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.close}>
                    <Text style={{color:'#28282B'}}>
                      {'Update'}
                    </Text>
                  </TouchableOpacity>
                  {/* <Button title='Close'  onPress={() => setShowDeleteModal(!showDeleteModal)}>Close</Button> */}
                  {/* <Button title='Close' onPress={() => setShowDeleteModal(!showDeleteModal)}>Close</Button> */}
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
              <View style={[styles.modalView,styles.deleteModal]}>
                <Text style={styles.deleteTitle}>Are you sure you want to delete this order ??</Text>
                <View style={styles.BtnMain}>
                  <TouchableOpacity style={styles.close}  onPress={() => setShowDeleteModal(!showDeleteModal)}>
                    <Text style={{color:'#28282B'}}>
                      {'Close'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.close}>
                    <Text style={{color:'#28282B'}}>
                      {'Update'}
                    </Text>
                  </TouchableOpacity>
                  {/* <Button title='Close'  onPress={() => setShowDeleteModal(!showDeleteModal)}>Close</Button> */}
                  {/* <Button title='Close' onPress={() => setShowDeleteModal(!showDeleteModal)}>Close</Button> */}
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
    height: 250,
    borderRadius: 5,
    backgroundColor: '#28282B',
    alignSelf: 'center',
    marginVertical: 10
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
    backgroundColor: 'white',
    borderRadius: 5,
    marginRight: 15,
    marginBottom: 10
  },
  datatitle: {
    color: '#FDBD01'
  },
  actionMain: {
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    width: '80%',
    height: 30,
    display: 'flex',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    padding: 5,
    flexDirection: 'row',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    // width:250,
    // height:250
  },
  modalView: {
    margin: 20,
    width: 350,
    height: 230,
    backgroundColor: '#28282B',
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0,
    shadowRadius: 4,
    elevation: 5
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
    color:'#FDBD01'
  },
  deleteTitle:{
    textAlign:'center',
    justifyContent:'flex-start',
    display:'flex',
    fontSize:22,
    marginTop:30,
    width:290,
    color:'#FDBD01'
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
    fontWeight:'400',
    width:'40%',
    color:'#FDBD01',
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
    marginLeft: -30,
    top:-5,
    height: 30,
    width:200,
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
  closeBtn:{
    marginTop:10,
    display:'flex',
    width:100,
    borderRadius:5
  },
  BtnMain:{
    width:'90%',
    height:50,
    marginTop:10,
    display:'flex',
    justifyContent:'flex-end',
    flexDirection:'row',
  },
  close:{
    backgroundColor:'#FDBD01',
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