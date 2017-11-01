import React from 'react';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import { OverPack } from 'rc-scroll-anim';
import PropTypes from 'prop-types';
import {
  Layout,
  Icon,
  Timeline,
  BackTop
} from 'antd';
import {
  introduction,
  educations,
  works,
  careers,
  technologies,
  titles
} from '../config-test';
import './CvView.less';
import MapleImage from '../assets/maple.png';
import WorkCard from '../../../components/CV/WorkCard';
import CvCard from '../../../components/CV/CvCard';
import WorksBanner from '../../../components/CV/WorksBanner';
import FlowBanner from '../../../components/CV/FlowBanner';

const { Header, Footer, Sider, Content } = Layout;

class CvView extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      logoPaused: true,
      cardProps: {},
      showModal: false,
      modalWorks: []
    };
    this.showKey = '';
  }

  componentDidMount () {
    let bodyWidth = document.getElementsByClassName('cv-main')[0].clientWidth;
    let bodyHeight = document.documentElement.clientHeight;
    let isMobile = bodyWidth <= bodyHeight
    this.setState({
      bodyWidth: bodyWidth,
      bodyHeight: bodyHeight,
      isMobile: isMobile
    });
  }

  render () {
    const { router } = this.props;
    // 头像动画配置
    const logoAnimation = {
      rotate: 360,
      repeat: -1,
      duration: 2000
    };
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
    const getTarget = () => document.getElementsByClassName('cv-main')[0] ||
      window;
    // 动态动画key值
    let animateKey = 0;
    // 获取项目&作品卡片动画动态属性
    const getCardAnimationProps = (key, style, bindClick) => {
      let cardKey = 'card' + key;
      let res = {
        key: cardKey,
        animation: {
          scale: 1.2,
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
    return (
      <Layout className='cv-layout'>
        <Sider
          className='cv-sider'
          breakpoint='lg'
          collapsedWidth='0'
          onCollapse={onCollapse}
        >
          <QueueAnim
            key='sider' type={['left', 'right']}
            ease={['easeOutQuart', 'easeInOutQuart']}>
            <TweenOne
              key={++animateKey}
              animation={logoAnimation}
              paused={this.state.logoPaused}
              onMouseOver={onLogoMouseOver}
              onMouseOut={onLogoMouseOut}>
              <img className='cv-sider-head' src={MapleImage}/>
            </TweenOne>
            <h2 key={++animateKey} className='cv-sider-username'>{introduction.name} <Icon type='man'/></h2>
            <ul key={++animateKey} className='cv-sider-baseInfo'>
              <li className='cv-text'>
                我{introduction.age}，{introduction.nationality}，{introduction.party}</li>
              <li><Icon type='mobile'/> {introduction.mobile}</li>
              <li><Icon type='mail'/> <a
                href={'mailto:' + introduction.email}>{introduction.email}</a>
              </li>
              <li><Icon type='github'/> <a href={'https://' +
              introduction.gitHub}>{introduction.gitHub}</a></li>
              <li><Icon type='link'/> <a href={'http://' +
              introduction.website}>{introduction.website}</a></li>
              <li><h3/></li>
              <li className='cv-text'>{introduction.desc}</li>
            </ul>
          </QueueAnim>
        </Sider>
        <Layout className='cv-main' id='cv-main'>
          <Header className='cv-header'>
            <QueueAnim key='header' type='top'>
              <div key={++animateKey}>
                <h2 className='cv-text-caps'>Curriculum Vitae</h2>
              </div>
            </QueueAnim>
          </Header>
          <Content className='cv-content'>
            <QueueAnim key='work' type='top' duration={1000}>
              <div key={++animateKey}>
                <CvCard title={titles.works}>
                  {
                    this.state.isMobile
                      ? <QueueAnim
                        className='cv-works-group' delay={300}
                        type='right' duration={1000}>
                        {
                          works.map((work, index) => {
                            return <div
                              key={++animateKey}
                              className='cv-works-item'>
                              <TweenOne {...getCardAnimationProps(index, { width: '200px', height: '150px' }, true)}>
                                <WorkCard
                                  {...work}
                                  fns={{
                                    onOpen: onCardClick.bind(null, index)
                                  }}/>
                              </TweenOne>
                            </div>;
                          })
                        }
                      </QueueAnim> : <QueueAnim
                        className='cv-works-group' delay={300}
                        type='right' duration={1000}>
                        <FlowBanner
                          {...this.state}
                          works={works}
                          getCardAnimationProps={getCardAnimationProps}
                          clickFunc={onCardClick}
                        />
                      </QueueAnim>
                  }
                </CvCard>
              </div>
            </QueueAnim>
            <QueueAnim key='his' type='bottom' duration={1000}>
              <div key={++animateKey}>
                <CvCard title={titles.careers}>
                  <Timeline>
                    {
                      careers.map(career => {
                        return <Timeline.Item key={++animateKey}>
                          <h4>{career.from + '-' + career.to + ' | ' +
                          career.company + ' | ' +
                          career.position}</h4>
                          {
                            career.work.map(item => {
                              return <p key={++animateKey}>{item}</p>;
                            })
                          }
                        </Timeline.Item>;
                      })
                    }
                  </Timeline>
                </CvCard>
              </div>
            </QueueAnim>
            <OverPack
              targetId='cv-main'
              playScale={0}>
              <QueueAnim key={++animateKey} type='bottom'>
                <div key={++animateKey}>
                  <CvCard title={titles.technologies}>
                    {
                      technologies.map((technology, index) => {
                        return <div key={index} style={{ margin: '.1rem 0' }}>
                          <h3>{technology.name}</h3>
                          <ul>
                            {
                              technology.desc.map((item, index) => {
                                return <li
                                  key={index}
                                  style={{
                                    listStyle: 'circle',
                                    marginLeft: '.25rem'
                                  }}>
                                  {item}
                                </li>;
                              })
                            }
                          </ul>
                        </div>;
                      })
                    }
                  </CvCard>
                </div>
              </QueueAnim>
            </OverPack>
            <OverPack
              targetId='cv-main'
              playScale={0.1}>
              <QueueAnim key={++animateKey} type='bottom'>
                <div key={++animateKey}>
                  <CvCard title={titles.educations}>
                    <Timeline>
                      {
                        educations.map(education => {
                          return <Timeline.Item
                            color='green'
                            key={++animateKey}>
                            <h4>{education.from + '-' + education.to + ' | ' +
                            education.school + ' | ' +
                            education.science}</h4>
                          </Timeline.Item>;
                        })
                      }
                    </Timeline>
                  </CvCard>
                </div>
              </QueueAnim>
            </OverPack>
          </Content>
          <Footer className='cv-footer'>
            <QueueAnim key='footer' type='bottom'>
              <div key={++animateKey}>Created by Maple Liu</div>
            </QueueAnim>
          </Footer>
        </Layout>
        <BackTop target={getTarget}/>
        <QueueAnim type={['top', 'top']} delay={[0, 300]}>
          {this.state.showModal ? [
            <div key={++animateKey} className='cv-modal'>
              <QueueAnim
                type={['top', 'bottom']} delay={[300, 0]}
                duration={[1000, 1000]}>
                {this.state.showModal ? [
                  <div key={++animateKey} className='cv-modal-box'>
                    <WorksBanner
                      works={this.state.modalWorks} {...this.state} />
                  </div>
                ] : null}
              </QueueAnim>
              <QueueAnim
                type={['bottom', 'top']} delay={[300, 0]}
                duration={[1000, 1000]}>
                {this.state.showModal ? [
                  <div
                    key={++animateKey}>
                    <Icon
                      type='link'
                      className='cv-modal-link'
                      onClick={onModalLinkClick}
                    />
                    <Icon
                      type='close'
                      className='cv-modal-close'
                      onClick={onModalCloseClick}
                    />
                  </div>
                ] : null}
              </QueueAnim>
            </div>
          ] : null}
        </QueueAnim>
      </Layout>
    );
  }
}

CvView.propTypes = {
  router: PropTypes.object.isRequired
};

export default CvView;
