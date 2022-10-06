import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";


const AboutUs = () => {
    return(
        <SafeAreaView>
            <ScrollView style={{backgroundColor:'#FFFAF0',width:'100%',height:'100%'}}>
                <View style={styles.container}>
                    <View style={styles.headerMain}>
                        <Text style={styles.headerTitle}>{'About Us'}</Text>
                        <Text style={styles.subTitle}>{'H.G. & SONS'}</Text>
                    </View>
                    <View style={styles.bodyMain}>
                        <View style={{marginTop:10,padding:10}}>
                            <Text style={styles.bodyTxt}>{'H.G. Group makes the rock it is today is its 85 years of legacy left behind by its founder '}</Text>
                            <Text style={styles.bodyTxt}>{'Late Shri soni Harjivandas Govindji. Who started H.G. & Sons in 1937. And Later on under his guidance KISHORBHAI, CHANDRAKANTBHAI, MANSUKHBHAI and CHHOTALAL'}</Text>
                            <Text style={styles.bodyTxt}>{'Second Generation of the H.G. Family started'}</Text>
                        </View>
                        <View style={{marginTop:10,padding:10}}>
                            <Text style={styles.bodyTxt}>{'H.G. & Company with their entrepreneurial enthusiasm that is a Family Trade Mark.'}</Text>
                            <Text style={styles.bodyTxt}>{'They approached their work with Tradition , Honour and Discipline.'}</Text>
                            <Text style={styles.bodyTxt}>{'They worked tirelessly to take it to achieve milestone and build H.G. EMPIRE. Under their guidance the company has gone from manufacturing to marketing to distribution to spread it business across The country.'}</Text>
                        </View>
                        <View style={{marginTop:10,padding:10}}>
                            <Text style={styles.bodyTxt}>{'H.G. & Sons started out as a jewellery manufacturer, has evolved over time into a fully'}</Text>
                            <Text style={styles.bodyTxt}>{'Integrated Jewellery Company with combined production and distribution systems'}</Text>
                            <Text style={styles.bodyTxt}>{'Encompassing everything from Jewellery Manufacturing for both Retail and wholesale.'}</Text>
                            <Text style={styles.bodyTxt}>{'H.G. & Sons has been known for its design and quality of workmanship and innovation.'}</Text>
                            <Text style={styles.bodyTxt}>{'We take pride in manufacturing 100% of all gold jewellery in our State-of-the-Art in Rajkot.'}</Text>
                            <Text style={styles.bodyTxt}>{'We specialized in Traditional Rajkot handmade jewellery, casted jewellery.'}</Text>
                            <Text style={styles.bodyTxt}>{'We are doing business with Asia’s Largest jewellery Manufacturer Emerald Jewel industry India Ltd. Since 1995.'}</Text>
                            <Text style={styles.bodyTxt}>{'H.G. & Company started out as a Trading of Antique Jewellery, it has known for its own Creativity.'}</Text>
                            <Text style={styles.bodyTxt}>{'And Uniqueness in Antique Jewellery like Kundan jewellery, ruby emerald jewellery, traditional jewellery. We are able to attain high quality of craftsmanship that is amongst the best in the world.'}</Text>
                            <Text style={styles.bodyTxt}>{'H.G. & Sons is currently in the hands of Third Generation namely VIRENDRA KISHORBHAI and SHISHIR CHANDRAKANTBHAI.'}</Text>
                        </View>
                        <View style={{marginTop:20,padding:10}}>
                            <Text style={styles.bodyTxt}>{'Top quality products'}</Text>
                            <Text style={styles.bodyTxt}>{'Best customer service'}</Text>
                            <Text style={styles.bodyTxt}>{'30-days money back guarantee'}</Text>
                        </View>
                        <View style={styles.footerMain}>
                            <Text style={styles.footerTxt}>{'Privacy policy @ H.G.Sons, 2022'}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default AboutUs;

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFFAF0'
    },
    headerMain:{
        width:'100%',
        height:60,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginTop:20,
    },
    headerTitle:{
        color:'#28282B',
        fontSize:34,
        fontWeight:'bold'
    },
    subTitle:{
        color:'#28282B',
        fontSize:18,
        fontWeight:'bold'
    },
    bodyMain:{
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',
        width:'100%',
        // padding:10
    },
    bodyTxt:{
        color:'#28282B'
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