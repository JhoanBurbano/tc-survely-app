import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QuestionAnswer, SurveyState } from '../../types/survey.type';

const initialState: SurveyState = {
  responses: [],
};

const surveySlice = createSlice({
  name: 'survey',
  initialState,
  reducers: {
    addResponse: (state, action: PayloadAction<QuestionAnswer>) => {
      const existingIndex = state.responses.findIndex(
        response => response.question_id === action.payload.question_id
      );
      if (existingIndex !== -1) {
        state.responses[existingIndex] = action.payload;
      } else {
        state.responses.push(action.payload);
      }
    },
    resetResponses: state => {
      state.responses = [];
    },
  },
});

export const { addResponse, resetResponses } = surveySlice.actions;
export default surveySlice.reducer;
