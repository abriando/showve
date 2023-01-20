import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  Dimensions,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Picker} from '@react-native-community/picker/';
import {firebase} from '@react-native-firebase/auth';
import '@react-native-firebase/firestore';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const RegisterScreen = ({navigation}) => {
  const [band, setBand] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [city, setCity] = useState('');
  const [genre, setGenre] = useState('');

    registerUser = async (
    band,
    username,
    email,
    password,
    confirmPassword,
    city,
    genre,
  ) => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email,password)
      .then(() => {
        firebase
          .auth()
          .currentUser.sendEmailVerification({
            handleCodeInApp: true,
            url: 'https://showve-d6967.firebaseapp.com/',
          })
          .then(() => {
            alert('Verifikasi email sent');
          })
          .catch(error => {
            alert(error.message);
          })
          .then(() => {
            firebase
              .firestore()
              .collection('users')
              .doc(firebase.auth().currentUser.uid)
              .set({
                band,
                username,
                email,
                password,
                confirmPassword,
                city,
                genre,
              });
          })
          .catch(error => {
            alert(error.message);
          });
      })
      .catch(error => {
        alert(error.message);
      })
      
  };
  // const Register = () => {
  //   firebase
  //     .auth()
  //     .createUserWithEmailAndPassword(email, password)
  //     .then(userCredentials => {
  //       // Berhasil membuat akun baru
  //       console.log(userCredentials);

  //       // Tambahkan data nama band dan no. telepon ke database
  //       const userRef = firebase
  //         .database()
  //         .ref(`users/${userCredentials.user.uid}`);
  //       userRef.set({
  //         userName: userName,
  //         userCity: userCity,
  //         bandName: bandName,
  //         userGenre: userGenre,
  //       });
  //     })
  //     .catch(error => {
  //       // Gagal membuat akun baru
  //       console.error(error);
  //     });
  //     useEffect(() => {
  //       // Dapatkan data pengguna saat ini
  //       const user = firebase.auth().currentUser;

  //       if (user) {
  //         // Dapatkan data nama band dan no. telepon dari database
  //         const userRef = firebase.database().ref(`users/${user.uid}`);
  //         userRef.on('value', snapshot => {
  //           setBandName(snapshot.val().bandName);
  //           setUserCity(snapshot.val().userCity);
  //           setUserGenre(snapshot.val().userGenre);
  //           setUserName(snapshot.val().userName);
  //         });
  //       }
  //     }, []);
  // }
  
  return (
    <SafeAreaView>
      <StatusBar barStyle={'light-content'} />
      <View style={{backgroundColor: '#121212', height: height, width: width}}>
        <View
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
            paddingHorizontal: 20,
            height: height,
            position: 'absolute',
            marginHorizontal: 10,
            width: width - 30,
          }}>
          <Text style={{color: '#fff', fontSize: 30, fontWeight: 'bold'}}>
            Register
          </Text>
          <TextInput
            style={{
              color: '#707070',
              borderColor: '#707070',
              borderWidth: 1,
              padding: 10,
              borderRadius: 5,
              backgroundColor: '#fff',
              marginVertical: 10,
            }}
            onChangeText={band => setBand(band)}
            placeholder="Name Band"
            placeholderTextColor="#707070"
            autoCorrect={false}
          />
          <TextInput
            style={{
              color: '#707070',
              borderColor: '#707070',
              borderWidth: 1,
              padding: 10,
              borderRadius: 5,

              backgroundColor: '#fff',
              marginVertical: 10,
            }}
            onChangeText={username => setUsername(username)}
            placeholder="Username"
            placeholderTextColor="#707070"
          />
          <TextInput
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
            textContentType="emailAddress"
            placeholder="Email"
            placeholderTextColor="#707070"
          />
          <TextInput
            secureTextEntry={true}
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
            placeholder="Password"
            placeholderTextColor="#707070"
          />
          <TextInput
            secureTextEntry={true}
            style={{
              color: '#707070',
              borderColor: '#707070',
              borderWidth: 1,
              padding: 10,
              borderRadius: 5,

              backgroundColor: '#fff',
              marginVertical: 10,
            }}
            onChangeText={confirmPassword =>
              setConfirmPassword(confirmPassword)
            }
            placeholder="Confirm Password"
            placeholderTextColor="#707070"
          />
          <TextInput
            style={{
              color: '#707070',
              borderColor: '#707070',
              borderWidth: 1,
              padding: 10,
              borderRadius: 5,

              backgroundColor: '#fff',
              marginVertical: 10,
            }}
            onChangeText={city => setCity(city)}
            placeholder="City"
            placeholderTextColor="#707070"
          />
          <TouchableOpacity
            style={{
              backgroundColor: '#fff',
              borderRadius: 5,
              marginVertical: 10,
            }}>
            <Picker
              selectedValue={genre}
              onValueChange={(itemValue, itemIndex, genre) =>
                setGenre(itemValue, genre)
              }
              style={{color: '#707070'}}>
              <Picker.Item label="Genre Mix" value="genre mix" />
              <Picker.Item label="Akustik" value="akustik" />
              <Picker.Item label="Jazz" value="jazz" />
              <Picker.Item label="Rock" value="rock" />
              <Picker.Item label="Metal" value="metal" />
              <Picker.Item label="Reagge" value="reagge" />
              <Picker.Item label="Dangdut" value="dangdut" />
            </Picker>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              registerUser(
                band,
                username,
                email,
                password,
                confirmPassword,
                city,
                genre,
              ).then
               (() => navigation.navigate('HomeScreen'));
            }}
            style={{
              borderColor: '#36B3EB',
              borderRadius: 5,
              backgroundColor: '#36B3EB',
              marginVertical: 15,
              elevation: 7,
              shadowColor: '#fff',
            }}>
            <Text style={{padding: 15, alignSelf: 'center', color: '#fff'}}>
              Register
            </Text>
          </TouchableOpacity>
          <View
            style={{
              paddingVertical: 10,
              position: 'absolute',
              bottom: 0,
              flexDirection: 'row',
              alignSelf: 'center',
            }}>
            <Text style={{color: '#D5D5D5', alignSelf: 'center'}}>
              Don't have any account?
            </Text>
            <Pressable onPress={() => navigation.navigate('LoginScreen')}>
              <Text style={{color: '#36B3EB', fontSize: 17}}>Login</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;
