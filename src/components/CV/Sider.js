import React from 'react';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import {
  Icon,
  List,
  Avatar
} from 'antd';

const CvSider = (props) => {
  const {
    logoPaused,
    introduction,
    onLogoMouseOver,
    onLogoMouseOut
  } = props;

  // 头像动画配置
  const logoAnimation = {
    rotate: 360,
    repeat: -1,
    duration: 2000
  };

  // 获取描述元素
  const getDesc = text => {
    return <div style={{ textAlign: 'left' }}>{text}</div>;
  };

  const listData = [
    {
      title: getDesc(<h2 key='user-name' className='cv-sider-username'>{introduction.name} <Icon type='man'/></h2>)
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
    <QueueAnim
      key='sider' type={['left', 'right']}
      ease={['easeOutQuart', 'easeInOutQuart']}>
      <TweenOne
        key='logo-anim'
        animation={logoAnimation}
        paused={logoPaused}
        onMouseOver={onLogoMouseOver}
        onMouseOut={onLogoMouseOut}>
        <img className='cv-sider-head' src='https://avatars0.githubusercontent.com/u/17332112?s=460&v=4'/>
      </TweenOne>
      <List
        key='user-base'
        style={{
          padding: '0 20px 0 30px',
          marginTop: '16px'
        }}
        size="small"
        itemLayout="horizontal"
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
    </QueueAnim>
  );
};

export default CvSider;
