import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import axios from 'axios';

export default function FoodsScreen() {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:3000/foods')
      .then(response => setFoods(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <View>
      <Text>Food List</Text>
      <FlatList
        data={foods}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </View>
  );
}
