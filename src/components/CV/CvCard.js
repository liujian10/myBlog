import React from 'react';
import { Card } from 'antd';

const CvCard = param => {
  const { title = '', children = '' } = param;
  return (
    <Card
      className='cv-card' title={<div className='cv-text'>{title}</div>}
      bordered={false}>
      {children}
    </Card>
  );
};

export default CvCard;
