import { createAsyncThunk } from '@reduxjs/toolkit';
import { getQuestions, sendAnswers } from '../../services/survey.service';
import { EXPO_CONSTANTS } from '../../utils/config';
import QuestionsMock from '../../utils/questions.mock';
import { RootState } from '..';
import { AxiosError } from 'axios';

export const GetSurveyQuestions = createAsyncThunk(
  'survey/getSurveyQuestions',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      if (EXPO_CONSTANTS.USE_MOCK) {
        console.log('Using mock data');
        return QuestionsMock;
      }
      const response = await getQuestions();
      return fulfillWithValue(response.data);
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const SendSurveyAnswers = createAsyncThunk(
  'survey/sendSurveyAnswers',
  async (_, { getState, rejectWithValue, fulfillWithValue }) => {
    try {
      const {
        survey: { answers },
      } = getState() as RootState;
      const response = await sendAnswers(answers);
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue((error as AxiosError).message);
    }
  }
);
