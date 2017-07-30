import React from 'react';
import PropTypes from 'prop-types';
import './index.less';

const Result = (props) => {
  if (!props.choice || !props.choice.result) return <div></div>;

  let categorization = '';

  switch (props.choice.rank) {
    case 'good':
      categorization = 'Great job';
      break;

    case 'ok':
      categorization = 'Needs Improvement';
      break;

    case 'bad':
      categorization = 'High Priority';
      break;
  }

  const references = (props.choice.result.references || []).map(ref => {
    return (
      <div key={ref.title}>
        <div>
          <a target="_blank" href={ref.link}><b>{ref.title}</b></a>
        </div>
        <div>{ref.description}</div>
      </div>
    );
  });

  return (
    <div className={`result result--${props.choice.rank}`}>
      <div className="result-meta">
        <p>{categorization}</p>
        <h2>{props.choice.result.title}</h2>
        <p>Score: {props.choice.score}</p>
        <hr size="1" />
        <p>{props.choice.result.subtitle}</p>
        <hr size="1" />
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
