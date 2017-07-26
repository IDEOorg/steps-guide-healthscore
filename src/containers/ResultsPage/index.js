import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import './index.less';
import Link from '../../components/Link';
import Result from '../../components/Result';
import ScoreTicker from '../../components/ScoreTicker';

class ResultsPage extends Component {
  constructor (props) {
    super(props);
  }

  componentWillMount () {
    window.scrollTo(0,0);
  }

  // TODO: componentDidUpdate() {
  //   this.scrollOnResultSelectMobile(this.props.currentResult);
  // }

  // TODO: onScroll() { }

  computeResults () {
    const results = this.props.selectedAnswers.map(answer => {
      return {
        ...answer,
        choice: this.props.choices[answer.choiceId],
        question: this.props.questions[answer.questionId]
      };
    });
    results.sort((a, b) => {
      let aValue = this.computeValueForRank(a.choice.rank),
          bValue = this.computeValueForRank(b.choice.rank);
      if (aValue < bValue) return -1;
      if (aValue > bValue) return 1;
      return a.question.position - b.question.position
    })
    return results;
  }

  computeValueForRank (rank) {
    rank = rank.toString().toLowerCase();
    switch (rank) {
      case 'good':
        return 3;
      case 'ok':
        return 2;
      case 'bad':
        return 1;
    }
    return 0;
  }

  desktopResults (results) {
    return results.map(result => {
      return (
        <Result
          key={result.choiceId}
          choice={result.choice}
          question={result.question}
        />
      );
    });
  }

  render () {
    const results = this.computeResults();
    const desktopResults = this.desktopResults(results);
    return (
      <div className="results_container">
        <div className="results_page">
          <div className="results_sidebar">
            <h1 className="intro_headline" onClick={this.props.startOver}>
              What you should focus on
            </h1>
            <Link onClick={this.props.startOver} children="Back to questions" />
          </div>
          <div className="results_section">
            <div className="result result--intro">
              <ScoreTicker />
            </div>
            <div>
              {desktopResults}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({choices, questions, selectedAnswers}) {
  return {
    choices,
    questions,
    selectedAnswers
  };
}

function mapDispatchToProps(dispatch) {
  return {
    startOver: () => {
      // TODO: dispatch(reset)
      dispatch(push('/'));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultsPage);

ResultsPage.displayName = 'Results Page';
