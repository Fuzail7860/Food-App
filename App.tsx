
import { StyleSheet,StatusBar, Text, View,SafeAreaView } from 'react-native';
import WelcomeScreen from './src/screens/LoginSignUpScreen/WelcomeScreen';
import LoginScreen from './src/screens/LoginSignUpScreen/LoginScreen'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from './src/screens/LoginSignUpScreen/SignUpScreen';
import HomeScreen from './src/screens/HomeScreen';
import Splash from './src/screens/LoginSignUpScreen/Splash';
import UserProfile from './src/screens/UserProfile';
import ProductPage from './src/screens/ProductPage';
import UserCart from './src/screens/UserCart';
import PlaceOrder from './src/screens/PlaceOrder';
export default function App() {
  const Stack = createNativeStackNavigator();
  // alert(SP_KEY);
  return (
    <NavigationContainer>
       <Stack.Navigator>
       <Stack.Screen name="splash" component={Splash} options={{headerShown:false}}/>
        <Stack.Screen name="welcomepage" component={WelcomeScreen} options={{headerShown:false}}/>
        <Stack.Screen name="signup" component={SignUpScreen} options={{headerShown:false}}/>
        <Stack.Screen name="login" component={LoginScreen} options={{headerShown:false}}/>
        <Stack.Screen name="home" component={HomeScreen} options={{headerShown:false}}/>
        <Stack.Screen name="UserProfile" component={UserProfile} options={{headerShown:false}}/>
        <Stack.Screen name="productpage" component={ProductPage} options={{headerShown:false}}/>
        <Stack.Screen name="cart" component={UserCart} options={{headerShown:false}}/>
        <Stack.Screen name="PlaceOrder" component={PlaceOrder} options={{headerShown:false}}/>
    </Stack.Navigator>
    </NavigationContainer>
    
    // <View>
    //   <Text>Fuzail</Text>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
