import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route } from 'react-router';
import App from '../containers/App';

const Routes = (props) => {
  return (
    <Router history={props.history}>
      <Route component={App}>
      </Route>
    </Router>
  );
};

export default Routes;

Routes.propTypes = {
  history: PropTypes.string.isRequired
};
