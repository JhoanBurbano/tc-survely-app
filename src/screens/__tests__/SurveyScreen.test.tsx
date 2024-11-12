import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SurveyScreenComponent from '../SurveyScreen';
import { useDispatchApp } from '../../hooks/useDispatch';
import { useNavigationApp } from '../../hooks/useNavigation';
import { addResponse, resetResponses } from '../../store/slices/survey.slice';
import { SendSurveyAnswers } from '../../store/thunks/survey.thunk';
import { selectSurvey } from '../../store/selectors/survey.selector';
import { NavigationContainer } from '@react-navigation/native';
import { FadeIn } from 'react-native-reanimated';

jest.mock('../../hooks/useDispatch');
jest.mock('../../hooks/useNavigation');
jest.mock('../../store/slices/survey.slice');
jest.mock('../../store/thunks/survey.thunk');
jest.mock('../../store/selectors/survey.selector');
const mockNavigate = jest.fn();
const mockDispatch = jest.fn();

(useDispatchApp as jest.Mock).mockReturnValue(mockDispatch);
(useNavigationApp as jest.Mock).mockReturnValue({ navigate: mockNavigate });

const SurveyScreen = () => (
  <NavigationContainer>
    <SurveyScreenComponent />
  </NavigationContainer>
);

const mockDispatchAsync = jest.fn().mockImplementation(action => {
  if (action === SendSurveyAnswers) {
    return Promise.resolve({
      meta: { requestStatus: 'fulfilled' },
    });
  }
  return Promise.resolve();
});

describe('SurveyScreen', () => {
  beforeEach(() => {
    (selectSurvey as jest.Mock).mockReturnValue({
      questions: {
        data: [
          {
            question_id: '1',
            question: 'Sample Question',
            answers: [{ answer_id: '1.a', answer: 'Sample Answer' }],
          },
        ],
      },
      answers: [''],
    });
  });

  it('renders correctly with main elements', () => {
    const { getByText, getByTestId } = render(<SurveyScreen />);

    expect(getByText('Start the')).toBeTruthy();
    expect(getByText('Answer the following questions')).toBeTruthy();
    expect(getByTestId('footer')).toBeTruthy();
  });

  it('not send answers if user not answer all survey', async () => {
    (SendSurveyAnswers as unknown as jest.Mock).mockResolvedValueOnce({
      meta: { requestStatus: 'fulfilled' },
    });

    const { getByTestId } = render(<SurveyScreen />);
    const sendButton = getByTestId('send-button');

    fireEvent.press(sendButton);
    await waitFor(() =>
      expect(mockDispatchAsync).not.toHaveBeenCalledWith(SendSurveyAnswers())
    );
    await waitFor(() =>
      expect(mockNavigate).not.toHaveBeenCalledWith('Completion')
    );
  });
  it('resets survey responses on Reset button press', () => {
    const { getByTestId } = render(<SurveyScreen />);
    const resetButton = getByTestId('reset-button');

    fireEvent.press(resetButton);
    expect(mockDispatch).toHaveBeenCalledWith(resetResponses());
  });
  it('adds response and advances to next question on option select', async () => {
    const { getByText } = render(<SurveyScreen />);
    const option = getByText('Sample Answer');

    fireEvent.press(option);
    await waitFor(() =>
      expect(mockDispatch).toHaveBeenCalledWith(
        addResponse({ answer_id: '1.1' })
      )
    );
  });
  it('displays final message when all questions are answered', () => {
    (selectSurvey as jest.Mock).mockReturnValue({
      questions: {
        data: [
          {
            question_id: '1',
            question: 'Sample Question',
            answers: [{ answer_id: '1', answer: 'Sample Answer' }],
          },
        ],
      },
      answers: ['1.1'],
    });

    const { getByText } = render(<SurveyScreen />);
    expect(getByText('No more')).toBeTruthy();
    expect(getByText('Questions')).toBeTruthy();
    expect(getByText('Review your answers and submit the survey')).toBeTruthy();
  });
  it('displays correct index indicator based on current question', () => {
    const { getByTestId } = render(<SurveyScreen />);
    const indicator = getByTestId(`indicator-0`);

    expect(indicator.props.enabled).toBe(true);
  });
  it('applies animations to main elements', () => {
    const { getByTestId } = render(<SurveyScreen />);
    expect(getByTestId('header-section').props.entering).toBeInstanceOf(FadeIn);
  });
});
