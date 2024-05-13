/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, Button } from 'react-native';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  
      <Button
        title="Inside the Home"
        onPress={() => navigation.navigate('Search')}
      />
    </View>
  );
}

export default HomeScreen;