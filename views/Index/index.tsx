import React, {useEffect, useState} from 'react';
import {PermissionsAndroid, Text} from 'react-native';
import WifiList from '../../components/WifiList';
async function checkPermissions() {
  return PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: 'Location permission is required for WiFi connections',
      message:
        'This app needs location permission as this is required  ' +
        'to scan for wifi networks.',
      buttonNegative: 'DENY',
      buttonPositive: 'ALLOW',
    },
  );
}

const PERMISSION_DENIED = 'denied';

const Index: React.FunctionComponent = () => {
  const [isChecked, setIsChecked] = useState(PERMISSION_DENIED);

  useEffect(() => {
    const permission = checkPermissions();

    permission.then((p) => setIsChecked(p));
  }, [setIsChecked]);

  if (isChecked === PERMISSION_DENIED) {
    return (
      <Text>
        This app needs location permission as this is required to scan for wifi
        networks.
      </Text>
    );
  }

  return (
    <>
      <WifiList />
    </>
  );
};

export default Index;
