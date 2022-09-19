import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Modal, Pressable, Button } from 'react-native';
import PropTypes from 'prop-types';
import { Image, Text } from 'native-base';
import logo from '../../constants/images/Logo.png'
import { useNavigation } from '@react-navigation/native';
// import CardLogo from '../../assets/images/cardViewLogo.svg';
// import Label from '../Label';
// import { Color, Font } from '../../utils/Themes';
// import CustomIcon from '../CustomIcon';
// import { screenWidth } from '../../utils/globals';




const CardView = (props:any) => {
    const navigation = useNavigation(); 
    const { date, onPress,srNo,OrderNo,orderType,Party,Karigar,Item,Status } = props;
    const [showUpdateModal,setShowUpdateModal]=useState(false);
    const [showNotifyModal,setShowNotifyModal]=useState(false);
    const [showDeleteModal,setShowDeleteModal]=useState(false);

    return (
        <View style={{flex:1}}>
            <TouchableOpacity style={styles.cardMain}>
            <View style={styles.dataMain}>
                <View style={styles.cardImage}>
                     <Image source={logo} style={{width:'100%',height:'100%'}}/>
                </View>
                <View style={{display:'flex',flexDirection:'column'}}>
                    <Text style={styles.datatitle}>{'Sr No: '+srNo}</Text> 
                    <Text style={styles.datatitle}>{'Order No: '+OrderNo}</Text> 
                    <Text style={styles.datatitle}>{'Order Date: '+date}</Text> 
                    <Text style={styles.datatitle}>{'Order type: '+orderType}</Text> 
                </View>
            </View>
            <View style={{marginLeft:10}}>
                <Text style={styles.datatitle}>{'Party: '+Party}</Text>
                <Text style={styles.datatitle}>{'Karigar: '+Karigar}</Text>
                <Text style={styles.datatitle}>{'Item: '+Item}</Text>
                <Text style={styles.datatitle}>{'Status: '+Status}</Text>
            </View>
            <View style={styles.actionMain}>
               <TouchableOpacity onPress={()=>setShowUpdateModal(true)}><Text>{'Update'}</Text></TouchableOpacity>
               <TouchableOpacity onPress={()=>setShowNotifyModal(true)}><Text>{'Notification'}</Text></TouchableOpacity>
               <TouchableOpacity ><Text>{'Edit'}</Text></TouchableOpacity>
               <TouchableOpacity onPress={()=>setShowDeleteModal(true)}><Text>{'Delete'}</Text></TouchableOpacity>
            </View>
            </TouchableOpacity>

            { showUpdateModal &&
                <View >
                    <Modal
                    animationType='slide'
                    transparent={true}
                    visible={showUpdateModal}
                    onRequestClose={()=>setShowUpdateModal(!showUpdateModal)}
                    >
                        <View style={styles.centeredView}>
                           <View style={styles.modalView}>
                              <Text style={styles.modalText}>Update Order Status</Text>
                            <View>
                                <Button title='Close' onPress={()=>setShowUpdateModal(!showUpdateModal)}>Close</Button>
                            </View>
                            </View>
                       </View>
                    </Modal>
                </View>
            }
            { showNotifyModal &&
                <View >
                    <Modal
                    animationType='slide'
                    transparent={true}
                    visible={showNotifyModal}
                    onRequestClose={()=>setShowNotifyModal(!showNotifyModal)}
                    >
                        <View style={styles.centeredView}>
                           <View style={styles.modalView}>
                              <Text style={styles.modalText}>Notify Order</Text>
                            <View>
                                <Button title='Close' onPress={()=>setShowNotifyModal(!showNotifyModal)}>Close</Button>
                            </View>
                            </View>
                       </View>
                    </Modal>
                </View>
            }
            { showDeleteModal &&
                <View >
                    <Modal
                    animationType='slide'
                    transparent={true}
                    visible={showDeleteModal}
                    onRequestClose={()=>setShowDeleteModal(!showDeleteModal)}
                    >
                        <View style={styles.centeredView}>
                           <View style={styles.modalView}>
                              <Text style={styles.modalText}>Are you sure ??</Text>
                            <View>
                                <Button title='Close' onPress={()=>setShowDeleteModal(!showDeleteModal)}>Close</Button>
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
    cardMain:{
      display:'flex',
      width:'80%',
      height:250,
      borderRadius:5,
      backgroundColor:'#28282B',
      alignSelf:'center',
      marginVertical:10
    },
    dataMain:{
        display:'flex',
        flexDirection:'row',
        marginLeft:10,
     marginTop:10,
    },
    cardImage:{
     width:100,
     height:100,
     backgroundColor:'white',
     borderRadius:5,
     marginRight:15,
     marginBottom:10
    },
    datatitle:{
     color:'#FDBD01'
    },
    actionMain:{
        marginTop:10,
        borderRadius:5,
        backgroundColor:'white',
        width:'80%',
        height:30,
        display:'flex',
        justifyContent:'space-between',
        marginHorizontal:10,
        padding:5,
        flexDirection:'row',
    },
    centeredView: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        marginTop: 22,
        // width:250,
        // height:250
      },
      modalView: {
        margin: 20,
        width:350,
        height:200,
        backgroundColor:'white',
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
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
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      },
    
})

export default CardView;