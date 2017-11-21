import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route } from 'react-router';
import App from '../containers/App';
import QuestionsPage from '../containers/QuestionsPage';
import ResultsPage from '../containers/ResultsPage';
import "babel-polyfill";
import { withTracker } from '../keen';

const Routes = (props) => {
  return (
    <Router history={props.history}>
      <Route component={withTracker(App)}>
        <Route path="/" component={QuestionsPage} />
        <Route path="/results" component={ResultsPage} />
      </Route>
    </Router>
  );
};

export default Routes;

Routes.propTypes = {
  history: PropTypes.string.isRequired
};
