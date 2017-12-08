import React from 'react';
import { Layout } from 'antd';
import QueueAnim from 'rc-queue-anim';

const { Header } = Layout;

const CvHeader = () => {
  return (
    <Header className='cv-header'>
      <QueueAnim key='anim-header' type='top'>
        <div key='header-main'>
          <h2 className='cv-text-caps'>Curriculum Vitae</h2>
        </div>
      </QueueAnim>
    </Header>
  );
};

export default CvHeader;
