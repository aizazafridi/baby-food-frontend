// src/pages/MainScreen.js
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, TextInput, Image, FlatList, TouchableOpacity, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from "jwt-decode";
import styles from '../stylesheets/styles';
import axios from 'axios';

const recentItems = [
  { id: '1', name: 'Avocado', image: require('../../assets/avocado.jpg') },
  { id: '2', name: 'Banana', image: require('../../assets/banana.jpg') },
];

export default function MainScreen({ navigation }) {

  const [foods, setFoods] = useState([]);
  const [tip, setTip] = useState(null);
  const [username, setUsername] = useState(null);
  
  useEffect(() => {

    // Get token and set token variable
    const fetchData = async () => {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        navigation.replace('Login');
        return;
      }
  
      try {
        // Retrieve token from token variable and decode it
        const decoded = jwtDecode(token);
        setUsername(decoded.username || `User #${decoded.id}`);
  
        const response = await axios.get('http://127.0.0.1:3000/api/auth/main-screen-data', {
          headers: {
            Authorization: `Bearer ${token}`, // <-- Add token here
          },
        });
  
        // Set foods and tip
        setFoods(response.data.foods || []);
        setTip(response.data.tips?.[0] || null);

      } catch (error) {
        console.error('Error fetching data:', error);
        // Redirect if token is invalid
        if (error.response?.status === 401) {
          await AsyncStorage.removeItem('token');
          navigation.replace('Login');
        }
      }
    };
  
    fetchData();
    
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
      {tip && (
        <View style={styles.tipBox}>
          <Text style={styles.tipTitle}>Today's Tip</Text>
          <Text style={styles.tipText}>{tip.description}</Text>
        </View>
      )}

      {/* Foods Section */}
      <Text style={styles.sectionTitle}>Foods</Text>
      <FlatList
        horizontal
        data={foods}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
          style={styles.foodItem}
          onPress={() => navigation.navigate('Food', { foodId: item.id })}
          >
          <Image
            source={{ uri: item.image_url }}
            style={styles.foodImage}
            resizeMode="cover"
          />
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
