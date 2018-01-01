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

  const IconText = ({ type }) => <span><Icon type={type} style={{ marginRight: 8 }}/></span>;

  const getLink = url => url ? url.indexOf('http') > -1 ? url : '#' + url : '';
  const getActions = item => {
    let actions = [];
    if (item.url) actions.push(<a href={getLink(item.url)}><IconText type='link'/></a>);
    if (item.gitHub) actions.push(<a href={item.gitHub}><IconText type='github'/></a>);
    if (item.npm) actions.push(<a href={`https://www.npmjs.com/package/${item.npm}`}><Icon type='medium' /></a>);
    return actions;
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

  const QueueAnimCard = props => {
    const { poster, title, desc } = props;
    return (<Card
      cover={<img alt={title} src={poster}/>}
      actions={getActions(props)}
      hoverable
    >
      <Meta
        title={title}
        description={desc}
      />
    </Card>);
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
            if(!item.isOpen) return "";
            return <List.Item
              key={`listItem${index}`}
              actions={getActions(item)}
              extra={<img width={272} alt={item.title} src={item.poster} className='home-card-img'/>}
            >
              <List.Item.Meta
                title={item.url ? <a href={getLink(item.url)}>{item.title}</a> : item.title}
                description={item.desc}
              />
            </List.Item>;
          })}
        </QueueAnim>
      </List> : works.map((work, index) => {
        if(!work.isOpen) return "";
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
