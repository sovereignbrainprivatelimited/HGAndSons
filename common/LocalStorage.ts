import AsyncStorage from '@react-native-async-storage/async-storage';

const getStoreValue = async (key: any) => {
  try {
    const value = await AsyncStorage.getItem(key);

    return value;
  } catch (e) {
    // error reading value
  }
};

const setStoreValue = async (value: any) => {
  try {
    console.log('here::',value.key,value.value);
    
    await AsyncStorage.setItem(`${value.key}`, `${value.value}`);
  } catch (e) {
    console.log('Can not value');
  }
};

export {getStoreValue, setStoreValue};
