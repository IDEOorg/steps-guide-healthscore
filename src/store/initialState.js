import questionsData from '../data/questions';

const initialState = {
  questions: Object.keys(questionsData).map((id) => {
    const question = questionsData[id];
    return {
      id,
      text: question.text,
      choices: Object.keys(question.choices).map((id) => {
        const choice = question.choices[id];
        return {
          id,
          text: choice.text,
          score: choice.score
        };
      })
    };
  })
};

export default initialState;
