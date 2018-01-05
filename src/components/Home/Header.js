import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Icon, Popover, Affix } from 'antd';
import QueueAnim from 'rc-queue-anim';
import QrCode from 'qrcode.react';
import './Header.less';

const { Header } = Layout;

const HomeHeader = props => {
  const { prefixCls = 'maple-header', title, target, isMobile } = props;
  return (
    <Header className={prefixCls}>
      <QueueAnim key='anim-header' type='top'>
        <div key='header-main'>
          <h2 className={`${prefixCls}-text-caps`}>{title}</h2>
        </div>
        {isMobile ? <Affix
          className={`${prefixCls}-tool`}
          offsetTop={50}
          target={target}
        >
          <Popover
            placement='bottom'
            trigger='click'
            content={<QrCode value={window.location.href}/>}
            arrowPointAtCenter
          >
            <Icon
              type='mobile'
              style={{ fontSize: 24 }}
            />
          </Popover>
        </Affix> : null}
      </QueueAnim>
    </Header>
  );
};

HomeHeader.propTypes = {
  prefixCls: PropTypes.string,
  title: PropTypes.string,
  target: PropTypes.func.isRequired,
  isMobile: PropTypes.bool
};

export default HomeHeader;
