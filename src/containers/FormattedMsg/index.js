import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const FormattedMsg = (props) => {
  const getTranslation = (field, language) => {
    if(field[language]) {
      return field[language];
    }
    return "";
  };
  const translatedValue = getTranslation(props.children, props.language);
  return (
    <span>
    { translatedValue }
    </span>
  );
};

function mapStateToProps(state) {
  return {
    language: state.language
  };
}
export default connect(
  mapStateToProps,
  {}
)(FormattedMsg);

FormattedMsg.propTypes = {
  children: PropTypes.string.isRequired
};

FormattedMsg.displayName = 'FormattedMsg';
