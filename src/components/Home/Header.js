import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Icon } from 'antd';
import QueueAnim from 'rc-queue-anim';

const { Header } = Layout;

const HomeHeader = props => {
  const { assignProps, isMobile, bodyWidth, bodyHeight } = props;
  const handleClick = () => assignProps({ isMobile: !isMobile });
  console.log(bodyHeight+'|'+bodyWidth);
  return (
    <Header className='home-header'>
      <QueueAnim key='anim-header' type='top'>
        <div key='header-main'>
          <h2 className='home-text-caps'>Maple</h2>
        </div>
        <div
          className='home-tool'
          style={{ display: bodyWidth > bodyHeight ? 'block' : 'none' }}>
          <Icon
            type={isMobile ? 'laptop' : 'mobile'}
            style={{ fontSize: 24 }}
            onClick={handleClick}/>
        </div>
      </QueueAnim>
    </Header>
  );
};

HomeHeader.propTypes = {
  assignProps: PropTypes.func,
  isMobile: PropTypes.bool,
  bodyWidth: PropTypes.number,
  bodyHeight: PropTypes.number
};

export default HomeHeader;
