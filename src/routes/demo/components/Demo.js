import React from 'react';
import './Demo.less';
import { Card } from 'antd';

import Waterfall from 'rc-waterfall';

class Demo extends React.Component {
  render () {
    let images = [];
    for (let i = 0; i < 320; i++) {
      let index = parseInt(i < 163 ? i : i - 162);
      if (index < 10) {
        index = '00' + index;
      } else if (index < 100) {
        index = '0' + index;
      }
      images.push('http://cued.xunlei.com/demos/publ/img/P_' + index + '.jpg');
    }

    const renderItem = (cIndex, index, src) => {
      const itemIndex = index + 1;
      const imgNum = itemIndex < 10 ? ('00' + itemIndex) : itemIndex < 100 ? ('0' + itemIndex) : itemIndex;
      return <Card
        key={imgNum}
        hoverable
        style={{ margin: '10px' }}
        cover={<img alt={imgNum} src={src}/>}
      >
        <Card.Meta
          title={imgNum}
          description={src}
        />
      </Card>;
    };

    const waterFallProps = {
      source: images,
      renderItem
    };

    return <div style={{ padding: 20 }}>
      <Waterfall {...waterFallProps} />
    </div>;
  }
}

export default Demo;
