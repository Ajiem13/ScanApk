// MainApp.js
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './Screen/HomeScreen';
import SplashScreen from './Screen/SplashScreen';
import SettingScreen from './Screen/Setting/SettingScreen';
import AboutScreen from './Screen/Setting/About/AboutScreen';
import ScanType from './Screen/Scan/ScanType';
import CameraScan from './Screen/Scan/CameraScan';
import ResultScan from './Screen/Scan/ResultScan/ResultScan';

import {useEffect, useState} from 'react';
import {darkTheme, lightTheme} from './theme';
import {storage} from './Screen/Setting/DarkMode/storage';

const Stack = createNativeStackNavigator();

function MainApp() {
  const [theme, setTheme] = useState(lightTheme);

  useEffect(() => {
    const storedDarkMode = storage.getBoolean('darkMode');
    if (storedDarkMode) {
      setTheme(darkTheme);
    } else {
      setTheme(lightTheme);
    }
  }, []);

  const toggleDarkMode = value => {
    storage.set('darkMode', value);
    setTheme(value ? darkTheme : lightTheme);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash">
          {props => <SplashScreen {...props} theme={theme} />}
        </Stack.Screen>
        <Stack.Screen name="Home">
          {props => <HomeScreen {...props} theme={theme} />}
        </Stack.Screen>
        <Stack.Screen name="Setting">
          {props => (
            <SettingScreen
              {...props}
              theme={theme}
              toggleDarkMode={toggleDarkMode}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="About">
          {props => <AboutScreen {...props} theme={theme} />}
        </Stack.Screen>
        <Stack.Screen name="ScanType">
          {props => <ScanType {...props} theme={theme} />}
        </Stack.Screen>
        <Stack.Screen name="CameraScan">
          {props => <CameraScan {...props} theme={theme} />}
        </Stack.Screen>
        <Stack.Screen name="ResultScan">
          {props => <ResultScan {...props} theme={theme} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainApp;
