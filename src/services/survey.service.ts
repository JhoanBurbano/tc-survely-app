import axios from './axios.instance';
export const getQuestions = async () => {
  return await axios.get('/questions');
};

export const sendAnswers = async (answers: string[]) => {
  if (answers.length === 0 || answers.includes('')) {
    throw new Error('All questions must be answered');
  }

  const responseBody = {
    date: new Date().toISOString(),
    data: answers.map(answer_id => {
      const [question_id] = answer_id.split('.');
      return { question_id, answer_id };
    }),
  };

  return await axios.post('/answer', { ...responseBody });
};
