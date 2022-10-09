import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import ring from "../constants/images/ring.jpg";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import { getStoreValue } from "../common/LocalStorage";
import { Image } from "native-base";

const Catalog = (props: any) => {
  const imagePath = "https://order.hgsons.in/uploads/order_images/";

  const [catalogData, setCatalogData] = useState([]);

  // useEffect(()=>{
  //     navigation.closeDrawer();
  //   },[]);

  useEffect(() => {
    const getCatalog = async () => {
      let data = {
        UserType: 1,
        ItemId: props?.route?.params?.itemId,
        PartyId: await getStoreValue("userId"),
        Token: await getStoreValue("token"),
      };
      axios
        .post("https://hgsonsapp.hgsons.in/master/itemview.php", {
          UserType: 1,
          ItemId: props?.route?.params?.itemId,
          PartyId: await getStoreValue("userId"),
          Token: await getStoreValue("token"),
        })
        .then((res) => {
          const arr = res?.data?.data?.map((item) => {
            return item;
          });
          console.log("data::", arr);
          setCatalogData(arr);
        })
        .catch((err) => {
          console.log("err:", err);
        });
    };
    getCatalog();
  }, []);
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const onAddProduct = async (value: any) => {
    axios
      .post("https://hgsonsapp.hgsons.in/master/add_to_cart.php", {
        CatalogId: value,
        Token: await getStoreValue("token"),
      })
      .then((res) => {
        ToastAndroid.show(
          "Product Added to cart Successfully",
          ToastAndroid.TOP
        );
      })
      .catch((err) => {
        console.log("err:", err);
      });
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ backgroundColor: "#FFFAF0" }}>
        {catalogData.length !== 0 ? (
          <View style={styles.container}>
            {catalogData.map((item) => {
              return (
                <View style={styles.catalogMain}>
                  <View style={styles.cardMian}>
                    <View style={styles.dataTitle}>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <View
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            flexDirection: "row",
                            width: "40%",
                          }}
                        >
                          <Text style={styles.dataLabel}>{"C/O No"}</Text>
                          <Text style={styles.dataLabel}>{":  "}</Text>
                        </View>
                        <Text style={styles.data_Value}>
                          {item.CatalogNo && item.CatalogNo}
                        </Text>
                      </View>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <View
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            flexDirection: "row",
                            width: "40%",
                          }}
                        >
                          <Text style={styles.dataLabel}>{"C/O Date "}</Text>
                          <Text style={styles.dataLabel}>{":  "}</Text>
                        </View>
                        <Text style={styles.data_Value}>
                          {item.CatalogDate && item.CatalogDate}
                        </Text>
                      </View>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <View
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            flexDirection: "row",
                            width: "40%",
                          }}
                        >
                          <Text style={styles.dataLabel}>{"Karigar "}</Text>
                          <Text style={styles.dataLabel}>{":  "}</Text>
                        </View>
                        <Text style={styles.data_Value}>
                          {item.KarigarName && item.KarigarName}
                        </Text>
                      </View>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <View
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            flexDirection: "row",
                            width: "40%",
                          }}
                        >
                          <Text style={styles.dataLabel}>{"Item "}</Text>
                          <Text style={styles.dataLabel}>{":  "}</Text>
                        </View>
                        <Text style={styles.data_Value}>
                          {item.ItemName && item.ItemName}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.imageMain}>
                      {console.log("image:", `${imagePath}${item.order_image}`)}
                      <Image
                        source={{ uri: `${imagePath}${item.order_image}` }}
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: 15,
                        }}
                        alt="Product Image"
                      />
                    </View>
                    <View
                      style={{
                        width: 120,
                        position: "absolute",
                        bottom: 10,
                        right: 10,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-end",
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          backgroundColor: "#D4AF37",
                          padding: 10,
                          borderRadius: 50,
                        }}
                        onPress={() => {
                          onAddProduct(item.CatalogId);
                        }}
                      >
                        <Text style={{ color: "#28282B", fontWeight: "500" }}>
                          {"Add to cart"}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        ) : (
          <ActivityIndicator
            size="large"
            color={"#FDBD01"}
            style={{ marginTop: 250 }}
          />
        )}
      </ScrollView>
      <View style={styles.footerMain}>
        <Text style={styles.footerTxt}>
          {"privacy policy, T&C @ H.G. Sons © 2022"}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Catalog;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //  padding:20,
    backgroundColor: "#FFFAF0",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingLeft: 10,
  },
  viewCart: {
    width: 100,
    height: 40,
    borderRadius: 50,
    backgroundColor: "#D4AF37",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    marginRight: 12,
    marginTop: 10,
  },
  dataTitle: {
    display: "flex",
    flexDirection: "column",
    lineHeight: 17,
    width: 200,
  },
  dataLabel: {
    fontSize: 16,
    lineHeight: 25,
    fontWeight: "500",
    color: "#D4AF37",
  },
  data_Value: {
    fontSize: 16,
    lineHeight: 25,
    fontWeight: "500",
    color: "#28282B",
  },
  catalogMain: {
    width: "100%",
    paddingLeft: 20,
    paddingRight: 20,
    // paddingHorizontal: 10,
    marginVertical: 15,
    display: "flex",
    flexDirection: "column",
  },
  cardMian: {
    width: "100%",
    height: 170,
    borderRadius: 10,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1.41,
    paddingLeft: 10,
    paddingTop: 10,
    elevation: 20,
  },
  imageMain: {
    width: 100,
    height: 100,
    right: 0,
    top: 10,
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 15,
    marginRight: 15,
    marginBottom: 10,
  },
  descMain: {
    width: "70%",
  },
  productName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  cartIcon: {
    position: "absolute",
    right: 10,
    top: -30,
    width: 35,
    height: 35,
    backgroundColor: "#D4AF37",
    borderWidth: 1,
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  footerMain: {
    width: "100%",
    display: "flex",
    backgroundColor: "#28282B",
    height: 30,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  footerTxt: {
    fontSize: 10,
    color: "#D4AF37",
  },
});
