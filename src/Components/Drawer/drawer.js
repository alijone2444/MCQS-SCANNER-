import React, { useState } from 'react';
import { Drawer, Divider } from 'react-native-paper';
import constants from '../../Constants/constants';
import { StyleSheet } from 'react-native';

const DrawerComponent = (props) => {
    const [active, setActive] = useState('');

    return (
        <Drawer.Section title="Options" style={styles.drawerContainer}>
            <Drawer.Item
                label="See all evaluations"
                icon="star"
                active={active === 'first'}
                onPress={() => setActive('first')}
            />
            <Divider />
            <Drawer.Item
                label="History"
                icon="star"
                rippleColor={props.themestate ? constants.themeTwo : constants.themeOne}
                active={active === 'second'}
                onPress={() => props.navigate('history')}
            />
            <Drawer.Item
                label="Saved"
                icon="star"
                rippleColor={props.themestate ? constants.themeTwo : constants.themeOne}
                active={active === 'second'}
                onPress={() => setActive('second')}
            />
        </Drawer.Section>
    );
};
const styles = StyleSheet.create({
    drawerContainer: {
        position: 'absolute',
        top: 60,
        left: 0,
        width: '80%', // Adjust the width as needed
        height: '100%',
        zIndex: 2,
        backgroundColor: 'white'
    }
})
export default DrawerComponent;
