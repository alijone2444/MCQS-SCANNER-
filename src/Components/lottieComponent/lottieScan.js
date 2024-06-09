
import React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import LottieView from 'lottie-react-native';
import bubbleSheet from '../../Assets/Images/bubblesheet.png'
const LottieScan = () => {
  return (
    <View style={styles.LottieContainer}>
      <ImageBackground source={bubbleSheet} style={styles.image}>
        <LottieView source={require('../../Assets/lottie/scanner.json')}
          style={styles.lottieStyle}
          autoPlay={true}
        />

      </ImageBackground>
      {/* <Image
        source={bubbleSheet}
        style={styles.image}
      /> */}
    </View>

  );
}

const styles = StyleSheet.create({
  LottieContainer: {
    margin: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottieStyle: {
    width: '80%',
    aspectRatio: 1,
    backgroundColor: 'transparent',
  },
  image: {
    zIndex: -1,
  }
});

export default LottieScan;
