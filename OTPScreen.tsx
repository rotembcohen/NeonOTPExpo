import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet, ActivityIndicator, Text } from 'react-native';

const OTPScreen = () => {
  const numInputs = 6;
  const [otp, setOtp] = useState(Array(numInputs).fill(''));
  const [loading, setLoading] = useState(false);
  const [approved, setApproved] = useState(false);
  const inputsRef = useRef<(TextInput | null)[]>([]);

  const handleChange = (text: string, idx: number) => {
    if (/^\d?$/.test(text)) {
      const newOtp = [...otp];
      newOtp[idx] = text;
      setOtp(newOtp);

      if (text && idx < numInputs - 1) {
        inputsRef.current[idx + 1]?.focus();
      }

      // If all fields are filled, trigger submission
      if (text && idx === numInputs - 1 && newOtp.every(d => d.length === 1)) {
        handleSubmit(newOtp.join(''));
      }
    }
  };

  const handleSubmit = (value: string) => {
    setLoading(true);
    setApproved(false);
    setTimeout(() => {
      setLoading(false);
      if (value === '123456') {
        setApproved(true);
      } else {
        setOtp(Array(numInputs).fill(''));
        // Optionally, focus the first input again
        inputsRef.current[0]?.focus();
      }
    }, 1000);
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
          editable={!loading}
          returnKeyType={idx === numInputs - 1 ? 'done' : 'next'}
        />
      ))}
      {loading && <ActivityIndicator testID="otp-loading" style={{ marginLeft: 10 }} />}
      {approved && <Text style={styles.approvedText}>approved</Text>}
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
  approvedText: {
    width: '100%',
    textAlign: 'center',
    color: 'green',
    fontWeight: 'bold',
    marginTop: 12,
    fontSize: 18,
  },
});

export default OTPScreen;
