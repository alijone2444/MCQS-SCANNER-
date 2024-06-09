import React, { useRef, useState } from 'react';
import { View, Button, Alert, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useRoute } from '@react-navigation/native';
import constants from '../../Constants/constants';
import axios from 'axios';
const Camera = ({ navigation }) => {
    const cameraRef = useRef(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const [flashMode, setFlashMode] = useState(RNCamera.Constants.FlashMode.off); // Default flash mode is off
    const route = useRoute();
    const data = route.params.data;

    const toggleFlash = () => {
        // Toggle the flash mode between on and off
        setFlashMode((prevMode) =>
            prevMode === RNCamera.Constants.FlashMode.off
                ? RNCamera.Constants.FlashMode.torch
                : RNCamera.Constants.FlashMode.off
        );
    };
    const takePicture = async () => {
        if (cameraRef.current) {
            const options = { quality: 0.5, base64: true, orientation: 'portrait' };
            const data = await cameraRef.current.takePictureAsync(options);
            setCapturedImage(data.uri);
        }
    };


    const uploadImage = async () => {
        try {
            console.log('Sending request');
            const formData = new FormData();
            formData.append('file', {
                uri: capturedImage,
                type: 'image/jpeg',
                name: 'image.jpg',
            });

            const response = await axios.post(`${constants.base_url}process-img`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Assuming your server returns JSON
            const responseData = response.data;

            console.log('tjos os ans', responseData)
            // Check if the server response indicates success
            if (responseData.success) {
                console.log(responseData)
                navigation.navigate('gig', { data: data, ScannedAnswers: responseData })
                Alert.alert('Success', responseData.message);
            } else {
                // Handle server-side errors
                console.error('Server Error:', responseData.error);
                Alert.alert('Error', 'Failed to process again take image and consider having plain background');
            }
        } catch (error) {
            // Handle network or other unexpected errors
            console.error('Error uploading image:', error.message);
            Alert.alert('Error', 'Failed to upload image');
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <RNCamera
                ref={cameraRef}
                captureAudio={false}
                style={{ flex: 1 }}
                type={RNCamera.Constants.Type.back}
                flashMode={flashMode} // Set flash mode
                androidCameraPermissionOptions={{
                    title: 'Permission to use camera',
                    message: 'We need your permission to use your camera',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}
            />
            <TouchableOpacity
                onPress={toggleFlash}
                style={{
                    position: 'absolute',
                    top: 20,
                    right: 20,
                    zIndex: 2,
                }}
            >
                <FontAwesome
                    name="flash"
                    size={30}
                    color={flashMode === RNCamera.Constants.FlashMode.off ? "yellow" : "yellow"}
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={takePicture}
                style={{
                    position: 'absolute',
                    bottom: 10,
                    left: 0,
                    right: 0,
                    alignItems: 'center'
                }}
            >
                <View
                    style={{
                        borderWidth: 2,
                        borderColor: 'white',
                        borderRadius: 100, // Half of the width and height for a circle
                        padding: "5%", // Padding for the icon inside the circle
                        backgroundColor: 'transparent', // Set a background color if you want it filled
                    }}
                >
                    <FontAwesome name="camera" size={34} color="white" />
                </View>
            </TouchableOpacity>
            {capturedImage && <Button title="Upload Image" onPress={uploadImage} />}

        </View>
    );
};

export default Camera;
