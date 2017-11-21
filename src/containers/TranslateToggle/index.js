import React from 'react';
import { connect } from 'react-redux';
import { selectLanguage } from '../../store/language/language';
import { keenClient } from '../../globals/tracker';
import GoogleAnalytics from 'react-ga';
import './index.less';

const TranslateToggle = (props) => {
  let switchTo = null;
  let switchToCode = null;
  if(props.language === 'en') {
    switchTo = 'Español';
    switchToCode = 'es';
  }
  else if(props.language === 'es') {
    switchTo = 'English';
    switchToCode = 'en';
  }
  return (
    <div className="toggle_box">
      <a onClick={() => {
        keenClient.recordEvent('clicks', {
          type: 'ui',
          action: 'toggleLanguage',
          text: switchTo || 'none',
          switchToCode: switchToCode || 'none'
        });

        GoogleAnalytics.event({
          category: 'UIActions',
          action: 'click',
          label: `toggle language to ${switchTo || 'none'}`
        });
        props.translate(switchToCode);
      }}>
        <p className="toggle_text">
          { switchTo }
        </p>
      </a>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    language: state.language
  };
}

function mapDispatchToProps(dispatch) {
  return {
    translate: (language) => {
      dispatch(selectLanguage(language));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TranslateToggle);

TranslateToggle.displayName = 'TranslateToggle';
