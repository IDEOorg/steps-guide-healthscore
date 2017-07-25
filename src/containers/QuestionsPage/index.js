import React from 'react';
import './index.less';
import QuestionsSection from '../QuestionsSection';
import Score from '../Score';

const introImg = require('../../assets/health-score.svg');

const QuestionsPage = () => {
  return (
    <div className="main_page">
      <div className="intro_main_section">
        <div className="score_container">
          <Score />
          <img className="intro_image" src={introImg}/>
        </div>
        <div className="intro_main_intro">
          <h1 className="intro_headline">
            How do I improve my financial health?
          </h1>
          <p className="intro_tagline">
            The financial health calculator examines your money habits (spending, saving, borrowing, planning) to help you identify and prioritize the best steps to improve your financial well-being.
          </p>
        </div>
      </div>
      <div className="questions_page">
        <QuestionsSection />
      </div>
    </div>
  );
};

export default QuestionsPage;

QuestionsPage.displayName = 'Questions Page';
