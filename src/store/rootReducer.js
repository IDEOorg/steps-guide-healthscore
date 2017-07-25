import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import choices from './choices/choices';
import questions from './questions/questions';
import selectedAnswers from './selectedAnswers/selectedAnswers';

const rootReducer = combineReducers({
  choices,
  questions,
  selectedAnswers,
  routing: routerReducer
});

export default rootReducer;
