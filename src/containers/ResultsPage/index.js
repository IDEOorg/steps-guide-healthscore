import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import './index.less';
import Result from '../../components/Result';
import ResultsIntro from '../../components/ResultsIntro';
import ResultTab from '../../components/ResultTab';
import ScoreTicker from '../../components/ScoreTicker';

class ResultsPage extends Component {
  constructor (props) {
    super(props);

    this.state = {
      selected: 0
    };
  }

  componentWillMount () {
    window.scrollTo(0,0);
  }

  componentDidUpdate () {
    this.scrollOnSelectMobile(this.state.selected);
  }

  onScroll () {
    let resultItems = this.resultsSection.children;
    let height = Math.max(document.documentElement.clientHeight, window.innerHeight);
    let currentOptionHeight = -1;
    let currentOption = null;
    for(let i = 0; i < resultItems.length; i++) {
      let resultItemHeight = resultItems[i].getBoundingClientRect().top;
      if(resultItemHeight >= 0 && resultItemHeight <= (height / 4) && resultItemHeight > currentOptionHeight) {
        currentOptionHeight = resultItemHeight;
        currentOption = i;
      }
    }
    if(currentOption !== null && currentOption !== this.state.selected) {
      this.toggleSelected(currentOption);
    }
  }

  scrollOnSelect (id) {
    if(id !== this.state.selected) {
      let resultItems = this.resultsSection.children;
      if(resultItems[id]) {
        this.resultsSection.scrollTop += resultItems[id].getBoundingClientRect().top - 20 - 50;
      }
    }
  }

  scrollOnSelectMobile (id) {
    let options = document.getElementsByClassName('option_box_mobile');
    for(let i = 0; i < options.length; i++) {
      if(options[i].dataset.option === id) {
        window.scrollBy(0, options[i].getBoundingClientRect().top - 50); // 50 is header height
        break;
      }
    }
  }

  toggleSelected (id) {
    return this.setState({selected: id});
  }

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

  renderScoreResultItem () {
    return (
      <div className="result result--intro">
        <ScoreTicker />
        <h2>Your score</h2>
        <div className="result__subtext">Out of 100</div>
        <div className="result__meta">
          <p>
            <b>But it's what you do next that is more important.</b> Spending less than you earn and saving for emergencies and the future are the foundations of financial health. Good credit, less debt and financial security will follow.
          </p>
        </div>
      </div>
    );
  }

  desktopResults (results) {
    // desktop
    let resultTabs = results.map((result, i) => {
      let id = i+1;
      return (
        <ResultTab
          key={result.choiceId}
          selected={id === this.state.selected}
          order={id}
          title={result.question.title}
          score={`${result.choice.score} of ${result.question.maxScore}`}
          rank={result.choice.rank}
          onSelect={() => {this.scrollOnSelect(id); this.toggleSelected(id);}}
        />
      );
    });

    resultTabs.unshift(<ResultTab
      selected={0 === this.state.selected}
      title="Your score"
      rank="info"
      onSelect={() => {this.scrollOnSelect(0); this.toggleSelected(0);}}
    />);

    let resultItems = results.map(result => {
      return (
        <Result
          key={result.choiceId}
          choice={result.choice}
          question={result.question}
        />
      );
    });

    return (
      <div className="results_page">
        <div className="results_sidebar">
          <ResultsIntro
            headlineText="What you should focus on"
            goBackText="Back to questions"
            goBack={this.props.goBack}
          />
          {resultTabs}
        </div>
        <div className="results_section"
          ref={(resultsSection) => {this.resultsSection = resultsSection;}}
          onScroll={() => this.onScroll()}
        >
          {this.renderScoreResultItem()}
          {resultItems}
        </div>
      </div>
    )
  }

  render () {
    const results = this.computeResults();
    const desktopResults = this.desktopResults(results);
    return (
      <div className="results_container">
        {desktopResults}
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
    goBack: () => {
      // TODO: dispatch(reset)
      dispatch(push('/'));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultsPage);

ResultsPage.displayName = 'Results Page';
