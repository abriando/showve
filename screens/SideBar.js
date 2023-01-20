import React, {useEffect, useState} from 'react';
import {View, Text, Button, Image} from 'react-native';
import {firebase} from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
function SideBar() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;
  return (
    <View>
      <View style={{borderBottomWidth: 3, borderBottomColor: '#fff'}}>
        <View
          style={{
            alignSelf: 'center',
            marginVertical: 50,
            flexDirection: 'row',
            marginRight: 30,
          }}>
          <Image
            source={{uri: user?.photoURL}}
            style={{width: 100, height: 100, borderRadius: 100}}
          />
          <View style={{alignSelf: 'center', paddingLeft: 15}}>
            <Text
              style={{
                fontSize: 20,
                marginTop: 10,
                color: '#fff',

                fontWeight: 'bold',
              }}>
              {user?.displayName}
            </Text>
            <Text
              style={{
                fontSize: 19,
                color: '#707070',
                textAlign: 'left',
                fontWeight: 'normal',
               
              }}>
              Tenant
            </Text>
          </View>
        </View>
      </View>
      <View>
        <View style={{flexDirection: 'row', padding: 25, marginTop: 5}}>
          <Image
            source={require('../assets/images/headset.png')}
            style={{width: 30, height: 30}}
          />
          <Text style={{alignSelf: 'center', fontSize: 20, paddingLeft: 10}}>
            Contact Us
          </Text>
        </View>
        <View style={{flexDirection: 'row', paddingLeft: 22}}>
          <Image
            source={require('../assets/images/privacy.png')}
            style={{width: 30, height: 30}}
          />
          <Text style={{alignSelf: 'center', fontSize: 20, paddingLeft: 10}}>
            Privacy Policy
          </Text>
        </View>
      </View>
      <View style={{marginHorizontal: 40, paddingTop: 410}}>
        <Button color={'red'} title="Logout" onPress={() => auth().signOut()} />
      </View>
      {/* <Button
        title="Close drawer"
        onPress={() => drawer.current.closeDrawer()}
      /> */}
    </View>
  );
}

export default SideBar;
