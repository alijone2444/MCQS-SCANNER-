import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import constants from '../../Constants/constants';

const HorizontalScrollButtons = ({ data, onPress }) => {
    console.log('data', data);

    // Create an array of objects with id and image properties
    const Data = data.images_with_answers.map((item, index) => ({ id: index, image: item }));
    console.log('real data', Data)
    const renderButton = ({ item }) => {
        console.log('this is item', `${constants.base_url}images/${item}`)
        return (
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => onPress(item)}
            >
                <Image
                    source={{ uri: `${constants.base_url}images/${item.image.image}` }}
                    style={styles.buttonImage}
                    onError={(error) => console.log('Image loading error:', error)}
                />
                <Text style={styles.buttonText}>{item.label}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, marginTop: 10 }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold', padding: '2%' }}>Recent</Text>
                {/* Arrow right icon */}
                <FontAwesome name="arrow-right" size={20} color="white" />
            </View>
            <FlatList
                style={{ marginLeft: 26 }}
                data={Data}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderButton}
                contentContainerStyle={styles.container}
            />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
    },
    buttonContainer: {
        marginHorizontal: 10,
        alignItems: 'center',
    },
    buttonImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginBottom: 5,
    },
    buttonText: {
        fontSize: 12,
    },
});

export default HorizontalScrollButtons;
