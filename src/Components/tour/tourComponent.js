// Import necessary libraries
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

// Create the Tour component
const TourComponent = () => {
  // State to manage the visibility of the tour
  const [isTourVisible, setTourVisible] = useState(true);

  // Function to close the tour
  const closeTour = () => {
    setTourVisible(false);
    // You may want to store in AsyncStorage that the user has completed the tour to avoid showing it again.
  };

  return (
    <Modal isVisible={isTourVisible}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Step 1: Click on the camera icon in the center of the screen</Text>
        {/* You can add additional steps here */}
        <TouchableOpacity onPress={closeTour}>
          <Text>Got it!</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default TourComponent;
