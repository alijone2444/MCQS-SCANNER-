import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/Containers/HomeScreen/homeScreen';
import { useState } from 'react';
import CreatePdf from './src/Components/Pdf-component/CreatePdf';
import Camera from './src/Components/CameraComponent/Camera';
import Gig from './src/Containers/Gig/Gig';
const App = () => {
  const [changeTheme, setchangetheme] = useState(false)
  const Stack = createNativeStackNavigator();
  const pdfScreenOptions1 = {
    headerShown: true,
    headerTransparent: true,
    headerStyle: {
      backgroundColor: '#6297f4',
    },
    headerTintColor: 'white',
    // headerTitleAlign: 'center',
  };

  const pdfScreenOptions2 = {
    ...pdfScreenOptions1,
    headerStyle: {
      backgroundColor: 'black'
    }
  }
  const handleCallback = (data) => {
    setchangetheme(data)
  };
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="create-pdf" component={CreatePdf} options={pdfScreenOptions1}
          initialParams={{ callback: handleCallback }}
        />
        <Stack.Screen name="Scanner" component={Camera} options={{ headerShown: false }}
          initialParams={{ callback: handleCallback }}
        />
        <Stack.Screen
          name="gig"
          component={Gig}
          options={({ route }) => ({
            headerShown: true,
            title: route.params?.data
              ? `GIG # ${route.params.data.id}`
              : 'GIG',
            headerStyle: {
              backgroundColor: '#6297f4',
            },
            headerTintColor: 'white',
          })}
        />


        {/* <Camera sendScanedResult={(data) => setResult(data)} goBack={() => setShowCamera(false)} />
       */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;