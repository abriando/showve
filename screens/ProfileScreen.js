import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  DrawerLayoutAndroid,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {firebase} from '@react-native-firebase/database';
import {SafeAreaView} from 'react-native-safe-area-context';
import SideBar from './SideBar';


function ProfileScreen({navigation}) {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [textLayout, setTextLayout] = useState(1);
  const [showButton, setShowButton] = useState(false);
  const drawer = useRef(null);
  
  const navigationView = () => (
    <View style={{flex: 1, backgroundColor: '#121212'}}>
      <SideBar />
    </View>
  );

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

  if (initializing) return null;

  return (
    <SafeAreaView style={{backgroundColor: '#121212', flex: 1}}>
      <DrawerLayoutAndroid
        ref={drawer}
        drawerWidth={350}
        renderNavigationView={navigationView}>
        <View
          style={{
            flex: 1,
            marginTop: 20,
            marginLeft: 25,
            position: 'absolute',
          }}>
          {/* <TouchableOpacity
            title="klik"
            style={{alignSelf: 'center', paddingTop: 6}}
            onPress={() => drawer.current.openDrawer()}>
            <Image
              style={{width: 30, height: 30}}
              source={require('../assets/images/menu.png')}
            />
          </TouchableOpacity> */}
        </View>
        <View style={{height: 700}}>
          <View
            style={{
              height: 70,
              flexDirection: 'row',
              alignSelf: 'center',
              justifyContent: 'space-between',
              marginHorizontal: 20,
            }}>
            <Text
              style={{
                fontSize: 25,
                fontWeight: 'bold',
                color: '#fff',
                alignSelf: 'center',
                marginLeft: 140,
              }}>
              Profile
            </Text>
            <Ionicons
              name="notifications"
              size={30}
              color="#fff"
              style={{textAlign: 'right', alignSelf: 'center', marginLeft: 120}}
            />
          </View>
          <View style={{alignSelf: 'center', marginVertical: 50}}>
            <Image
              source={{uri: user?.photo}}
              style={{
                width: 150,
                height: 150,
                borderRadius: 100,
              }}
            />
            
            <Text style={{fontSize: 25, marginTop: 10, color: '#fff'}}>
              {user?.displayName}
            </Text>
            <Text
              style={{
                fontSize: 23,
                color: '#707070',
                alignSelf: 'center',
                fontWeight: 'bold',
              }}>
              Tenant
            </Text>
          </View>
          <View style={{marginHorizontal: 30, marginTop: 30}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('EditProfileScreen')}
              style={{
                flexDirection: 'row',
                borderWidth: 1,
                borderColor: '#1c1c1c',
                backgroundColor: '#1c1c1c',
                marginBottom: 15,
                borderRadius: 5,
              }}>
              <Image
                style={{width: 20, height: 20, margin: 15}}
                source={require('../assets/images/userProfile.png')}
              />
              <View>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 19,
                    color: '#fff',
                    marginTop: 10,
                    alignSelf: 'center',
                    marginVertical: 10,
                  }}>
                  Edit Profile
                </Text>
              </View>
            </TouchableOpacity>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  borderWidth: 1,
                  borderColor: '#1c1c1c',
                  backgroundColor: '#1c1c1c',
                  marginBottom: 15,
                  borderRadius: 5,
                }}>
                <Image
                  source={require('../assets/images/privacy.png')}
                  style={{width: 20, height: 20, margin: 15}}
                />
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 19,
                    color: '#fff',
                    marginTop: 10,
                    alignSelf: 'center',
                    marginVertical: 10,
                  }}>
                  Privacy Policy
                </Text>
              </View>
            </View>

            <View>
              <View
                style={{
                  flexDirection: 'row',
                  borderWidth: 1,
                  borderColor: '#1c1c1c',
                  backgroundColor: '#1c1c1c',
                  marginBottom: 15,
                  borderRadius: 5,
                }}>
                <Image
                  source={require('../assets/images/headset.png')}
                  style={{width: 20, height: 20, margin: 15}}
                />
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 19,
                    color: '#fff',
                    marginTop: 10,
                    alignSelf: 'center',
                    marginVertical: 10,
                  }}>
                  Contact Us
                </Text>
              </View>
            </View>

            <View>
              <TouchableOpacity
                onPress={() => auth().signOut()}
                style={{
                  flexDirection: 'row',
                  borderWidth: 1,
                  borderColor: '#1c1c1c',
                  backgroundColor: '#1c1c1c',
                  marginBottom: 15,
                  borderRadius: 5,
                }}>
                <Image
                  style={{width: 20, height: 20, margin: 15}}
                  source={require('../assets/images/logout.png')}
                />
                <View>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 19,
                      color: '#fff',
                      marginTop: 10,
                      alignSelf: 'center',
                      marginVertical: 10,
                    }}>
                    Log Out
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </DrawerLayoutAndroid>
    </SafeAreaView>
  );
}

export default ProfileScreen;
