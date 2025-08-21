
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import React, { useState } from 'react';
import OTPScreen from './OTPScreen';
import theme from './theme';

export default function App() {
  const [showOTP, setShowOTP] = useState(false);
  return (
    <View style={styles.container}>
      {!showOTP ? (
        <View style={styles.card}>
          <Text style={styles.title}>Welcome!</Text>
          <Pressable
            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
            onPress={() => setShowOTP(true)}
            accessibilityRole="button"
          >
            <Text style={styles.buttonText}>Verify Code</Text>
          </Pressable>
        </View>
      ) : (
        <OTPScreen onBack={() => setShowOTP(false)} />
      )}
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg0,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing[4],
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
  },
  title: {
    color: theme.colors.text1,
    fontFamily: theme.font.display,
    fontSize: 32,
    fontWeight: '700',
    marginBottom: theme.spacing[4],
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  button: {
    backgroundColor: theme.colors.surface2,
    borderRadius: 999,
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginTop: theme.spacing[3],
    borderWidth: 1,
    borderColor: 'rgba(0,214,255,0.35)',
    shadowColor: theme.shadow.glow.shadowColor,
    shadowOffset: theme.shadow.glow.shadowOffset,
    shadowOpacity: theme.shadow.glow.shadowOpacity,
    shadowRadius: theme.shadow.glow.shadowRadius,
    elevation: theme.shadow.glow.elevation,
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    color: theme.colors.text1,
    fontWeight: '700',
    fontSize: 18,
    letterSpacing: 0.2,
    fontFamily: theme.font.ui,
  },
});
