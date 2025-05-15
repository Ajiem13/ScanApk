
import { View ,Text } from 'react-native';
import { Appbar } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { storage } from '../DarkMode/storage';
import DeviceInfo from 'react-native-device-info';


function AboutScreen({navigation, theme}) {
    const [darkMode, setDarkmode] = useState(false);
    
      useEffect(() => {
        const storedDarkMode = storage.getBoolean('darkMode');
        if (storedDarkMode !== undefined) {
          setDarkmode(storedDarkMode);
        }
      }, []);


  return (
    <SafeAreaProvider style={{flex: 1,backgroundColor: theme.colors.background}}>
    <Appbar.Header style={{backgroundColor: theme.colors.text}}>
        <Appbar.Content title="About" color={theme.colors.onSurface} />
        <Appbar.BackAction color={theme.colors.onSurface} onPress={()=> navigation.pop()} />
    </Appbar.Header>
    <View style={{padding: 16 , borderBottomColor: '#rgb(70, 70, 70)', borderBottomWidth: 0.5}}>
      <Text
      style={{fontSize: 15, color: theme.colors.text}}
      >Name</Text>
      <Text
      style={{fontSize: 20, color: theme.colors.text, fontWeight: 'bold'}}
      >{DeviceInfo.getApplicationName()}</Text>
    </View>

    <View style={{padding: 16 , borderBottomColor: '#rgb(70, 70, 70)', borderBottomWidth: 0.5}}>
      <Text
      style={{fontSize: 15, color: theme.colors.text}}
      >Version</Text>
      <Text
      style={{fontSize: 20, color: theme.colors.text, fontWeight: 'bold'}}
      >{DeviceInfo.getVersion()}</Text>
    </View>

    <View style={{padding: 16 , borderBottomColor: '#rgb(70, 70, 70)', borderBottomWidth: 0.5}}>
      <Text
      style={{fontSize: 15, color: theme.colors.text}}
      >Build</Text>
      <Text
      style={{fontSize: 20, color: theme.colors.text, fontWeight: 'bold'}}
      >{DeviceInfo.getBuildIdSync()}</Text>
    </View>

    <View style={{padding: 16 , borderBottomColor: '#rgb(70, 70, 70)', borderBottomWidth: 0.5}}>
      <Text
     style={{fontSize: 15, color: theme.colors.text}}
      >Updated</Text>
      <Text
      style={{fontSize: 20, color: theme.colors.text, fontWeight: 'bold'}}
      >{new Date().toLocaleDateString()}</Text>
    </View>

    <View style={{padding: 16 , borderBottomColor: '#rgb(70, 70, 70)', borderBottomWidth: 0.5}}>
      <Text
      style={{fontSize: 15, color: theme.colors.text}}
      >Developer</Text>
      <Text
      style={{fontSize: 20, color: theme.colors.text, fontWeight: 'bold'}}
      >Aji M</Text>
    </View>


    </SafeAreaProvider>
  );
}

export default AboutScreen