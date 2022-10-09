import axios from "axios";
import { Image } from "native-base";
import React, { useEffect, useState } from "react";
import {
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { getStoreValue } from "../common/LocalStorage";
import { Dimensions } from "react-native";

const ViewCart = ({ navigation }: any) => {
  const imagePath = "https://order.hgsons.in/uploads/order_images/";
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const [cartdata, setCartData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isError, setIsError] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);

  useEffect(() => {
    const getData = async () => {
      axios
        .post("https://hgsonsapp.hgsons.in/master/view_cart.php", {
          Token: await getStoreValue("token"),
        })
        .then((res) => {
          setIsError(false);
          let arr = [];
          console.log("data:", res.data.data);
          res?.data?.data?.map((item) => {
            arr.push({
              PartyName: item.PartyName,
              KarigarCode: 1,
              Purity: 11,
              Size: 11,
              ItemName: item.ItemName,
              Pcs: 1,
              Weight: 0,
              Qty: 1,
              order_image: item.order_image,
            });
          });
          setCartData(arr);
        })
        .catch((err) => {
          setIsError(true);
          console.log("err:", err);
        });
    };
    getData();
  }, []);

  const onDelete = () => {
    axios
      .post("https://hgsonsapp.hgsons.in/master/delete_cart.php", {
        BagId: deleteItem,
      })
      .then((res) => {
        console.log("res::", res.data);
      })
      .catch((err) => {
        console.log("err:", err);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView style={{ backgroundColor: "#FFFAF0" }}>
        <View style={styles.container}>
          {cartdata.map((item, index) => {
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
                        <Text style={styles.dataLabel}>{"Name"}</Text>
                        <Text style={styles.dataLabel}>{":  "}</Text>
                      </View>
                      <Text style={styles.data_Value}>{item.PartyName}</Text>
                    </View>
                    <View style={{ display: "flex", flexDirection: "row" }}>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          width: "40%",
                        }}
                      >
                        <Text style={styles.dataLabel}>{"Karigar"}</Text>
                        <Text style={styles.data_Value}>
                          {item.KarigarCode}
                        </Text>
                      </View>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          width: "40%",
                        }}
                      >
                        <Text style={styles.dataLabel}>{"Purity"}</Text>
                        <Text style={styles.data_Value}>{item.Purity}</Text>
                      </View>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          width: "40%",
                        }}
                      >
                        <Text style={styles.dataLabel}>{"Size"}</Text>
                        <Text style={styles.data_Value}>{item.Size}</Text>
                      </View>
                    </View>
                    <View style={{ display: "flex", flexDirection: "row" }}>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          width: "40%",
                        }}
                      >
                        <Text style={styles.dataLabel}>{"Item"}</Text>
                        <Text style={styles.data_Value}>{item.ItemName}</Text>
                      </View>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          width: "35%",
                        }}
                      >
                        <Text style={styles.dataLabel}>{"Pcs"}</Text>
                        <Text style={styles.data_Value}>{item.Pcs}</Text>
                      </View>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          width: "35%",
                        }}
                      >
                        <Text style={styles.dataLabel}>{"Weight"}</Text>
                        <Text style={styles.data_Value}>{item.Weight}</Text>
                      </View>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginTop: 10,
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
                        <Text style={styles.dataLabel}>{"Qty"}</Text>
                        <Text style={styles.dataLabel}>{":  "}</Text>
                      </View>
                      <View
                        style={{
                          width: "70%",
                          display: "flex",
                          flexDirection: "row",
                          marginLeft: 5,
                        }}
                      >
                        <TouchableOpacity
                          style={{
                            backgroundColor: "red",
                            padding: 5,
                            width: 30,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 10,
                          }}
                          onPress={() => {
                            cartdata[index].Qty -= 1;
                            setCartData([...cartdata]);
                            console.log("item:", item);
                          }}
                        >
                          <Icon name={"minus"} color={"white"} size={18} />
                        </TouchableOpacity>
                        <View style={{ marginLeft: 10 }}>
                          <Text style={styles.data_Value} key={index}>
                            {item.Qty > 1 ? item.Qty : 1}
                          </Text>
                        </View>
                        <TouchableOpacity
                          style={{
                            backgroundColor: "green",
                            padding: 5,
                            width: 30,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 10,
                            marginLeft: 10,
                          }}
                          onPress={() => {
                            cartdata[index].Qty += 1;
                            setCartData([...cartdata]);
                            console.log("item:", cartdata);
                          }}
                        >
                          <Icon name="plus" color={"white"} size={18} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  <View style={styles.imageMain}>
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
                      right: 0,
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-end",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        setDeleteItem(item.BagId);
                        setShowDeleteModal(true);
                      }}
                    >
                      <Icon
                        name="trash"
                        size={20}
                        style={{ color: "#D4AF37", marginRight: 20 }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}
          {showDeleteModal && (
            <View>
              <Modal
                animationType="slide"
                transparent={true}
                visible={showDeleteModal}
                onRequestClose={() => setShowDeleteModal(!showDeleteModal)}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <View style={[styles.modalBodyMain, styles.deleteModal]}>
                      <Text style={styles.deleteTitle}>
                        Are you sure you want to delete this order ??
                      </Text>
                      <View style={styles.BtnMain}>
                        <TouchableOpacity
                          style={styles.close}
                          onPress={() => setShowDeleteModal(!showDeleteModal)}
                        >
                          <Text
                            style={{
                              color: "#D4AF37",
                              fontSize: 16,
                              fontWeight: "bold",
                            }}
                          >
                            {"No"}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.close}>
                          <Text
                            style={{
                              color: "#D4AF37",
                              fontSize: 16,
                              fontWeight: "bold",
                            }}
                            onPress={() => {
                              onDelete();
                              setShowDeleteModal(!showDeleteModal);
                            }}
                          >
                            {"Yes"}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
          )}
        </View>
        {isError && (
          <View
            style={{
              width: windowWidth,
              height: windowHeight,
              backgroundColor: "#FFFAF0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={styles.notFoundTxt}>{"No Data Found!"}</Text>
          </View>
        )}
        <TouchableOpacity
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 20,
            marginBottom: 20,
            padding: 15,
            width: "90%",
            alignSelf: "center",
            borderRadius: 40,
            justifyContent: "center",
            backgroundColor: "#D4AF37",
          }}
        >
          <Text style={{ fontSize: 20, color: "#28282B", fontWeight: "bold" }}>
            {"Place Order"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.footerMain}>
        <Text style={styles.footerTxt}>
          {"privacy policy, T&C @ H.G. Sons © 2022"}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ViewCart;

