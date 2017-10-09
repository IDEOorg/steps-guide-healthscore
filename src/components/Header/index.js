import React from 'react';
import FormattedMsg from '../../containers/FormattedMsg';
import './index.less';
import constants from '../../data/constants';
let arrowIcon = require('../../assets/arrow-left.svg');
let headerIconUrl = require('../../assets/steps-logo.svg');
let feedbackIcon = require('../../assets/feedback-blue.svg');

const Header = (props) =>  {
  let feedback = {
    "en": "Send Feedback",
    "es": "Enviar Comentarios"
  };
  let headerIconBlock = null;
  if(headerIconUrl) {
    headerIconBlock = <img src={headerIconUrl} />;
  }
  let headerFeedbackBlock = null;
  if(props.feedbackUrl) {
    headerFeedbackBlock = (
      <a className="header_feedback_link" href={props.feedbackUrl} target="_blank">
        <div className="header_back_box">
          <img className="feedback_icon" src={feedbackIcon} />
          <p className="feedback_text">
            <FormattedMsg>
              {feedback}
            </FormattedMsg>
          </p>
        </div>
      </a>
    );
  }
  return (
    <div className="header">
      <a className="header_back_link" href="https://steps.ideo.org/guides">
        <div className="header_back_box">
          <img className="header_arrow" src={arrowIcon} />
          <p>
            <FormattedMsg>
              {constants.home}
            </FormattedMsg>
          </p>
        </div>
      </a>
      <div>
        { headerIconBlock }
      </div>
      { headerFeedbackBlock}
    </div>
  );
};

export default Header;

Header.displayName = 'Header';
