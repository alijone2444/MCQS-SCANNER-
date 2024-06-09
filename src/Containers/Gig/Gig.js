import React from 'react';
import { Image, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import constants from '../../Constants/constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import BackgroundWrapper from '../../Components/Wrapper/BackgroundWrapper';
import { useState } from 'react';
const Gig = ({ navigation }) => {

    const [themestate, setThemestate] = useState(false);
    const route = useRoute();
    const data = route.params.data;
    console.log('data now', data)
    const answers = data.image.answers[0]?.answer.split(',');
    console.log(answers);
    const ScanendAnswers = route.params?.ScannedAnswers
    console.log('answers are comming:', ScanendAnswers)
    return (
        <BackgroundWrapper>
            <View style={{ height: '100%' }}>

                <TouchableOpacity
                    style={styles.scanButton}
                    onPress={() => { navigation.navigate('Scanner', { isDarkMode: themestate, data: data }); }}
                >
                    <FontAwesome name="camera" size={34} color="white" />
                </TouchableOpacity>

                <ScrollView>

                    <Text style={styles.template}>Template</Text>
                    <View style={{ flex: 1, padding: '5%', position: 'relative' }}>
                        <Image style={styles.image} source={{ uri: `${constants.base_url}images/${data.image.image}` }} />
                    </View>

                    <View style={{ flexDirection: 'row', width: '100%', marginBottom: '10%' }}>
                        <View style={{ width: '50%', borderColor: 'grey', borderRightWidth: 1 }}>
                            <Text style={{ fontSize: 15, marginBottom: '2%', textAlign: 'center' }}>Correct Answers</Text>
                            <View style={{ alignItems: 'center' }}>
                                {answers ? (
                                    answers.map((item, index) => (
                                        <Text key={`correct_answer_${index}`} style={styles.answerText}>
                                            Q{index + 1}. <Text style={{ color: 'green', fontWeight: 'bold' }}>{item}</Text>
                                        </Text>
                                    ))
                                ) : (
                                    <Text style={styles.noAnswerText}>No answer found</Text>
                                )}
                            </View>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ textAlign: 'center' }}>Scanned Results</Text>
                            {answers ? (
                                ScanendAnswers?.result.map((item, index) => (
                                    <Text key={`correct_answer_${index}`} style={styles.answerText}>
                                        Q{index + 1}. <Text style={{}}>{item}</Text>
                                    </Text>
                                ))
                            ) : (
                                <Text style={styles.noAnswerText}>No answer found</Text>
                            )}
                        </View>
                    </View>
                </ScrollView>

            </View>
        </BackgroundWrapper>
    );
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 400,
        borderWidth: 1,
        borderColor: 'grey',
    },

    scanButton: {
        zIndex: 2,
        position: 'absolute',
        borderWidth: 2,
        borderColor: 'white',
        bottom: 16,
        right: 16,
        padding: 10,
        borderRadius: 50,
    },
    template: {
        textAlign: 'center',
        fontSize: 18,
        marginTop: '5%',
    },


    answerText: {
        fontSize: 15,
        marginBottom: '2%',
        marginLeft: '5%',
    },
    noAnswerText: {
        fontSize: 15,
        marginBottom: '2%',
        marginLeft: '5%',
        textDecorationLine: 'underline',
        color: 'red',
    },
});

export default Gig;
