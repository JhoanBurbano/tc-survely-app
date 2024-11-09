export interface QuestionAnswer {
  question_id: string;
  answer_id: string;
}

export interface SurveyState {
  responses: QuestionAnswer[];
}

export interface Question {
  id: string;
  text: string;
  options: { id: string; text: string }[];
}
