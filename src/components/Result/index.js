import React from 'react';
import PropTypes from 'prop-types';
import './index.less';

import Button from '../Button';
import UrlImage from '../UrlImage';

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
    let link = '';
    if (ref.link) {
      link = <Button
        onClick={() => {window.open(ref.link)}}
        textStyleClass="suggestion-btn__text"
        className="suggestion-btn"
      >
        <UrlImage />
        Button
      </Button>
    }

    return (
      <div>
        <hr size="1" />
        <div key={ref.title} className="suggestion">
          <div className="suggestion__icon">
            <img src={require("../../assets/utilities-icon.svg")} />
          </div>
          <div className="suggestion__meta">
            <h3>{ref.title}</h3>
            <p>{ref.description}</p>
            {link}
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className={`result result--${props.choice.rank}`}>
      <div className="result__meta">
        <div className="result__subtext">{categorization}</div>
        <h2>{props.choice.result.title}</h2>
        <hr size="1" />
        <p>{props.choice.result.subtitle}</p>
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
