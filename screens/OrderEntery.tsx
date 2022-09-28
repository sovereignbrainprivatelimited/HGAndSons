import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import CardView from "../common/components/CardView";
import moment from 'moment'
import { Dimensions, Platform, NativeModules } from 'react-native';
import SearchBox from "../common/components/SearchBox";
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from "axios";
import { getStoreValue } from "../common/LocalStorage";

const { width, height } = Dimensions.get('window');
const screenWidth = width;

const OrderEntry = ({ navigation }: any) => {

    const [orderList,setOrderList]=useState([]);
    const [partyList,setPartyList]=useState([]);
    const [itemList,setItemList]=useState([]);

    useEffect(()=>{
        const getOrderList = async () =>{

                // axios.post('https://hgsonsapp.hgsons.in/master/party_list.php',{PartyId:1,UserType:1,Token: await getStoreValue("token")}).then((res)=>{
                //     res.data.data.forEach((item:any)=>{
                //         const data={
                //             label:item.PartyName,
                //             value:item.PartyId
                //         }
                //         partyList.push(data);
                //     })
                // }).catch((err)=>{
                //     console.log('err:',err);
                // })

                // axios.post('https://hgsonsapp.hgsons.in/master/item_list.php',{UserType:1,Token: await getStoreValue("token")}).then((res)=>{
                //     res.data.data.forEach((item:any)=>{
                //         const data={
                //             label:item.ItemName,
                //             value:item.ItemId
                //         }
                //         itemList.push(data)
                //     })
                // }).catch((err)=>{
                //     console.log('err:',err);
                // })

            axios.post('https://hgsonsapp.hgsons.in/master/read_order.php',{PartyId:1,UserType:2,OrderType:"SO",Token: await getStoreValue("token")}).then((res)=>{
                res.data.data.map((item)=>{
                    // const partyName=partyList.find(e => e.value == item.PartyId);
                    
                    const data = { 
                        srNo: 1, 
                        OrderNo: item.OrderNo, 
                        date: item.OrderDate,
                        orderType: item.OrderType,
                        Party: 'Admin', 
                        Karigar: 'Emarald',
                        Item: 'Ring',
                        Status: 'Assigned to Karigar'
                    }
                    orderList.push(data);
                })

            }).catch((err)=>{
                console.log('err:',err);
            })
        }
        getOrderList();
    })
    const [searchBox, setSearchBox] = useState('')

    const data = [
        { srNo: 1, OrderNo: '001', date: new Date(), orderType: 'Order', Party: 'Admin', Karigar: 'Emarald', Item: 'Ring', Status: 'Assigned to Karigar' },
        { srNo: 1, OrderNo: '001', date: new Date(), orderType: 'Order', Party: 'Admin', Karigar: 'Emarald', Item: 'Ring', Status: 'Assigned to Karigar' },
        { srNo: 1, OrderNo: '001', date: new Date(), orderType: 'Order', Party: 'Admin', Karigar: 'Emarald', Item: 'Ring', Status: 'Assigned to Karigar' },
        { srNo: 1, OrderNo: '001', date: new Date(), orderType: 'Order', Party: 'Admin', Karigar: 'Emarald', Item: 'Ring', Status: 'Assigned to Karigar' }, 
        { srNo: 1, OrderNo: '001', date: new Date(), orderType: 'Order', Party: 'Admin', Karigar: 'Emarald', Item: 'Ring', Status: 'Assigned to Karigar' }
        ]
    const renderItem = ({ item, index }: any) => (
        <CardView
            OrganizationName={item.OrganizationName}
            date={moment(item.date).format('YYYY-MM-DD')}
            serviceType={item.location === 'remote' ? 'virtual' : 'in-person'}
            cardContainer={styles.cardStyle}
            isFromHome={false}
            srNo={item.srNo}
            OrderNo={item.OrderNo}
            orderType={item.orderType}
            Party={item.Party}
            Karigar={item.Karigar}
            Item={item.Item}
            Status={item.Status}
        />
    )
    return (
        <View style={{ flex: 1,backgroundColor:'white' }}>
            <View style={{ marginTop: 8, width: '90%', marginVertical: 5, borderRadius: 5, alignSelf: 'center', height: 50,display:'flex',flexDirection:'row' }} >
                <SearchBox
                    searchPlaceholder='Search Order'
                    value={searchBox}
                    onChangeText={(data) => {
                        setSearchBox(data);
                    }}
                />
                <TouchableOpacity style={styles.addOrder} onPress={ () => navigation.navigate('CreateOrder')}>
                      <Icon name="plus-circle" size={28} color={'#FFD700'} />

                    {/* <Ionicons name="add" size={22} color='red' style={{width:50,height:50,backgroundColor:'red'}}  /> */}
                    {/* <Text style={{color:'#28282B',fontSize:18,fontWeight:'500'}}>{'Create'}</Text> */}
                </TouchableOpacity>
            </View>
            <Text style={styles.opsText} >
                {'Single Order'}
            </Text>
            {/* {oppsDetails.length > 0 ? */}
            <FlatList
                style={{ marginHorizontal: -10, height: 330 }}
                data={orderList}
                keyExtractor={(_, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={renderItem}
                numColumns={1}
            />
            {/* : */}
            {/* <View>
                            <Text style={styles.notFoundText}>Unfortunately, we couldn't find any matches. Please use the search fields above to find an opportunity.</Text>
                        </View> */}
            {/* } */}
        </View>
    )
}

export default OrderEntry

const styles = StyleSheet.create({
    cardStyle:
    {
        width: "80%",
        padding: 90,
        marginVertical: 10,
        marginHorizontal: 10
    },
    opsText: {
        // fontFamily: Font.MONTSERRAT_BOLD,
        fontSize: 24,
        lineHeight: 29.26,
        color: '#FDBD01',
        alignSelf: 'center',
        marginTop: 10,
        fontWeight: 'bold',
        marginBottom: 16
    },
    notFoundText: {
        // fontFamily: Font.MONTSERRAT_REGULAR,
        fontSize: 16,
        color: 'white'
    },
    addOrder:{
        width:60,
        height:50,
        backgroundColor:'#28282B',
        borderRadius:50,
        marginLeft:20,
        alignItems:'center',
        textAlign:'center',
        justifyContent:'center',
    }
})