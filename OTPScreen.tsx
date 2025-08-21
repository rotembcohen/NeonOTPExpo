import React, { useRef, useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, ActivityIndicator, Text, Pressable } from 'react-native';

type OTPScreenProps = {
  onBack?: () => void;
};

const OTPScreen: React.FC<OTPScreenProps> = ({ onBack }) => {
  const numInputs = 6;
  const [otp, setOtp] = useState(Array(numInputs).fill(''));
  const [loading, setLoading] = useState(false);
  const [approved, setApproved] = useState(false);
  const [failed, setFailed] = useState(false);
  const [selection, setSelection] = useState(Array(numInputs).fill({ start: 0, end: 1 }));
  const inputsRef = useRef<(TextInput | null)[]>([]);
  const handleFocus = (idx: number) => {
    setSelection(sel =>
      sel.map((s, i) =>
        i === idx ? { start: 0, end: otp[idx]?.length || 0 } : s
      )
    );
  };

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
    setFailed(false);
    setTimeout(() => {
      setLoading(false);
      if (value === '123456') {
        setApproved(true);
        setFailed(false);
      } else {
        setOtp(Array(numInputs).fill(''));
        setFailed(true);
        // focus will be handled in useEffect
      }
    }, 1000);
  };
  useEffect(() => {
    // Focus first input on mount
    setTimeout(() => {
      inputsRef.current[0]?.focus();
    }, 50);
  }, []);

  useEffect(() => {
    if (failed) {
      // Wait for the inputs to be cleared and rendered
      setTimeout(() => {
        inputsRef.current[0]?.focus();
      }, 50);
    }
  }, [failed]);

  return (
    <View style={styles.container}>
      {onBack && (
        <Pressable style={styles.backButtonRow} onPress={onBack} accessibilityLabel="Back">
          <Text style={styles.backButtonText}>{'‹'} Back</Text>
        </Pressable>
      )}
      <View style={styles.inputsRow}>
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
            onFocus={() => handleFocus(idx)}
            selection={selection[idx]}
          />
        ))}
      </View>
      {loading && <ActivityIndicator testID="otp-loading" style={styles.feedback} />}
      {approved && <Text style={styles.approvedText}>approved</Text>}
      {failed && <Text style={styles.failedText}>failed</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  backButtonRow: {
    position: 'absolute',
    top: 40,
    left: 0,
    zIndex: 10,
    paddingTop: 12,
  },
  backButtonText: {
    fontSize: 20,
    color: '#007AFF',
    fontWeight: '500',
    paddingVertical: 4,
    paddingHorizontal: 0,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
  feedback: {
    marginTop: 16,
  },
  approvedText: {
    width: '100%',
    textAlign: 'center',
    color: 'green',
    fontWeight: 'bold',
    marginTop: 12,
    fontSize: 18,
  },
  failedText: {
    width: '100%',
    textAlign: 'center',
    color: 'red',
    fontWeight: 'bold',
    marginTop: 12,
    fontSize: 18,
  },
});

export default OTPScreen;
