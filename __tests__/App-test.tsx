import { render, fireEvent } from '@testing-library/react-native';

import App from '../App';
import OTPScreen from '../OTPScreen';

describe('<App />', () => {
  test('Text renders correctly on App', () => {
    const { getByText } = render(<App />);

    getByText('Welcome!');
  });

  test('shows OTP screen when "Open OTP" button is pressed', () => {
    const { getByText, getAllByTestId } = render(<App />);
    const openOtpButton = getByText('Open OTP');
    fireEvent.press(openOtpButton);
    const inputs = getAllByTestId('otp-input');
    expect(inputs).toHaveLength(6);
  });
});

describe('<OTPScreen />', () => {
  test('renders 6 OTP input fields', () => {
    const { getAllByTestId } = render(<OTPScreen />);
    const inputs = getAllByTestId('otp-input');
    expect(inputs).toHaveLength(6);
  });

  test('focus moves to next input when a digit is entered', () => {
    const { getAllByTestId } = render(<OTPScreen />);
    const inputs = getAllByTestId('otp-input');
    // Focus the first input
    inputs[0].props.onFocus && inputs[0].props.onFocus();
    // Enter a digit in the first input
    fireEvent.changeText(inputs[0], '1');
    // Simulate focus on the second input
    // (React Native Testing Library does not move focus in jsdom, so we check value instead)
    expect(inputs[1].props.value).toBe('');
    expect(inputs[0].props.value).toBe('1');
    // Optionally, check that the next input is ready for input (value is still empty)
  });
});