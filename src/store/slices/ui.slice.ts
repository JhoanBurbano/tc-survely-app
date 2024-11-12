import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GetSurveyQuestions, SendSurveyAnswers } from '../thunks/survey.thunk';

const initialState: {
  error: string | null;
  loading: boolean;
} = {
  error: null,
  loading: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    cleanError: state => {
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(GetSurveyQuestions.pending, state => {
        state.loading = true;
      })
      .addCase(GetSurveyQuestions.fulfilled, state => {
        state.loading = false;
      })
      .addCase(GetSurveyQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || 'An error occurred when fetching questions';
      })
      .addCase(SendSurveyAnswers.pending, state => {
        state.loading = true;
      })
      .addCase(SendSurveyAnswers.fulfilled, state => {
        state.loading = false;
      })
      .addCase(SendSurveyAnswers.rejected, (state, { payload }) => {
        state.loading = false;
        const castPayload = payload as string;
        state.error = castPayload || 'An error occurred when sending answers';
      });
  },
});

export const { cleanError, setError } = uiSlice.actions;
export default uiSlice.reducer;
