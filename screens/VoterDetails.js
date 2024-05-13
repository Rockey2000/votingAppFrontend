/* eslint-disable prettier/prettier */
// // src/screens/VoterDetailScreen.js
// import React from 'react';
// import { View, Text, Button, StyleSheet } from 'react-native';

// const VoterDetailScreen = ({ route, navigation }) => {
//     const { voter } = route.params;

//     const handleMarkVote = () => {
//         // Implementation for marking the vote
//     };

//     return (
//         <View style={styles.container}>
//             <Text style={styles.header}>Voter Details</Text>
//             <Text>Voter ID: {voter.voterId}</Text>
//             <Text>Elector's Name: {voter.electorName}</Text>
//             <Text>Father's Name: {voter.fatherName}</Text>
//             <Text>Sex: {voter.sex}</Text>
//             <Text>Date of Birth: {new Date(voter.dob).toLocaleDateString()}</Text>
//             <Text>Address: {voter.address}</Text>
//             <Text>Status: {voter.status}</Text>
//             <Button title="Mark as Voted" onPress={handleMarkVote} disabled={voter.status === 'Voted'} />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20,
//         backgroundColor: '#fff',
//     },
//     header: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 20,
//     }
// });

// export default VoterDetailScreen;
import React, { useState, useEffect, useRef } from "react";
import {
  ScrollView,
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
} from "react-native";
// import { Camera } from "expo-camera";
import api from "../services/api"; // Import the API service
const VoterDetailScreen = ({ route, navigation }) => {
  const { voter } = route.params;
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraVisible, setCameraVisible] = useState(false);
  const cameraRef = useRef(null);

  // Requesting camera permissions
  // useEffect(() => {
  //   (async () => {
  //     const { status } = await Camera.requestCameraPermissionsAsync();
  //     setHasPermission(status === "granted");
  //   })();
  // }, []);

  // Function to handle marking a vote
  const handleMarkVote = async (voterId, photo) => {
    const payload = {
      status: "Voted",
    };

    // Only add the image to the payload if it's captured
    if (photo) {
      payload.image = photo;
    }


    try {
      // Make a PUT request to the specific voter endpoint

      const response = await api.put(`/voters/vote/${voter.voterId}`, payload);
      console.log("check 4===>");
      if (response.status === 200) {
        Alert.alert("Success", "The voter has been marked as voted.");
  // Call the reset function passed via navigation parameters
        navigation.goBack();
        // Handle navigation or state updates here
      } else {
        throw new Error("Failed to mark as voted");
      }
    } catch (error) {
      console.error("Failed to mark the voter as voted:", error);
      Alert.alert("Error", "Failed to mark the vote: " + error.message);
    }
  };

  // Function to handle capturing a photo
  // const handleCapture = async () => {
  //   if (cameraRef.current) {
  //     const photo = await cameraRef.current.takePictureAsync();
  //     console.log(photo);
  //     Alert.alert("Photo Taken", "The photo has been captured successfully.");

  //     setCameraVisible(false); // Optionally hide the camera after capturing
  //   }
  // };

  // Function to open the camera
  const openCamera = () => {
    // setCameraVisible(true);
    Alert.alert("Feature yet to arrive")
  };

  // if (!hasPermission) {
  //   return <Text>No access to camera</Text>;
  // }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Voter Details</Text>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Voter ID:</Text>
        <Text style={styles.info}>{voter.voterId}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Elector's Name:</Text>
        <Text style={styles.info}>{voter.electorName}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Father's Name:</Text>
        <Text style={styles.info}>{voter.fatherName}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Sex:</Text>
        <Text style={styles.info}>{voter.sex}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Date of Birth:</Text>
        <Text style={styles.info}>
          {new Date(voter.dob).toLocaleDateString()}
        </Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Address:</Text>
        <Text style={styles.info}>{voter.address}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Status:</Text>
        <Text style={styles.info}>{voter.status}</Text>
      </View>
      {/* <View style={styles.buttonContainer}>
        <Button title="Open Camera" disabled={voter.status === "Voted"} onPress={openCamera} color="#1a1a2e" />
      </View> */}
      <View style={styles.buttonContainer}>
        <Button
          title="Mark as Voted"
          onPress={handleMarkVote}
          disabled={voter.status === "Voted"}
          color="#4CAF50"
        />
      </View>

      {/* {cameraVisible && (
        <Camera
          style={styles.camera}
          type={Camera.Constants.Type.back}
          ref={cameraRef}
        >
          <View style={styles.cameraButtonContainer}>
            <Button title="Capture Image" onPress={handleCapture} />
          </View>
        </Camera>
      )} */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  detailContainer: {
    marginBottom: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
  info: {
    fontSize: 16,
    color: "#666",
  },
  buttonContainer: {
    marginVertical: 10,
  },
  camera: {
    height: 300,
    marginTop: 20,
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
  },
  cameraButtonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default VoterDetailScreen;
