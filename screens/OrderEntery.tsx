import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
} from 'react-native';
import CardView from "../common/components/CardView";
import moment from 'moment'
import { Dimensions, Platform, NativeModules } from 'react-native';
import SearchBox from "../common/components/SearchBox";

const { width, height } = Dimensions.get('window');
const screenWidth = width;

const OrderEntry = ({ navigation }: any) => {

    // useLayoutEffect(effect:()=>{
    //    navigation.setOptions({
    //    headerStyle:{
    //     backgroundColor: 'red',
    //    }
    // },[navigation]);
    const [searchBox, setSearchBox] = useState('')

    const data = [{ srNo: 1, OrderNo: '001', date: new Date(), orderType: 'Order', Party: 'Admin', Karigar: 'Emarald', Item: 'Ring', Status: 'Assigned to Karigar' }, { srNo: 1, OrderNo: '001', date: new Date(), orderType: 'Order', Party: 'Admin', Karigar: 'Emarald', Item: 'Ring', Status: 'Assigned to Karigar' }, { srNo: 1, OrderNo: '001', date: new Date(), orderType: 'Order', Party: 'Admin', Karigar: 'Emarald', Item: 'Ring', Status: 'Assigned to Karigar' }, { srNo: 1, OrderNo: '001', date: new Date(), orderType: 'Order', Party: 'Admin', Karigar: 'Emarald', Item: 'Ring', Status: 'Assigned to Karigar' }, { srNo: 1, OrderNo: '001', date: new Date(), orderType: 'Order', Party: 'Admin', Karigar: 'Emarald', Item: 'Ring', Status: 'Assigned to Karigar' }]
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
        <View style={{ flex: 1 }}>
            <View style={{ marginTop: 8, width: '90%', marginVertical: 5, borderRadius: 5, alignSelf: 'center', height: 50 }} >
                <SearchBox
                    searchPlaceholder='Search Order'
                    value={searchBox}
                    onChangeText={(data) => {
                        setSearchBox(data);
                    }}
                />
            </View>
            <Text style={styles.opsText} >
                {'Single Order'}
            </Text>
            {/* {oppsDetails.length > 0 ? */}
            <FlatList
                style={{ marginHorizontal: -10, height: 330 }}
                data={data}
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
})