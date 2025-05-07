// src/navigation/MainNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from '../pages/MainScreen';
import FoodScreen from '../pages/FoodScreen';

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen name="Main" component={MainScreen} options={{ title: 'Home' }} />
      <Stack.Screen name="Food" component={FoodScreen} />
    </Stack.Navigator>
  );
}
