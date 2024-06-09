import BackgroundWrapper from '../../Components/Wrapper/BackgroundWrapper';
import React, { useEffect, useState } from 'react';
import { ScrollView, View, TouchableOpacity, StyleSheet, Text, ImageBackground, ActivityIndicator } from 'react-native';
import LottieScan from '../../Components/lottieComponent/lottieScan';
import Header from '../../Components/HeaderComponent/header';
import constants from '../../Constants/constants';
import pngimg from '../../Assets/Images/pngbackground.png'
import pngimgdark from '../../Assets/Images/pngdarkbackground.png'
import TypingText from '../../Components/typeWritter/typeWritter';
import HorizontalScrollButtons from '../../Components/HorizontalScroll/hrscroll';
import { Divider } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
const HomeScreen = ({ navigation }) => {
  const [themestate, setThemestate] = useState(false);

  const [last7Images, setLast7Images] = useState([]);
  useEffect(() => {
    const fetchLast7Images = async () => {
      try {
        const response = await axios.get(`${constants.base_url}last7images`);
        console.log("resposne data", response.data)
        setLast7Images(response.data); // Assuming the response has a key 'images'
      } catch (error) {
        console.error('Error fetching last 7 images:', error);
        // Handle error
      }
    };

    fetchLast7Images();
  }, []);


  const handleButtonPress = (item) => {
    // Handle button press logic here
    console.log(`Button pressed`, item);
    navigation.navigate('gig', { data: item })
  };

  return (

    <BackgroundWrapper themestate={themestate}>
      <ScrollView contentContainerStyle={styles.container}>
        <Header changeTheme={() => { setThemestate(!themestate); }} theme={[constants.themeOne, constants.themeTwo]} themestate={themestate} />
        <View style={styles.introTextContainer}>
          <Text style={styles.introText}>
            {constants.constantTextMainscreen}
          </Text>
        </View>

        <View style={styles.TypeWrittercontainer}>
          <LottieScan />
          <TypingText />
        </View>
        <Divider />
        {/* HorizontalScrollButtons component with data and onPress prop */}
        {last7Images.length === 0 ? <ActivityIndicator /> : <HorizontalScrollButtons data={last7Images} onPress={handleButtonPress} />}
        <TouchableOpacity
          style={styles.scanButton}
          onPress={() => { navigation.navigate('create-pdf', { isDarkMode: themestate }); }}
        >
          <FontAwesome name="plus-circle" size={64} color="white" />
        </TouchableOpacity>

      </ScrollView>
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  TypeWrittercontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '10%',
    marginRight: '10%',
    marginBottom: '10%'
  },
  introTextContainer: {
    padding: 16,
    marginTop: 5,
    alignItems: 'center',
    textAlign: "auto"
  },
  introText: {
    fontSize: 14,
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 10,
    textAlign: "center",
    color: constants.themeOne,
    fontFamily: 'Orbitron-Regular'
  },
  scanButton: {
    position: 'absolute',
    bottom: 26,
    right: 26,
    borderRadius: 50,

  },
});

export default HomeScreen; // Wrap HomeScreen component with BackgroundWrapper
