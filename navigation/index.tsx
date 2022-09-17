/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import { RootStackParamList } from '../types';
import '../common/axios.config';
import { getStoreValue } from '../common/LocalStorage';
import Login from '../screens/Login';

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      // linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  const [token, setToken] = React.useState<any>('');
  const [userInfo, setUserInfo] = React.useState({});
  React.useEffect(() => {
    const getToken = async () => {
      const token = await getStoreValue('token');
      let userInfo: any = await getStoreValue('userInfo');
      userInfo = JSON.parse(userInfo);
      setUserInfo(userInfo);
      setToken(token);
    };
    getToken();
  }, []);

  const horizontalAnimation = {
    cardStyleInterpolator: ({ current, layouts }: any) => {
      return {
        cardStyle: {
          transform: [
            {
              translateX: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.width, 0],
              }),
            },
          ],
        },
      };
    },
  };

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        options={horizontalAnimation}
        name="Login"
        component={Login}
      />
    </Stack.Navigator>
  );
}
