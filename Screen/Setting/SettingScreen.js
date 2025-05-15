import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/dist/FontAwesome6';
import {
  View,
  Text,
  ToastAndroid,
  Alert,
} from 'react-native';
import {
  Appbar,
  Dialog,
  TextInput,
  Button,
  Switch,
  TouchableRipple,
} from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { storage } from './DarkMode/storage';
import { getApi } from '../../axios/ApiService';

function SettingScreen({ navigation, theme , toggleDarkMode }) {
  const [darkMode, setDarkmode] = useState(false);
  const [visible, setVisible] = useState(false);
  const [baseUrl, setBaseUrl] = useState('');
  const [endpoint, setEndpoint] = useState('');

  useEffect(() => {
    const storedDarkMode = storage.getBoolean('darkMode');
    if (storedDarkMode !== undefined) {
      setDarkmode(storedDarkMode);
    }

    const storedUrl = storage.getString('baseUrl')
    if (storedUrl !== undefined) {
        setBaseUrl(storedUrl)
    }
    
    const storedendPoint = storage.getString('endpoint')
    if (storedendPoint !== undefined) {
        setEndpoint(storedendPoint)
    }
    testApiConnection()
  }, []);

  const testApiConnection = async () => {
    try {
      const response = await getApi(); 
      console.log('Response:', response);
      return true;
    } catch (error) {
      console.error('API Error:', error.message);
      return false;
    }
  };

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);


  const handleSaveUrl = async () => {
    const trimmedBaseUrl = baseUrl.trim();
    const trimmedEndpoint = endpoint.trim();
  
    if (!trimmedBaseUrl || !trimmedEndpoint) {
      Alert.alert("Error", "Base URL dan Endpoint tidak boleh kosong!");
      return;
    }
  
    if (!trimmedBaseUrl.startsWith('http://') && !trimmedBaseUrl.startsWith('https://')) {
      Alert.alert("Error", "Base URL harus diawali dengan http:// atau https://");
      return;
    }
  
  
    let fullUrl;
    try {
      fullUrl = new URL(trimmedBaseUrl+'/event/' + trimmedEndpoint).href;
    } catch (e) {
      Alert.alert("Error", "Format URL tidak valid!");
      return;
    }
  

    let isConnected = false;
    try {
      const response = await fetch(fullUrl, { method: 'GET', timeout: 5000 });
      isConnected = response.ok;
    } catch (error) {
      isConnected = false;
    }
  
    if (isConnected) {
      ToastAndroid.show("URL Berhasil Disimpan!", ToastAndroid.SHORT);
      storage.set('baseUrl', trimmedBaseUrl);
      storage.set('endpoint', trimmedEndpoint);
      hideDialog();
    } else {
      Alert.alert("Gagal", "Tidak bisa mengakses URL. Periksa koneksi atau URL.");
    }
  };

  return (
    <SafeAreaProvider style={{flex: 1,backgroundColor: theme.colors.background}}>
        <Appbar.Header style={{backgroundColor : theme.colors.text}}>
          <Appbar.Content title="Setting" color={theme.colors.onSurface}/>
          <Appbar.BackAction
            color={theme.colors.onSurface}  
            onPress={() => {
              navigation.pop();
            }}
          />
        </Appbar.Header>

        {/* ITEM ABOUT */}
        <TouchableRipple
          onPress={() => navigation.navigate('About')}
          rippleColor="rgba(137, 137, 137, 0.32)"
          style={{
            padding: 25,
            borderBottomWidth: 0.29,
            borderBottomColor: 'grey',
          }}>
          <View style={{flexDirection: 'row',}}>
           <Icon name={'circle-info'} size={25} color={theme.colors.text} />
            <Text style={{marginStart: 15, color : theme.colors.text}}>About</Text>
          </View>
        </TouchableRipple>

        {/* DARK MODE TOGGLE */}
        <View
          style={{
            padding: 25,
            alignItems: 'center',
            borderBottomWidth: 0.4,
            borderBottomColor: 'grey',
            flexDirection: 'row'
          }}>
          <Icon name={'moon'} solid size={25} color={theme.colors.text} />
          <Text style={{marginStart: 15,color:theme.colors.text}}>Dark Mode</Text>
          <Switch
            style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end' }}
            value={darkMode}
            color={theme.colors.text}
            thumbColor={theme.colors.text}  
            onValueChange={(val) => {
            setDarkmode(val);        
            toggleDarkMode(val);      
            }}
          />
        </View>

        {/* ITEM URL */}
        <TouchableRipple
          onPress={showDialog} 
          rippleColor="rgba(128, 128, 128, 0.32)"
          style={{
            padding: 25,
            justifyContent: 'center',
            borderBottomWidth: 0.4,
            borderBottomColor: 'grey',
          }}>
          <View style={{flexDirection:'row'}}>
          <Icon name={'link'} size={23} color={theme.colors.text} />
          <View style={{flexDirection: 'column'}}>
            <Text style={{marginStart: 10, color:theme.colors.text}}>{baseUrl.length >30 ? 'Url : ' + baseUrl.substring(0, 38) + '...' : baseUrl}</Text>
            <Text style={{marginStart: 10, color:theme.colors.text,fontSize: 11}}>{'Tid : ' + endpoint}</Text>
          </View>
            
          </View>
        </TouchableRipple>

      <Dialog style={{backgroundColor: theme.colors.background}} visible={visible} onDismiss={hideDialog}>
        <Dialog.Title style={{color: theme.colors.text}}>URL</Dialog.Title>
        <Dialog.Content>
          <TextInput
            label="Base URL"
            value={baseUrl}
            onChangeText={text => setBaseUrl(text)}
            style={{ marginBottom: 16 }}
          />
          <TextInput
            label="Endpoint"
            value={endpoint}
            onChangeText={text => setEndpoint(text)}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button textColor={theme.colors.text} onPress={hideDialog}>Batal</Button>
          <Button textColor={theme.colors.text} onPress={handleSaveUrl}>Simpan</Button>
        </Dialog.Actions>
      </Dialog>
    </SafeAreaProvider>
  );
}

export default SettingScreen;