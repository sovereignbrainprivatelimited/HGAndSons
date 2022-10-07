import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    ToastAndroid
} from 'react-native';
import CardView from "../common/components/CardView";
import moment from 'moment'
import SearchBox from "../common/components/SearchBox";
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from "axios";
import { getStoreValue } from "../common/LocalStorage";


const OrderEntry = ({ navigation }: any) => {

    const [orderList, setOrderList] = useState([]);
    const [partyList, setPartyList] = useState([]);
    const [itemList, setItemList] = useState([]);
    const [searchBox, setSearchBox] = useState('');
    const [showSingleOrder, setShowSingleOrder] = useState(true);
    const [showCatalogOrder, setShowCatalogOrder] = useState(false);

    const arr = [
        {
            srNo: 1,
            OrderNo: 'orderNo',
            date: 'date',
            orderType: 'type',
            Party: 'party',
            Karigar: 'karigar',
            Item: 'item',
            Status: 'status',
            orderId: 'id',
            Image: 'image'
        }
    ]

    useEffect(() => {
        navigation.closeDrawer()
        const getOrderList = async () => {

            axios.post('https://hgsonsapp.hgsons.in/master/party_list.php', { PartyId: 1, UserType: 1, Token: await getStoreValue("token") }).then((res) => {
                res.data.data.forEach((item: any) => {

                    const data = {
                        label: item.PartyName,
                        value: item.PartyId
                    }
                    partyList.push(data);
                })
            }).catch((err) => {
                console.log('err:', err);
            })

            axios.post('https://hgsonsapp.hgsons.in/master/item_list.php', { UserType: 1, Token: await getStoreValue("token") }).then((res) => {
                res.data.data.forEach((item: any) => {
                    const data = {
                        label: item.ItemName,
                        value: item.ItemId
                    }
                    itemList.push(data)
                })
            }).catch((err) => {
                console.log('err:', err);
            })

            axios.post('https://hgsonsapp.hgsons.in/master/read_order.php', { PartyId: 1, UserType: 2, OrderType: "SO", Token: await getStoreValue("token") }).then((res) => {
                const arr = Object.values(res.data.data);
                let newArr = [];
                arr.map((value) => {
                    const data = {
                        srNo: 1,
                        OrderNo: value.OrderNo !== undefined ? value.OrderNo : '',
                        date: value.OrderDate ? value.OrderDate : '',
                        orderType: value.OrderType ? value.OrderType : '',
                        Party: value.PartyName ? value.PartyName : '',
                        Karigar: value.pname ? value.pname : '',
                        Item: value.ItemName ? value.ItemName : '',
                        Status: value.OrderStatus ? value.OrderStatus : "",
                        orderId: value.OrderId ? value.OrderId : '',
                        Image: value.order_image
                    }
                    newArr.push(data);
                })
                setOrderList(newArr);
            }).catch((err) => {
                console.log('err:', err);
            })
        }
        getOrderList();
    }, []);

    useEffect(() => { }, [orderList])

    const onSearch = async (value) => {
        console.log('valye', value);
        axios.post('https://hgsonsapp.hgsons.in/master/search_order.php', { Search: value, Token: await getStoreValue('token') }).then((res) => {
            console.log('res:;', res);
            const arr = Object.values(res.data.data);
            let newArr = [];
            arr.map((value) => {
                const data = {
                    srNo: 1,
                    OrderNo: value.OrderNo !== undefined ? value.OrderNo : '',
                    date: value.OrderDate ? value.OrderDate : '',
                    orderType: value.OrderType ? value.OrderType : '',
                    Party: value.PartyName ? value.PartyName : '',
                    Karigar: value.pname ? value.pname : '',
                    Item: value.ItemName ? value.ItemName : '',
                    Status: value.OrderStatus ? value.OrderStatus : "",
                    orderId: value.OrderId ? value.OrderId : '',
                    Image: value.Image
                }
                newArr.push(data);
            })
            setOrderList(newArr);

        }).catch((err) => {
            setOrderList([])
            console.log('err:', err);

        })
    }

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
            orderData={item}
            showCatalogOrder={showCatalogOrder}
        />
    )

    return (
        <View style={{ flex: 1, backgroundColor: '#FFFAF0' }}>
            <View style={{ marginTop: 8, width: '90%', marginVertical: 5, borderRadius: 5, alignSelf: 'center', height: 50, display: 'flex', flexDirection: 'row' }} >
                <SearchBox
                    searchPlaceholder='Search Order'
                    value={searchBox}
                    onChangeText={(data) => {
                        setSearchBox(data);
                        onSearch(data);
                    }}
                />
                <TouchableOpacity style={styles.addOrder} onPress={() => navigation.navigate('CreateOrder')}>
                    <Icon name="plus-circle" size={28} color={'#D4AF37'} />
                </TouchableOpacity>
            </View>
            <View style={styles.titleMain}>
                <View style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
                    <TouchableOpacity onPress={() => { setShowSingleOrder(true); setShowCatalogOrder(false) }}>
                        <Text style={styles.opsText} >
                            {'Single Order'}
                        </Text>
                    </TouchableOpacity>
                    {showSingleOrder && <View style={{ height: 2, backgroundColor: '#28282B', width: '100%', position: 'absolute', bottom: 10 }}></View>}
                </View>
                <TouchableOpacity onPress={() => { setShowCatalogOrder(true); setShowSingleOrder(false) }}>
                    <Text style={styles.opsText} >
                        {'Catalog Order'}
                    </Text>
                    {showCatalogOrder && <View style={{ height: 2, backgroundColor: '#28282B', width: '100%', position: 'absolute', bottom: 10 }}></View>}
                </TouchableOpacity>
            </View>
            {(orderList.length !== 0 && showSingleOrder) ?
                <FlatList
                    style={{ marginHorizontal: -10, height: 330 }}
                    data={orderList}
                    keyExtractor={(_, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderItem}
                    numColumns={1}
                />
                :
                (orderList.length !== 0 && showCatalogOrder) ?
                    <FlatList
                        style={{ marginHorizontal: -10, height: 330 }}
                        data={arr}
                        keyExtractor={(_, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        renderItem={renderItem}
                        numColumns={1}
                    />
                    :
                    <View>
                        <ActivityIndicator size="large" color={"#FDBD01"} style={{ marginTop: 190 }} />
                    </View>
            }
            <View style={styles.footerMain}>
                <Text style={styles.footerTxt}>{'Privacy policy @ H.G.Sons, 2022'}</Text>
            </View>
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
    titleMain: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20
    },
    opsText: {
        // fontFamily: Font.MONTSERRAT_BOLD,
        fontSize: 20,
        lineHeight: 29.26,
        color: '#D4AF37',
        alignSelf: 'center',
        marginTop: 10,
        fontWeight: 'bold',
        marginBottom: 16
    },
    notFoundText: {
        // fontFamily: Font.MONTSERRAT_REGULAR,
        fontSize: 16,
        textAlign: 'center',
        marginTop: 190,
        color: 'black',
        alignSelf: 'center'
    },
    addOrder: {
        width: 60,
        height: 50,
        backgroundColor: '#28282B',
        borderRadius: 50,
        marginLeft: 20,
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
    },
    footerMain: {
        width: '100%',
        display: 'flex',
        backgroundColor: '#28282B',
        height: 30,
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footerTxt: {
        fontSize: 10,
        color: '#D4AF37'
    }
})