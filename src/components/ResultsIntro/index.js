import React from 'react';
import PropTypes from 'prop-types';
import './index.less';
import Link from '../Link';

const ResultsIntro = (props) => {
  return (
    <div className="results_intro_section">
      <h1 className="results_intro_headline">{props.headlineText}</h1>
      <Link className="results_intro_back" onClick={props.goBack}>{props.goBackText}</Link>
    </div>
  );
};

export default ResultsIntro;

ResultsIntro.propTypes = {
  goBack: PropTypes.func.isRequired,
  goBackText: PropTypes.string.isRequired,
  headlineText: PropTypes.string.isRequired,
};

ResultsIntro.displayName = 'ResultsIntro';
