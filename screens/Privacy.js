import React from 'react';
import {  View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default Privacy = props => {
    return (
    <View>
      <TouchableOpacity>
        <Image
          source={require('../assets/images/menu.png')}
          style={{width: 32, height: 32}}
        /></TouchableOpacity>
      </View>
    );
  }



