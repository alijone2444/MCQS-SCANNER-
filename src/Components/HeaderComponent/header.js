import React from 'react';
import { Appbar, Text, Title } from 'react-native-paper';
import { StyleSheet, View, Image } from 'react-native';
import constants from '../../Constants/constants';
import FontAwsome from 'react-native-vector-icons/FontAwesome';
import nightmode from '../../Assets/Images/night-mode.png';
import lightmode from '../../Assets/Images/light-mode.png';
import IstIcon from '../../Assets/Images/Header_logo.png';
import DrawerComponent from '../Drawer/drawer';

const Header = (props) => {

  const [showDrawer, setshowDrawer] = React.useState(false);

  const handleThemeToggle = () => {
    props.changeTheme();
  };

  return (
    <>
      <Appbar.Header style={{ backgroundColor: props.themestate ? props.theme[0] : props.theme[1], zIndex: 3, justifyContent: 'space-between' }}>
        <Appbar.Content
          style={{ flexDirection: 'row', height: 'auto' }}
          title={
            <>
              <Text style={styles.title}>{constants.AppName.partone}</Text>
              <Image
                source={IstIcon}
                style={{ width: 28, height: 28, tintColor: 'white' }}
              />
              <Text style={styles.title}>{constants.AppName.partTwo}</Text>
            </>
          }
        />
        <View style={styles.iconContainer}>
          <Appbar.Action
            icon={({ color }) => (
              <Image
                source={props.themestate ? lightmode : nightmode}
                style={{ width: 24, height: 24, tintColor: color }}
              />
            )}
            onPress={handleThemeToggle}
            color="white"
          />
          <Appbar.Action icon={({ color }) => <FontAwsome name='bars' size={24} color={color} />} onPress={() => { setshowDrawer(!showDrawer) }} color="white" />
        </View>
      </Appbar.Header>

      {showDrawer && <DrawerComponent themestate={props.themestate} theme={props.theme} />}
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontFamily: 'Orbitron-Black',
    fontSize: 22,
  },
  iconContainer: {
    flexDirection: 'row',
  },
});

export default Header;
