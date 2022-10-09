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

  useEffect(() => {
    const getData = async () => {
      axios
        .post("https://hgsonsapp.hgsons.in/master/view_cart.php", {
          Token: await getStoreValue("token"),
        })
        .then((res) => {
          setIsError(false);
          setCartData(res.data.data);
        })
        .catch((err) => {
          setIsError(true);
          console.log("err:", err);
        });
    };
    getData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView style={{ backgroundColor: "#FFFAF0" }}>
        <View style={styles.container}>
          {cartdata.map((item) => {
            return (
              <View style={styles.catalogMain}>
                <View style={styles.cardMian}>
                  <View style={styles.dataTitle}>
                    <Text style={styles.dataValue}>{"SrNo : " + 1}</Text>
                    <Text
                      style={styles.dataValue}
                    >{`CatalogNo : ${item.CatalogNo}`}</Text>
                    <Text
                      style={styles.dataValue}
                    >{`Catalog Date: ${item.CatalogDate}`}</Text>
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
                            onPress={() => setShowDeleteModal(!showDeleteModal)}
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
    height: 160,
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
  dataValue: {
    fontSize: 16,
    lineHeight: 25,
    fontWeight: "500",
    color: "#D4AF37",
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
