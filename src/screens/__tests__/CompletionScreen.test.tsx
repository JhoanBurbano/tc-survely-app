import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import CompletionScreenComponent from '../CompletionScreen';
import { useNavigationApp } from '../../hooks/useNavigation';
import { useDispatchApp } from '../../hooks/useDispatch';
import { resetResponses } from '../../store/slices/survey.slice';
import { BackHandler } from 'react-native';
import { SlideInRight } from 'react-native-reanimated';
import { NavigationContainer } from '@react-navigation/native';

jest.mock('../../hooks/useNavigation');
jest.mock('../../hooks/useDispatch');
jest.mock('../../store/slices/survey.slice');
const mockNavigate = jest.fn();
const mockDispatch = jest.fn();
const mockReset = jest.fn();

const CompletionScreen = () => (
  <NavigationContainer>
    <CompletionScreenComponent />
  </NavigationContainer>
);

(useNavigationApp as jest.Mock).mockReturnValue({
  navigate: mockNavigate,
  reset: mockReset,
});
(useDispatchApp as jest.Mock).mockReturnValue(mockDispatch);
jest.spyOn(BackHandler, 'exitApp').mockImplementation(() => {});

describe('CompletionScreen', () => {
  it('renders correctly with all main elements', () => {
    const { getByText, getByTestId } = render(<CompletionScreen />);

    expect(getByTestId('background-squares')).toBeTruthy();
    expect(getByTestId('logo')).toBeTruthy();
    expect(getByText('Survely')).toBeTruthy();
    expect(getByText('¿Do you want to send another?')).toBeTruthy();
    expect(getByText('YES')).toBeTruthy();
    expect(getByText('NO')).toBeTruthy();
    expect(getByTestId('footer-logo')).toBeTruthy();
  });
  it('blocks the back button', () => {
    render(<CompletionScreen />);
    const backEvent = (BackHandler.exitApp = jest.fn());
    fireEvent.press(backEvent);

    expect(backEvent).not.toHaveBeenCalled();
  });
  it('applies animations to main elements', async () => {
    const { getByTestId, getByText } = render(<CompletionScreen />);

    expect(getByTestId('refill-card')).toBeTruthy();
    fireEvent.press(getByText('NO'));
    await waitFor(() =>
      expect(getByTestId('finish-card').props.entering).toBeInstanceOf(
        SlideInRight
      )
    );
  });
  it('displays thank you message after pressing NO', async () => {
    const { getByText, getByTestId, queryByText } = render(
      <CompletionScreen />
    );

    fireEvent.press(getByText('NO'));
    await waitFor(() =>
      expect(queryByText('Thanks for completing the survey!')).toBeTruthy()
    );
    expect(getByTestId('finish-card')).toBeTruthy();
  });
  it('navigates to Welcome and resets responses on YES button press', () => {
    const { getByText } = render(<CompletionScreen />);

    fireEvent.press(getByText('YES'));
    expect(mockDispatch).toHaveBeenCalledWith(resetResponses());
    expect(mockReset).toHaveBeenCalledWith({
      index: 0,
      routes: [{ name: 'Welcome' }],
    });
  });
  it('resets survey responses on both YES and NO actions', () => {
    const { getByText } = render(<CompletionScreen />);

    fireEvent.press(getByText('YES'));
    expect(mockDispatch).toHaveBeenCalledWith(resetResponses());

    fireEvent.press(getByText('NO'));
    expect(mockDispatch).toHaveBeenCalledWith(resetResponses());
  });
  it('shows message after pressing NO button', () => {
    const { getByText } = render(<CompletionScreen />);

    fireEvent.press(getByText('NO'));
    expect(mockDispatch).toHaveBeenCalledWith(resetResponses());
    expect(getByText('We hope you have a great day!')).toBeTruthy();
  });
});
