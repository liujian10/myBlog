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
    return actions;
  };
  const cardStyle = {
    maxWidth: '800px',
    minWidth: '200px',
    margin: '50px auto 150px'
  };

  const listStyle = {
    maxWidth: '800px',
    minWidth: '500px',
    margin: '50px auto'
  };

  const listProps = {
    itemLayout: 'vertical',
    size: 'large',
    dataSource: works
  };

  const overPackProps = {
    targetId: 'home-main',
    playScale: 0.1,
    style: cardStyle
  };

  const queueAnimProps = {
    type: 'bottom',
    duration: 1000,
    style: cardStyle
  };

  const QueueAnimCard = ({ poster, url = '', title, desc }) => (
    <a href={getLink(url)}>
      <Card
        cover={<img alt={title} src={poster}/>}
        actions={
          url ? [<Icon type='link' key='link'/>] : []
        }
        hoverable
      >
        <Meta
          title={title}
          description={desc}
        />
      </Card>
    </a>
  );

  return (
    <Content className='home-content'>
      {!isMobile ? <QueueAnim
        {...queueAnimProps}
        style={listStyle}
      >
        <List
          key={`queueAnimList`}
          {...listProps}
          renderItem={item => (
            <List.Item
              key={item.title}
              actions={getActions(item)}
              extra={<img width={272} alt={item.title} src={item.poster} className='home-card-img'/>}
            >
              <List.Item.Meta
                title={item.url ? <a href={getLink(item.url)}>{item.title}</a> : item.title}
                description={item.desc}
              />
            </List.Item>
          )}
        />
      </QueueAnim> : works.map((work, index) => {
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
