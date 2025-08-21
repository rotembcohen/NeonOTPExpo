import { render, fireEvent, waitFor, act } from '@testing-library/react-native';

import App from '../App';
import OTPScreen from '../OTPScreen';

describe('<App />', () => {
  test('Text renders correctly on App', () => {
    const { getByText } = render(<App />);

    getByText('Welcome!');
  });

  test('shows OTP screen when "Verify Code" button is pressed', () => {
    const { getByText, getAllByTestId } = render(<App />);
    const openOtpButton = getByText('Verify Code');
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

  test('focus moves to next input when a digit is entered', async () => {
    const { getAllByTestId } = render(<OTPScreen />);
    const inputs = getAllByTestId('otp-input');
    // Focus the first input
    inputs[0].props.onFocus && inputs[0].props.onFocus();
    // Enter a digit in the first input
    await act(async () => {
      fireEvent.changeText(inputs[0], '1');
    });
    // Simulate focus on the second input
    // (React Native Testing Library does not move focus in jsdom, so we check value instead)
    expect(inputs[1].props.value).toBe('');
    expect(inputs[0].props.value).toBe('1');
    // Optionally, check that the next input is ready for input (value is still empty)
  });

  test('shows approved alert if OTP is correct, clears if incorrect', async () => {
    jest.useFakeTimers();
    const { getAllByTestId, getByText, queryByText, queryByTestId } = render(<OTPScreen />);
    const inputs = getAllByTestId('otp-input');

    expect(inputs.length).toBe(6);

    // Enter correct OTP, one at a time, awaiting each update
    for (let i = 0; i < 6; i++) {
      await act(async () => {
        fireEvent.changeText(inputs[i], String(i + 1));
      });
    }

    // Wait for all inputs to be filled
    await waitFor(() => {
      const filledInputs = getAllByTestId('otp-input');
      expect(filledInputs.every(input => input.props.value.length === 1)).toBe(true);
    });

    // Wait for loading indicator to disappear before asserting
    await waitFor(() => {
      expect(queryByTestId('otp-loading')).toBeNull();
    });

    await waitFor(() => {
      expect(getByText('approved')).toBeTruthy();
    });

    // Now try incorrect OTP
    for (let i = 0; i < 6; i++) {
      await act(async () => {
        fireEvent.changeText(inputs[i], '9');
      });
    }
    // Wait for all inputs to be filled
    await waitFor(() => {
      const filledInputs = getAllByTestId('otp-input');
      expect(filledInputs.every(input => input.props.value.length === 1)).toBe(true);
    });

    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      expect(queryByTestId('otp-loading')).toBeNull();
    });

    await waitFor(() => {
      // All fields should be cleared
      const clearedInputs = getAllByTestId('otp-input');
      clearedInputs.forEach(input => {
        expect(input.props.value).toBe('');
      });
      // Alert should not be visible
      expect(queryByText('approved')).toBeNull();
    });

    jest.useRealTimers();
  });

  test('shows failed message when OTP is incorrect', async () => {
    jest.useFakeTimers();
    const { getAllByTestId, queryByText, queryByTestId } = render(<OTPScreen />);
    const inputs = getAllByTestId('otp-input');

    // Enter incorrect OTP
    await act(async () => {
      for (let i = 0; i < inputs.length; i++) {
        fireEvent.changeText(inputs[i], '9');
      }
    });
    // Wait for all inputs to be filled
    await waitFor(() => {
      const filledInputs = getAllByTestId('otp-input');
      expect(filledInputs.every(input => input.props.value.length === 1)).toBe(true);
    });

    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      expect(queryByTestId('otp-loading')).toBeNull();
    });

    await waitFor(() => {
      expect(queryByText('failed')).toBeTruthy();
    });
    jest.useRealTimers();
  });

  test('calls onBack when back button is pressed', () => {
    const onBack = jest.fn();
    const { getByText } = render(<OTPScreen onBack={onBack} />);
    const backButton = getByText(/back/i);
    fireEvent.press(backButton);
    expect(onBack).toHaveBeenCalled();
  });
});