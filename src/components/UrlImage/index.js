import React from 'react';
import './index.less';

const urlAssetImg = require('../../assets/url-icon.svg');

const UrlImage = () => {
  return (
    <img className="url_asset_img" src={urlAssetImg} />
  );
};

export default UrlImage;

UrlImage.displayName = 'OptionsIntro';
