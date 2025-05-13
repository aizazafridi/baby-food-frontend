import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import styles from '../stylesheets/styles';

export default function RegisterScreen({ navigation }) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState('');

  const validateEmail = (email) => {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{10,}$/;
    return regex.test(password);
  };

  const handleRegister = async () => {

    setEmailError(''); // clear previous email error

    if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      return;
    }
  
    if (!validatePassword(password)) {
      setPasswordError(
        'Weak password,Password must be at least 10 characters long and include uppercase, lowercase, and a special character'
      );
      return;
    }
  
    if (password !== confirmPassword) {
      setPasswordMatchError("Passwords do not match")
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email })
      });
      const text = await res.text();
      if (res.ok) {
        navigation.navigate('Login');
      } else {
      }
    } catch (err) {
      console.error(err);
    }
  };

   return (
      <View style={styles.container}>
        <Text style={styles.authTitle}>Register</Text>

          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setEmailError(''); // Clear error as the user types
            }}
            style={styles.authInput}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {emailError ? (
            <Text style={{ color: 'red', marginBottom: 8, marginTop: -8 }}>{emailError}</Text>
          ) : null}

          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            style={styles.authInput}
          />

          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setPasswordError(''); // Clear error as the user types
            }}
            secureTextEntry
            style={styles.authInput}
          />
          {passwordError ? (
            <Text style={{ color: 'red', marginBottom: 8, marginTop: -8 }}>{passwordError}</Text>
          ) : null}

          <TextInput
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              setPasswordMatchError(''); // Clear error as the user types
            }}
            secureTextEntry
            style={styles.authInput}
          />
          {passwordMatchError ? (
            <Text style={{ color: 'red', marginBottom: 8, marginTop: -8 }}>{passwordMatchError}</Text>
          ) : null}

          <View style={styles.authButton}>
            <Button title="Register" onPress={handleRegister} />
          </View>

      </View>
    );

}
