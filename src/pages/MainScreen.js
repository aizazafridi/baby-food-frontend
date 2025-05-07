// src/pages/MainScreen.js
import React from 'react';
import { View, Text, TextInput, Image, FlatList, TouchableOpacity } from 'react-native';
import styles from '../stylesheets/styles';

const recentItems = [
  { id: '1', name: 'Avocado', image: require('../../assets/avocado.jpg') },
  { id: '2', name: 'Banana', image: require('../../assets/banana.jpg') },
];

export default function MainScreen({ navigation }) {
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
