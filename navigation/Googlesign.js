import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from 'react-native-google-signin';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import StoryScreen from '../screens/StoryScreen';

import EditStack from './Editstack';

const Tab = createBottomTabNavigator();



GoogleSignin.configure({
  webClientId:
    '404231972023-16565eb90vv9sp0nr5ak3vultgi4bk5p.apps.googleusercontent.com',
});

function Googlesign({navigation}) {
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

  if (!user) {
    return (
      <View style={{backgroundColor: '#121212', flex: 1}}>
        <View style={{marginHorizontal: 20, top: 790}}>
          <TouchableOpacity
            style={{
              backgroundColor: '#fff',
              flexDirection: 'row',
              alignSelf: 'center',
              borderRadius: 5,
              padding: 5,
              paddingVertical: 5,
              width: 194,
              height: 46,
            }}
            onPress={() =>
              onGoogleButtonPress().then(() =>
                console.log('Signed in with Google!'),
              )
            }>
            <Image
              source={require('../assets/images/google.png')}
              style={{width: 35, height: 35}}
            />
            <Text
              style={{
                color: '#707070',
                alignSelf: 'center',
                fontWeight: 'bold',
                fontSize: 18,
                paddingLeft: 3,
              }}>
              Sign in with Google
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('LoginScreen')}
            style={{alignSelf: 'center', paddingVertical: 10}}>
            <LoginScreen />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: {
          height: 70,
          paddingHorizontal: 5,
          paddingTop: 0,
          backgroundColor: '#121212',
          position: 'absolute',
          borderTopWidth: 1.5,
          borderRadius: 6,
        },
        tabBarLabelStyle: {position: 'relative', bottom: 6},
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        user={user}
        options={{
          tabBarLabel: 'Home',
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#707070',
          headerTitleAlign: 'center',
          tabBarIcon: ({focused}) => {
            return focused ? (
              <Image
                source={require('../assets/images/home.png')}
                style={{width: 32, height: 32}}
              />
            ) : (
              <Image
                source={require('../assets/images/home.png')}
                style={{width: 32, height: 32, tintColor: '#707070'}}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        user={user}
        options={{
          tabBarLabel: 'Explore',
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#707070',
          headerTitleAlign: 'center',

          tabBarIcon: ({focused}) => {
            return focused ? (
              <Image
                source={require('../assets/images/compass.png')}
                style={{width: 37, height: 37}}
              />
            ) : (
              <Image
                source={require('../assets/images/compass.png')}
                style={{width: 37, height: 37, tintColor: '#707070'}}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Story"
        component={StoryScreen}
        user={user}
        options={{
          tabBarLabel: 'History',
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#707070',
          headerTitleAlign: 'center',
          tabBarIcon: ({focused}) => {
            return focused ? (
              <Image
                source={require('../assets/images/history.png')}
                style={{width: 32, height: 32}}
              />
            ) : (
              <Image
                source={require('../assets/images/history.png')}
                style={{width: 32, height: 32, tintColor: '#707070'}}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Edit"
        component={EditStack}
        user={user}
        options={{
          tabBarLabel: 'Profile',
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#707070',
          headerTitleAlign: 'center',
          tabBarIcon: ({focused}) => {
            return focused ? (
              <Image
                source={require('../assets/images/user.png')}
                style={{width: 32, height: 32}}
              />
            ) : (
              <Image
                source={require('../assets/images/user.png')}
                style={{width: 32, height: 32, tintColor: '#707070'}}
              />
            );
          },
        }}
        
      />
    </Tab.Navigator>
  );

}

async function onGoogleButtonPress() {
  // firebase
  //   .auth()
  //   .signInWithPopup(provider)
  //   .then(result => {
  //     // Berhasil login
  //     console.log(result);
  //   })
  //   .catch(error => {
  //     // Gagal login
  //     console.error(error);
  //   });
  
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
  // Get the users ID token
  const {idToken} = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}
// async () => {
//   try {
//     await auth().signOut();
//   } catch (e) {
//     console.log(e);
//   }
// };

function LoginScreen(props) {
  return (
    <View
      {...props}
      style={{
        flexDirection: 'row',
        paddingVertical: 5,
        alignSelf: 'center',
        aspectRatio: 4,
      }}>
      <Text
        style={{
          color: '#fff',
          textAlign: 'center',
          alignSelf: 'center',
          fontWeight: 'bold',
          fontSize: 15,
        }}>
        Login as Musician
      </Text>
    </View>
  );
}
export default Googlesign;
