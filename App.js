import React from 'react';
import { Image, StyleSheet, Dimensions, TouchableOpacity, View } from 'react-native';
import SplashScreen from './components/SplashScreen';
import Profile from './components/Profile';
import TaskDetails from './components/TaskDetails';
import Settings from './components/Settings';
import TaskModal from './components/TaskModal';
import Login from './components/authScreens/Login';
import HomeScreen from './components/HomeScreen';

import Tabs from './components/Tabs';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const { width, height } = Dimensions.get('window');

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true, headerStyle: {
                position: 'absolute',
               top: 25,
                left: 20,
                right: 20,
                elevation: 0,
                backgroundColor: '#FFFFFF',
                borderRadius: 15,
                height: 90 } }} >
                    {/* <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} /> 
                  <Stack.Screen options={{ headerShown: false }} name="HomeScreen" component={HomeScreen} /> */}
            
                    {/* <Stack.Screen options={{ headerShown: false }} name="SignUp" component={SignUp} /> */}
       <Stack.Screen 
          name="Tabs"
          component={Tabs}
          options={{
            headerLeft: () => (
              <TouchableOpacity>
                <Image
                  style={styles.Menu}
                  source={require('./assets/menu.png')}
                />
              </TouchableOpacity>
            ),
            headerCenter: () => (
              <View>
                  <Image
              style={styles.logo}
              source={require('./assets/AgVa.png')}
              />
              </View>
            ),
            headerTitle: 'AgVa',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 25,
              fontWeight: 'bold',
              color: '#cb297b',
            },
            headerRight: () => (
              <TouchableOpacity>
                <Image
                  style={styles.BellIcon}
                  source={require('./assets/bellIcon.png')}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="TaskModal" component={TaskModal} />
        <Stack.Screen name="TaskDetails" component={TaskDetails} options={{
          headerCenter: () => (
              <View>
                  <Image
              style={styles.logo}
              source={require('./assets/AgVa.png')}
              />
              </View>
            ),
            headerTitle: 'Task Details',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 25,
              fontWeight: 'bold',
              color: '#cb297b',
            },}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
 Menu: {
    width: width * 0.06,
    height: width * 0.06,
  },
  BellIcon: {
    width: width * 0.06,
    height: width * 0.06,
  },
  logo: {
    width: width * 0.5,
    height: width * 0.5,
  },
  
});
