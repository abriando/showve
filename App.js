import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { View,StatusBar,ActivityIndicator} from 'react-native';
import Appstack from './navigation/Appstack';
import EditStack from './navigation/Editstack';

export default function App() {
  return (
    <View style={{ flex: 1}}>
    <NavigationContainer>
      <StatusBar barStyle={'light-content'} />
      <Appstack/></NavigationContainer>
    </View>
  );
}







  