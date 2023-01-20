import React, {useEffect, useState} from 'react';
import {View, Text, Image, Button, TextInput, TouchableOpacity, Modal, } from 'react-native';
import auth from '@react-native-firebase/auth';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import  {firebase} from '@react-native-firebase/storage';
import {PermissionsAndroid} from 'react-native';
import *as ImagePicker from 'react-native-image-picker';
import { check, PERMISSIONS, request } from 'react-native-permissions';


function EditProfileScreen({navigation}) {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [textLayout, setTextLayout] = useState(1);
  const [showButton, setShowButton] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);


   const handleChange = event => {
    if (event.target.name === 'phone') {
      setPhone(event.target.value);
    } else if (event.target.name === 'address') {
      setAddress(event.target.value);
    }
    setShowButton(true);
  };

  const reference = firebase
    .app()
    .database(
      'https://showve-d6967-default-rtdb.asia-southeast1.firebasedatabase.app',
    )
    .ref('/users/tenant');
  
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
 
  useEffect(() => {
    reference.on('value', snapshot => {
      const data = snapshot.val();
      setPhone(data.phone);
      setAddress(data.address);
    });
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  function handleSubmit() {
    reference.update({phone, address, imageProfile}).then(() => {
      console.log('Data Update');
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
      }, 1300);
      setShowButton(false);
    });
  }

  function ChangeProfilePicture({ user }) {
  const [newProfilePicture, setNewProfilePicture] = useState(null);


const handleSelectPicture = async () => {  
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'App Gallery Permission',
        message:
          'App needs access to your Gallery ' +
          'so you can select profile picture.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const result = await ImagePicker.launchImageLibrary({
        mediaType: 'photo',
        allowsEditing: true,
        aspect: [4, 3],
      });
      if (!result.cancelled) {
        handleUploadPicture(result.uri);
      }
    } else {
      console.log('Gallery permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

const handleUploadPicture = async () => {
  try {
    // Create a reference to the image file in Firebase Storage
    const imageRef = firebase.app().storage().ref(`imageProfile/${user}`);
    const snapshot = await imageRef.putFile(result.uri);

    // Get the download URL of the image
    const url = await snapshot.ref.getDownloadURL();

    // Update the user's profile picture URL in the database
    await firebase.app().storage().ref(`imageProfile/${user}`).update({
      profile_picture: url,
    });

    setSuccessMessage('Your profile picture has been updated.');
  } catch (error) {
    console.log(error);
    
  }
};

  return (
    <View>
      <Image
        source={{uri: newProfilePicture}}
        style={{
          width: 100,
          height: 100,
          borderRadius: 100,
          backgroundColor: '#787878',
        }}
      />
      <View
        // onPress={handleSelectPicture}
        style={{position: 'absolute'}}>
        <FontAwesome5
          name="user-alt"
          size={40}
          color={'#121212'}
          style={{alignContent: 'center', padding: 30}}
        />
        
      </View>
      <TouchableOpacity
        onPress={handleSelectPicture}
        style={{
          position: 'absolute',
          backgroundColor: '#fff',
          borderRadius: 20,
          alignSelf: 'flex-end',
          bottom: 10,
          width: 30,
          height: 30,
        }}>
        <Feather
          name="camera"
          size={20}
          color={'black'}
          style={{padding: 5.3}}
        />
      </TouchableOpacity>
    </View>
  );
}
  if (initializing) return null;
  
  return (
    <View style={{backgroundColor: '#121212'}}>
      <View style={{height: 900}}>
        <View
          style={{
            height: 70,
            flexDirection: 'row',
            marginHorizontal: 20,
          }}>
          <TouchableOpacity
            style={{alignSelf: 'center'}}
            onPress={() => navigation.navigate('ProfileScreen')}>
            <Image
              style={{width: 25, height: 25}}
              source={require('../assets/images/back.png')}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 25,
              fontWeight: 'bold',
              color: '#fff',
              alignSelf: 'center',
              marginLeft: 100,
            }}>
            Edit Profile
          </Text>

          <View style={{alignSelf: 'center', paddingLeft: 80}}>
            {showButton && (
              <Button
                title="  Save  "
                onPress={handleSubmit}
                color={'#36B3EB'}
              />
            )}
          </View>
        </View>
        <View
          style={{marginVertical: 40, flexDirection: 'row', marginLeft: 30}}>
          <ChangeProfilePicture/>
          <View style={{marginLeft: 15}}>
            <Text style={{fontSize: 25, marginTop: 10, color: '#fff'}}>
              {user?.displayName}
            </Text>
            <Text
              style={{
                fontSize: 23,
                color: '#707070',
                fontWeight: 'bold',
              }}>
              Tenant
            </Text>
          </View>
        </View>
        <View style={{marginHorizontal: 30, }}>
          <View
            style={{
              flexDirection: 'column',
              borderBottomWidth: 1,
              borderBottomColor: '#707070',
              justifyContent: 'space-between',
              marginBottom: 15,
            }}>
            <Text
              style={{
                color: '#707070',
                fontSize: 19,
                textAlign: 'left',
              }}>
              Username
            </Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 19,
                  color: '#fff',
                  marginVertical: 10,
                }}>
                {user?.displayName}
              </Text>
              <Image
                source={require('../assets/images/lock.png')}
                style={{width: 15, height: 15, alignSelf: 'center'}}
              />
            </View>
          </View>
          <View>
            <View
              style={{
                flexDirection: 'column',
                borderBottomWidth: 1,
                borderBottomColor: '#707070',
                justifyContent: 'space-between',
                marginBottom: 15,
              }}>
              <Text
                style={{
                  color: '#707070',
                  fontSize: 19,
                  textAlign: 'left',
                }}>
                Email
              </Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 19,
                    color: '#fff',
                    marginVertical: 10,
                  }}>
                  {user?.email}
                </Text>
                <Image
                  source={require('../assets/images/lock.png')}
                  style={{width: 15, height: 15, alignSelf: 'center'}}
                />
              </View>
            </View>
          </View>

          <View>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#707070',
                marginBottom: 15,
                flexDirection: 'column',
              }}>
              <Text
                style={{
                  color: '#707070',
                  fontSize: 19,
                }}>
                Phone
              </Text>
              <View style={{marginTop: -5}}>
                <TextInput
                  onTextLayout={e => setTextLayout(e.nativeEvent.lines.length)}
                  onChangeText={number => setPhone(number)}
                  onChange={handleChange}
                  // onBlur={handleSubmit}
                  placeholder="Enter Your Number"
                  keyboardType="phone-pad"
                  style={{
                    fontWeight: '400',
                    fontSize: 19,
                    color: '#fff',
                    width: 370,
                    fontWeight: 'bold',
                  }}>
                  <Text
                    style={{
                      fontSize: textLayout > 1 ? 17 : 19,
                    }}>
                    {phone}
                  </Text>
                </TextInput>
                {/* <View style={{}}><Image
                    source={require('../assets/images/edit.png')}
                    style={{width: 13, height: 13}}
                  /></View> */}
              </View>
            </View>
          </View>

          <View>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#707070',
                marginBottom: 0,
              }}>
              <Text
                style={{
                  color: '#707070',
                  fontSize: 19,
                  paddingRight: 20,
                }}>
                Address
              </Text>
              <TextInput
                onChangeText={address => setAddress(address)}
                onTextLayout={e => setTextLayout(e.nativeEvent.lines.length)}
                onChange={handleChange}
                // onBlur={handleSubmit}
                placeholder="Enter Your City"
                style={{
                  fontWeight: '600',
                  fontSize: 19,
                  color: '#fff',
                  width: 370,
                }}>
                <Text
                  style={{
                    fontSize: textLayout > 1 ? 17 : 19,
                  }}>
                  {address}
                </Text>
              </TextInput>
            </View>
          </View>
          <View style={{}}>
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(false);
              }}>
              <View
                style={{
                  alignItems: 'center',
                  top: 350,
                  backgroundColor: 'rgba(255, 255, 255, 1.0)',
                  marginHorizontal: 50,
                  borderRadius: 13,
                }}>
                <View style={{alignItems: 'center'}}>
                  <Text
                    style={{
                      color: '#000',
                      fontWeight: 'bold',
                      fontSize: 22,
                      marginVertical: 20,
                    }}>
                    Success
                  </Text>
                  <Image
                    source={require('../assets/images/check.png')}
                    style={{
                      width: 90,
                      height: 90,
                      alignItems: 'center',
                      marginBottom: 40,
                    }}
                  />
                </View>
              </View>
            </Modal>
          </View>
        </View>
      </View>
    </View>
  );
}

export default EditProfileScreen;
