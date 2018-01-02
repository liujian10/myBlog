import React from 'react';
import PropTypes from 'prop-types';
import TweenOne from 'rc-tween-one';
import WorkCard from './WorkCard';
import './FlowBanner.less';

class FlowBanner extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    this.setBannerTimer();
  }

  componentWillUnmount () {
    this.clearBannerTimer();
  }

  // 设置自动旋转定时器
  setBannerTimer () {
    if (this.props.isMobile) return; // 移动端不处理
    this.clearBannerTimer();
    this.bannerTimer = setInterval(() => {
      if (!this.cardMouseOver && !this.props.showModal) {
        const { works } = this.props;
        const currentIndex = this.props.bannerCurIndex; // 当前banner位置
        let itemNum = works.length; // 要旋转的div的数量
        let centerNum = itemNum / 2; // 数量中间值
        let itemDeg = 360 / itemNum; // 计算平均偏移角度，后面的itemDeg*index是不同索引div的偏移角度
        let nextIndex = (currentIndex === itemNum - 1) ? 0 : (currentIndex + 1); // 下个banner位置
        let nextStep = nextIndex - this.props.bannerCurIndex; // 下一步步数
        let dot = this.props.currentDeg -
          (nextStep > -1 * centerNum && nextStep < centerNum
            ? nextStep
            : nextStep <= -1 * centerNum
              ? nextStep + itemNum
              : nextStep - itemNum) * itemDeg;
        // 设置旋转度数
        this.props.assignProps({
          currentDeg: dot
        });
        this.props.setBannerIndex(this.props.bannerCurIndex, nextIndex);
      }
    }, 5000);
  }

  // 清除定时器
  clearBannerTimer () {
    this.bannerTimer && clearInterval(this.bannerTimer);
  }

  render () {
    const {
      works, // 作品信息
      cardWidth, //卡片容器宽度
      getCardAnimationProps, // 获取卡片动画属性
      onOpenCard, // 打开卡片信息详情
      bannerCurIndex, // 当前banner位置
      currentDeg, // 当前旋转度数
      assignProps, // 设置跟属性值
      setBannerIndex // 设置banner位置
    } = this.props;

    const bannerWidth = cardWidth * 0.32; // banner卡片宽度
    const bannerHeight = bannerWidth * 0.6; // banner卡片高度

    const itemNum = works.length; // 要旋转的div的数量
    const centerNum = itemNum / 2; // 元素数量中间值
    const itemDeg = 360 / itemNum; // 计算平均偏移角度，后面的itemDeg*index是不同索引div的偏移角度

    /**
     * 处理卡片点击事件
     * @param workItem 点击卡片对应作品信息
     * @param itemIndex 点击卡片对应作品位置
     */
    const handleClick = (workItem, itemIndex) => {
      this.clearBannerTimer();
      const nextStep = itemIndex - bannerCurIndex;
      const dot = currentDeg -
        (nextStep > -1 * centerNum && nextStep < centerNum
          ? nextStep
          : nextStep <= -1 * centerNum
            ? nextStep + itemNum
            : nextStep - itemNum) * itemDeg;
      assignProps({
        currentDeg: dot
      });
      setBannerIndex(bannerCurIndex, itemIndex);
      this.setBannerTimer();
    };

    // 处理卡片鼠标悬浮事件
    const handleMouseOver = () => {
      this.cardMouseOver = true;
    };

    // 处理卡片鼠标移出事件
    const handleMouseOut = () => {
      this.cardMouseOver = false;
    };

    return (
      <div className='flow-banner-container'>
        <div
          className='flow-banner-items'
          style={{
            width: bannerWidth,
            height: bannerHeight,
            transition: 'transform 1.5s ease-in-out',
            transform: 'rotateY(' + currentDeg + 'deg)'
          }}
        >
          {works.map((workItem, itemIndex) => {
            let transformValue = 'rotateY(' + itemDeg * itemIndex + 'deg) translateZ(' + bannerWidth * 1.2 + 'px)';
            let workCardFn = {
              onClick: handleClick.bind(null, workItem, itemIndex),
              onOpen: onOpenCard.bind(null, itemIndex),
              onMouseOver: handleMouseOver,
              onMouseOut: handleMouseOut
            };
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
  onOpenCard: PropTypes.func,
  setBannerIndex: PropTypes.func,
  getCardAnimationProps: PropTypes.func,
  assignProps: PropTypes.func,
  isMobile: PropTypes.bool,
  showModal: PropTypes.bool,
  bannerCurIndex: PropTypes.number,
  cardWidth: PropTypes.number,
  currentDeg: PropTypes.number
};

export default FlowBanner;
