import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LoginApi from '../services/login.service';
import {
  Facebook as FacebookIcon,
  Google as GoogleIcon,
  ShapeIcon,
} from '../common/icons';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStoreValue, setStoreValue } from '../common/LocalStorage';
import logo from '../constants/images/Logo.png';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';
import { Profile } from 'react-native-fbsdk-next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ASSET_BASE_URL } from '../URL';
import Loader from '../common/Loader';
import { Center } from 'native-base';
const loginIn = new LoginApi();

const Login = ({ navigation }: any) => {
  const [phoneNo, setphoneNo] = useState<any>('');
  const [emailId, setEmailId] = useState<any>('');
  const [password, setPassword] = useState<any>('');
  const { t, i18n } = useTranslation();
  const [accessToken, setAccessToken] = useState();
  const [userInfo, setUserInfo] = useState();
  const [userGoogleInfo, setUserGoogleInfo] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [facebookToken, setFacebookToken] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  const storeData = async (value: any, userId: any) => {
    try {
      await AsyncStorage.setItem('token', value);
      await AsyncStorage.setItem('userId', userId.toString());
    } catch (e) {
      console.log('Can not store auth token');
    }
  };
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '368220512203-scrq9ra4f02gqohiuh0ch9cug5a6fko3.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
  }, []);

  const onLogin = async () => {
    Alert.alert('Sucess!','Login Successfully')
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

  useEffect(() => {
    const currentProfile = Profile.getCurrentProfile().then(function (
      currentProfile,
    ) {
      if (currentProfile) {
        console.log(
          'The current logged user is: ' +
          currentProfile.name +
          '. His profile id is: ' +
          currentProfile.userID,
        );
      }
    });
  }, [facebookToken]);

  const googleSign = async () => {
    await setStoreValue({
      key: 'socialLogin',
      value: true,
    });
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      navigation.navigate('Otp');
      // this.setState({userInfo});
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  const handleFacebookLogin = async () => {
    await setStoreValue({
      key: 'socialLogin',
      value: true,
    });
    LoginManager.logInWithPermissions([
      'public_profile',
      'email',
      'user_friends',
    ]).then(
      function (result: any) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then((data: any) => {
            navigation.navigate('Otp');
            setFacebookToken(data.accessToken.toString());
            console.log(data.accessToken.toString());
          });
        }
      },
      function (error: any) {
        console.log('Login fail with error: ' + error);
      },
    );
  };

  const getUserData = async () => {
    let userInfoResponse = await fetch(
      'https://www.googleapis.com/userinfo/v2/me',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    userInfoResponse.json().then(data => {
      setUserInfo(data);
    });
  };

  return (
    // <View style={{ flex: 1 }}>
    //   <KeyboardAwareScrollView
    //     keyboardShouldPersistTaps={'always'}
    //     style={{ flex: 1 }}
    //     showsVerticalScrollIndicator={false}>
    //     <ScrollView>
    //       <View style={styles.LoginContainer}>
    //         <View style={styles.firstPortion}>
    //           <View style={styles.starterHeaderContainer}>
    //           <Image
    //               style={styles.karigarLogo}
    //               source={logo}
    //             />
    //           </View>
              
    //         </View>
    //         <View style={styles.loginFieldContainer}>
    //           <View>
    //             <Text style={styles.loginFirstFieldHeader}>
    //               {'Login'}
    //             </Text>
    //           </View>
    //           <View>
    //             <Text style={styles.loginFieldDesc}>{t('weSendAnOtp')}</Text>
    //           </View>
    //           <View>
    //             <Text style={styles.phoneNo}>{t('phoneNo')}</Text>
    //           </View>
    //           <View>
    //             <TextInput
    //               // ref={}
    //               selectionColor={'#FEA700'}
    //               keyboardType={'number-pad'}
    //               style={styles.phoneNoInput}
    //               maxLength={10}
    //               onSubmitEditing={() => {
    //                 if (phoneNo.length === 10) {
    //                   onLogin();
    //                 }
    //               }}
    //               onChangeText={(value: any) => {
    //                 setphoneNo(value);
    //               }}></TextInput>
    //           </View>
    //           <TouchableOpacity
    //             onPress={() => {
    //               if (phoneNo.length === 10) {
    //                 onLogin();
    //               }
    //             }}
    //             style={
    //               phoneNo.length < 10
    //                 ? styles.sendDisableOtpBtn
    //                 : styles.sendOtpBtn
    //             }>
    //             <View>
    //               <Text style={styles.otpText}>{t('requestOtp')}</Text>
    //             </View>
    //           </TouchableOpacity>
    //           {showLoader && <View style={{
    //             display: 'flex',
    //             justifyContent: 'center',
    //             alignItems: 'center',
    //           }}>
    //             <Image
    //               style={{
    //                 display: 'flex',
    //                 justifyContent: 'center',
    //                 width: 60,
    //                 height: 60,
    //                 resizeMode: 'cover',
    //               }}
    //               source={{
    //                 uri: 'http://assets.datahayinfotech.com/assets/images/loader.gif',
    //               }}
    //             />
    //           </View>}
              
    //         </View>
    //       </View>
    //     </ScrollView>
    //   </KeyboardAwareScrollView>
    // </View>
    <View style={{flex:1}}>
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
                            if (emailId==='admin@admin.com' && password==='password') {
                              onLogin();
                            }
                            else{
                              Alert.alert('Error','Please Enter Correct Email and password')
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
    justifyContent:'center',
    height: hp('110%'),
    width: wp('100%'),
    backgroundColor: '#FDBD01',
  },
  LogoContainer:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    height:100,
    width:'100%',
    marginTop:30
  },
  karigarLogo: {
    height: 100,
    width: 100,
  },
  boxMain:{
    display:'flex',
    backgroundColor:'#28282B',
    height: 500,
    width: 354,
    borderRadius:10,
    zIndex:1
  },
  title:{
    fontSize:22,
    color:'#FFD700',
    textAlign:'center',
    marginTop:20
  },
  phoneNo: {
    fontSize: 12,
    color: '#FFD700',
    marginTop: 50,
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
    color:'white',
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
    fontSize:16,
    color: 'white',
  },
});

export default Login;
