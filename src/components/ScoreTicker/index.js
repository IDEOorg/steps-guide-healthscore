import React from 'react';
import './index.less';
import Score from '../../containers/Score';

const introImg = require('../../assets/health-score.svg');

const ScoreTicker = () => {
  return (
    <div className="score_container">
      <Score />
      <img className="intro_image" src={introImg}/>
    </div>
  );
};

export default ScoreTicker;

ScoreTicker.displayName = 'Score Ticker';
