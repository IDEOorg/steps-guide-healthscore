import React from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import './index.less';
import Header from '../../components/Header';
import constants from '../../data/constants';

const App = (props) => {
  window.scrollTo(0, 0);
  return (
    <div className="app">
      <MediaQuery query="(max-width: 767px)">
        {(matches) => {
          if (matches) {
            return <span id="app_display_mobile"></span>;
          } else {
            return <span id="app_display_desktop"></span>;
          }
        }}
      </MediaQuery>
      <Header feedbackUrl={constants.feedbackUrl} />
      <div className="app_content">
        { props.children }
      </div>
    </div>
  );
};

export default App;

App.propTypes = {
  children: PropTypes.string.isRequired
};

App.displayName = 'App';
