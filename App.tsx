
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useState } from 'react';
import OTPScreen from './OTPScreen';

export default function App() {
  const [showOTP, setShowOTP] = useState(false);
  return (
    <View style={styles.container}>
      {!showOTP ? (
        <>
          <Text>Welcome!</Text>
          <Button title="Open OTP" onPress={() => setShowOTP(true)} />
        </>
      ) : (
        <OTPScreen />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
