import choicesData from '../data/choices';
import questionsData from '../data/questions';

const initialState = {
  choices: choicesData,
  questions: questionsData,
  selectedAnswers: [],
  language: 'es'
};

export default initialState;
