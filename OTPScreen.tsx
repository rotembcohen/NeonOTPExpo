import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const OTPScreen = () => {
  return (
    <View style={styles.container}>
      {[...Array(6)].map((_, idx) => (
        <TextInput
          key={idx}
          testID="otp-input"
          style={styles.input}
          keyboardType="number-pad"
          maxLength={1}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: 40,
    height: 50,
    margin: 5,
    textAlign: 'center',
    fontSize: 24,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
});

export default OTPScreen;
