export interface QuestionAnswer {
  answer_id: string;
  answer: string;
}

export interface SurveyState {
  answers: string[];
  questions: QuestionResponse | null;
}

export interface Question {
  question_id: string;
  question: string;
  answers: Array<QuestionAnswer>;
}

export interface QuestionResponse {
  date: string;
  data: Question[];
}
