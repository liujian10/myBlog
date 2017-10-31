import React from 'react';
import PropTypes from 'prop-types';
import TweenOne from 'rc-tween-one';
import WorkCard from './WorkCard';
import './FlowBanner.less';

class FlowBanner extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      currentIndex: 0,
      currentDeg: 0
    };
    this.setBannerTimer = () => {
      this.bannerTimer && clearInterval(this.bannerTimer);
      this.bannerTimer = this.props.isMobile ? null : setInterval(() => {
        const { works } = this.props;
        const currentIndex = this.state.currentIndex;
        let itemNum = works.length; // 要旋转的div的数量
        let centerNum = itemNum / 2;
        let itemDeg = 360 / itemNum; // 计算平均偏移角度，后面的itemDeg*index是不同索引div的偏移角度
        let itemIndex = currentIndex === itemNum - 1 ? 0 : currentIndex + 1;
        let nextStep = itemIndex - this.state.currentIndex;
        let dot = this.state.currentDeg -
          (nextStep > -1 * centerNum && nextStep < centerNum
            ? nextStep
            : nextStep <= -1 * centerNum
              ? nextStep + itemNum
              : nextStep - itemNum) * itemDeg;
        this.setState({
          currentIndex: itemIndex,
          currentDeg: dot
        });
      }, 5000);
    };
  }

  componentDidMount () {
    this.setBannerTimer();
  }

  render () {
    const { works, bodyWidth, getCardAnimationProps, clickFunc = () => {} } = this.props;
    let bannerElementKey = 0;
    let itemNum = works.length; // 要旋转的div的数量
    let centerNum = itemNum / 2;
    let itemDeg = 360 / itemNum; // 计算平均偏移角度，后面的itemDeg*index是不同索引div的偏移角度
    const handleClick = (workItem, itemIndex) => {
      this.bannerTimer && clearInterval(this.bannerTimer);
      let nextStep = itemIndex - this.state.currentIndex;
      let dot = this.state.currentDeg -
        (nextStep > -1 * centerNum && nextStep < centerNum
          ? nextStep
          : nextStep <= -1 * centerNum
            ? nextStep + itemNum
            : nextStep - itemNum) * itemDeg;
      this.setState({
        currentIndex: itemIndex,
        currentDeg: dot
      });
      this.setBannerTimer();
    };

    let bannerWidth = bodyWidth * 0.24;
    let bannerHeight = bodyWidth * 0.13;

    const cardStyle = {
      width: '100%',
      height: '100%',
      padding: '10px',
      border: '1px solid #ccc',
      borderTopRightRadius: '6px 50px'
    };

    const handleMouseOver = ()=> {
      this.bannerTimer && clearInterval(this.bannerTimer);
    };

    const handleMouseOut = ()=> {
      this.setBannerTimer();
    };

    return (
      <div className='flow-banner-container'>
        <div
          className='flow-banner-items'
          style={{
            width: bannerWidth,
            height: bannerHeight,
            transition: 'transform 1.5s ease-in-out',
            transform: 'rotateY(' + this.state.currentDeg + 'deg)'
          }}
        >
          {works.map((workItem, itemIndex) => {
            let transformValue = 'rotateY(' + itemDeg * itemIndex + 'deg) translateZ(' + bannerWidth * 1.2 + 'px)';
            let workCardFn = {
              onClick: handleClick.bind(null, workItem, itemIndex),
              onOpen: clickFunc.bind(null, itemIndex),
              onMouseOver: handleMouseOver,
              onMouseOut: handleMouseOut
            };
            return <div
              key={bannerElementKey++}
              className='flow-banner-item'
              style={{
                transform: transformValue,
                width: bannerWidth,
                height: bannerHeight
              }}
            >
              <TweenOne {...getCardAnimationProps(itemIndex, { width: '100%', height: '100%' })}>
                <WorkCard
                  {...workItem}
                  style={cardStyle}
                  fns={workCardFn}
                />
              </TweenOne>
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
  bodyWidth: PropTypes.number,
  getCardAnimationProps: PropTypes.func,
  clickFunc: PropTypes.func,
  isMobile: PropTypes.bool
};

export default FlowBanner;
