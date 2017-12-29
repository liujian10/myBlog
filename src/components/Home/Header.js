import React from 'react';
import { Layout } from 'antd';
import QueueAnim from 'rc-queue-anim';

const { Header } = Layout;

const HomeHeader = () => {
  return (
    <Header className='home-header'>
      <QueueAnim key='anim-header' type='top'>
        <div key='header-main'>
          <h2 className='home-text-caps'>Maple</h2>
        </div>
      </QueueAnim>
    </Header>
  );
};

export default HomeHeader;
