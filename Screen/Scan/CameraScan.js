import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, ToastAndroid} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import {useIsFocused} from '@react-navigation/native';

const CameraScan = ({navigation, route}) => {
  const {type} = route.params;
  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');
  const [isScanning, setIsScanning] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  useEffect(() => {
    if (isFocused) {
      setIsScanning(true);
    }
  }, [isFocused]);

  function toResultScan(scannedData, param) {
    ToastAndroid.show('Param ' + param, ToastAndroid.SHORT);
    console.log('scannedData', param);
    navigation.navigate('ResultScan', {
      scannedData: scannedData,
      type: param,
    });
  }

  const handleCodeScanned = codes => {
    if (!isScanning || codes.length === 0) return;

    const scannedData = codes[0].value;
    setIsScanning(false);
    toResultScan(scannedData, type);
  };

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: handleCodeScanned,
  });

  if (!hasPermission || !device) {
    return (
      <View style={styles.center}>
        <Text>
          {hasPermission === false ? 'Izin kamera ditolak' : 'Memuat kamera...'}
        </Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isFocused && isScanning} 
        codeScanner={codeScanner}
        onError={error => {
          console.error('Camera Error:', error);
        }}
      />

      <View style={styles.buttonContainer}>
        <Text onPress={() => navigation.goBack()} style={styles.cancelText}>
          Batal
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
  },
  cancelText: {
    color: 'white',
    fontSize: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 12,
    borderRadius: 8,
  },
});

export default CameraScan;
