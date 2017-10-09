import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import FormattedMsg from '../../containers/FormattedMsg';
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
        <span>
          <FormattedMsg>
            {choice.text}
          </FormattedMsg>
        </span>
      </div>
    );
  });
  let positions = {
    "en": `${props.position} of ${props.total}`,
    "es": `${props.position} de ${props.total}`
  };
  return (
    <div>
      {props.error &&
        <div className="question-error-msg">Answer this question to to get your score.</div>
      }
      <div className={`question ${props.error ? 'question--error' : ''}`}>
        <div className="question-meta">
          <div>
            <h2>
              <FormattedMsg>
                {props.text}
              </FormattedMsg>
            </h2>
            <div className="question-hint">
              <FormattedMsg>
                {props.hint}
              </FormattedMsg>
            </div>
          </div>
          <span className="question-position">
            <FormattedMsg>
              {positions}
            </FormattedMsg>
          </span>
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
