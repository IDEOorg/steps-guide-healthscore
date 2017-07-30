import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import classNames from 'classnames';
import MediaQuery from 'react-responsive';
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

  scrollOnSelect (e, id) {
    if (this.parentNodeMatches(e.target, '.results_page--desktop')) {
      this.scrollOnSelectDesktop(id);
    } else {
      this.scrollOnSelectMobile(id);
    }
  }

  parentNodeMatches (node, selector) {
    if (node && node.parentNode && typeof node.parentNode.matches === 'function') {
      if (node.parentNode.matches(selector))
        return true;
      else
        return this.parentNodeMatches(node.parentNode, selector);
    }
    return false;
  }

  scrollOnSelectDesktop (id) {
    if(id !== this.state.selected) {
      let resultItems = this.resultsSection.children;
      if(resultItems[id]) {
        this.resultsSection.scrollTop += resultItems[id].getBoundingClientRect().top - 20 - 50;
      }
    }
  }

  scrollOnSelectMobile (id) {
    let resultSets = document.getElementsByClassName('result-set--mobile');
    if (resultSets[id]) {
      window.scrollBy(0, resultSets[id].getBoundingClientRect().top - 50); // 50 is header height
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

  resultItemScore () {
    return (
      <div className={classNames('result', 'result--intro', {
        'result--unselected': this.state.selected !== 0
      })}>
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

  desktopResults (tabs, items) {
    // desktop

    return (
      <div className="results_page results_page--desktop">
        <div className="results_sidebar">
          <ResultsIntro
            headlineText="What you should focus on"
            goBackText="Back to questions"
            goBack={this.props.goBack}
          />
          {tabs}
        </div>
        <div className="results_section"
          ref={(resultsSection) => {this.resultsSection = resultsSection;}}
          onScroll={() => this.onScroll()}
        >
          {items}
        </div>
      </div>
    )
  }

  mobileResults (tabs, items) {
    let combined = tabs.map((tab, index) => {
      return (
        <div key={index} className="result-set--mobile">
          {tabs[index]}
          {items[index]}
        </div>
      );
    })
    return (
      <div className="results_page results_page--mobile">
        <ResultsIntro
          headlineText="What you should focus on"
          goBackText="Back to questions"
          goBack={this.props.goBack}
        />
        {combined}
      </div>
    )
  }

  render () {
    const results = this.computeResults();

    let resultTabs = [];
    let resultItems = [];

    resultTabs.push(<ResultTab
      selected={0 === this.state.selected}
      title="Your score"
      rank="info"
      onSelect={(e) => {this.scrollOnSelect(e, 0); this.toggleSelected(0);}}
    />);

    resultItems.push(this.resultItemScore());

    results.forEach((result, index) => {
      let id = index+1;

      resultTabs.push(
        <ResultTab
          key={`result-tab-${result.choiceId}`}
          selected={id === this.state.selected}
          order={id}
          title={result.question.title}
          score={`${result.choice.score} of ${result.question.maxScore}`}
          rank={result.choice.rank}
          onSelect={(e) => {this.scrollOnSelect(e, id); this.toggleSelected(id);}}
        />
      );

      resultItems.push(
        <Result
          key={`result-${result.choiceId}`}
          selected={id === this.state.selected}
          choice={result.choice}
          question={result.question}
        />
      );
    });

    const desktopResults = this.desktopResults(resultTabs, resultItems);
    const mobileResults = this.mobileResults(resultTabs, resultItems);

    return (
      <div className="results_container">
        <MediaQuery query="(min-width: 768px)">
          {desktopResults}
        </MediaQuery>
        <MediaQuery query="(max-width: 767px)">
          {mobileResults}
        </MediaQuery>
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
