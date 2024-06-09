import React, { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

const ScanHistory = () => {
    // Mock data for scanned images (replace with your actual data)
    const scanHistoryData = [
        { id: '1', imagePath: require('../../Assets/Images/test1.png') },
        { id: '2', imagePath: require('../../Assets/Images/test2.png') },
        // Add more items as needed
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Scan History</Text>
            <FlatList
                data={scanHistoryData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.imageContainer}>
                        <Image source={item.imagePath} style={styles.image} />
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    imageContainer: {
        marginBottom: 16,
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'cover',
        borderRadius: 8,
    },
});

export default ScanHistory;
