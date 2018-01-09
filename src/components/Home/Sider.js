import './Sider.less';

import React from 'react';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import PropTypes from 'prop-types';
import {
  Icon,
  List,
  Layout
} from 'antd';

import IMG_MAPLE from './assets/maple.png';

const { Sider } = Layout;

const HomeSider = (props) => {
  const {
    logoPaused,
    introduction,
    collapsed,
    assignProps,
    adaptiveToUpdate,
    router
  } = props;

  // 头像动画配置
  const logoAnimation = {
    rotate: 360,
    repeat: -1,
    duration: 5000
  };

  // 左侧菜单onCollapse事件
  const onCollapse = (collapsed) => {
    assignProps({ collapsed });
    setTimeout(adaptiveToUpdate, 100);
  };

  // 个人头像onMouseOver事件
  const onLogoMouseOver = () => assignProps({
    logoPaused: false
  });

  // 个人头像onMouseOut事件
  const onLogoMouseOut = () => assignProps({
    logoPaused: true
  });

  // 获取描述元素
  const getDesc = text => {
    return <div style={{ textAlign: 'left' }}>{text}</div>;
  };

  // isHome
  const isHome = router.location.pathname === '/';

  const {
    nickname,
    name,
    age,
    nationality,
    party,
    desc,
    location,
    email,
    gitHub,
    website
  } = introduction;

  const listData = [
    {
      title: <span key='user-name' className='home-sider-username'>
        {isHome ? nickname : name} <Icon type='man'/>
      </span>,
      desc: isHome ? '' : `${age}，${nationality}，${party}`,
      content: desc,
      style: {
        marginBottom: '12px',
        paddingBottom: '12px',
        textAlign: 'justify'
      }
    },
    {
      desc: [
        <div key='local'><Icon type='environment'/> {location}</div>,
        <div key='email'><Icon type='mail'/> <a href={`mailto:${email}`}>{email}</a></div>,
        <div key='github'><Icon type='github'/> <a href={`https://${gitHub}`}>{gitHub}</a></div>,
        <div key='website'><Icon type='link'/> <a href={'http://' + website}>{website}</a></div>
      ]
    }
  ];

  return (
    <Sider
      width='230'
      className='home-sider'
      breakpoint='lg'
      collapsedWidth='0'
      onCollapse={onCollapse}
    >
      <QueueAnim
        key='sider' type={['left', 'right']}
        ease={['easeOutQuart', 'easeInOutQuart']}>
        {collapsed ? null : [
          <TweenOne
            key='logo-anim'
            animation={logoAnimation}
            paused={logoPaused}
            onMouseOver={onLogoMouseOver}
            onMouseOut={onLogoMouseOut}>
            <img className='home-sider-head' src={IMG_MAPLE}/>
          </TweenOne>,
          <List
            key='user-base'
            style={{
              padding: '0 20px 0 30px',
              marginTop: '16px'
            }}
            size='small'
            itemLayout='vertical'
            dataSource={listData}
            renderItem={(item, index) => (
              <List.Item
                key={index}
                style={item.style || {
                  border: 'none',
                  padding: '1px 0',
                  textAlign: 'justify'
                }}
              >
                <List.Item.Meta
                  title={item.title}
                  description={item.desc}
                />
                {item.content}
              </List.Item>
            )}
          />
        ]}
      </QueueAnim>
    </Sider>
  );
};

HomeSider.propTypes = {
  assignProps: PropTypes.func,
  logoPaused: PropTypes.bool,
  collapsed: PropTypes.bool,
  introduction: PropTypes.object,
  adaptiveToUpdate: PropTypes.func,
  router: PropTypes.object.isRequired
};

export default HomeSider;
