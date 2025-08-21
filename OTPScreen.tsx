import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const OTPScreen = () => {
  const numInputs = 6;
  const [otp, setOtp] = useState(Array(numInputs).fill(''));
  const inputsRef = useRef<(TextInput | null)[]>([]);

  const handleChange = (text: string, idx: number) => {
    if (/^\d?$/.test(text)) {
      const newOtp = [...otp];
      newOtp[idx] = text;
      setOtp(newOtp);
      if (text && idx < numInputs - 1) {
        inputsRef.current[idx + 1]?.focus();
      }
    }
  };

  return (
    <View style={styles.container}>
      {Array.from({ length: numInputs }).map((_, idx) => (
        <TextInput
          key={idx}
          testID="otp-input"
          style={styles.input}
          keyboardType="number-pad"
          maxLength={1}
          value={otp[idx]}
          onChangeText={text => handleChange(text, idx)}
          ref={ref => {
            inputsRef.current[idx] = ref;
          }}
          returnKeyType={idx === numInputs - 1 ? 'done' : 'next'}
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
