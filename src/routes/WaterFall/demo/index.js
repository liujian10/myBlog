import React from 'react';

import Waterfall from '../components/Waterfall';

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

    const renderItem = (cIndex, img, index) => {
      const aStyle = {
        display: 'block',
        padding: '5px',
        marginBottom: '10px',
        border: '1px solid #ccc',
        backgroundColor: '#fff',
        textDecoration: 'none'
      };
      const imgNum = index < 10 ? ('00' + index) : index < 100 ? ('0' + index) : index;
      return <a href='#' style={aStyle} key={imgNum}>
        <img src={img} style={{
          display: 'block',
          margin: '0 auto 5px',
          border: 'none',
          verticalAlign: 'bottom'
        }}/>
        <strong style={{
          color: '#333'
        }}>{imgNum}</strong>
      </a>;
    };

    const waterFallProps = {
      source: images,
      renderItem
    };
    return <Waterfall {...waterFallProps} />;
  }
}

export default Demo;
