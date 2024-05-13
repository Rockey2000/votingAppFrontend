/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ImageBackground,
} from 'react-native';

const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Alert.alert(
    //   "Login Attempt",
    //   `Username: ${username}, Password: ${password}`
    // );

    if (username == 'admin' && password == 'Admin@1234') {
      Alert.alert('Login succesful', `Welcome ${username}`);
      navigation.navigate('Search');
    } else {
      Alert.alert('Login Failed');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/votingLine.png')}
      style={styles.backgroundImage}
      resizeMode="cover">
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Username"
          style={styles.input}
          autoCapitalize="none"
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry={true}
          style={styles.input}
        />
        <Button title="Login" onPress={handleLogin} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    backgroundColor: 'rgba(255,255,255,0.8)', // Semi-transparent white background
    borderRadius: 5,
    padding: 20,
    margin: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    backgroundColor: 'white', // Ensure input fields are visible
  },
});

export default LoginScreen;
