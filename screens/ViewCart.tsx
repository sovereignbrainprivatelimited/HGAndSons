import moment from "moment";
import React,{useState} from "react";
import { Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import ring from '../constants/images/ring.jpg';



const ViewCart =({navigation}:any)=>{
    const arr=[1,2];
    const [showDeleteModal,setShowDeleteModal]=useState(false);
    return(
        <SafeAreaView style={{flex:1,marginTop:20,backgroundColor:'white'}}>
            <View style={styles.headerMain}>
                <Text style={styles.title}>{'Your Order'}</Text>
            </View>
        <ScrollView style={{backgroundColor:'white'}}>   
        <View style={styles.container}>
            {arr.map(()=>{
                return(
                    <View style={styles.catalogMain}>
                        <View style={styles.cardMian}>
                            <View style={styles.dataTitle}>
                                <Text style={styles.dataValue}>{'SrNo : '+1}</Text>
                                <Text style={styles.dataValue}>{'CatalogNo : '+'001'}</Text>
                                <Text style={styles.dataValue}>{'Catalog Date: '+ moment(new Date()).format('YYYY-DD-MM')}</Text>
                            </View>
                            <View style={styles.imageMain}>
                                <Image source={ring} style={{width:'100%',height:'100%',borderRadius:15}} />
                            </View>
                            <View style={{width:120,position:'absolute',bottom:10,right:0,display:'flex',flexDirection:'row' ,justifyContent:'flex-end'}}>
                                <TouchableOpacity onPress={()=>{setShowDeleteModal(true)}}><Icon name='trash' size={20} style={{color:'#FDBD01',marginRight:20}}/></TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )
            })}
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
                    <Text style={{color:'#28282B',fontSize:16,fontWeight:'bold'}}>
                      {'No'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.close}>
                    <Text style={{color:'#28282B',fontSize:16,fontWeight:'bold'}}>
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
        </ScrollView>
        </SafeAreaView>
    )
}

export default ViewCart;

const styles=StyleSheet.create({
    headerMain:{
        width:'100%',
        marginTop:10,
        height:50,
        display:'flex',
        backgroundColor:'#28282B',
        textAlign:'center',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:15
    },
    title:{
        fontSize:22,
        fontWeight:'800',
        color:'#FDBD01'
    },
    container:{
        flex:1,
        backgroundColor:'white' ,
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',
        // padding:20,
        paddingLeft:30,
        paddingRight:30
       },
       catalogMain:{
           width:'100%',
           paddingHorizontal:5,
           marginVertical:15,
           display:'flex',
           flexDirection:'row',
           justifyContent:'center',
           alignItems:'center'
       },
       cardMian:{
           marginRight:0,
           width:330,
           height:160,
           borderRadius:10,
           backgroundColor:'#28282B',
           display:'flex',
           flexDirection:'row',
           padding:10,
           shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.5,
            shadowRadius: 1.41,
        
            elevation: 20,
       },
       imageMain:{
        width: 100,
        height: 100,
        right:0,
        top:10,
        position:'absolute',
        backgroundColor: 'white',
        borderRadius: 15,
        marginRight: 15,
        marginBottom: 10
       },
       dataTitle:{
        display:'flex',
        flexDirection:'column',
        lineHeight:17,
        width:200
       },
       dataValue:{
        fontSize:16,
        lineHeight:25,
        fontWeight:'500',
        color:'#FDBD01'
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
        width:350,
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
      deleteModal:{
        height: 150,
      },
      deleteTitle:{
        textAlign:'center',
        alignSelf:'center',
        justifyContent:'center',
        display:'flex',
        fontSize:22,
        marginTop:30,
        width:290,
        color:'#FDBD01',
        fontWeight:'bold'
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