import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    ToastAndroid,
    ActivityIndicator,
  } from 'react-native';
import ring from '../constants/images/ring.jpg';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from "axios";
import { getStoreValue } from "../common/LocalStorage";
import { Image } from "native-base";


const Catalog =({navigation}:any)=>{

  const imagePath='https://order.hgsons.in/uploads/order_images/'

    const [catalogData,setCatalogData]=useState([]);

    useEffect(()=>{
        navigation.closeDrawer();
      },[]);

      useEffect(()=>{
        const getCatalog = async ()=>{
            axios.post('https://hgsonsapp.hgsons.in/master/itemview.php',{UserType:1,Token: await getStoreValue("token")}).then((res)=>{
                const arr=res.data.data.map((item)=> {return item});
                setCatalogData(arr);
            }).catch((err)=>{
                console.log('err:',err);
            })
        }
        getCatalog();
      },[])
    const arr=[1,2,3,4,5,6,7,8,9]
    const onAddProduct = async (value:any)=>{
        axios.post('https://hgsonsapp.hgsons.in/master/add_to_cart.php',{CatalogId:value,Token:await getStoreValue("token")}).then((res)=>{
            ToastAndroid.show('Product Added to cart Successfully',ToastAndroid.TOP);
        }).catch((err)=>{
            console.log('err:',err);
        })
    }
    return(
        <SafeAreaView style={{flex:1}}>
        <ScrollView style={{backgroundColor:'#FFFAF0'}}>   
            <TouchableOpacity style={styles.viewCart} onPress={()=>navigation.navigate('ViewCart')}>
                <Text style={{color:'#28282B'}}>{'View '}</Text>
                <Icon size={22} name='shopping-cart' color={'#28282B'}/>
            </TouchableOpacity>
        {catalogData.length!==0?<View style={styles.container}>
            {catalogData.map((item)=>{
                return(
                    <View style={styles.catalogMain}>
                        <View style={styles.cardMian}>
                            <View style={styles.imageMain}>
                                <Image source={{uri:`${imagePath}${item.order_image}`}} style={{width:'100%',height:'100%',borderRadius:15}} alt='Product Image'/>
                            </View>
                            <View style={styles.descMain}>
                                <Text style={styles.productName}>{`${item.Remarks}`}</Text>
                                <TouchableOpacity style={styles.cartIcon} onPress={()=>{onAddProduct(item.CatalogId)}}>
                                <Icon  name="shopping-cart" size={22} color={'black'} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )
            })}
        </View>:
                <ActivityIndicator size="large"  color={"#FDBD01"} style={{marginTop:250}}/>
        }
        </ScrollView>
        <View style={styles.footerMain}>
            <Text style={styles.footerTxt}>{'Privacy policy @ H.G.Sons, 2022'}</Text>
        </View>
        </SafeAreaView>
    )
}

export default Catalog;

const styles=StyleSheet.create({
    container:{
     flex:1,
    //  padding:20,
    backgroundColor:"#FFFAF0",
     display:'flex',
     flexDirection:'row',
     flexWrap:'wrap',
    paddingLeft:10
    },
    viewCart:{
        width:100,
        height:40,
        borderRadius:50,
        backgroundColor:'#D4AF37',
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
        width: 130,
        height: 120,
        display:"flex",
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
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
        top:-30,
        width:35,
        height:35,
        backgroundColor:'#D4AF37',
        borderWidth:1,
        borderRadius:50,
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
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
    }
})