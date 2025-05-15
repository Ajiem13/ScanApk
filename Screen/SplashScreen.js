import { StackActions, useFocusEffect } from '@react-navigation/native';
import { useEffect, useState } from 'react'
import { View ,Text, StatusBar } from 'react-native';
import { storage } from './Setting/DarkMode/storage';


function SplashScreen({navigation, theme}) {
  const [darkMode, setDarkmode] = useState(false);

  useFocusEffect(() => {
    const storedDarkMode = storage.getBoolean('darkMode');
    if (storedDarkMode !== undefined) {
      setDarkmode(storedDarkMode);
    }
  });

    useEffect(()=>{
        const timeOutid = setTimeout(()=>{
            navigation.dispatch(StackActions.replace('Home'))
        },1000)

        return () => clearTimeout(timeOutid)

    },[])

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
    <StatusBar hidden={true}/>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' , backgroundColor: theme.colors.background}}>
      <Text style={{color: theme.colors.onSurface}}>Splash Screen</Text>
    </View>
    </View>
  );
}

export default SplashScreen;