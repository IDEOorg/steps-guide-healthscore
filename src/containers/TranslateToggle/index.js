import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectLanguage } from '../../store/language/language';
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
