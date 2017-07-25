import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { push } from 'react-router-redux';
import './index.less';
import Question from '../../components/Question';
import { selectAnswer } from '../../store/selectedAnswers/selectedAnswers';

const QuestionsSection = (props) => {
  const questions = props.questions.map((question, index) => {
    const answers = props.selectedAnswers.filter(answer => answer.questionId === question.id);
    return (
      <Question
        key={question.id}
        id={question.id}
        text={question.text}
        choices={question.choices}
        answers={answers}
        position={index + 1}
        total={props.questions.length}
        onAnswer={choice => props.onSelect({question, choice})}
        />
    );
  });
  return (
    <div>
      <div className="questions_section">
        <div className="prompt">
          Answer these {props.questions.length} questions to figure out how to improve your financial health.
        </div>
        {questions}
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    questions: state.questions,
    selectedAnswers: state.selectedAnswers
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: () => {
      console.log("Go to results");
      // validate form
      // dispatch(generateResults(url));
      // dispatch(push('/results'));
    },
    onSelect: ({question, choice}) => dispatch(selectAnswer({question, choice}))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionsSection);

QuestionsSection.propTypes = {
  questions: PropTypes.array.isRequired,
  selectedAnswers: PropTypes.array.isRequired
};

QuestionsSection.displayName = 'QuestionsSection';
