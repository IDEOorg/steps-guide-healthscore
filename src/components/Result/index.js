import React from 'react';
import PropTypes from 'prop-types';
import './index.less';
import classNames from 'classnames';
import Button from '../Button';
import UrlImage from '../UrlImage';
import FormattedMsg from '../../containers/FormattedMsg';
import constants from '../../data/constants';

const Result = (props) => {
  if (!props.choice || !props.choice.result) return <div></div>;

  let categorization = '';

  switch (props.choice.rank) {
    case 'good':
      categorization = constants.categorization.good;
      break;

    case 'ok':
      categorization = constants.categorization.ok;
      break;

    case 'bad':
      categorization = constants.categorization.bad;
      break;
  }

  const references = (props.choice.result.references || []).map(ref => {
    let links;
    if (ref.links && ref.links.length > 0) {
      links = ref.links.map(linkItem => {
        return (
          <Button
            key={linkItem.link}
            onClick={() => {window.open(linkItem.link)}}
            url={linkItem.link}
            textStyleClass="suggestion-btn__text"
            className="suggestion-btn"
          >
            <UrlImage />
            <FormattedMsg>
              {linkItem.linkText}
            </FormattedMsg>
          </Button>
        );
      });
    }

    let icon;
    if (ref.image) {
      icon = <img src={require(`../../assets/${ref.image}`)} />;
    }

    return (
      <div>
        <hr size="1" />
        <div key={ref.title} className="suggestion">
          <div className="suggestion__icon">
            {icon}
          </div>
          <div className="suggestion__meta">
            <h3>
              <FormattedMsg>
                {ref.title}
              </FormattedMsg>
            </h3>
            <p>
              <FormattedMsg>
                {ref.description}
              </FormattedMsg>
            </p>
            {links}
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className={classNames( 'result',
      `result--${props.choice.rank}`,
      {
        'result--unselected': !props.selected
      }
    )}>
      <div className="result__meta">
        <div className="result__subtext">
          <FormattedMsg>
            {categorization}
          </FormattedMsg>
        </div>
        <h2>
          <FormattedMsg>
            {props.choice.result.title}
          </FormattedMsg>
        </h2>
        <hr size="1" />
        <p>
          <FormattedMsg>
            {props.choice.result.subtitle}
          </FormattedMsg>
        </p>
      </div>
      <div className="result-suggestions">
        {references}
      </div>
    </div>
  );
};

export default Result;

Result.propTypes = {
  choice: PropTypes.object.isRequired,
  question: PropTypes.object.isRequired,
  selected: PropTypes.bool
};

Result.displayName = 'Result';
