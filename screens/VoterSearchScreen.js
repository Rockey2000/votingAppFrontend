/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  Text,
} from 'react-native';
import api from '../services/api'; // Import the API service
import { Alert } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
const VoterSearchScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [voters, setVoters] = useState([]);
  const [loading, setLoading] = useState(false);

  // const handleSearch = async () => {
  //   if (!searchQuery.trim()) return;
  //   setLoading(true);
  //   try {
  //     // Update the endpoint to include the searchQuery as part of the path
  //     const response = await api.get(`/voters/${searchQuery}`);
  //     console.log(response, "responce");
  //     setVoters([response.data]); // Wrap the single response object in an array for FlatList
  //   } catch (error) {
  //     console.error("Failed to fetch voter:", error);
  //     Alert.alert(
  //       "Error",
  //       "Unable to fetch data. Check your network and try again."
  //     );
  //   }
  //   setLoading(false);
  // };
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    try {
      // Update the endpoint to include the searchQuery as part of the path
      const response = await api.get(`/voters/${searchQuery}`);
      console.log(response, 'response');
      // Ensure response.data is properly formatted for FlatList
      setVoters([{ ...response.data, id: response.data._id }]); // Add id for keyExtractor to use
    } catch (error) {
      console.error('Complete error:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      Alert.alert(
        'Error',
        'Unable to fetch data. Check your network and try again.'
      );
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter voter ID or name"
        value={searchQuery}
        onChangeText={setSearchQuery} // Correct usage
        autoCapitalize="none"
        clearButtonMode="always"
      />
      <Button title="Search" onPress={handleSearch} disabled={loading} />
      {loading ? <Text>Loading...</Text> : null}
      {/* <FlatList
        data={voters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            {}
            <Text style={styles.name}>{item.electorName}</Text>
          </View>
        )}
      /> */}
      <FlatList
        data={voters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Details', { voter: item })}
          >
            <View style={styles.item}>
              <Text style={styles.name}>{item.electorName}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  name: {
    fontSize: 18,
  },
});

export default VoterSearchScreen;
