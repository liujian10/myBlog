import './CvView.less';
import React from 'react';
import QueueAnim from 'rc-queue-anim';
import PropTypes from 'prop-types';
import {
  Layout,
  BackTop
} from 'antd';
import {
  CvHeader,
  CvSider,
  CvModal,
  CvMain
} from '../../../components/cv';
import {
  introduction,
  educations,
  works,
  careers,
  technologies,
  titles
} from '../config-test';

const { Footer, Sider } = Layout;

class CvView extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      logoPaused: true,
      cardProps: {},
      showModal: false,
      modalWorks: [],
      bannerCurIndex: 0,
      bannerLastIndex: 0
    };
    this.showKey = '';
  }

  componentDidMount () {
    let bodyWidth = document.getElementsByClassName('cv-main')[0].clientWidth;
    let bodyHeight = document.documentElement.clientHeight;
    let isMobile = bodyWidth <= bodyHeight;
    this.setState({
      bodyWidth: bodyWidth,
      bodyHeight: bodyHeight,
      isMobile: isMobile
    });
  }

  render () {
    const { router } = this.props;

    // 左侧菜单onCollapse事件
    const onCollapse = (collapsed, type) => {
      console.log(collapsed, type);
    };
    // 个人头像onMouseOver事件
    const onLogoMouseOver = () => {
      this.setState({ logoPaused: false });
    };
    // 个人头像onMouseOut事件
    const onLogoMouseOut = () => {
      this.setState({ logoPaused: true });
    };
    // 项目&作品卡片onMouseOver事件
    const onCardMouseOver = key => {
      let cardProps = this.state.cardProps;
      cardProps[key] = {
        paused: false,
        reverse: false,
        moment: null
      };
      this.setState({
        cardProps: cardProps
      });
    };
    // 项目&作品卡片onCardMouseOut事件
    const onCardMouseOut = key => {
      let cardProps = this.state.cardProps;
      if (!cardProps[key].reverse) {
        cardProps[key] = {
          paused: false,
          reverse: true,
          moment: null
        };
        this.setState({
          cardProps: cardProps
        });
      }
    };
    // 项目&作品卡片onClick事件
    const onCardClick = key => {
      const { detail = [] } = works[key];
      let cardProps = this.state.cardProps;
      cardProps['card' + key] = {
        paused: false,
        reverse: true,
        moment: null
      };
      this.setState({
        cardProps: cardProps,
        showModal: true,
        modalWorks: detail
      });
      this.showKey = key;
    };
    // 模态窗口关闭按钮onClick事件
    const onModalCloseClick = () => {
      this.setState({
        showModal: false
      });
    };
    // 模态窗口链接按钮onClick事件
    const onModalLinkClick = () => {
      const { url = '#' } = works[this.showKey];
      if (url.indexOf('http') > -1) {
        location.href = url;
      } else {
        router.push(url);
      }
    };
    // 获取滚动条元素
    const getTarget = () => document.getElementById('cv-main') || window;
    // 获取项目&作品卡片动画动态属性
    const getCardAnimationProps = (key, style, bindClick) => {
      let cardKey = 'card' + key;
      let res = {
        key: cardKey,
        animation: {
          scale: 1.3,
          duration: 500
        },
        ...(this.state.cardProps[cardKey] || {
          paused: true,
          reverse: false,
          moment: null
        }),
        onMouseOver: onCardMouseOver.bind(null, cardKey),
        onMouseOut: onCardMouseOut.bind(null, cardKey),
        style: style
      };
      return res;
    };

    // 设置 bannerIndex
    const setBannerIndex = (lastIndex, curIndex) => {
      this.setState({
        bannerLastIndex: lastIndex,
        bannerCurIndex: curIndex
      });
    };

    const sideProps = {
      logoPaused: this.state.logoPaused,
      introduction,
      onLogoMouseOver,
      onLogoMouseOut
    };

    const mainProps = {
      ...this.state,
      educations,
      works,
      careers,
      technologies,
      titles,
      getCardAnimationProps,
      onCardClick,
      setBannerIndex
    };

    const modalProps = {
      ...this.state,
      onModalLinkClick,
      onModalCloseClick
    };
    return (
      <Layout className='cv-layout'>
        <Sider
          width="220"
          className='cv-sider'
          breakpoint='lg'
          collapsedWidth='0'
          onCollapse={onCollapse}
        >
          <CvSider
            {...sideProps}
          />
        </Sider>
        <Layout className='cv-main' id='cv-main'>
          <CvHeader/>
          <CvMain
            {...mainProps}
          />
          <Footer className='cv-footer'>
            <QueueAnim key='footer' type='bottom'>
              <div key='footer-main'>Created by Maple Liu</div>
            </QueueAnim>
          </Footer>
        </Layout>
        <BackTop target={getTarget}/>
        <CvModal
          {...modalProps}
        />
      </Layout>
    );
  }
}

CvView.propTypes = {
  router: PropTypes.object.isRequired
};

export default CvView;
