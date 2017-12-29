import React from 'react';
import PropTypes from 'prop-types';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import { OverPack } from 'rc-scroll-anim';
import {
  Layout,
  Card,
  Icon
} from 'antd';

const { Content } = Layout;
const { Meta } = Card;
const cardStyle = {
  maxWidth: '600px',
  minWidth: '200px',
  margin: '50px auto 150px'
};

const HomeMain = (props) => {
  const { works } = props;
  return (
    <Content className='home-content'>
      {
        works.map((work, index) => {
          const { poster, url = '', title, desc } = work;
          return index === 0 ? <QueueAnim
            key={`queue${index}`}
            type='bottom'
            duration={1000}
            style={cardStyle}
          >
            <a
              key={`card${index}`}
              href={url.indexOf('http') > -1 ? url : '#' + url}>
              <Card
                cover={<img alt='example' src={poster}/>}
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
          </QueueAnim> : <OverPack
            key={`OverPack${index}`}
            targetId='home-main'
            playScale={0.1}
            style={cardStyle}
          >
            <QueueAnim key={`queue${index}`} type='bottom' duration={1500}>
              <a
                key={`card${index}`}
                href={url.indexOf('http') > -1 ? url : '#' + url}>
                <Card
                  cover={<img alt='example' src={poster}/>}
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
            </QueueAnim>
          </OverPack>;
        })
      }
    </Content>
  );
};

HomeMain.propTypes = {
  works: PropTypes.array
};

export default HomeMain;
