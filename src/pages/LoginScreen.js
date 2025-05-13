import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../stylesheets/styles';

export default function LoginScreen({ navigation }) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {

    setError(''); // Clear previous errors

    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (res.ok) {
        const data = await res.json();
        await AsyncStorage.setItem('token', data.token);  // Store token securely
        navigation.navigate('Main');
      } else {
        const text = await res.text(); // fallback to plain text
        setError(text || 'Invalid credentials');
      }
    } catch (err) {
      console.error(err);
      setError('Unable to connect. Please try again later.');
    }
  };

  return (

    <View style={styles.container}>

      <Text style={styles.authTitle}>Login</Text>
      
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.authInput}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.authInput}
      />

      {error ? <Text style={{ color: 'red', margin: 4 }}>{error}</Text> : null}
      
      <View style={styles.authButton}>
        <Button title="Login" onPress={handleLogin} />
      </View>

      <View style={styles.authButton}>
        <Button title="Go to Register" onPress={() => navigation.navigate('Register')} />
      </View>
    
    </View>

  );

}
