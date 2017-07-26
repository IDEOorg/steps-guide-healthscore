import React from 'react';
import PropTypes from 'prop-types';
import './index.less';

const Result = (props) => {
  if (!props.choice || !props.choice.result) return <div></div>;

  let categorization = '';
  let resultClassName = '';

  switch (props.choice.rank) {
    case 'good':
      categorization = 'Great job';
      resultClassName = 'result--good';
      break;

    case 'ok':
      categorization = 'Needs Improvement';
      resultClassName = 'result--ok';
      break;

    case 'bad':
      categorization = 'High Priority';
      resultClassName = 'result--bad';
      break;
  }

  const references = (props.choice.result.references || []).map(ref => {
    return (
      <div>
        <div>{ref.title}</div>
        <div>{ref.description}</div>
        <div>{ref.link}</div>
      </div>
    );
  });

  return (
    <div className={`result ${resultClassName}`}>
      <div className="result-meta">
        <p>{categorization}</p>
        <h2>{props.choice.result.title}</h2>
        <hr size="1" />
        <p>{props.choice.result.subtitle}</p>
        <hr size="1" />
        <p>{props.question.position}</p>
        <p>Result: {props.choice.rank}</p>
        <p>Score: {props.choice.score}</p>
      </div>
      <div className="result-suggestions">
        {references}
      </div>
    </div>
  );
};

export default Result;

Result.propTypes = {
  choice: PropTypes.object.isRequired,
  question: PropTypes.object.isRequired
};

Result.displayName = 'Result';
