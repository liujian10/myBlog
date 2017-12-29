import './Sider.less';

import React from 'react';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import PropTypes from 'prop-types';
import {
  Icon,
  List,
  Avatar,
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
    adaptiveToUpdate
  } = props;

  // 头像动画配置
  const logoAnimation = {
    rotate: 360,
    repeat: -1,
    duration: 5000
  };

  // 左侧菜单onCollapse事件
  const onCollapse = (collapsed, type) => {
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
  const getDesc = text => <div style={{ textAlign: 'left' }}>{text}</div>;

  const listData = [
    {
      title: getDesc(<h2 key='user-name' className='home-sider-username'>{introduction.name} <Icon type='man'/></h2>)
    },
    {
      title: getDesc(`${introduction.age}，${introduction.nationality}，${introduction.party}`),
      desc: introduction.desc,
      style: {
        marginBottom: '12px',
        paddingBottom: '12px',
        textAlign: 'justify'
      }
    },
    {
      desc: <div><Icon type='mobile'/> {introduction.mobile}</div>
    },
    {
      desc: <div><Icon type='link'/> <a href={'http://' + introduction.website}>{introduction.website}</a></div>
    },
    {
      desc: <div><Icon type='github'/> <a href={`https://${introduction.gitHub}`}>{introduction.gitHub}</a></div>
    },
    {
      desc: <div><Icon type='mail'/> <a href={`mailto:${introduction.email}`}>{introduction.email}</a></div>
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
            itemLayout='horizontal'
            dataSource={listData}
            renderItem={item => (
              <List.Item style={item.style || {
                border: 'none',
                padding: '1px 0'
              }}>
                <List.Item.Meta
                  avatar={item.text && <Avatar
                    size='small'
                    style={{
                      backgroundColor: '#25a186'
                    }}
                  >{item.text}</Avatar>}
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
  adaptiveToUpdate: PropTypes.func
};

export default HomeSider;
