// src/pages/MainScreen.js
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, TextInput, Image, FlatList, TouchableOpacity, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from "jwt-decode";
import styles from '../stylesheets/styles';

const recentItems = [
  { id: '1', name: 'Avocado', image: require('../../assets/avocado.jpg') },
  { id: '2', name: 'Banana', image: require('../../assets/banana.jpg') },
];

export default function MainScreen({ navigation }) {

  const [username, setUsername] = useState(null);
  
  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        navigation.replace('Login'); // redirect if no token
        return;
      }
      try {
        const decoded = jwtDecode(token);
        setUsername(decoded.username || `User #${decoded.id}`);
      } catch (err) {
        console.error('Invalid token', err);
        //navigation.replace('Login');
      }
    };
    checkAuth();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ alignItems: 'flex-end', marginRight: 12 }}>
          {username && (
            <Text style={{ fontSize: 16, textAlign: 'center', marginBottom: 4, color: 'grey' }}>
              Welcome {username}
            </Text>
          )}
          <Button
            title="Logout"
            onPress={async () => {
              await AsyncStorage.removeItem('token');
              navigation.replace('Login');
            }}
          />
        </View>
      ),
    });
  }, [navigation, username]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to Baby Bites</Text>

      {/* Search Bar */}
      <TextInput
        placeholder="Search food..."
        style={styles.searchBar}
      />

      {/* Daily Tip */}
      <View style={styles.tipBox}>
        <Text style={styles.tipTitle}>Today's Tip</Text>
        <Text style={styles.tipText}>Always serve soft foods in finger-sized strips.</Text>
      </View>

      {/* Recently Viewed */}
      <Text style={styles.sectionTitle}>Recently Viewed</Text>
      <FlatList
        horizontal
        data={recentItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.foodItem}
            onPress={() => navigation.navigate('Food', { foodId: item.id })}
          >
            <Image source={item.image} style={styles.foodImage} />
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Bottom Nav Placeholder */}
      <View style={styles.bottomNav}>
      <Text
          style={styles.navItem}
          onPress={() => navigation.navigate('Login')}
        >
          Login
        </Text>
        <Text style={styles.navItem}>Home</Text>
        <Text style={styles.navItem}>Browse</Text>
        <Text
          style={styles.navItem}
          onPress={() => navigation.navigate('Food')}
        >
          Foods
        </Text>
        <Text style={styles.navItem}>Saved</Text>
        <Text style={styles.navItem}>More</Text>
      </View>
    </View>
  );

}
