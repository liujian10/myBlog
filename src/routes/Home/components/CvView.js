import React from 'react'
import QueueAnim from 'rc-queue-anim'
import TweenOne from 'rc-tween-one'
import { OverPack } from 'rc-scroll-anim'
import PropTypes from 'prop-types'
import { Layout, Icon, Card, Timeline, BackTop, Col } from 'antd'
import './CvView.less'
import MapleImage from '../assets/maple.png'
import WorksBanner from '../../../components/CV/WorksBanner'

const { Header, Footer, Sider, Content } = Layout

const CvCard = props => {
  const { title = '', children = '' } = props
  return (
    <Card className='cv-card' title={<div className='cv-text'>{title}</div>} bordered={false}>
      {children}
    </Card>
  )
}

const WorkCard = props => {
  const { title, desc, src } = props
  return (
    <Card bodyStyle={{ padding: 0 }} className='cv-works-card'>
      <img width='100%' src={src} />
      <div>
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
    </Card>
  )
}

class CvView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      logoPaused: true,
      cardProps: {},
      showModal: false,
      modalWorks: []
    }
    this.showKey = ''
  }
  render () {
    const { router } = this.props
    // 头像动画配置
    const logoAnimation = {
      rotate: 360,
      repeat: -1,
      duration: 2000
    }
    // 个人简介信息
    const introduction = {
      name:'Maple Liu',
      age:'xx',
      nationality:'xx',
      party:'xxx',
      desc:'我是简介，我是简介，我是简介，我是简介，我是简介，我是简介，我是简介，我是简介，我是简介，我是简介。',
      mobile:'12345678901',
      email:'maple@xx.com',
      website:'mapleliu.com',
      gitHub:'github.com/liujian10'
    }
    // 海报资源
    const posters = [
      'http://i0.letvimg.com/lc06_iscms/201710/13/09/21/b12187a4d7b34a9eb4f82716ab92056a.jpg',
      'http://i1.letvimg.com/lc07_iscms/201710/12/17/02/87b1ba8cacd945c5a475c7dbb8c946bb.jpg',
      'http://i3.letvimg.com/lc03_iscms/201709/28/10/01/6a35856cd9e146039731013284c0ff5a.jpg',
      'http://i2.letvimg.com/lc04_iscms/201709/28/10/01/16802fa957b14adba9218e96319ae52c.jpg',
      'http://i0.letvimg.com/lc03_iscms/201708/30/16/01/b301a5d7b203493e9ea16b60c61606ae.jpg',
      'http://cued.xunlei.com/demos/publ/img/P_001.jpg',
      'http://cued.xunlei.com/demos/publ/img/P_002.jpg'
    ]
    // 项目&作品资源
    const works = [
      {
        title:'我是标题1',
        desc:'我是简介，我是简介，我是简介，我是简介，我是简介，我是简介',
        src:posters[0],
        href:'/blog',
        detail:[
          {
            title:'我是标题1',
            desc:'我是描述，我是描述，我是描述，我是描述，我是描述',
            img:posters[0]
          },
          {
            title:'我是标题2',
            desc:'我是描述',
            img:posters[1]
          },
          {
            title:'我是标题3',
            desc:'我是描述',
            img:posters[2]
          },
          {
            title:'我是标题4',
            desc:'我是描述',
            img:posters[3]
          }
        ]
      },
      {
        title:'我是标题2',
        desc:'我是简介，我是简介，我是简介',
        src:posters[1]
      },
      {
        title:'我是标题3',
        desc:'我是简介，我是简介，我是简介',
        src:posters[2]
      },
      {
        title:'我是标题4',
        desc:'我是简介，我是简介，我是简介',
        src:posters[3]
      },
    ]
    // 左侧菜单onCollapse事件
    const onCollapse = (collapsed, type) => {
      console.log(collapsed, type)
    }
    // 个人头像onMouseOver事件
    const onLogoMouseOver = () => {
      this.setState({ logoPaused: false })
    }
    // 个人头像onMouseOut事件
    const onLogoMouseOut = () => {
      this.setState({ logoPaused: true })
    }
    // 项目&作品卡片onMouseOver事件
    const onCardMouseOver = key => {
      let cardProps = this.state.cardProps
      cardProps[key] = {
        paused: false,
        reverse: false,
        moment: null
      }
      this.setState({
        cardProps:cardProps
      })
    }
    // 项目&作品卡片onCardMouseOut事件
    const onCardMouseOut = key => {
      let cardProps = this.state.cardProps
      if (!cardProps[key].reverse) {
        cardProps[key] = {
          paused: false,
          reverse: true,
          moment: null
        }
        this.setState({
          cardProps:cardProps
        })
      }
    }
    // 项目&作品卡片onClick事件
    const onCardClick = key => {
      const { detail = [] } = works[key]
      let cardProps = this.state.cardProps
      cardProps['card' + key] = {
        paused: false,
        reverse: true,
        moment: null
      }
      this.setState({
        cardProps:cardProps,
        showModal:true,
        modalWorks:detail
      })
      this.showKey = key
    }
    // 模态窗口关闭按钮onClick事件
    const onModalCloseClick = () => {
      this.setState({
        showModal:false
      })
    }
    // 模态窗口链接按钮onClick事件
    const onModalLinkClick = () => {
      const { href = '#' } = works[this.showKey]
      router.push(href)
    }
    // 获取滚动条元素
    const getTarget = () => document.getElementsByClassName('cv-main')[0] || window
    // 动态动画key值
    let animateKey = 0
    // 动态项目&作品key值
    let worksKey = -1
    // 获取项目&作品卡片动画动态属性
    const getCardAnimationProps = key => {
      let cardKey = 'card' + key
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
        onMouseOver: onCardMouseOver.bind(this, cardKey),
        onMouseOut: onCardMouseOut.bind(this, cardKey),
        onClick: onCardClick.bind(this, key)
      }
      return res
    }
    return (
      <Layout className='cv-layout'>
        <Sider className='cv-sider' breakpoint='lg' collapsedWidth='0' onCollapse={onCollapse}>
          <QueueAnim key='sider' type={['left', 'right']} ease={['easeOutQuart', 'easeInOutQuart']}>
            <TweenOne
              key={++animateKey}
              animation={logoAnimation}
              paused={this.state.logoPaused}
              onMouseOver={onLogoMouseOver}
              onMouseOut={onLogoMouseOut}>
              <img className='cv-sider-head' src={MapleImage} />
            </TweenOne>
            <h2 key={++animateKey} className='cv-text-caps'>{introduction.name} <Icon type='man' /></h2>
            <ul key={++animateKey} className='cv-sider-baseInfo'>
              <li className='cv-text'>我{introduction.age}，{introduction.nationality}，{introduction.party}</li>
              <li><Icon type='mobile' /> {introduction.mobile}</li>
              <li><Icon type='mail' /> <a href={'mailto:' + introduction.email}>{introduction.email}</a></li>
              <li><Icon type='github' /> <a href={'https://' + introduction.gitHub}>{introduction.gitHub}</a></li>
              <li><Icon type='link' /> <a href={'http://' + introduction.website}>{introduction.website}</a></li>
              <li><h3 /></li>
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
                <CvCard title='我是标题1'>
                  <QueueAnim className='cv-works-group' delay={300} type='right' duration={1000}>
                    <div key={++animateKey} className='cv-works-item'>
                      <TweenOne {...getCardAnimationProps(++worksKey)}>
                        <WorkCard {...works[worksKey]} />
                      </TweenOne>
                    </div>
                    <div key={++animateKey} className='cv-works-item'>
                      <TweenOne {...getCardAnimationProps(++worksKey)}>
                        <WorkCard {...works[worksKey]} />
                      </TweenOne>
                    </div>
                    <div key={++animateKey} className='cv-works-item'>
                      <TweenOne {...getCardAnimationProps(++worksKey)}>
                        <WorkCard {...works[worksKey]} />
                      </TweenOne>
                    </div>
                    <div key={++animateKey} className='cv-works-item'>
                      <TweenOne {...getCardAnimationProps(++worksKey)}>
                        <WorkCard {...works[worksKey]} />
                      </TweenOne>
                    </div>
                  </QueueAnim>
                </CvCard>
              </div>
            </QueueAnim>
            <QueueAnim key='his' type='bottom' duration={1000} >
              <div key={++animateKey}>
                <CvCard title='我是标题2'>
                  <Timeline>
                    <Timeline.Item>
                      <h4>2016.01-2017.07 我是标题</h4>
                      <p>1. 我是内容，我是内容，我是内容；</p>
                      <p>2. 我是内容，我是内容，我是内容；</p>
                      <p>3. 我是内容，我是内容，我是内容；</p>
                      <p>4. 我是内容，我是内容，我是内容。</p>
                    </Timeline.Item>
                    <Timeline.Item color='green'>
                      <h4>2014.08-2016.01 我是标题</h4>
                      <p>1. 我是内容，我是内容，我是内容；</p>
                      <p>2. 我是内容，我是内容，我是内容。</p>
                    </Timeline.Item>
                  </Timeline>
                </CvCard>
              </div>
            </QueueAnim>
            <OverPack
              targetId='cv-main'
              playScale={0.1}>
              <QueueAnim key={++animateKey} type='bottom'>
                <div key={++animateKey}>
                  <CvCard title='我是标题3'>
                    <Timeline>
                      <Timeline.Item>
                        <h4>2016.01-2017.07 我是标题</h4>
                        <p>1. 我是内容，我是内容，我是内容；</p>
                        <p>2. 我是内容，我是内容，我是内容；</p>
                        <p>3. 我是内容，我是内容，我是内容；</p>
                        <p>4. 我是内容，我是内容，我是内容。</p>
                      </Timeline.Item>
                      <Timeline.Item color='green'>
                        <h4>2014.08-2016.01 我是标题</h4>
                        <p>1. 我是内容，我是内容，我是内容；</p>
                        <p>2. 我是内容，我是内容，我是内容。</p>
                      </Timeline.Item>
                    </Timeline>
                  </CvCard>
                </div>
              </QueueAnim>
            </OverPack>
            <OverPack
              targetId='cv-main'
              playScale={0}>
              <QueueAnim key={++animateKey} type='bottom'>
                <div key={++animateKey}>
                  <CvCard title='我是标题4'>
                    <Timeline>
                      <Timeline.Item color='green'>
                        <h4>2011.09-2015.06 XXXX XXXX XXXX</h4>
                      </Timeline.Item>
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
        <BackTop target={getTarget} />
        <QueueAnim type={['top', 'top']} delay={[0, 300]}>
          {this.state.showModal ? [
            <div key={++animateKey} className='cv-modal'>
              <QueueAnim type={['top', 'bottom']} delay={[300, 0]} duration={[1000, 1000]}>
                {this.state.showModal ? [
                  <div key={++animateKey} className='cv-modal-box'>
                    <WorksBanner works={this.state.modalWorks} {...this.state} />
                  </div>
                ] : null}
              </QueueAnim>
              <QueueAnim type={['bottom', 'top']} delay={[300, 0]} duration={[1000, 1000]}>
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
    )
  }
}

CvView.propTypes = {
  router:PropTypes.object.isRequired
}

CvCard.propTypes = {
  title:PropTypes.string,
  children:PropTypes.any
}

WorkCard.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
  src: PropTypes.string
}

export default CvView
