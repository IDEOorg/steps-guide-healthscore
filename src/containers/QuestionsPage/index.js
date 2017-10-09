import React, { Component } from 'react';
import './index.less';
import QuestionsSection from '../QuestionsSection';
import ScoreTicker from '../../components/ScoreTicker';
import FormattedMsg from '../FormattedMsg';
import TranslateToggle from '../TranslateToggle';
import constants from '../../data/constants';

class QuestionsPage extends Component {
  constructor (props) {
    super(props);

    this.scrollToQuestion = this.scrollToQuestion.bind(this);
  }
  scrollToQuestion (event, element) {
    if (document.getElementById('app_display_mobile')) {
      this.scrollOnSelectMobile(element);
    } else {
      this.scrollOnSelectDesktop(element);
    }
  }

  scrollOnSelectDesktop (element) {
    if (element) {
      this.questionsSection.scrollTop += element.getBoundingClientRect().top - 20 - 50;
    }
  }

  scrollOnSelectMobile (element) {
    if (element) {
      window.scrollBy(0, element.getBoundingClientRect().top - 50); // 50 is header height
    }
  }

  render () {
    return (
      <div className="main_page">
        <div className="intro_main_section">
          <div className="intro_main_score">
            <ScoreTicker />
          </div>
          <div className="intro_main_intro">
            <h1 className="intro_headline">
              <FormattedMsg>
                {constants.title}
              </FormattedMsg>
            </h1>
            <p className="intro_tagline">
              <FormattedMsg>
                {constants.sidebar}
              </FormattedMsg>
            </p>
          </div>
          <TranslateToggle />
        </div>
        <div className="questions_page"
          ref={(questionsSection) => {this.questionsSection = questionsSection;}}
        >
          <QuestionsSection
            scrollToQuestion={this.scrollToQuestion}
          />
        </div>
      </div>
    );
  }
}

export default QuestionsPage;

QuestionsPage.displayName = 'Questions Page';
