import { render } from '@testing-library/react-native';

import App from '../App';
import OTPScreen from '../OTPScreen';

describe('<App />', () => {
  test('Text renders correctly on App', () => {
    const { getByText } = render(<App />);

    getByText('Welcome!');
  });
});

describe('<OTPScreen />', () => {
  test('renders 6 OTP input fields', () => {
    const { getAllByTestId } = render(<OTPScreen />);
    const inputs = getAllByTestId('otp-input');
    expect(inputs).toHaveLength(6);
  });
});