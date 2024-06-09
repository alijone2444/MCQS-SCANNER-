
import { PermissionsAndroid } from 'react-native';
const requestStoragePermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: 'Storage Permission Required',
                message:
                    'This app needs permission to write to external storage to generate PDFs.',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Storage permission granted');
        } else {
            console.log('Storage permission denied');
        }
    } catch (err) {
        console.warn(err);
    }
};

export default requestStoragePermission