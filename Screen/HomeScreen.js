
import { useEffect, useState } from 'react';
import {View, Text, StyleSheet, TouchableNativeFeedback, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { storage } from './Setting/DarkMode/storage';
import style from './StyleSheet';
import { useFocusEffect } from '@react-navigation/native';

function HomeScreen({navigation, theme}) {
  const [darkMode, setDarkmode] = useState(false);

  useFocusEffect(() => {
    const storedDarkMode = storage.getBoolean('darkMode');
    if (storedDarkMode !== undefined) {
      setDarkmode(storedDarkMode);
    }
  });
        
  return (
    <View style={{flex: 1, backgroundColor: theme.colors.background}}>
    <StatusBar 
      hidden={true}
    />
    <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 50}}>
      <Text style={[style.title,{color : theme.colors.text,justifyContent: 'center', alignItems:'center'}]}>SCANNER</Text>
    </View>
      
    

      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          backgroundColor: theme.colors.background
        }}>
        <TouchableNativeFeedback
        onPress={()=> navigation.navigate('ScanType')}
        >
          <View style={style.Item}>
            <Icon name={'qrcode'} size={65} color={theme.colors.text} />
            <Text style={[style.itemText,{color : theme.colors.text}]}>Scan</Text>
          </View>
        </TouchableNativeFeedback>

        <TouchableNativeFeedback
        onPress={()=> navigation.navigate('Setting')}
        
        >
          <View style={style.Item}>
            <Icon name={'gear'} size={65} color={theme.colors.text} />
            <Text style={[style.itemText,{color : theme.colors.text}]}>Setting</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
}

export default HomeScreen;
