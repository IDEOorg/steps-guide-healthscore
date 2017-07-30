import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './index.less';

const ResultTab = (props) => {
  let orderBox = null;
  if(props.order !== undefined) {
    orderBox = (
      <div className="order_tag">
        <p>{props.order}</p>
      </div>
    );
  }
  return (
    <div className={
        classNames('result-tab', `result-tab--${props.rank}`, {
          'result-tab--selected': props.selected,
        })}
        onClick={props.onSelect}>
      <div className="result-tab__container">
        {orderBox}
        <h2 className="result-tab__headline">
          {props.title}
        </h2>
        <span className="result-tab__score">
          {props.score}
        </span>
      </div>
    </div>
  );
};

export default ResultTab;

ResultTab.propTypes = {
  selected: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
  order: PropTypes.number,
  title: PropTypes.string.isRequired,
  score: PropTypes.string,
  rank: PropTypes.string
};

ResultTab.displayName = 'Result Tab';
