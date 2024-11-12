import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import WelcomeScreenComponent from '../WelcomeScreen';
import { useDispatchApp } from '../../hooks/useDispatch';
import { useNavigationApp } from '../../hooks/useNavigation';
import { GetSurveyQuestions } from '../../store/thunks/survey.thunk';
import { selectSurvey } from '../../store/selectors/survey.selector';
import { FadeIn } from 'react-native-reanimated';
import { useFloatingAnimation } from '../../hooks/useFloatingAnimation';
import { NavigationContainer } from '@react-navigation/native';

jest.mock('../../hooks/useDispatch');
jest.mock('../../hooks/useNavigation');
jest.mock('../../store/thunks/survey.thunk');
jest.mock('../../store/selectors/survey.selector');

const mockNavigate = jest.fn();
const mockDispatch = jest.fn();
const mockOnCancel = jest.fn();

const WelcomeScreen = () => (
  <NavigationContainer>
    <WelcomeScreenComponent />
  </NavigationContainer>
);

(useDispatchApp as jest.Mock).mockReturnValue(mockDispatch);
(useNavigationApp as jest.Mock).mockReturnValue({ navigate: mockNavigate });
(selectSurvey as jest.Mock).mockReturnValue({ questions: [], answers: [] });

describe('WelcomeScreen', () => {
  it('renders correctly with all main elements', () => {
    const { getByTestId, getByText } = render(<WelcomeScreen />);

    expect(getByTestId('main-container')).toBeTruthy();
    expect(getByTestId('background-squares')).toBeTruthy();
    expect(getByTestId('header-section')).toBeTruthy();
    expect(getByTestId('welcome-section')).toBeTruthy();
    expect(getByText('¡Welcome User!')).toBeTruthy();
    expect(
      getByText(
        'Thank you for using Survely. Please take a moment to answer a few questions.'
      )
    ).toBeTruthy();
    expect(getByTestId('start-button')).toBeTruthy();
    expect(getByTestId('footer-logo')).toBeTruthy();
  });

  it('applies animations to main elements', () => {
    const { getByTestId } = render(<WelcomeScreen />);

    expect(getByTestId('separator-line').props.entering.durationV).toBe(500);
    expect(getByTestId('footer-logo').props.entering).toBeInstanceOf(FadeIn);
  });

  it('navigates to Survey on start button press', async () => {
    const { getByTestId } = render(<WelcomeScreen />);

    fireEvent.press(getByTestId('start-button'));
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('Survey');
    });
  });

  it('navigates to Survey if survey has answers', () => {
    (selectSurvey as jest.Mock).mockReturnValue({
      answers: [['answer1']],
      questions: [],
    });

    render(<WelcomeScreen />);
    expect(mockNavigate).toHaveBeenCalledWith('Survey');
  });

  it('dispatches GetSurveyQuestions if there are no survey questions', async () => {
    (selectSurvey as jest.Mock).mockReturnValue({ answers: [], questions: [] });

    const { getByTestId } = render(<WelcomeScreen />);
    fireEvent.press(getByTestId('start-button'));

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(GetSurveyQuestions());
    });
  });

  it('shows loading on start button press', async () => {
    const { getByTestId } = render(<WelcomeScreen />);
    const button = getByTestId('start-button');

    fireEvent.press(button);

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('Survey'));
  });
});
