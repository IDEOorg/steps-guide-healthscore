import React from 'react';
import PropTypes from 'prop-types';
import './index.less';

const Question = (props) => {
  let choices = props.choices.map((choice) => {
    return (
      <div key={choice.id}>
        {choice.text}
      </div>
    );
  });
  return (
    <div className="question">
      <h2>{props.text}</h2>
      <p>{props.position} of {props.total}</p>
      {choices}
    </div>
  );
};

export default Question;

Question.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  position: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  choices: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired
  }))
};

Question.displayName = 'Question';
