import React, { useState } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

const BackgroundWrapper = ({ children, themestate }) => {


    const backgroundImage = themestate ? require('../../Assets/Images/pngdarkbackground.png') : require('../../Assets/Images/pngbackground.png');

    return (
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
            {React.cloneElement(children)}
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
    },
});

export default BackgroundWrapper;
