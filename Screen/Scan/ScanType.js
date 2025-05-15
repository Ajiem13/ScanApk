import {Image, ScrollView, StatusBar, TouchableOpacity, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Appbar, Text} from 'react-native-paper';
import {useEffect, useState} from 'react';
import {storage} from '../Setting/DarkMode/storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import style from '../StyleSheet';

const ScanType = ({navigation, theme}) => {
  const [darkMode, setDarkmode] = useState(false);

  useEffect(() => {
    const storedDarkMode = storage.getBoolean('darkMode');
    if (storedDarkMode !== undefined) {
      setDarkmode(storedDarkMode);
    }
  }, []);
  return (
    <SafeAreaProvider style={{backgroundColor: theme.colors.background,}}>
      <StatusBar
        backgroundColor={theme.colors.text}
        barStyle={darkMode ? 'dark-content' : 'light-content'}
      />
      <Appbar.Header style={{backgroundColor: theme.colors.text}}>
        <Appbar.Content title="ScanType" color={theme.colors.onSurface} />
        <Appbar.BackAction
          color={theme.colors.onSurface}
          onPress={() => {
            navigation.pop();
          }}
        />
      </Appbar.Header>

<View style={{flex:1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: 130}}>
    <View style={{flex: 1, flexDirection: 'column', padding: 5}}>
        <TouchableOpacity style={style.itemIcon}
        onPress={() => navigation.navigate('CameraScan',{type : 'Checkin'})}
        >
          <View>
            <Icon name="login" size={65} color={theme.colors.background} />
            <Text style={{textAlign: 'center',marginTop  : 4, color:theme.colors.background}}>Check in</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={style.itemIcon}>
          <View>
            <Icon name="camera" size={65} color={theme.colors.text} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={style.itemIcon}
        onPress={() => navigation.navigate('CameraScan',{type : 'Profile'})}
        >
          <View>
            <Icon name="account" size={65} color={theme.colors.background} />
            <Text style={{textAlign: 'center',color:theme.colors.background}}>Profile</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={{flex: 1, flexDirection: 'column', padding: 5}}>
        <TouchableOpacity style={style.itemIcon}>
          <View>
            <Icon name="camera" size={65} color={theme.colors.text} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={style.itemIcon}>
          <View>
            <Icon name="camera" size={65} color={theme.colors.text} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={style.itemIcon}>
          <View>
            <Icon name="account" size={65} color={theme.colors.text} />
          </View>
        </TouchableOpacity>
      </View>
</View>
      
    </SafeAreaProvider>
  );
};

export default ScanType;
