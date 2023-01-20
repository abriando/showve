import { firebase } from '@react-native-firebase/auth';
import React,{useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Dimensions,
  Alert,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import '@react-native-firebase/firestore';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  loginUser = async (email, password) => {
    try{
      await firebase.auth().signInWithEmailAndPassword(email,password);
      
    }catch(error){
      alert(error.message)
    }
  }
  return (
    <SafeAreaView>
      <StatusBar barStyle={'light-content'} />
      <View
        style={{
          backgroundColor: '#121212',
          height: height,
          width: width,
          paddingVertical: 10,
        }}>
        <View style={{alignSelf: 'center', top: 110}}>
          {/* <Image
            style={{width: 70, height: 70}}
            source={require('../../assets/icon.png')}
          /> */}
        </View>
        <View
          style={{
            height: height,
            width: width,
            alignSelf: 'center',
            justifyContent: 'center',
            position: 'absolute',
            paddingHorizontal: 22,
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 30,
              fontWeight: 'bold',
            }}>
            Login
          </Text>

          <View style={{width: width - 50}}>
            <TextInput
              placeholder="Email"
              placeholderTextColor="#707070"
              keyboardType="email-address"
              style={{
                color: '#707070',
                borderColor: '#707070',
                borderWidth: 1,
                padding: 10,
                borderRadius: 5,
                backgroundColor: '#fff',
                marginVertical: 10,
              }}
              onChangeText={email => setEmail(email)}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TextInput
              secureTextEntry={true}
              placeholder="Password"
              placeholderTextColor="#707070"
              style={{
                color: '#707070',
                borderColor: '#707070',
                borderWidth: 1,
                padding: 10,
                borderRadius: 5,
                backgroundColor: '#fff',
                marginVertical: 10,
              }}
              onChangeText={password => setPassword(password)}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity
              style={{
                borderColor: '#36B3EB',
                borderRadius: 5,
                backgroundColor: '#36B3EB',
                marginVertical: 10,
                elevation: 7,
                shadowColor: '#fff',
              }}
              onPress={() => {
                loginUser(email, password)
                .then(() => {
                
                  navigation.navigate('HomeScreen');
                });
              }}>
              <Text style={{padding: 15, alignSelf: 'center', color: '#fff'}}>
                Login
              </Text>
            </TouchableOpacity>
            <Pressable
              onPress={() => Alert.alert('Lupa Password')}
              style={{alignSelf: 'center'}}>
              <Text style={{color: '#D5D5D5', textDecorationLine: 'underline'}}>
                Forgot Password?
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              position: 'absolute',
              flexDirection: 'row',
              bottom: 0,
              paddingVertical: 15,
              alignSelf: 'center',
            }}>
            <Text style={{color: '#D5D5D5', alignSelf: 'center'}}>
              Don't have any account?
            </Text>
            <Pressable onPress={() => navigation.navigate('RegisterScreen')}>
              <Text style={{color: '#36B3EB', fontSize: 17, marginLeft: 2}}>
                Register
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default LoginScreen;