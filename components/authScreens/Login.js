import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

export default function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handleLogin = async () => {
    console.log('Login button pressed');
    try {
      const response = await fetch('http://10.0.2.2:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      console.log('Response:', email, password);

      if (response.ok) {
        const userData = await response.json();
        if (userData.user) {
          console.log('Login successful. Welcome, ' + userData.user.username);

          await AsyncStorage.setItem('authToken', userData.token);

          navigation.navigate('Tabs', { username: userData.user.username });
        } else {
          console.error('Authentication succeeded, but no username received.');
        }
      } else {
        console.error('Authentication failed');
      }
    } catch (error) {
      console.error('An error occurred: ', error);
    }
  };
    
  return (
    <View style={styles.container}>

      <View style={{}}>

        <Image style={styles.LoginImage} source={require('../../assets/LoginImage.png')} />
        <Text style={styles.AppName}>TaskApp</Text>
        <Text style={styles.WelcomeText}>Welcome to</Text>
      </View>

      <View style={styles.LoginContainer}>
        <Text style={styles.LoginText}>Login</Text>

        <View style={styles.divider} />

        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          style={[styles.input, { color: '#000', backgroundColor: '#fff' }]}
          placeholderTextColor="#999"
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)} />

        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          style={[styles.input, { color: '#000', backgroundColor: '#fff' }]}
          placeholder="Password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry />

        <View style={{ alignContent: "center", alignItems: "center" }}>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#007BFF" }]}
            onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#007BFF",
  },
  WelcomeText: {
    fontSize: width * 0.03,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: height * -0.06,
    marginBottom: height * -0.15,
    marginLeft: width * 0.55
  },
  AppName: {
    marginTop: height * -0.15,
    marginBottom: height * -0.01,
    fontSize: width * 0.08,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginLeft: width * 0.55
  },
  LoginImage: {
    marginLeft: width * 0.08,
    width: width * 0.45,
    height: width * 0.45,
    marginTop: height * 0.04,
  },
  GoogleImage: {
    marginLeft: width * 0.05,
    width: width * 0.07,
    height: width * 0.07,
    marginTop: height * 0.04,
  },
  LoginContainer: {
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: height * 0.3,
    height: height * 1,
    width: width * 1,
    backgroundColor: "#FFFFFF",
  },
  LoginText: {
    fontSize: width * 0.07,
    fontWeight: "bold",
    marginTop: height * 0.001,
    marginBottom: width * -0.001,
    color: "#333",
    marginLeft: width * 0.05
  },
  inputLabel: {
    fontSize: width * 0.03,
    marginTop: height * 0.025,
    marginBottom: 9,
    color: "#333",
    textAlign: "left",
    marginLeft: width * 0.045,
  },
  input: {
    marginLeft: width * 0.04,
    borderWidth: 0.5,
    borderColor: "#ccc",
    padding: width * 0.02,
    marginBottom: height * 0.001,
    borderRadius: width * 0.02,
    fontSize: width * 0.03,
    width: width * 0.8
  },
  button: {
    width: width * 0.5,
    padding: width * 0.030,
    borderRadius: width * 1,
    marginTop: height * 0.06,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: width * 0.04,
    fontWeight: "bold",
  },
  divider: {
    marginTop: height * 0.04,
    marginBottom: width * 0.04,
    backgroundColor: "#007BFF",
    height: 1,
  },
  divider2: {
    marginTop: height * 0.035,
    backgroundColor: "#000000",
    height: 0.6,
    width: width * 0.17
  },

})