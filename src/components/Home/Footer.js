import './Footer.less';

import React from 'react';
import { Layout } from 'antd';
import PropTypes from 'prop-types';

const { Footer } = Layout;

const HomeFooter = props => {
  return <Footer className='home-footer'>
    <div key='footer-main'>Created by Maple Liu</div>
  </Footer>;
};

export default HomeFooter;
