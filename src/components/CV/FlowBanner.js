import React from 'react';
import PropTypes from 'prop-types';
import WorkCard from './WorkCard';
import './FlowBanner.less';

class FlowBanner extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      from: 0,
      animation: 'autoMove 1s 1 linear',
      animationStyle: ''
    };
  }

  render () {
    const { works, bodyWidth } = this.props;
    let bannerElementKey = 0;
    let itemNum = works.length; // 要旋转的div的数量
    let itemDeg = 360 / itemNum; // 计算平均偏移角度，后面的itemDeg*index是不同索引div的偏移角度
    let itemIndex = 0;
    let bannerWidth = bodyWidth * 0.25;
    let bannerHeight = bodyWidth * 0.15;
    return (
      <div className='flow-banner-container'>
        <style dangerouslySetInnerHTML={{ __html: this.state.animationStyle }}/>
        <div
          className='flow-banner-items'
          style={{
            width: bannerWidth,
            height: bannerHeight
          }}
        >
          {works.map(workItem => {
            itemIndex++;
            let transformValue = 'rotateY(' + itemDeg * itemIndex + 'deg) translateZ(' + bannerWidth + 'px)';
            return <div
              key={bannerElementKey++}
              className='flow-banner-item'
              style={{
                transform: transformValue,
                width: bannerWidth,
                height: bannerHeight
              }}
            >
              <WorkCard {...workItem} style={{ width: '100%', height: '100%' }}/>
            </div>;
          })
          }
        </div>
      </div>
    );
  }
}

FlowBanner.propTypes = {
  works: PropTypes.array,
  bodyWidth: PropTypes.number
};

export default FlowBanner;
