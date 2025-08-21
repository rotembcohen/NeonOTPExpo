// theme.ts
// Design tokens for NeonOTPExpo (adapted from provided CSS)

const theme = {
  colors: {
    bg0: '#0a0b12', // page background
    bg1: '#0f111b', // section background
    surface1: '#131628', // card base
    surface2: '#161a31', // card depth
    text1: '#eef1ff', // primary text
    text2: '#b6bdd2', // secondary text
    muted: '#8e97b3', // helper text
    pri1: '#7a5cff', // violet
    pri2: '#00d6ff', // cyan
    grad1: ['#7a5cff', '#00d6ff'], // for linear gradients
    success: '#17e8a7',
    danger: '#ff5277',
    warning: '#ffd166',
  },
  radii: {
    sm: 10,
    md: 16,
    lg: 24,
  },
  shadow: {
    soft: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.35,
      shadowRadius: 24,
      elevation: 8,
    },
    glow: {
      shadowColor: '#00d6ff',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.20,
      shadowRadius: 28,
      elevation: 12,
    },
  },
  font: {
    ui: 'Inter',
    display: 'Space Grotesk',
  },
  spacing: {
    1: 8,
    2: 12,
    3: 16,
    4: 24,
    5: 32,
    6: 48,
  },
};

export default theme;
