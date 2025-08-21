import React, { useRef, useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, ActivityIndicator, Text, Pressable } from 'react-native';
import theme from './theme';

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
      <View style={styles.card}>
        <Text style={styles.title}>Enter OTP</Text>
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
              placeholder="-"
              placeholderTextColor={theme.colors.text2}
            />
          ))}
        </View>
        {loading && <ActivityIndicator testID="otp-loading" style={styles.feedback} color={theme.colors.pri2} />}
        {approved && <Text style={styles.approvedText}>approved</Text>}
        {failed && <Text style={styles.failedText}>failed</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backButtonRow: {
    position: 'absolute',
    top: 40,
    left: 10,
    zIndex: 10,
    paddingTop: 12,
  },
  backButtonText: {
    fontSize: 20,
    color: theme.colors.pri1,
    fontWeight: '600',
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontFamily: theme.font.ui,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: theme.colors.surface1,
    borderRadius: theme.radii.lg,
    padding: theme.spacing[5],
    alignItems: 'center',
    shadowColor: theme.shadow.soft.shadowColor,
    shadowOffset: theme.shadow.soft.shadowOffset,
    shadowOpacity: theme.shadow.soft.shadowOpacity,
    shadowRadius: theme.shadow.soft.shadowRadius,
    elevation: theme.shadow.soft.elevation,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    minWidth: 320,
  },
  title: {
    color: theme.colors.text1,
    fontFamily: theme.font.display,
    fontSize: 24,
    fontWeight: '700',
    marginBottom: theme.spacing[4],
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing[4],
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.pri2,
    width: 44,
    height: 56,
    margin: 6,
    textAlign: 'center',
    fontSize: 28,
    borderRadius: theme.radii.md,
    backgroundColor: theme.colors.surface2,
    color: theme.colors.text1,
    fontFamily: theme.font.ui,
    shadowColor: theme.shadow.soft.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 2,
  },
  feedback: {
    marginTop: theme.spacing[3],
  },
  approvedText: {
    width: '100%',
    textAlign: 'center',
    color: theme.colors.success,
    fontWeight: 'bold',
    marginTop: theme.spacing[3],
    fontSize: 18,
    fontFamily: theme.font.ui,
  },
  failedText: {
    width: '100%',
    textAlign: 'center',
    color: theme.colors.danger,
    fontWeight: 'bold',
    marginTop: theme.spacing[3],
    fontSize: 18,
    fontFamily: theme.font.ui,
  },
});

export default OTPScreen;
