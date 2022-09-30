import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    SafeAreaView,
    ImageBackground,
    ToastAndroid,
    Platform,
  } from 'react-native';
import ring from '../constants/images/ring.jpg';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from "axios";
import { getStoreValue } from "../common/LocalStorage";


const Catalog =({navigation}:any)=>{

    const [catalogData,setCatalogData]=useState([]);

    useEffect(()=>{
        navigation.closeDrawer();
      },[]);

      useEffect(()=>{
        const getCatalog = async ()=>{
            axios.post('https://hgsonsapp.hgsons.in/master/itemview.php',{UserType:1,Token: await getStoreValue("token")}).then((res)=>{
                console.log('res::::',res.data.data);
                const arr=res.data.data.map((item)=> {return item});
                setCatalogData(arr);
            }).catch((err)=>{
                console.log('err:',err);
            })
        }
        getCatalog();
      },[])
    const arr=[1,2,3,4,5,6,7,8,9]
    const onAddProduct = async (value:any,name:any)=>{
        axios.post('https://hgsonsapp.hgsons.in/master/add_to_cart.php',{CatalogId:value,Token:await getStoreValue("token")}).then((res)=>{
            ToastAndroid.show(`${name} Added to cart Successfully`,ToastAndroid.TOP)
        })
    }
    return(
        <SafeAreaView style={{flex:1}}>
        <ScrollView style={{backgroundColor:'white'}}>   
            <TouchableOpacity style={styles.viewCart} onPress={()=>navigation.navigate('ViewCart')}>
                <Text style={{color:'#28282B'}}>{'View '}</Text>
                <Icon size={22} name='shopping-cart' color={'#28282B'}/>
            </TouchableOpacity>
        <View style={styles.container}>
            {catalogData.map((item)=>{
                return(
                    <View style={styles.catalogMain}>
                        <View style={styles.cardMian}>
                            <View style={styles.imageMain}>
                                <Image source={{uri:`${item.order_image}`}} style={{width:'100%',height:'100%',borderRadius:15}}/>
                            </View>
                            <View style={styles.descMain}>
                                <Text style={styles.productName}>{`${item.Remarks}`}</Text>
                                <TouchableOpacity style={styles.cartIcon} onPress={()=>{onAddProduct(item.CatalogId,item.Remarks)}}>
                                <Icon  name="shopping-cart" size={22} color={'black'} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )
            })}
        </View>
        </ScrollView>
        </SafeAreaView>
    )
}

export default Catalog;

const styles=StyleSheet.create({
    container:{
     flex:1,
    //  padding:20,
     backgroundColor:'white' ,
     display:'flex',
     flexDirection:'row',
     flexWrap:'wrap',
    paddingLeft:10
    },
    viewCart:{
        width:100,
        height:40,
        borderRadius:50,
        backgroundColor:'#FDBD01',
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'flex-end',
        marginRight:12,
        marginTop:10
    },
    catalogMain:{
        width:'50%',
        paddingLeft:10,
        paddingRight:10,
        paddingHorizontal:10,
        marginVertical:15,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    cardMian:{
        width:150,
        height:170,
        borderRadius:10,
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
    imageMain:{
        width: 150,
        height: 130,
        backgroundColor: 'white',
        borderRadius: 15
    },
    descMain:{
        marginTop:5,
        display:'flex',
        flexDirection:'row',
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        flexWrap:'wrap'
    },
    productName:{
        fontSize:20,
        fontWeight:'bold'
    },
    cartIcon:{
        position:'absolute',
        right:10,
        top:-20,
        width:35,
        height:35,
        backgroundColor:'#FDBD01',
        borderRadius:50,
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    }
})