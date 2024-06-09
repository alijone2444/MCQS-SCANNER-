import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DottedText = ({ type }) => {
    return (
        <View style={styles.container}>
            <View style={styles.dots}></View>{type === 2 ?
                <Text style={styles.text}>A B C D</Text> :
                <Text style={styles.text}>A B C D</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        display: 'inline-block',
    },
    dots: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
        backgroundImage: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAMAAABFaP0WAAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAAAA5JREFUCNdjYGRgYGQEAAAOAATa5WfvAAAAAElFTkSuQmCC")',
        backgroundSize: '2px 2px',
    },
    text: {
        zIndex: 2, // Ensure text is above dots
        fontFamily: 'Codystar-Regular', // Your font family
        fontSize: 35, // Adjust font size as needed
        letterSpacing: 2, // Adjust letter spacing as needed
    },
});

export default DottedText;
