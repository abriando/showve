import {createStackNavigator} from '@react-navigation/stack';
import EditProfileScreen from '../screens/EditProfileScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();

const EditStack = () => (
  <Stack.Navigator initialRouteName="ProfileScreen">
    <Stack.Screen
      name="ProfileScreen"
      component={ProfileScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="EditProfileScreen"
      component={EditProfileScreen}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

export default EditStack;
