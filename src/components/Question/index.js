import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './index.less';

const Question = (props) => {
  let choices = props.choices.map((choice) => {
    const selected = props.answers.find(answer => choice.id === answer.choiceId);
    return (
      <div
        key={choice.id}
        onClick={() => props.onAnswer(choice)}
        className={
          classNames({
            choice: true,
            'choice--selected': !!selected
          })
        }
      >
        <span>{choice.text}</span>
      </div>
    );
  });
  return (
    <div>
      {props.error &&
        <div className="question-error-msg">Answer this question to to get your score.</div>
      }
      <div className={`question ${props.error ? 'question--error' : ''}`}>
        <div className="question-meta">
          <div>
            <h2>{props.text}</h2>
            <div className="question-hint">
              {props.hint}
            </div>
          </div>
          <span className="question-position">{props.position} of {props.total}</span>
        </div>
        <div className="question-choices">
          {choices}
        </div>
      </div>
    </div>
  );
};

export default Question;

Question.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  hint: PropTypes.string,
  error: PropTypes.bool,
  position: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onAnswer: PropTypes.func,
  answers: PropTypes.array.isRequired,
  choices: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired
  }))
};

Question.displayName = 'Question';
