export const SELECT_ANSWER = 'SELECT_ANSWER';

export function selectAnswer({question, choice}) {
  return {
    type: SELECT_ANSWER,
    payload: {
      question,
      choice
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
          choiceId: action.payload.choice.id,
          score: action.payload.choice.score
        }
      ];
    }
    default:
      return state;
  }

};

export default selectedAnswers;
