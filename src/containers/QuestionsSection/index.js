import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { push } from 'react-router-redux';
import './index.less';
import Question from '../../components/Question';

const QuestionsSection = (props) => {
  const questions = props.questions.map((question, index) => {
    return (
      <Question
        key={question.id}
        id={question.id}
        text={question.text}
        choices={question.choices}
        position={index + 1}
        total={props.questions.length}
        />
    );
  });
  return (
    <div>
      Answer these {props.questions.length} questions to figure out how to improve your financial health.
      <div className="questions_section">
        {questions}
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    questions: state.questions
  };
}

function mapDispatchToProps(/* dispatch */) {
  return {
    onSubmit: () => {
      console.log("Go to results");
      // validate form
      // dispatch(generateResults(url));
      // dispatch(push('/results'));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionsSection);

QuestionsSection.propTypes = {
  questions: PropTypes.array.isRequired
};

QuestionsSection.displayName = 'QuestionsSection';
