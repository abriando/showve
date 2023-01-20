import {createStackNavigator} from '@react-navigation/stack';

import Googlesign from './Googlesign';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';


const Stack = createStackNavigator();

function EditStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="EditScreen" component={EditScreen} />
    </Stack.Navigator>
  );
}

function TabNav (){
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
        name="Profile"
        component={ProfileScreen}
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

const Appstack = () => 
   (
      <Stack.Navigator initialRouteName="Googlesign" >
        <Stack.Screen
          name="Googlesign"
          component={Googlesign}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
  );

export default Appstack;
