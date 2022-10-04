import React, { useState } from 'react';
import axios from 'axios';
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
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import logo from '../constants/images/Logo.png';
import { setStoreValue,getStoreValue } from '../common/LocalStorage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Login = ({ navigation }: any) => {
  const [emailId, setEmailId] = useState<any>('');
  const [password, setPassword] = useState<any>('');
  const [showLoader, setShowLoader] = useState(false);

  const onLogin = async () => {
    let body={"Email":emailId,"Password":password,"token":""}
    axios({
      method: 'post',
      url: 'https://hgsonsapp.hgsons.in/objects/login.php',
      data: body
    }).then((res)=>{
      if(Platform.OS=='android'){
        ToastAndroid.show(res.data.message,ToastAndroid.TOP)
      }else{
        Alert.alert('Sucess!', 'Login Successfully')
      }
      if(res.data.success===1){
        setStoreValue({key:'userId',value:res.data.data.UserId})
        setStoreValue({key:'userType',value:res.data.data.UserType})
        setStoreValue({key:"token",value:res.data.data.Token})
        navigation.navigate('ContractorDashboard');
      }
      setShowLoader(false)
    }).catch((err)=>{
      console.log('err:',err);
      
    });

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
                  returnKeyType={"done"}
                  secureTextEntry
                  style={styles.phoneNoInput}
                  onChangeText={(value: any) => {
                    setPassword(value);
                  }}
                >
                </TextInput>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setShowLoader(true)
                    onLogin();
                }}
                style={styles.sendOtpBtn}
              >
                {!showLoader ?
                <View> 
                  <Text style={styles.otpText}>{'Login'}</Text>
                </View>
                  :
                   <View>
                    <ActivityIndicator color={'white'} size='large'/>
               </View>
               }
              </TouchableOpacity>
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
    backgroundColor: '#FFFAF0',
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
