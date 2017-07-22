import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import questions from './questions/questions';
import selectedAnswers from './selectedAnswers/selectedAnswers';

const rootReducer = combineReducers({
  questions,
  selectedAnswers,
  routing: routerReducer
});

export default rootReducer;
