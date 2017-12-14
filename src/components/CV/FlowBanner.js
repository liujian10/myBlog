import React from 'react';
import PropTypes from 'prop-types';
import TweenOne from 'rc-tween-one';
import WorkCard from './WorkCard';
import './FlowBanner.less';

class FlowBanner extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      currentDeg: 0
    };

    this.setBannerTimer = () => {
      this.bannerTimer && clearInterval(this.bannerTimer);
      this.bannerTimer = this.props.isMobile ? null : setInterval(() => {
        const { works } = this.props;
        const currentIndex = this.props.bannerCurIndex;
        let itemNum = works.length; // 要旋转的div的数量
        let centerNum = itemNum / 2;
        let itemDeg = 360 / itemNum; // 计算平均偏移角度，后面的itemDeg*index是不同索引div的偏移角度
        let itemIndex = currentIndex === itemNum - 1 ? 0 : currentIndex + 1;
        let nextStep = itemIndex - this.props.bannerCurIndex;
        let dot = this.state.currentDeg -
          (nextStep > -1 * centerNum && nextStep < centerNum
            ? nextStep
            : nextStep <= -1 * centerNum
              ? nextStep + itemNum
              : nextStep - itemNum) * itemDeg;
        this.setState({
          currentDeg: dot
        });
        this.props.setBannerIndex(this.props.bannerCurIndex, itemIndex);
      }, 5000);
      this.cardMouseOver = false;
    };
  }

  render () {
    const { works, bodyWidth, getCardAnimationProps, clickFunc = () => {} } = this.props;
    if (this.props.showModal || this.cardMouseOver) {
      this.bannerTimer && clearInterval(this.bannerTimer);
    } else {
      this.setBannerTimer();
    }
    let itemNum = works.length; // 要旋转的div的数量
    let centerNum = itemNum / 2;
    let itemDeg = 360 / itemNum; // 计算平均偏移角度，后面的itemDeg*index是不同索引div的偏移角度
    const handleClick = (workItem, itemIndex) => {
      this.bannerTimer && clearInterval(this.bannerTimer);
      let nextStep = itemIndex - this.props.bannerCurIndex;
      let dot = this.state.currentDeg -
        (nextStep > -1 * centerNum && nextStep < centerNum
          ? nextStep
          : nextStep <= -1 * centerNum
            ? nextStep + itemNum
            : nextStep - itemNum) * itemDeg;
      this.setState({
        currentDeg: dot
      });
      this.props.setBannerIndex(this.props.bannerCurIndex, itemIndex);
    };

    let bannerWidth = bodyWidth * 0.2;
    let bannerHeight = bannerWidth * 0.6;

    const cardStyle = {
      width: '100%',
      height: '100%',
      padding: '10px',
      border: '1px solid #ccc',
      borderTopLeftRadius: '6px 50px'
    };

    const handleMouseOver = () => {
      this.cardMouseOver = true;
      this.bannerTimer && clearInterval(this.bannerTimer);
    };

    const handleMouseOut = () => {
      this.cardMouseOver = false;
      if (!this.props.showModal) {
        this.setBannerTimer();
      }
    };

    return (
      <div className='flow-banner-container'>
        <div
          className='flow-banner-items'
          style={{
            width: bannerWidth,
            height: bannerHeight*1.1,
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
            // let baseSize = this.props.bannerCurIndex === itemIndex ? 1.2 : 1;
            return <div
              key={itemIndex}
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
  setBannerIndex: PropTypes.func,
  isMobile: PropTypes.bool,
  showModal: PropTypes.bool
};

export default FlowBanner;
