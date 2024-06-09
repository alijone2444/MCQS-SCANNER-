import React, { useState, useEffect } from 'react';
import { Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import TypeWriter from 'react-native-typewriter';
import constants from '../../Constants/constants';

const TypingText = () => {
    const [textIndex, setTextIndex] = useState(0);

    useEffect(() => {
        // Set initial text
        setTextIndex(0);
    }, []);

    const handleTypingEnd = () => {
        setTimeout(() => {
            if (textIndex < constants.MainScreenTexts.length - 1) {
                setTextIndex((prevIndex) => prevIndex + 1);
            }
        }, 2000);

    };

    return (
        <TypeWriter typing={1} fixed={true} minDelay={100} onTypingEnd={handleTypingEnd}>
            <Text style={styles.textStyle}>{constants.MainScreenTexts[textIndex]}</Text>
        </TypeWriter>
    );
};
const styles = StyleSheet.create({
    textStyle: {
        fontSize: 16,    // Set the desired font size
        fontFamily: 'Orbitron-Regular',
        color: "black",
        textShadowColor: '#585858',
        textShadowOffset: { width: 5, height: 5 },
        textShadowRadius: 10,
    },
});

export default TypingText;