const styles = StyleSheet.create({
  headerMain: {
    width: "100%",
    marginTop: 10,
    height: 50,
    display: "flex",
    backgroundColor: "#28282B",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#D4AF37",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFAF0",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    // padding:20,
    paddingLeft: 30,
    paddingRight: 30,
  },
  catalogMain: {
    width: "100%",
    paddingHorizontal: 5,
    marginVertical: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  cardMian: {
    marginRight: 0,
    width: 330,
    height: 200,
    borderRadius: 10,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1.41,

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
  datatitle: {
    color: "#D4AF37",
  },
  data_Value: {
    fontSize: 15,
    lineHeight: 25,
    fontWeight: "500",
    color: "#28282B",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    marginTop: -20,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBodyMain: {
    width: 350,
    height: 250,
    borderRadius: 20,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 15,
  },
  deleteModal: {
    height: 150,
  },
  deleteTitle: {
    textAlign: "center",
    alignSelf: "center",
    justifyContent: "center",
    display: "flex",
    fontSize: 22,
    marginTop: 30,
    width: 290,
    color: "#D4AF37",
    fontWeight: "bold",
  },
  BtnMain: {
    width: "90%",
    height: 50,
    marginTop: 10,
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  close: {
    backgroundColor: "#28282B",
    borderRadius: 10,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    height: 40,
    width: 70,
    marginRight: 10,
  },
  footerMain: {
    width: "100%",
    display: "flex",
    backgroundColor: "#28282B",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  footerTxt: {
    fontSize: 10,
    color: "#D4AF37",
  },
  notFoundTxt: {
    marginBottom: 100,
    color: "#28282B",
    fontSize: 20,
    fontWeight: "400",
  },
});
