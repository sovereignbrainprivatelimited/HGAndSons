import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  ToastAndroid,
  Platform,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import logo from '../constants/images/Logo.png';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Login = ({ navigation }: any) => {
  const [phoneNo, setphoneNo] = useState<any>('');
  const [emailId, setEmailId] = useState<any>('');
  const [password, setPassword] = useState<any>('');
  const [showLoader, setShowLoader] = useState(false);

  const onLogin = async () => {
    if(Platform.OS=='android'){
      ToastAndroid.show('You have logged in successfully!',ToastAndroid.TOP)
  }else{
    Alert.alert('Sucess!', 'Login Successfully')
  }
    setShowLoader(true);
    // let selectedLanguage = await getStoreValue('language');
    // let requestBody: any = {
    //   mobile: Number(phoneNo),
    //   language: selectedLanguage,
    // };
    // await setStoreValue({ key: 'phoneNo', value: Number(phoneNo) });
    // let res = await loginIn.checkUser(requestBody);
    setShowLoader(false);
    navigation.navigate('ContractorDashboard');
    // if (res?.data?.data?.userId) {
    //   storeData(res.data.data.token, res.data.data.userId);
    // } else {
    //   storeData(res.data.data.token, '');
    //   navigation.navigate('Otp', { otp: res.data.data.otp, mobile: phoneNo });
    // }
  };



  return (
    <View style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={'always'}
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}>
        <ScrollView>
          <View style={styles.LoginContainer}>
            <View style={styles.boxMain}>
              <View style={styles.LogoContainer}>
                <Image
                  style={styles.karigarLogo}
                  source={logo}
                />
              </View>
              <Text style={styles.title}>{'Login'}</Text>
              <View>
                <Text style={styles.phoneNo}>{'Email'}</Text>
              </View>
              <View>
                <TextInput
                  selectionColor={'#FEA700'}
                  keyboardType={'email-address'}
                  returnKeyType={"next"}
                  style={styles.phoneNoInput}
                  onSubmitEditing={() => {
                    if (phoneNo.length === 10) {
                      onLogin();
                    }
                  }}
                  onChangeText={(value: any) => {
                    setEmailId(value);
                  }}
                >

                </TextInput>
              </View>
              <View>
                <Text style={styles.password}>{'Password'}</Text>
              </View>
              <View>
                <TextInput
                  selectionColor={'#FEA700'}
                  // keyboardType={'default'}
                  returnKeyType={"done"}
                  secureTextEntry
                  style={styles.phoneNoInput}
                  onSubmitEditing={() => {
                    if (password.length === 10) {
                      onLogin();
                    }
                  }}
                  onChangeText={(value: any) => {
                    setPassword(value);
                  }}
                >

                </TextInput>
              </View>
              <TouchableOpacity
                onPress={() => {
                  if (emailId === 'admin@admin.com' && password === 'password') {
                    onLogin();
                  }
                  else {
                    Alert.alert('Error', 'Please Enter Correct Email and password')
                  }
                }}
                // style={
                //   phoneNo.length < 10
                //     ? styles.sendDisableOtpBtn
                //     : styles.sendOtpBtn
                // }
                style={styles.sendOtpBtn}
              >
                <View>
                  <Text style={styles.otpText}>{'Login'}</Text>
                </View>
              </TouchableOpacity>
              {showLoader && <View style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Image
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: 60,
                    height: 60,
                    resizeMode: 'cover',
                  }}
                  source={{
                    uri: 'https://www.google.com/search?q=loader+gif&rlz=1C1RXQR_enIN1017IN1017&oq=loader&aqs=chrome.1.69i57j0i433i512j0i20i263i512j0i433i512j0i512l3j0i20i263i512j0i512l2.4878j0j7&sourceid=chrome&ie=UTF-8#imgrc=JxOslC3Zg3kkJM',
                  }}
                />
              </View>}
            </View>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  LoginContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: hp('110%'),
    width: wp('100%'),
    backgroundColor: '#FDBD01',
  },
  LogoContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: '100%',
    marginTop: 30
  },
  karigarLogo: {
    height: 100,
    width: 100,
  },
  boxMain: {
    display: 'flex',
    backgroundColor: '#28282B',
    height: 480,
    width: 334,
    borderRadius: 10,
    zIndex: 1
  },
  title: {
    fontSize: 22,
    color: '#FFD700',
    textAlign: 'center',
    marginTop: 10
  },
  phoneNo: {
    fontSize: 12,
    color: '#FFD700',
    marginTop: 30,
    marginLeft: 15,
  },
  password: {
    fontSize: 12,
    color: '#FFD700',
    marginTop: 20,
    marginLeft: 15,
  },
  phoneNoInput: {
    width: '90%',
    height: 40,
    marginLeft: 15,
    borderBottomWidth: 1,
    color: 'white',
    borderBottomColor: '#FFD700',
  },
  sendOtpBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: 50,
    backgroundColor: '#FEA700',
    shadowOffset: { width: 10, height: 10 },
    shadowColor: 'rgba(228, 151, 4, 0.2)',
    shadowOpacity: 1.0,
    borderRadius: 8,
    marginTop: 50,
    marginRight: 15,
    marginLeft: 15,
  },
  otpText: {
    fontSize: 18,
    fontWeight:'bold',
    color: 'white',
  },
});

export default Login;
