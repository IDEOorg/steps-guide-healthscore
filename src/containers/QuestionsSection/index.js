import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import './index.less';
import Button from '../../components/Button';
import Question from '../../components/Question';
import { selectAnswer } from '../../store/selectedAnswers/selectedAnswers';

const QuestionsSection = (props) => {
  const questions = Object.keys(props.questions)
    .sort((a, b) => props.questions[a].position - props.questions[b].position)
    .map((id) => {
      const question = props.questions[id];
      const choices = question.choices.map(id => props.choices[id]);
      const answers = props.selectedAnswers.filter(answer => answer.questionId === question.id);
      return (
        <Question
          key={question.id}
          id={question.id}
          text={question.text}
          hint={question.description}
          choices={choices}
          answers={answers}
          position={question.position}
          total={Object.keys(props.questions).length}
          onAnswer={choice => props.onSelect({question, choice})}
          />
      );
    });

  return (
    <div>
      <div className="questions_section">
        <div className="prompt">
          Answer these {props.questions.length} questions to get advice on how to improve your financial health.
        </div>
        {questions}
        <Button onClick={props.onSubmit} children="Show me my score" />
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    choices: state.choices,
    questions: state.questions,
    selectedAnswers: state.selectedAnswers
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: () => {
      // console.log("Go to results");
      // validate form
      // dispatch(generateResults(url));
      dispatch(push('/results'));
    },
    onSelect: ({question, choice}) => dispatch(selectAnswer({question, choice}))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionsSection);

QuestionsSection.propTypes = {
  choices: PropTypes.object.isRequired,
  questions: PropTypes.object.isRequired,
  selectedAnswers: PropTypes.array.isRequired
};

QuestionsSection.displayName = 'QuestionsSection';
