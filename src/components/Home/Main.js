import React from 'react';
import PropTypes from 'prop-types';
import QueueAnim from 'rc-queue-anim';
import ScrollAnim from 'rc-scroll-anim';
import {
  Layout,
  Card,
  Icon,
  List
} from 'antd';

const { Content } = Layout;
const { Meta } = Card;
const { OverPack } = ScrollAnim;

const HomeMain = (props) => {

  const { works, isMobile } = props;

  const IconText = ({ type }) => [<span key='icon'><Icon type={type} style={{ marginRight: 8 }}/></span>];

  const getLink = url => url ? url.indexOf('http') > -1 ? url : '#' + url : '';

  const getActions = ({ url, gitHub, npm }) => {
    let actions = [];
    if (url) actions.push(<a href={getLink(url)}><IconText type='link'/></a>);
    if (gitHub) actions.push(<a href={gitHub}><IconText type='github'/></a>);
    if (npm) actions.push(<a key='npm' href={`https://www.npmjs.com/package/${npm}`}>
      <img src={`https://upload.wikimedia.org/wikipedia/commons/d/db/Npm-logo.svg`} style={{ height: '13px', marginBottom: '4px' }}/>
    </a>);
    return actions;
  };

  // 获取卡片内容
  const QueueAnimCard = work => {
    const { poster, title, desc } = work;
    return [
      <Card
        key='card'
        cover={<img alt={title} src={poster}/>}
        actions={getActions(work)}
        hoverable
      >
        <Meta
          title={title}
          description={desc}
        />
      </Card>
    ];
  };

  // 获取卡片详情标题
  const CardMeteTitle = ({ url, npm, title }) => {
    let items = [];

    items.push(url ? <a key='url' href={getLink(url)}>{title}</a> : title);
    /*items.push(npm ? <a key='npm' href={`https://www.npmjs.com/package/${npm}`}>
      <img src={`https://img.shields.io/npm/v/${npm}.svg`} style={{ height: '12px', marginLeft: '10px' }}/>
    </a> : '');*/

    return items;
  };

  const cardStyle = {
    width: '100%',
    maxWidth: '600px',
    minWidth: '200px',
    margin: '50px auto 150px'
  };

  const listStyle = {
    width: '100%',
    maxWidth: '800px',
    minWidth: '500px',
    margin: '50px auto'
  };

  const listProps = {
    itemLayout: 'vertical',
    size: 'large'
  };

  const overPackProps = {
    targetId: 'home-main',
    playScale: 0.1,
    style: cardStyle
  };

  const queueAnimProps = {
    delay: 100,
    duration: 1000,
    type: ['bottom', 'top'],
    ease: ['easeOutQuart', 'easeInOutQuart'],
    style: cardStyle
  };

  return (
    <Content className='home-content'>
      {!isMobile ? <List
        key={`queueAnimList`}
        {...listProps}
      >
        <QueueAnim
          {...queueAnimProps}
          type={['right', 'left']}
          style={listStyle}
        >
          {works.map((item, index) => {
            if (!item.isOpen) return '';
            return <List.Item
              key={`listItem${index}`}
              actions={getActions(item)}
              extra={<img width={272} alt={item.title} src={item.poster} className='home-card-img'/>}
            >
              <List.Item.Meta
                title={<CardMeteTitle {...item}/>}
                description={item.desc}
              />
            </List.Item>;
          })}
        </QueueAnim>
      </List> : works.map((work, index) => {
        if (!work.isOpen) return '';
        return index === 0
          ? <QueueAnim
            {...queueAnimProps}
            key={`queueAnim${index}`}
          >
            <div key='card'>
              <QueueAnimCard {...work} />
            </div>
          </QueueAnim>
          : <OverPack
            key={`overPack${index}`}
            {...overPackProps}
          >
            <QueueAnim
              {...queueAnimProps}
              key={`queueAnim${index}`}
            >
              <div key='card'>
                <QueueAnimCard {...work} />
              </div>
            </QueueAnim>
          </OverPack>;
      })
      }
    </Content>
  );
};

HomeMain.propTypes = {
  works: PropTypes.array,
  isMobile: PropTypes.bool
};

export default HomeMain;
