import {View, Alert, TouchableOpacity} from 'react-native';
import {ActivityIndicator, Appbar, Button, Text} from 'react-native-paper';
import {useEffect, useState} from 'react';
import {getProfile} from '../../../axios/ApiService';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import {storage} from '../../Setting/DarkMode/storage';

const ResultScan = ({navigation, route, theme}) => {
  const {scannedData, type} = route.params;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [done, setDone] = useState(false);

  const id = scannedData?.split('_')[0];

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await getProfile(id);
      if (Array.isArray(response) && response.length > 0) {
        setData(response[0]);
      } else {
        setData(null);
      }
    } catch (error) {
      console.error('Gagal mengambil data profil:', error);
      Alert.alert(
        'Gagal mengambil data',
        error.message || 'Terjadi kesalahan.',
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (data && !done && data?.is_banned !== 1 && data?.reg_ulang) {
      postActivity();
    }
  }, [data]);

  const postActivity = async () => {
    const teamId = data?.team?.id;
    const playerId = data?.uid;
    console.log('all', teamId, playerId);
    const activityId = 'check in';
    try {
      const baseUrl = storage.getString('baseUrl');
      if (!baseUrl) {
        console.warn('Base URL tidak ditemukan di storage.');
        return;
      }

      const params = {
        team: teamId,
        pemain: id,
        activity: activityId,
      };
      const url = baseUrl + 'activity';
      console.log('PARAM', params);

      try {
        const response = await axios.post(url, params);
        console.log('Berhasil Post:', response.data);
      } catch (error) {
        console.error('Gagal Post:', error);
      }

      
    } catch (error) {
      console.error('Error saat kirim aktivitas:', error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <SafeAreaProvider>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Hasil Scan" />
        </Appbar.Header>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={100} />
        </View>
      </SafeAreaProvider>
    );
  }

  if (type === 'Profile') {
    return (
      <SafeAreaProvider>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Hasil Scan" />
        </Appbar.Header>

        <View
          style={{
            backgroundColor: theme.colors.background,
            padding: 16,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Icon
            name="account"
            size={60}
            color={theme.colors.text}
            style={{alignSelf: 'center'}}
          />
          <Text
            style={{
              color: theme.colors.text,
              textAlign: 'center',
              fontWeight: '700',
              marginStart: 20,
            }}>
            {data?.nama || 'Tidak diketahui'}
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            backgroundColor: theme.colors.background,
          }}>
          <View style={styles.item}>
            <Text style={{color: theme.colors.text}}>No Punggung</Text>
            <Text style={{color: theme.colors.text}}>
              {data?.no_punggung || '-'}
            </Text>
          </View>

          <View style={styles.item}>
            <Text style={{color: theme.colors.text}}>Sekolah</Text>
            <Text style={{color: theme.colors.text}}>
              {data?.team?.name || 'Belum ada tim'}
            </Text>
          </View>

          <View style={styles.item}>
            <Text style={{color: theme.colors.text}}>
              Kategori / Tahun Lahir
            </Text>
            <Text style={{color: theme.colors.text}}>
              {data?.team?.category || '-'} /{' '}
              {data?.tgllahir
                ? new Date(data.tgllahir).getFullYear()
                : 'Tidak diketahui'}
            </Text>
          </View>

          <View style={styles.item}>
            <Text style={{color: theme.colors.text}}>SUDAH REGESTRASI</Text>
            <Text style={{color: theme.colors.text}}>
              {data?.reg_ulang ? 'Sudah' : 'Belum terdaftar'}
            </Text>
          </View>
        </View>
      </SafeAreaProvider>
    );
  } else if (type === 'Checkin') {
    return (
      <SafeAreaProvider>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Hasil Scan" />
        </Appbar.Header>

        <View
          flex={1}
          style={{
            backgroundColor: theme.colors.background,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {data?.is_banned === 1 ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                padding: 20,
              }}>
              <Icon
                name="account-alert-outline"
                size={100}
                color={'red'}
                style={{alignSelf: 'center', marginBottom: 10}}
              />
              <Text
                style={{
                  color: 'red',
                  fontWeight: '700',
                  fontSize: 25,
                  textAlign: 'center',
                }}>
                {data?.nama || 'Tidak diketahui'}
              </Text>
              <Text style={{color: 'red', fontSize: 20, textAlign: 'center'}}>
                Belum Boleh Bertanding Karena{' '}
                {'\n' + (data?.banned_reason || 'alasan tidak diketahui')}
              </Text>

              <TouchableOpacity onPress={()=> navigation.goBack()} style={{marginTop: 30, backgroundColor: theme.colors.onSurface, padding: 10, borderRadius: 5, width: 250, alignItems: 'center'}}>
                    <View>
                      <Text style={{color: theme.colors.text}}>Kembali</Text>
                    </View>
                  </TouchableOpacity>
            </View>
          ) : (
            <>
              {data?.reg_ulang ? (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 20,
                  }}>
                  <Icon
                    name="account-check-outline"
                    size={100}
                    color={'green'}
                    style={{alignSelf: 'center', marginBottom: 10}}
                  />
                  <Text
                    style={{
                      color: theme.colors.text,
                      fontWeight: '700',
                      fontSize: 25,
                      textAlign: 'center',
                    }}>
                    {data?.nama || 'Tidak diketahui'}
                  </Text>
                  <Text
                    style={{
                      color: theme.colors.text,
                      fontSize: 20,
                      textAlign: 'center',
                    }}>
                    Sudah melakukan check-in
                  </Text>

                  <TouchableOpacity onPress={()=> navigation.goBack()} style={{marginTop: 30, backgroundColor: theme.colors.onSurface, padding: 10, borderRadius: 5, width: 250, alignItems: 'center'}}>
                    <View>
                      <Text style={{color: theme.colors.text}}>Kembali</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ) : (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 20,
                  }}>
                  <Icon
                    name="account-alert-outline"
                    size={100}
                    color={'orange'}
                    style={{alignSelf: 'center', marginBottom: 10}}
                  />
                  <Text
                    style={{
                      color: 'orange',
                      fontWeight: '700',
                      fontSize: 25,
                      textAlign: 'center',
                    }}>
                    {data?.nama || 'Tidak diketahui'}
                  </Text>
                  <Text
                    style={{
                      color: 'orange',
                      fontSize: 20,
                      textAlign: 'center',
                    }}>
                    Gagal Check-in
                  </Text>
                  <Text
                    style={{
                      color: 'orange',
                      fontSize: 20,
                      textAlign: 'center',
                    }}>
                    Belum regestrasi ulang
                  </Text>

                  <TouchableOpacity onPress={()=> navigation.goBack()} style={{marginTop: 30, backgroundColor: theme.colors.onSurface, padding: 10, borderRadius: 5, width: 250, alignItems: 'center'}}>
                    <View>
                      <Text style={{color: theme.colors.text}}>Kembali</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            </>
          )}
        </View>
      </SafeAreaProvider>
    );
  }
};

const styles = {
  item: {
    padding: 16,
    flexDirection: 'column',
    alignItems: 'flex-start',
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
  },
};

export default ResultScan;
