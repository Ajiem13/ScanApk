// App.js
import React, { useState, useEffect } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import MainApp from './MainApp';

export default function App() {

  return (
    <PaperProvider >
      <MainApp />
    </PaperProvider>
  );
}
