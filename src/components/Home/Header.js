import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Icon, Popover, Affix } from 'antd';
import QueueAnim from 'rc-queue-anim';
import QrCode from 'qrcode.react';
import './Header.less';

const { Header } = Layout;

const HomeHeader = props => {
  const { bodyWidth, bodyHeight, prefixCls = 'maple-header', title, target } = props;
  return (
    <Header className={prefixCls}>
      <QueueAnim key='anim-header' type='top'>
        <div key='header-main'>
          <h2 className={`${prefixCls}-text-caps`}>{title}</h2>
        </div>
        <Affix
          className={`${prefixCls}-tool`}
          offsetTop={50}
          style={{ display: bodyWidth > bodyHeight ? 'block' : 'none' }}
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
        </Affix>
      </QueueAnim>
    </Header>
  );
};

HomeHeader.propTypes = {
  bodyWidth: PropTypes.number,
  bodyHeight: PropTypes.number,
  prefixCls: PropTypes.string,
  title: PropTypes.string,
  target: PropTypes.func.isRequired
};

export default HomeHeader;
