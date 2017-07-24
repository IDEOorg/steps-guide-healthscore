import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Score = (props) => {
  const score = props.answers.reduce((sum, answer) => sum + answer.score, 0).toString().padStart(3, '0');

  return (
    <span className="score">
      <span className="score__digit score__digit--1">{score[0]}</span>
      <span className="score__digit score__digit--2">{score[1]}</span>
      <span className="score__digit score__digit--3">{score[2]}</span>
    </span>
  );
};

function mapStateToProps(state) {
  return {
    answers: state.selectedAnswers
  };
}

export default connect(mapStateToProps)(Score);

Score.propTypes = {
  answers: PropTypes.array.isRequired
};

Score.displayName = 'Score';
