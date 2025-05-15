import { Alert } from 'react-native';
import {storage} from '../Screen/Setting/DarkMode/storage';
import ApiConfig from './ApiConfig';

export const getApi = async () => {
  try {
    const endpoint = storage.getString('endpoint');
    const response = await ApiConfig.get('/event/' + endpoint);
    console.log('Response data:', response.data);

    return response.data.data;
  } catch (error) {
    Alert.alert("Error", error.message || "Terjadi kesalahan");
    console.error("Gagal Fetching:", error);
    return null;
  }
};

export const getProfile = async (id) => {
  const endpoint = storage.getString('endpoint');
  try {
    const response = await ApiConfig.get('pemain?collect=team&where[event]='+ endpoint + '&where[uid]='+ id);
    console.log('Keselek',response.data)
    return response.data.data;
  } catch (error) {
    console.error("Gagal Pecing",error)
  }
}

