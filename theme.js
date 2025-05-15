// themes.js
import { DefaultTheme, MD3DarkTheme } from 'react-native-paper';

const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200ee',
    accent: '#03dac4',
    background: 'rgb(255, 255, 255)',
    surface: '#ffffff',
    onSurface: 'rgb(255, 255, 255)',
    text: 'rgb(55, 55, 55)',
  },
};

const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#bb86fc',
    accent: '#03dac6',
    background: 'rgb(39, 39, 39)',
    surface: '#1e1e1e',
    onSurface: 'rgb(108, 108, 108)',
    text: 'rgb(255, 255, 255)',
  },
};

export { lightTheme, darkTheme };