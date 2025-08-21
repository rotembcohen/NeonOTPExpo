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
});