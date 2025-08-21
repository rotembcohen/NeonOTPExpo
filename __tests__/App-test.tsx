import { render } from '@testing-library/react-native';

import App from '../App';

describe('<App />', () => {
  test('Text renders correctly on App', () => {
    const { getByText } = render(<App />);

    getByText('Welcome!');
  });
});