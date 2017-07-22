export const SELECT_ANSWER = 'SELECT_ANSWER';

export function selectAnswer({question, answer}) {
  return {
    type: SELECT_ANSWER,
    payload: {
      question,
      answer
    }
  };
}

const selectedAnswers = (state = [], action) => {
  switch (action.type) {
    case SELECT_ANSWER: {
      let filteredAnswers = state.filter((selectedAnswer) => {
        return selectedAnswer.questionId !== action.payload.question.id;
      });
      return [
        ...filteredAnswers,
        {
          questionId: action.payload.question.id,
          answerId: action.payload.answer.id,
          score: action.payload.answer.score
        }
      ];
    }
    default:
      return state;
  }

};

export default selectedAnswers;
