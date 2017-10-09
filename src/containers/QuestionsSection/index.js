import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import './index.less';
import Button from '../../components/Button';
import Question from '../../components/Question';
import FormattedMsg from '../FormattedMsg';
import { selectAnswer } from '../../store/selectedAnswers/selectedAnswers';
import constants from '../../data/constants';

class QuestionsSection extends Component {
  constructor (props) {
    super(props);

    this.state = {
      showErrors: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }


  getQuestionsWithMeta () {
    const questions = this.props.questions;
    return Object.keys(questions)
      .sort((a, b) => questions[a].position - questions[b].position)
      .map((id) => {
        const question = questions[id];
        const choices = question.choices.map(id => this.props.choices[id]);
        const answers = this.props.selectedAnswers.filter(answer => answer.questionId === question.id);
        return {
          question,
          choices,
          answers,
          showError: (this.state.showErrors && answers.length === 0)
        };
      });
  }

  renderQuestions () {
    const questionDatas = this.getQuestionsWithMeta();
    return questionDatas.map(data => {
      return (
        <Question
          key={data.question.id}
          id={data.question.id}
          text={data.question.text}
          hint={data.question.description}
          choices={data.choices}
          answers={data.answers}
          position={data.question.position}
          error={data.showError}
          total={Object.keys(this.props.questions).length}
          onAnswer={(choice) => this.props.onSelect({question: data.question, choice})}
          />
      );
    });
  }

  handleSubmit (event) {
    const error = this.getQuestionsWithMeta().findIndex(data => data.answers.length === 0);
    if (error >= 0) {
      // if any questions are unanswered, show errors
      this.setState({showErrors: true});
      this.props.scrollToQuestion(event, this.questionsContainer.children[error]);
    } else {
      this.setState({showErrors: false});
      this.props.onSubmit();
    }
  }

  render () {
    const questions = this.renderQuestions();
    // let errorMessage = null;
    // if(this.state.showErrors) {
    //   errorMessage = (
    //     <p className="question-error-msg">Answer all the questions above to get your score.</p>
    //   );
    // }
    return (
      <div>
        <div className="questions_section">
          <div className="prompt">
            <FormattedMsg>
              {constants.mainIntro}
            </FormattedMsg>
          </div>
          <div className="questions"
            ref={(element) => { this.questionsContainer = element; }}
          >
            {questions}
          </div>
          <Button onClick={this.handleSubmit} className={"show_options_button"}>
            <h4 className="show_options_button_text">
              <FormattedMsg>
                {constants.recButton}
              </FormattedMsg>
            </h4>
          </Button>
        </div>
      </div>
    );
  }
}

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
  selectedAnswers: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  scrollToQuestion: PropTypes.func.isRequired
};

QuestionsSection.displayName = 'QuestionsSection';
