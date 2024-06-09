import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, TextInput, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text } from 'react-native-paper';
import BackgroundWrapper from '../Wrapper/BackgroundWrapper';
import { useRoute } from '@react-navigation/native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import requestStoragePermission from '../WrittingPermissionTaker/Permission';
import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob';
import constants from '../../Constants/constants';
const CreatePdf = ({ navigation }) => {
    const route = useRoute();
    const { isDarkMode, callback } = route.params;
    const [numFields, setNumFields] = useState('');
    const [correctOptions, setCorrectOptions] = useState([]);

    const handleInputChange = (value) => {
        const num = value ? parseInt(value, 10) : 0;
        setNumFields(num);
        generateHtmlFields(num);
    };

    const handleOptionChange = (index, value) => {
        const newOptions = [...correctOptions];
        newOptions[index] = value;
        setCorrectOptions(newOptions);
    };
    const generateHtmlFields = (num) => {
        setCorrectOptions(Array.from({ length: num }, () => ''));
    };

    const generatePDF = async (type) => {
        const isEmpty = correctOptions.some(option => option.trim() === '');
        if (isEmpty) {
            Alert.alert('Please fill all answer fields');
            return;
        }
        const htmlFields = correctOptions.map(
            (option, index) => `
                <div class="question">
                    <div class="box-sm">${index + 1}</div>
                    <div class="box">
                        <div class="bubbles-container">
                            ${type === 2 ? '<div class="bubble"></div>'.repeat(4) : ''}
                        </div>
                    </div>
                </div>
            `
        );

        const htmlContent = `
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Answer Sheet</title>
            <style>
        @font-face {
                font-family: 'Codystar';
                src: url('file:///../../../android/app/src/main/assets/fonts/Codystar-Light.ttf') format('truetype');
            }
            body {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                background-color: #f9f9f9;
            }
            .container {
                width: 100%;
                max-width: 800px;
                background: white;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
                margin-bottom: 20px;
            }
            p {
                margin-bottom: 30px;
            }
            .questions {
                display: flex;
                flex-wrap: wrap;
                justify-content: flex-start;
            }
            .sub-container {
                padding: 5%;
            }
            .question {
                width: 25%;
                height: 60px;
                display: flex;
                padding-top: 5%;
                padding-right: 5%;
            }
            .box {
                position: relative;
                display: inline-block;
                border: 1px solid #333;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 35px;
                font-family: 'Codystar';
                letter-spacing: 2px;
            }
            .box-sm {
                border: 1px solid #333;
                height: 100%;
                display: flex;
                align-items: center;
                padding-left: 2%;
                padding-right: 2%;
            }
            .bubbles-container {
                display: flex;
                justify-content: space-between;
                padding:5%;
                width: 100%; /* Adjust as needed */
            }
            .bubble {
                width: 20px;
                height: 20px;
                border: 1px solid black;
                border-radius: 50%;
                margin: 0 1px; /* Adjust spacing between bubbles */
            }
        </style>
        </head>
        <body>
            <div class="container">
                <div class="sub-container">
                    <h1>Answer Sheet</h1>
                    ${type === 1 ? '<p>Write the correct option (A, B, C, or D)</p>' : '<p> Fill the correct bubble in each part</p>'}
               
                    <div class="questions">
                        ${htmlFields.join('')}
                    </div>
                </div>
            </div>
        </body>
        </html>
        `;
        try {
            const options = {
                html: htmlContent,
                fileName: 'example',
                directory: 'Documents',
            };

            const file = await RNHTMLtoPDF.convert(options);
            await requestStoragePermission();
            console.log(file.filePath);
            sendpdfToserver(file.filePath, correctOptions); // Send PDF file path to server
            const filePath = file.filePath || 'Path not available';
            const startIndex = filePath.indexOf('Documents');
            const truncatedPath = startIndex !== -1 ? filePath.substring(startIndex) : filePath;
            console.log('correct options are:', correctOptions)
            Alert.alert('Success', `PDF created successfully.\nPath: ${truncatedPath}`);

        } catch (error) {
            console.error('Error generating PDF: ', error);
        }

    };
    const sendpdfToserver = async (pdfFilePath, answers) => {
        const formData = new FormData();
        const pdfData = await RNFetchBlob.fs.readFile(pdfFilePath, 'base64'); // Read PDF file as base64
        const now = new Date();
        const timestamp = now.toISOString().replace(/[-:T]/g, "").split(".")[0]; // YYYYMMDDHHMMSS
        const fileName = `${timestamp}.pdf`;
        formData.append('answers', answers)
        formData.append('file', pdfData);
        formData.append('fileName', fileName);

        try {
            const response = await axios.post(`${constants.base_url}upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            // Handle response data accordingly
        } catch (error) {
            console.error('Error uploading PDF:', error);
            // Handle error
        }
    };

    useEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: isDarkMode ? 'black' : '#6297f4',
            },
        });
        // callback(isDarkMode);
    }, [isDarkMode]);

    return (
        <BackgroundWrapper themestate={isDarkMode}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text>Enter number of answer fields: </Text>
                <View style={{ alignItems: 'center', marginVertical: '5%' }}>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        placeholder="Enter number of answer fields"
                        value={numFields.toString()}
                        onChangeText={handleInputChange}
                    />
                </View>
                <Text style={{ textAlign: 'left', width: '100%' }}>Enter correct answer (A,B,C,D) for each</Text>
                <View style={styles.answersContaier}>
                    {Array.from({ length: numFields }, (_, i) => (
                        <>
                            <Text style={{ textAlignVertical: 'center' }}>Q{i + 1}.</Text>
                            <TextInput
                                key={i}
                                style={styles.optionInput}
                                placeholder={`Enter correct option for field ${i + 1}`}
                                value={correctOptions[i]}
                                onChangeText={(value) => handleOptionChange(i, value)}
                            />
                        </>
                    ))}
                </View>
                <TouchableOpacity style={[styles.button, { backgroundColor: isDarkMode ? 'black' : '#6297f4' }]} onPress={() => { generatePDF(1) }}>
                    <Text style={styles.buttonText}>Create OCR</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: isDarkMode ? 'black' : '#6297f4' }]} onPress={() => { generatePDF(2) }}>
                    <Text style={styles.buttonText}>Create OMR</Text>
                </TouchableOpacity>
            </ScrollView>
        </BackgroundWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: '5%',
        paddingTop: '20%'
    },
    answersContaier: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    input: {
        height: 40,
        borderColor: 'gray',
        color: 'black',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        width: '80%',
    },
    optionInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        color: 'black',
        width: '20%',
    },
    button: {
        backgroundColor: '#6297f4',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 8,
        marginTop: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default CreatePdf;
