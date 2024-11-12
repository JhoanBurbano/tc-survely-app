import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QuestionAnswer, SurveyState } from '../../types/survey.type';
import { GetSurveyQuestions, SendSurveyAnswers } from '../thunks/survey.thunk';

const initialState: SurveyState = {
  answers: [],
  questions: null,
};

const surveySlice = createSlice({
  name: 'survey',
  initialState,
  reducers: {
    addResponse: (
      state,
      action: PayloadAction<Omit<QuestionAnswer, 'answer'>>
    ) => {
      const [question_id] = action.payload.answer_id.split('.');
      const index = Number(question_id) - 1;
      state.answers[index] = action.payload.answer_id;
    },
    resetResponses: state => {
      state.answers = Array(state.questions?.data.length || 3).fill('');
    },
  },
  extraReducers(builder) {
    builder.addCase(GetSurveyQuestions.fulfilled, (state, action) => {
      state.questions = action.payload;
      if (state.answers?.length > 0) return;
      state.answers = Array(action.payload.data.length).fill('');
    });
  },
});

export const { addResponse, resetResponses } = surveySlice.actions;
export default surveySlice.reducer;
